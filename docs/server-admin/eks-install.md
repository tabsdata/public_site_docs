# Install Tabsdata on AWS EKS

> Installs Tabsdata on AWS EKS: priority classes, kubeconfig access, RDS PostgreSQL and S3 config files, tdkserver init/assess/create/start, port-forward, and login.

Source: https://docs.tabsdata.com/server-admin/eks-install

[AWS Services Setup for Tabsdata on EKS](#aws-services-setup-for-tabsdata-on-eks) is included below.

## Before You Begin

See the AWS Services Setup for Tabsdata on EKS documentation for prerequisite configuration.

## Overview

Tabsdata runs on Kubernetes as deployments containing an API server, AI agent, and supporting services within a single namespace. User functions execute as individual Kubernetes jobs that start, run, and exit. Table data resides in AWS S3 while metadata lives in AWS RDS for PostgreSQL. This installation is performed by the Tabsdata administrator.

## Requirements

-   A Windows (x86), macOS (ARM64), or Linux (x86) client machine
-   Python 3.12.13 installed
-   The AWS CLI (`aws`) and `kubectl`
-   AWS EKS Kubernetes cluster with x86 nodes
-   AWS RDS for PostgreSQL instance running version 18.4 in the same region as EKS
-   AWS S3 bucket, preferably in the same region
-   Network access between the EKS cluster and the RDS instance, and between the client and the EKS cluster

### Priority Classes

Tabsdata pods name two priority classes, `tabsdata-service` for the instance and `tabsdata-function` for the runs it triggers. They are cluster-wide, so a cluster administrator creates them once; the service class must hold the higher value:

```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: tabsdata-service
value: 1000
globalDefault: false
description: Tabsdata instance pods
---
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: tabsdata-function
value: 100
globalDefault: false
description: Pods of the runs a Tabsdata instance triggers
```

```text
kubectl --kubeconfig <KUBECONFIG> apply -f tabsdata-priority-classes.yaml
```

### Cluster Access

Fetch the cluster credentials into your kubeconfig:

```text
aws eks update-kubeconfig --region <EKS_REGION> --name <TABSDATA_CLUSTER> --kubeconfig <KUBECONFIG>
kubectl --kubeconfig <KUBECONFIG> config get-contexts
```

The context is named after the cluster's ARN, `arn:aws:eks:<EKS_REGION>:<AWS_ACCOUNT>:cluster/<TABSDATA_CLUSTER>`.

## Install Tabsdata Packages

From a machine with EKS cluster access, create a Python virtual environment and install:

**Using uv:**

```text
uv pip install "tabsdata[all]" tabsdata-agent
```

**Using pip:**

```text
pip install "tabsdata[all]" tabsdata-agent
```

**Note:** MySQL and PostgreSQL CDC connectors require database drivers that Tabsdata cannot redistribute. See "Installing Third-Party Database Drivers" if needed before proceeding.

## Configuration Values Needed

Gather these before starting:

| Category | Variable | Description |
| --- | --- | --- |
| AWS RDS for PostgreSQL | `<RDS_HOST>` | Hostname of RDS instance |
|  | `<RDS_PORT>` | Port of RDS instance |
|  | `<TABSDATA_DATABASE>` | Database for Tabsdata installation |
|  | `<RDS_USERNAME>` | Connection username |
|  | `<RDS_PASSWORD>` | Connection password |
| AWS S3 | `<S3_BUCKET>` | Bucket for data storage |
|  | `<S3_REGION>` | Bucket region |
|  | `<S3_ACCESS_KEY>` | Access key with full bucket access |
|  | `<S3_SECRET_KEY>` | Secret key for access key |
| AWS EKS | `<EKS_REGION>` | Region of the cluster |
|  | `<TABSDATA_CLUSTER>` | Target cluster |
|  | `<TABSDATA_NAMESPACE>` | Empty reserved namespace |
|  | `<KUBECONFIG>` | Path to kubeconfig file |
| LLM Provider | `<OPENAI_API_KEY>` / `<ANTHROPIC_API_KEY>` | LLM API key if AI integration enabled |
| Chosen During Install | `<TABSDATA_INSTANCE>` | Tabsdata instance name |

### Database TLS

Nothing to fetch. AWS publishes the RDS certificate bundle, which ships in the Tabsdata images; Tabsdata connects with `verify-ca` against it.

## Configure Tabsdata

### Prepare the Namespace

Create the namespace; `tdkserver` never creates one:

```text
kubectl --kubeconfig <KUBECONFIG> create namespace <TABSDATA_NAMESPACE>
```

### Prepare Configuration

```text
tdkserver init --instance <TABSDATA_INSTANCE> --provider eks --kubeconfig <KUBECONFIG> --namespace <TABSDATA_NAMESPACE>
```

This creates `~/.tabsdata/instances/<TABSDATA_INSTANCE>/` with configuration files to edit in `~/.tabsdata/instances/<TABSDATA_INSTANCE>/init/input/configs/`.

### Configure Database

Edit `dbmanager.database.yaml` with RDS information. Leave `ssl_mode` and `ssl_root_cert` as they are; Tabsdata fills them:

```yaml
database_server:
  postgres:
    host: <RDS_HOST>
    port: <RDS_PORT>
    database: <TABSDATA_DATABASE>
    username: <RDS_USERNAME>
    password: <RDS_PASSWORD>
    ssl_mode: ${{system:tdk_database_ssl_mode}}
    ssl_root_cert: ${{system:tdk_database_ssl_root_cert}}
  pool:
    admin:
      min_connections: 1
      max_connections: 1
      acquire_timeout: 30
      max_lifetime: 1800
      idle_timeout: 30
      test_before_acquire: true
```

Use a host the pods in the cluster can reach: the RDS endpoint resolves to its in-VPC address from inside the VPC.

The `apiserver.database.yaml` file requires no editing; Tabsdata generates and sets credentials automatically for the `<TABSDATA_DATABASE>_apiserver` and `<TABSDATA_DATABASE>_aiagent` roles.

### Configure S3 Storage

Edit `apiserver.storage.yaml` with S3 details for three mounts (ROOT, BUNDLES, IMAGES). They can share the same bucket with different paths:

```yaml
storage:
  mounts:
  - id: ROOT
    path: /
    uri: s3://<S3_BUCKET>/root/
    options:
      aws_region: <S3_REGION>
      aws_access_key_id: <S3_ACCESS_KEY>
      aws_secret_access_key: <S3_SECRET_KEY>
  - id: BUNDLES
    path: /bundles
    uri: s3://<S3_BUCKET>/bundles/
    options:
      aws_region: <S3_REGION>
      aws_access_key_id: <S3_ACCESS_KEY>
      aws_secret_access_key: <S3_SECRET_KEY>
  - id: IMAGES
    path: /images
    uri: s3://<S3_BUCKET>/images/
    options:
      aws_region: <S3_REGION>
      aws_access_key_id: <S3_ACCESS_KEY>
      aws_secret_access_key: <S3_SECRET_KEY>
```

**Warning:** S3 URIs must end with `/`.

### Configure AI Agent

Edit `aiagent.yaml` to enable LLM integration with Anthropic or OpenAI API keys:

```yaml
port: ${{system:tdk_aiagent_public_port}}
allow_writes: true
ai_providers:
  openai:
    api_key: <OPENAI_API_KEY>
    model: openai/gpt-5.4
  anthropic:
    api_key: <ANTHROPIC_API_KEY>
    model: anthropic/claude-sonnet-4-6
hybrid_search:
  embedder: fastembed
  embedding_model: BAAI/bge-small-en-v1.5
  device: cpu
  cache_dir: null
  offline: false
```

### Preflight Check

Verify configuration completeness:

```text
tdkserver config check --instance <TABSDATA_INSTANCE> --init
```

### Assess the Instance

Before creating the instance, check that it can be created:

```text
tdkserver assess --instance <TABSDATA_INSTANCE>
```

`assess` changes nothing. It checks everything `create` and the first `start` depend on, and reports each check as passed, failed, warning, skipped (could not run) or waived (does not apply):

| Area | What is checked |
| --- | --- |
| Local registry | The instance is initialized and not yet created; `init` was run by this Tabsdata version and edition; the init folder differs from the templates only in filled placeholders; no mandatory placeholder is left |
| Cluster access | The program the kubeconfig runs to authenticate (`aws`) is present; the API server answers; the namespace exists |
| Operator rights | Your identity has the verbs an instance needs in the namespace |
| Scheduling | The priority classes `tabsdata-service` and `tabsdata-function` exist, the service one higher; a ready node carries the labels the service pods select; a node or pool can serve the function pods; a pool carries the taint the function pods tolerate |
| Database | The CA the pods verify against is in place; the database answers and accepts the credentials, over TLS; the role has `CREATEROLE` and `CREATEDB` and does not bypass row-level security; the role owns its database; the database holds no schemas from an earlier instance |
| Storage | Each mount carries the options its scheme takes; each bucket answers and accepts the credentials |
| Coherence | The package index the function environments use answers; no secret is both supplied and generated; the AI agent has a model it can call |

It exits 0 when nothing stands in the way of `create`, and 1 when a check failed or was skipped. Add `--explain` to print, after the report, what every check asks. Fix what it reports, then run it again.

**Note:** The database and bucket checks run from the client machine. An RDS instance only reachable from inside the VPC shows as a warning there, not a failure; wrong credentials still fail.

### Create Instance

```text
tdkserver create --instance <TABSDATA_INSTANCE>
```

Verify state:

```text
tdkserver inspect --instance <TABSDATA_INSTANCE>
```

### Start Instance

The first start builds the Python environments and sets up the database, so it takes several minutes.

```text
tdkserver start --instance <TABSDATA_INSTANCE>
tdkserver status --instance <TABSDATA_INSTANCE>
```

Every service pod should reach `Running`:

```text
kubectl --kubeconfig <KUBECONFIG> --namespace <TABSDATA_NAMESPACE> get pods
```

### Access Tabsdata

Use port forwarding for verification:

```text
kubectl port-forward --kubeconfig <KUBECONFIG> --namespace <TABSDATA_NAMESPACE> service/net-apiserver 2457:2457
```

Access at `http://127.0.0.1:2457`. Port 2457 is default; adjust if using a different base port.

**Note:** Port forwarding is for verification only. It is a single stream through the cluster's control plane and drops when the pods restart; restart it when that happens. Properly expose Tabsdata before production use.

### Log In

```text
tdk login --server <TABSDATA_URL> --user admin --password tabsdata
tdk status
```

### Post-Installation Cleanup

Delete local setup files containing sensitive credentials:

```text
rm -rf ~/.tabsdata/instances/<TABSDATA_INSTANCE>/init
```

## Expose Tabsdata Outside Cluster

The instance runs but is only accessible via port forwarding. See AWS Services Setup documentation for HTTPS exposure instructions.

## Next Steps

Run your first data integration per "Run Your First Data Integration" documentation.

## Appendix: Sizing Service and Function Pods

Configure sizing in the instance's `configs/tabsdata.yaml`. Service pods cover the instance components (API server, AI agent, embeddings, metadata); function pods cover per-execution pods.

```yaml
pods:
  service:
    priority: tabsdata-service
    resources:
      cpu: "2"
      memory: 1Gi
      disk: 16Gi
    placement:
      selectors: {}
      tolerations: []
    apiserver:
      resources:
        cpu: "2"
        memory: 4Gi
        disk: 16Gi
    aiagent:
      resources:
        cpu: "2"
        memory: 8Gi
        disk: 64Gi
  function:
    priority: tabsdata-function
    resources:
      cpu: "1"
      memory: 16Gi
      disk: 64Gi
    placement:
      selectors: {}
      tolerations:
        - key: workload
          value: batch
          effect: NoSchedule
```

Set values based on actual component footprints and confirm node pools can satisfy the largest single pod. A tolerations list replaces the one Tabsdata would apply, so it must be complete. Use `tdkserver config get` and `tdkserver config put` to manage the file.

## AWS Services Setup for Tabsdata on EKS

Tabsdata on EKS runs as long-running deployment pods in a single namespace, and dispatches every publisher, subscriber and transformer execution as its own Kubernetes job. It keeps no state in the cluster: table data lives in AWS S3 and all metadata lives in AWS RDS for PostgreSQL. This document covers the AWS-side setup those three services need before Tabsdata can be installed, and how to expose the instance once it is running.

The values produced here are the ones the Tabsdata admin needs at hand for [Install Tabsdata on AWS EKS](#overview).

### Before you begin

These instructions assume you have knowledge of, and full access to, the AWS IAM, EKS, RDS and S3 services, or that your AWS admins do. Each section indicates the type of admin access it requires.

It is recommended you read through the whole setup before you begin, so you can gather all the necessary information and have it ready.

### Prepare the EKS cluster

(EKS admin)

Tabsdata must be installed into an existing cluster `<TABSDATA_CLUSTER>`, in an empty namespace.

Create an EKS namespace `<TABSDATA_NAMESPACE>`.

#### Node scheduling

(EKS admin)

Karpenter must be installed in the cluster and given the AWS resources it needs: an IAM role for the controller (IRSA or EKS Pod Identity) allowing it to run instances, create launch templates and pass the node role; a node IAM role admitted to the cluster via an EKS access entry or `aws-auth`; the SQS interruption queue with its EventBridge rules; and `karpenter.sh/discovery` tags on the subnets and security groups the `EC2NodeClass` selects. Because Karpenter cannot run on a node it manages, a small fixed managed node group must exist beforehand, outside the pools, to hold it and the cluster addons.

Two `EC2NodeClass`/`NodePool` pairs are then created, distinguished mainly by local disk. The services pool is untainted, sized for the long-running instance pods, with the instance store exposed to the kubelet, expiry disabled and consolidation enabled so the fleet shrinks. The functions pool is sized for the substantially larger disk a run stages, with an explicit memory floor since that does not follow from vCPU or disk, and is tainted so a function pod that lost its toleration fails visibly rather than running slowly on a small machine. All sizes in the reference pools are initial suggested values. Set them from the instance's own requests and expected concurrency and volumetry. Pool and node class names are free; placement follows the pods' resource requests, so function pods land on the functions pool because only it provisions machines that large.

Three strings are binding and must match exactly. Two `PriorityClass` objects named `tabsdata-service` and `tabsdata-function` must exist, with the service class ranked higher, because the API server rejects a pod naming a class that is absent. The functions pool's taint key, value and effect must be identical to `pods.function.placement.tolerations` in the instance's `configs/tabsdata.yaml`, edited via `tdkserver get-cfg` / `tdkserver put-cfg`. Resource requests and the `aut-services` disruption budget arrive with the instance and need no administrator action.

#### Map your AWS user to a Kubernetes group

(EKS admin)

Map the AWS username `<AWS_USERNAME>` that will install and manage Tabsdata to the Kubernetes group `<TABSDATA_GROUP>` in the cluster `<TABSDATA_CLUSTER>`, region `<TABSDATA_CLUSTER_REGION>`.

#### Create the namespace role and binding

(EKS admin)

This role grants Tabsdata the permissions it needs inside its own namespace.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: <TABSDATA_ROLE>
  namespace: <TABSDATA_NAMESPACE>
rules:
  - apiGroups: [ "" ]
    resources: [ "pods" ]
    verbs: [ "get", "list", "watch", "create", "update", "patch", "delete", "deletecollection" ]
  - apiGroups: [ "" ]
    resources: [ "services", "configmaps", "secrets", "serviceaccounts" ]
    verbs: [ "get", "list", "watch", "create", "update", "patch", "delete" ]
  - apiGroups: [ "" ]
    resources: [ "pods/log" ]
    verbs: [ "get", "list" ]
  - apiGroups: [ "" ]
    resources: [ "pods/portforward" ]
    verbs: [ "create" ]
  - apiGroups: [ "apps" ]
    resources: [ "deployments" ]
    verbs: [ "get", "list", "watch", "create", "update", "patch", "delete", "deletecollection" ]
  - apiGroups: [ "policy" ]
    resources: [ "poddisruptionbudgets" ]
    verbs: [ "get", "list", "create", "update", "delete" ]
  - apiGroups: [ "networking.k8s.io" ]
    resources: [ "ingresses" ]
    verbs: [ "get", "list", "watch", "create", "update", "patch", "delete" ]
  - apiGroups: [ "batch" ]
    resources: [ "jobs", "cronjobs" ]
    verbs: [ "get", "list", "watch", "create", "update", "patch", "delete", "deletecollection" ]
  - apiGroups: [ "rbac.authorization.k8s.io" ]
    resources: [ "roles", "rolebindings" ]
    verbs: [ "get", "list", "create", "update", "delete" ]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: <TABSDATA_ROLE>
  namespace: <TABSDATA_NAMESPACE>
subjects:
  - kind: Group
    name: <TABSDATA_GROUP>
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: <TABSDATA_ROLE>
  apiGroup: rbac.authorization.k8s.io
```

#### Create the cluster role and binding

(EKS admin)

A few of the checks Tabsdata runs cannot be expressed in a namespaced role, so they need a cluster role. All of them are read-only, and none grants any access beyond reading.

Create the cluster role `<TABSDATA_CLUSTER_ROLE>` and bind it to the group `<TABSDATA_GROUP>`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: <TABSDATA_CLUSTER_ROLE>
rules:
  - apiGroups: [ "" ]
    resources: [ "namespaces", "services", "nodes" ]
    verbs: [ "get", "list" ]
  - apiGroups: [ "karpenter.sh" ]
    resources: [ "nodepools" ]
    verbs: [ "get", "list" ]
```

Finally, provide a `<KUBECONFIG>` file to the Tabsdata operator so the installation steps below can reach the cluster.

#### Verify your permissions

(Tabsdata admin)

Run these checks with the `<KUBECONFIG>` you were given, before going any further.

```bash
kubectl auth can-i create deployments.apps
kubectl auth can-i create cronjobs.batch
kubectl auth can-i create secrets
kubectl auth can-i create services
kubectl auth can-i create roles.rbac.authorization.k8s.io
kubectl auth can-i create serviceaccounts
kubectl auth can-i get pods/log
kubectl auth can-i deletecollection pods
kubectl auth can-i deletecollection deployments.apps
kubectl auth can-i deletecollection jobs.batch
kubectl auth can-i deletecollection cronjobs.batch
kubectl auth can-i create pods/portforward
kubectl auth can-i create ingresses.networking.k8s.io
kubectl auth can-i create poddisruptionbudgets.policy
kubectl auth can-i list namespaces
kubectl auth can-i list services --all-namespaces
kubectl auth can-i list nodes
kubectl auth can-i list nodepools.karpenter.sh
```

Every command must answer `yes`. If any command fails or answers `no`, check with your AWS EKS administrator before proceeding.

### Tabsdata database

(RDS admin)

Tabsdata stores its own state and the metadata for user data in PostgreSQL.

Create an **AWS RDS for PostgreSQL** 18.4 instance with a database `<TABSDATA_DATABASE>`, using password authentication with `<RDS_USERNAME>` and `<RDS_PASSWORD>`.

`<RDS_USERNAME>` must have the following permissions:

| Requirement | Kind | Statement |
| --- | --- | --- |
| `CONNECT` on `<TABSDATA_DATABASE>` | privilege | `GRANT CONNECT ON DATABASE <TABSDATA_DATABASE> TO <RDS_USERNAME>;` |
| `CREATEROLE` | role attribute | `ALTER ROLE <RDS_USERNAME> CREATEROLE;` |
| `CREATE` on `<TABSDATA_DATABASE>` | privilege | `GRANT CREATE ON DATABASE <TABSDATA_DATABASE> TO <RDS_USERNAME>;` |

The RDS master username already satisfies all three, and owns any database it creates.

The Tabsdata installation will create the necessary database schemas, roles and grants.

#### What the installation creates

(RDS admin)

One schema per Tabsdata component, inside `<TABSDATA_DATABASE>`:

| Schema | Component |
| --- | --- |
| `<TABSDATA_DATABASE>_apiserver` | API server |
| `<TABSDATA_DATABASE>_aiagent` | AI agent |

Each schema holds that component's tables, indexes, views, triggers, row-level-security policies and baseline data.

Three PostgreSQL roles. Roles are cluster-global, so their names must be unique across the whole RDS instance, which is why they derive from `<TABSDATA_DATABASE>`:

| Role | Login | Password | Owns |
| --- | --- | --- | --- |
| `<TABSDATA_DATABASE>_apiserver` | `LOGIN` | generated automatically | the API server schema |
| `<TABSDATA_DATABASE>_aiagent` | `LOGIN` | generated automatically | the AI agent schema |
| `<TABSDATA_DATABASE>_app` | `NOLOGIN` | none | nothing |

The two login roles are the identities Tabsdata authenticates as, one per component. Their passwords are generated and set automatically during installation.

`<TABSDATA_DATABASE>_app` is the role every Tabsdata connection then switches to, and the one row-level security is enforced against. It is shared by both components, owns nothing, and cannot be reached directly: it has no login and no password, and is used only internally by Tabsdata.

### Tabsdata cloud storage

(S3 admin)

Tabsdata uses AWS S3 bucket(s) for data storage.

You need an S3 bucket `<S3_BUCKET>` in region `<S3_REGION>`, and full-access credentials for it: `<S3_ACCESS_KEY>` and `<S3_SECRET_KEY>`.

### Configure access from outside the cluster (over HTTPS)

(EKS admin)

note

None of this applies to local access via `kubectl port-forward`, as described in [Install Tabsdata on AWS EKS](#overview).

Once installed, Tabsdata is running inside the cluster, but is not reachable from outside it.

Public access is delivered by two AWS components layered on the cluster. In EKS, the apiserver Service is fronted by an `alb`\-class Ingress, which the AWS Load Balancer Controller turns into an internet-facing Application Load Balancer targeting pod IPs, so the controller must already be installed with an IAM role permitting ELBv2 management, and the VPC's public subnets must carry the `kubernetes.io/role/elb` tag in every availability zone in use. That ALB listens on HTTP only, and its security group is locked to the AWS-managed CloudFront origin-facing prefix list (read from EC2), so it is not reachable directly.

In front of it, a CloudFront distribution uses the ALB as a custom origin and serves viewers over HTTPS on its own `*.cloudfront.net` hostname, which is why no Route 53 record or ACM certificate is needed. Deployment of the distribution takes five to ten minutes; after that the instance answers only through CloudFront.

Use the distribution's `*.cloudfront.net` URL as `<TABSDATA_PUBLIC_URL>`, and point your browser at it.
