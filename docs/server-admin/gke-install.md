# Install Tabsdata on Google GKE

> Installs Tabsdata on Google GKE with Cloud SQL for PostgreSQL and GCS: priority classes, node pools, tdkserver init/assess/create/start, GKE database and storage config.

Source: https://docs.tabsdata.com/server-admin/gke-install

## Before You Begin

This page assumes the Google Cloud resources below already exist: a GKE cluster, a Cloud SQL for PostgreSQL instance, a GCS bucket and a service account that can use the bucket.

## Overview

Tabsdata runs on Kubernetes as deployments containing an API server, AI agent, and supporting services within a single namespace. User functions execute as individual Kubernetes jobs that start, run, and exit. Table data resides in Google Cloud Storage (GCS) while metadata lives in Cloud SQL for PostgreSQL. This installation is performed by the Tabsdata administrator.

## Requirements

-   A Windows (x86), macOS (ARM64), or Linux (x86) client machine
-   Python 3.12.13 installed
-   `gcloud` with the `gke-gcloud-auth-plugin` component, and `kubectl`
-   Google GKE Kubernetes cluster with x86 nodes
-   Cloud SQL for PostgreSQL instance running version 18, in the same region and VPC as the GKE cluster, with a private IP
-   GCS bucket, preferably in the same region
-   A service account with read/write access to the bucket (for example `roles/storage.objectAdmin` on the bucket), and a JSON key for it
-   Network access between the GKE cluster and the Cloud SQL instance, and between the client and the GKE cluster

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

### Node Pools

The GKE configuration schedules pods by node label. Service pods are placed on nodes labeled `role=tabsdata-services`, function pods on nodes labeled `role=tabsdata-functions`. Function pods tolerate the `workload=batch:NoSchedule` taint, so the function pool can be reserved for them:

```text
gcloud container node-pools create tabsdata-services \
    --cluster <TABSDATA_CLUSTER> --region <GCP_REGION> --project <GCP_PROJECT> \
    --node-labels=role=tabsdata-services

gcloud container node-pools create tabsdata-functions \
    --cluster <TABSDATA_CLUSTER> --region <GCP_REGION> --project <GCP_PROJECT> \
    --node-labels=role=tabsdata-functions \
    --node-taints=workload=batch:NoSchedule
```

Size the machine types for the largest single pod (see the sizing appendix). To place pods differently, edit `placement.selectors` in `tabsdata.yaml` instead.

### Cluster Access

Fetch the cluster credentials into your kubeconfig:

```text
gcloud components install gke-gcloud-auth-plugin
gcloud container clusters get-credentials <TABSDATA_CLUSTER> --region <GCP_REGION> --project <GCP_PROJECT>
kubectl --kubeconfig <KUBECONFIG> config get-contexts
```

The context is named `gke_<GCP_PROJECT>_<GCP_REGION>_<TABSDATA_CLUSTER>`. Without the auth plugin on `PATH`, every `kubectl` call fails with a credentials error.

## Install Tabsdata Packages

From a machine with GKE cluster access, create a Python virtual environment and install:

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
| Cloud SQL for PostgreSQL | `<CLOUDSQL_HOST>` | Private IP of the Cloud SQL instance |
|  | `<CLOUDSQL_PORT>` | Port of the Cloud SQL instance (5432) |
|  | `<CLOUDSQL_INSTANCE>` | Cloud SQL instance ID |
|  | `<TABSDATA_DATABASE>` | Database for Tabsdata installation |
|  | `<CLOUDSQL_USERNAME>` | Connection username (for example `postgres`) |
|  | `<CLOUDSQL_PASSWORD>` | Connection password |
|  | `<CLOUDSQL_SERVER_CA_PEM>` | The instance's server CA certificate |
| GCS | `<GCS_BUCKET>` | Bucket for data storage |
|  | `<GCS_SERVICE_ACCOUNT_KEY>` | JSON key of a service account with full bucket access |
| Google GKE | `<GCP_PROJECT>` | Project of the cluster |
|  | `<GCP_REGION>` | Region of the cluster |
|  | `<TABSDATA_CLUSTER>` | Target cluster |
|  | `<TABSDATA_NAMESPACE>` | Empty reserved namespace |
|  | `<KUBECONFIG>` | Path to kubeconfig file |
| LLM Provider | `<OPENAI_API_KEY>` / `<ANTHROPIC_API_KEY>` | LLM API key if AI integration enabled |
| Chosen During Install | `<TABSDATA_INSTANCE>` | Tabsdata instance name |

### Cloud SQL Server CA

Cloud SQL signs each instance with a CA of its own, so there is no public bundle to download. Fetch the instance's certificate once:

```text
gcloud sql instances describe <CLOUDSQL_INSTANCE> --project <GCP_PROJECT> \
    --format='value(serverCaCert.cert)' > server-ca.pem
```

Tabsdata connects with `verify-ca`: the chain is verified, the host name is not. A Cloud SQL certificate names the instance, not its IP address, so `verify-full` against an IP would fail. If the instance's CA is rotated, update the certificate in the instance's configuration.

## Configure Tabsdata

### Prepare the Namespace

Create the namespace; `tdkserver` never creates one:

```text
kubectl --kubeconfig <KUBECONFIG> create namespace <TABSDATA_NAMESPACE>
```

### Prepare Configuration

```text
tdkserver init --instance <TABSDATA_INSTANCE> --provider gke --kubeconfig <KUBECONFIG> --namespace <TABSDATA_NAMESPACE>
```

This creates `~/.tabsdata/instances/<TABSDATA_INSTANCE>/` with configuration files to edit in `~/.tabsdata/instances/<TABSDATA_INSTANCE>/init/input/configs/`.

### Configure Database

