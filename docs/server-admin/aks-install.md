# Install Tabsdata on Azure AKS

> Installs Tabsdata on Azure AKS: required Azure resources, priority classes, node pools, database and Blob storage configuration, tdkserver init/assess/create/start, and verification.

Source: https://docs.tabsdata.com/server-admin/aks-install

## Before You Begin

This page assumes the Azure resources below already exist: an AKS cluster, an Azure Database for PostgreSQL flexible server, and a storage account with a Blob container.

## Overview

Tabsdata runs on Kubernetes as deployments containing an API server, AI agent, and supporting services within a single namespace. User functions execute as individual Kubernetes jobs that start, run, and exit. Table data resides in Azure Blob Storage while metadata lives in Azure Database for PostgreSQL. This installation is performed by the Tabsdata administrator.

## Requirements

-   A Windows (x86), macOS (ARM64), or Linux (x86) client machine
-   Python 3.12.13 installed
-   The Azure CLI (`az`) and `kubectl`
-   Azure AKS Kubernetes cluster with x86 nodes
-   Azure Database for PostgreSQL **Flexible Server** running version 18, in the same region as AKS (Single Server is not supported)
-   Azure storage account with a Blob container, preferably in the same region
-   Network access between the AKS cluster and the flexible server (VNet integration or a private endpoint), and between the client and the AKS cluster

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

The AKS configuration schedules pods by node label. Service pods are placed on nodes labeled `role=tabsdata-services`, function pods on nodes labeled `role=tabsdata-functions`. Function pods tolerate the `workload=batch:NoSchedule` taint, so the function pool can be reserved for them:

```text
az aks nodepool add --subscription <AZ_SUBSCRIPTION> --resource-group <AZ_RESOURCE_GROUP> \
    --cluster-name <TABSDATA_CLUSTER> --name tdservices \
    --labels role=tabsdata-services

az aks nodepool add --subscription <AZ_SUBSCRIPTION> --resource-group <AZ_RESOURCE_GROUP> \
    --cluster-name <TABSDATA_CLUSTER> --name tdfunctions \
    --labels role=tabsdata-functions \
    --node-taints workload=batch:NoSchedule
```

Size the VM sizes for the largest single pod (see the sizing appendix). To place pods differently, edit `placement.selectors` in `tabsdata.yaml` instead.

### Cluster Access

Fetch the cluster credentials into your kubeconfig. Name the subscription explicitly: the cluster's subscription is not necessarily the one `az account show` reports.

```text
az aks get-credentials --subscription <AZ_SUBSCRIPTION> --resource-group <AZ_RESOURCE_GROUP> --name <TABSDATA_CLUSTER>
kubectl --kubeconfig <KUBECONFIG> config get-contexts
```

The context is named after the cluster, `<TABSDATA_CLUSTER>`. Its API server endpoint is a `*.azmk8s.io` host; check it with `kubectl --kubeconfig <KUBECONFIG> config view --minify -o jsonpath='{.clusters[0].cluster.server}'`.

## Install Tabsdata Packages

From a machine with AKS cluster access, create a Python virtual environment and install:

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
| Azure Database for PostgreSQL | `<AZPG_HOST>` | Host of the flexible server, `<server>.postgres.database.azure.com` |
|  | `<AZPG_PORT>` | Port of the flexible server (5432) |
|  | `<TABSDATA_DATABASE>` | Database for Tabsdata installation |
|  | `<AZPG_USERNAME>` | Administrator username (plain name, not `user@server`) |
|  | `<AZPG_PASSWORD>` | Connection password |
| Azure Blob Storage | `<AZ_STORAGE_ACCOUNT>` | Storage account name |
|  | `<AZ_STORAGE_ACCOUNT_KEY>` | Storage account access key |
|  | `<AZ_CONTAINER>` | Blob container for data storage |
| Azure AKS | `<AZ_SUBSCRIPTION>` | Subscription of the cluster |
|  | `<AZ_RESOURCE_GROUP>` | Resource group of the cluster |
|  | `<TABSDATA_CLUSTER>` | Target cluster |
|  | `<TABSDATA_NAMESPACE>` | Empty reserved namespace |
|  | `<KUBECONFIG>` | Path to kubeconfig file |
| LLM Provider | `<OPENAI_API_KEY>` / `<ANTHROPIC_API_KEY>` | LLM API key if AI integration enabled |
| Chosen During Install | `<TABSDATA_INSTANCE>` | Tabsdata instance name |

### Database TLS

