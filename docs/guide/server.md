# Server

> What a Tabsdata server contains, how it runs workflows, and how clients connect to it.

Source: https://docs.tabsdata.com/guide/server

A **Tabsdata Server** is the top-level Tabsdata process deployed on a machine. It stores and manages Tabsdata resources, executes workflows, stores tabular data, and isolates Tabsdata processes from other processes running on the machine.

You can interact with a Server through the Tabsdata UI, the `tdk` CLI, or the Python API, and coding agents work with it through `tdk`.

## Resources in a Server

The main units of work within Tabsdata are **Functions**, which perform work on data, and **Tables**, which store data produced by Functions.

As the the top-level process Tabsdata, Servers store Functions and Tables as well as several organizational layers that nest functions and tables:

1.  **Projects** are the top-level workspaces within a Server. Projects isolate their resources and workflows from those in other Projects, allowing multiple teams or workflows to share a single Server without interfering with one another.
2.  **Groups** organize resources according to their role in a workflow. For example, a Project might have separate Groups for ingesting source data, cleaning data, and loading processed data.
3.  **Collections** define transaction boundaries for their Tables, determining how data is committed or rolled back during an execution. Collections are also credential stores that can provide Functions inside them with the credentials needed to connect to external systems.

[Server](https://docs.tabsdata.com/guide/server)

[Projects](https://docs.tabsdata.com/guide/projects)

[Groups](https://docs.tabsdata.com/guide/groups)

[Collections](https://docs.tabsdata.com/guide/collections)

[Functions](https://docs.tabsdata.com/guide/functions)[Connections](https://docs.tabsdata.com/guide/connections)[Tables](https://docs.tabsdata.com/guide/tables)

## Connecting to a Server

A Tabsdata server uses three dedicated endpoints when running:

-   A **public endpoint** runs on port `2457` by default. The Tabsdata UI, `tdk` CLI, and Python API use this endpoint to communicate with the Server.
-   A **private endpoint** runs on port `2458` by default. Tabsdata services use this endpoint for internal communication.
-   An **AI agent endpoint** runs on port `2459` by default. The Tabsdata Conversational agent, Tabby, uses this endpoint.

Using default port configuration, the default local URI for the public endpoint is:

`http://localhost:2457`

You can connect to a Server using several interfaces:

-   The **Tabsdata UI** provides a browser-based interface for managing resources, running workflows, and inspecting results.
-   The **`tdk` CLI** provides command-line access to the Server.
-   The **Python API** provides programmatic access from Python applications.
-   **Coding agents** work with the Server through `tdk`, guided by the Tabsdata skill.

## Managing a Server

The `tdkserver` CLI manages the Server lifecycle, including initializing, creating, starting, and stopping a Server.

See [Deploy Tabsdata on k-minus](https://docs.tabsdata.com/server-admin/kminus) for Quickstart and the complete local Server lifecycle. For a managed Kubernetes deployment, choose [AWS EKS](https://docs.tabsdata.com/server-admin/eks-install), [Azure AKS](https://docs.tabsdata.com/server-admin/aks-install), or [Google GKE](https://docs.tabsdata.com/server-admin/gke-install).

To connect an AI agent, see [Configure Your AI Agent](https://docs.tabsdata.com/server-admin/connect-agent).