Edit `dbmanager.database.yaml` with Cloud SQL information. Unlike EKS and AKS, GKE takes the server CA certificate inline, as `ssl_root_cert_pem`: paste the contents of `server-ca.pem` as a block, indented under the key:

```yaml
database_server:
  postgres:
    host: <CLOUDSQL_HOST>
    port: <CLOUDSQL_PORT>
    database: <TABSDATA_DATABASE>
    username: <CLOUDSQL_USERNAME>
    password: <CLOUDSQL_PASSWORD>
    ssl_mode: ${{system:tdk_database_ssl_mode}}
    ssl_root_cert_pem: |
      -----BEGIN CERTIFICATE-----
      MIIDfzCCAmegAwIBAgIBADANBgkqhkiG9w0BAQsFADB3MS0wKwYDVQQuEyQ...
      ...
      -----END CERTIFICATE-----
  pool:
    admin:
      min_connections: 1
      max_connections: 1
      acquire_timeout: 30
      max_lifetime: 1800
      idle_timeout: 30
      test_before_acquire: true
```

Use the instance's **private** IP as `<CLOUDSQL_HOST>`: it is the pods in the cluster that connect, not the client machine.

The `apiserver.database.yaml` file requires no editing; Tabsdata generates and sets credentials automatically for the `<TABSDATA_DATABASE>_apiserver` and `<TABSDATA_DATABASE>_aiagent` roles.

### Configure GCS Storage

Edit `apiserver.storage.yaml` with GCS details for three mounts (ROOT, BUNDLES, IMAGES). They can share the same bucket with different paths. The service account key is the JSON document itself, as a block:

```yaml
storage:
  mounts:
  - id: ROOT
    path: /
    uri: gs://<GCS_BUCKET>/root/
    options:
      google_service_account_key: |
        {
          "type": "service_account",
          "project_id": "<GCP_PROJECT>",
          "private_key_id": "...",
          "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
          "client_email": "<SERVICE_ACCOUNT>@<GCP_PROJECT>.iam.gserviceaccount.com",
          "client_id": "..."
        }
  - id: BUNDLES
    path: /bundles
    uri: gs://<GCS_BUCKET>/bundles/
    options:
      google_service_account_key: |
        <GCS_SERVICE_ACCOUNT_KEY>
  - id: IMAGES
    path: /images
    uri: gs://<GCS_BUCKET>/images/
    options:
      google_service_account_key: |
        <GCS_SERVICE_ACCOUNT_KEY>
```

**Warning:** GCS URIs must end with `/`.

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
| Cluster access | The program the kubeconfig runs to authenticate (`gke-gcloud-auth-plugin`) is present; the API server answers; the namespace exists |
| Operator rights | Your identity has the verbs an instance needs in the namespace |
| Scheduling | The priority classes `tabsdata-service` and `tabsdata-function` exist, the service one higher; a ready node carries the labels the service pods select; a node or pool can serve the function pods; a pool carries the taint the function pods tolerate |
| Database | The CA the pods verify against is in place; the database answers and accepts the credentials, over TLS; the role has `CREATEROLE` and `CREATEDB` and does not bypass row-level security; the role owns its database; the database holds no schemas from an earlier instance |
| Storage | Each mount carries the options its scheme takes; each bucket answers and accepts the credentials |
| Coherence | The package index the function environments use answers; no secret is both supplied and generated; the AI agent has a model it can call |

It exits 0 when nothing stands in the way of `create`, and 1 when a check failed or was skipped. Add `--explain` to print, after the report, what every check asks. Fix what it reports, then run it again.

**Note:** The database and bucket checks run from the client machine. A Cloud SQL instance only reachable on its private IP shows as a warning there, not a failure; wrong credentials still fail.

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

A pod stuck in `Pending` usually means no node carries the label its `placement.selectors` asks for (see Node Pools), or no node is large enough for its resources.

### Access Tabsdata

Use port forwarding for verification:

```text
kubectl port-forward --kubeconfig <KUBECONFIG> --namespace <TABSDATA_NAMESPACE> service/net-apiserver 2457:2457
```

Access at `http://127.0.0.1:2457`. Port 2457 is default; adjust if using a different base port.

**Note:** Port forwarding is for verification only. It is a single stream through the cluster's control plane and drops when the pods restart or the node behind it is replaced. Properly expose Tabsdata before production use.

### Log In

```text
tdk login --server <TABSDATA_URL> --user admin --password tabsdata
tdk status
```

### Post-Installation Cleanup

Delete local setup files containing sensitive credentials (the database password, the server CA and the service account key):

```text
rm -rf ~/.tabsdata/instances/<TABSDATA_INSTANCE>/init
rm server-ca.pem
```

## Expose Tabsdata Outside Cluster

The instance runs but is only accessible via port forwarding. Expose `service/net-apiserver` over HTTPS, for example with a GKE Ingress or Gateway and a Google-managed certificate, before production use.

## Next Steps

Run your first data integration per "Run Your First Data Integration" documentation.

## Appendix: Sizing Service and Function Pods

Configure sizing in the instance's `configs/tabsdata.yaml`. Service pods cover the instance components (API server, AI agent, embeddings, metadata); function pods cover per-execution pods. On GKE the placement selects nodes by the `role` label:

```yaml
pods:
  service:
    priority: tabsdata-service
    resources:
      cpu: "2"
      memory: 1Gi
      disk: 16Gi
    placement:
      selectors:
        role: tabsdata-services
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
      selectors:
        role: tabsdata-functions
      tolerations:
        - key: workload
          value: batch
          effect: NoSchedule
```

Set values based on actual component footprints and confirm node pools can satisfy the largest single pod. A tolerations list replaces the one Tabsdata would apply, so it must be complete. Use `tdkserver config get` and `tdkserver config put` to manage the file.