Nothing to fetch. Azure signs flexible servers with a public root (DigiCert Global Root G2), which ships in the Tabsdata images; Tabsdata connects with `verify-ca` against it. If your server chains to a different root (Microsoft RSA Root CA 2017 on some servers), see [https://learn.microsoft.com/azure/postgresql/flexible-server/concepts-networking-ssl-tls](https://learn.microsoft.com/azure/postgresql/flexible-server/concepts-networking-ssl-tls).

## Configure Tabsdata

### Prepare the Namespace

Create the namespace; `tdkserver` never creates one:

```text
kubectl --kubeconfig <KUBECONFIG> create namespace <TABSDATA_NAMESPACE>
```

### Prepare Configuration

```text
tdkserver init --instance <TABSDATA_INSTANCE> --provider aks --kubeconfig <KUBECONFIG> --namespace <TABSDATA_NAMESPACE>
```

This creates `~/.tabsdata/instances/<TABSDATA_INSTANCE>/` with configuration files to edit in `~/.tabsdata/instances/<TABSDATA_INSTANCE>/init/input/configs/`.

### Configure Database

Edit `dbmanager.database.yaml` with the flexible server information. Leave `ssl_mode` and `ssl_root_cert` as they are; Tabsdata fills them:

```yaml
database_server:
  postgres:
    host: <AZPG_HOST>
    port: <AZPG_PORT>
    database: <TABSDATA_DATABASE>
    username: <AZPG_USERNAME>
    password: <AZPG_PASSWORD>
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

Use a host the pods in the cluster can reach: with VNet integration or a private endpoint, the server's private name resolves inside the VNet.

The `apiserver.database.yaml` file requires no editing; Tabsdata generates and sets credentials automatically for the `<TABSDATA_DATABASE>_apiserver` and `<TABSDATA_DATABASE>_aiagent` roles.

### Configure Azure Blob Storage

Edit `apiserver.storage.yaml` with Azure Blob details for three mounts (ROOT, BUNDLES, IMAGES). They can share the same container with different paths:

```yaml
storage:
  mounts:
  - id: ROOT
    path: /
    uri: az://<AZ_CONTAINER>/root/
    options:
      azure_storage_account_name: <AZ_STORAGE_ACCOUNT>
      azure_storage_account_key: <AZ_STORAGE_ACCOUNT_KEY>
  - id: BUNDLES
    path: /bundles
    uri: az://<AZ_CONTAINER>/bundles/
    options:
      azure_storage_account_name: <AZ_STORAGE_ACCOUNT>
      azure_storage_account_key: <AZ_STORAGE_ACCOUNT_KEY>
  - id: IMAGES
    path: /images
    uri: az://<AZ_CONTAINER>/images/
    options:
      azure_storage_account_name: <AZ_STORAGE_ACCOUNT>
      azure_storage_account_key: <AZ_STORAGE_ACCOUNT_KEY>
```

**Warning:** Azure Blob URIs must end with `/`.

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
| Cluster access | The program the kubeconfig runs to authenticate (`kubelogin`, when the cluster uses Microsoft Entra ID) is present; the API server answers; the namespace exists |
| Operator rights | Your identity has the verbs an instance needs in the namespace |
| Scheduling | The priority classes `tabsdata-service` and `tabsdata-function` exist, the service one higher; a ready node carries the labels the service pods select; a node or pool can serve the function pods; a pool carries the taint the function pods tolerate |
| Database | The CA the pods verify against is in place; the database answers and accepts the credentials, over TLS; the role has `CREATEROLE` and `CREATEDB` and does not bypass row-level security; the role owns its database; the database holds no schemas from an earlier instance |
| Storage | Each mount carries the options its scheme takes; each bucket answers and accepts the credentials |
| Coherence | The package index the function environments use answers; no secret is both supplied and generated; the AI agent has a model it can call |

It exits 0 when nothing stands in the way of `create`, and 1 when a check failed or was skipped. Add `--explain` to print, after the report, what every check asks. Fix what it reports, then run it again.

**Note:** The database and bucket checks run from the client machine. A flexible server only reachable inside the VNet shows as a warning there, not a failure; wrong credentials still fail.

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

**Note:** Port forwarding is for verification only. It is a single stream through the cluster's `konnectivity-agent`, and on AKS it drops when node autoprovisioning replaces the node that agent runs on (`error: lost connection to pod`); restart it when that happens. Properly expose Tabsdata before production use.

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

The instance runs but is only accessible via port forwarding. Expose `service/net-apiserver` over HTTPS, for example with the Application Gateway for Containers or an ingress controller and a TLS certificate, before production use.

## Next Steps

Run your first data integration per "Run Your First Data Integration" documentation.

## Appendix: Sizing Service and Function Pods

Configure sizing in the instance's `configs/tabsdata.yaml`. Service pods cover the instance components (API server, AI agent, embeddings, metadata); function pods cover per-execution pods. On AKS the placement selects nodes by the `role` label:

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
