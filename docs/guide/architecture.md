# Architecture Overview

> Tabsdata system architecture: resource layer (Functions, Tables) and execution layer (Execution Plans, Transactions, Function Runs), plus scalability, security, deployment providers, and AI integration.

Source: https://docs.tabsdata.com/guide/architecture

## System architecture

Tabsdata is a distributed, horizontally scalable system that runs on **Kubernetes** and can be deployed across a variety of Kubernetes providers. Tabsdata is organized into two conceptual layers: a **resource layer** and an **execution layer**.

The **resource layer** consists of objects that users create to establish the structure of a Tabsdata workflow. These include objects like Tables and Functions, which determine when a workflow runs, what data flows through it, and what work is applied to that data.

The **execution layer** consists of objects that Tabsdata creates when it reads and acts on resources from the resource layer. These objects make up the running workflow that performs work on data. This includes objects like Execution Plans, Transactions, and Function Runs.

[Server](https://docs.tabsdata.com/guide/server)

[Projects](https://docs.tabsdata.com/guide/projects)

Resource layer

-   [Groups](https://docs.tabsdata.com/guide/groups)
    
    -   [Collections](https://docs.tabsdata.com/guide/collections)
        
        -   [Functions](https://docs.tabsdata.com/guide/functions)
            
        -   [Connections](https://docs.tabsdata.com/guide/connections)
            
        -   [Tables](https://docs.tabsdata.com/guide/tables)
            

Execution layer

-   [Execution Plan](https://docs.tabsdata.com/guide/execution/execution-plans)
    
    -   [Transaction](https://docs.tabsdata.com/guide/execution/transactions)
        
        -   [Function Run](https://docs.tabsdata.com/guide/execution/function-runs)
            
            -   [Worker](https://docs.tabsdata.com/guide/execution/workers)
                

# Resource Layer

### Functions

Functions are Tabsdata's unit of work. A function performs a single discrete step of moving data between external systems and internal Tabsdata Tables. There are three types of Tabsdata Functions:

A **publisher** reads from an external system and writes into Tabsdata tables.

A **transformer** reads from Tabsdata tables and writes into new Tabsdata tables.

A **subscriber** reads from Tabsdata tables and writes out to an external system.

Data enters and leaves the server through functions

Database

postgres

Publisher

Tabsdata Server

Table

customers

Transformer

Table

customer\_orders

Subscriber

Warehouse

snowflake

### Tables

A unique feature of Tabsdata is that it has its own internal storage for all data produced by functions.

Tabsdata tables persistently store the data produced by functions. Every successful function run that returns data creates a new table version that sits alongside all previous versions of the table.

persons

Tabsdata›Collections›input›persons

### Schema

Table schema defines the structure of a table by listing its columns and their data types.

| Object | Type |
| --- | --- |
| first\_name | str |
| last\_name | str |
| age | i64 |
| nationality | str |
| city | str |

version

While Tabsdata tables share some similarities to database tables, they also have some key differences. Rather than requiring a predefined schema, each version inside a table carries its own, allowing a table's schema to evolve across versions. This not only makes Tabsdata resilient to schema drift, but also stores a lineage of the table's evolution for observability and debugging.

Table version history is available not only to users for viewing, but also to functions for ingestion. Functions can read historical table versions for use cases that require comparing historical data with incoming data.

## Execution Layer

Functions and tables declare how data should be moved. Tabsdata's reads these and builds the actual workflow that ingests, transforms, and loads your data.

### Execution Plans

Traditionally, as more steps are added to a data integration workflow, the more complex it is to orchestrate it.

Tabsdata does not have this issue. Function are declarative and declare their own dependencies. Any functions that write to tables used by other functions are upstream dependent to them. Any functions that use tables produced by other functions are downstream dependent to them.

When a Function is triggered, Tabsdata identifies its downstream dependencies and automatically builds an **Execution Plan**, a DAG (directed acytclic graph) that finds and executes all downstream dependencies.

Click any node to trace its dependencies

In addition to automatically orchestrating workflows, Execution plans record everything that occurs during execution, capturing metadata such as:

-   Execution start and stop time
-   Functions executed
-   Function code used
-   Tables read and written
-   Execution status
-   Execution logs

## Horizontal Scalability

Compute and storage are independently scalable. Each Function runs as an isolated process within the Server's Kubernetes cluster. Storage can be distributed across local file storage or cloud storage providers such as Amazon S3, Azure Blob Storage, and Google Cloud Storage.

## Security

Authorization uses a direct permission model, where permissions are assigned directly to users rather than through roles.

Credentials are stored separately from Functions in a secure credential store. This includes both Tabsdata's internal credentials and the credentials used by Connections to authenticate with external systems.

note

Even when credentials are provided inline through the CLI, Tabsdata automatically extracts and stores them in the credential store.

## Deployment

Tabsdata runs on **Linux** for production and **macOS** or **Windows** for development. The underlying Kubernetes can be deployed across several providers

-   **`kminus`**: A lightweight Kubernetes implementation that runs pods as native Python processes instead of Docker containers. The default provider for local development.
-   **`eks`**: Amazon Elastic Kubernetes Service (EKS).
-   **`aks`:** Azure Kubernetes Service
-   **`gke`**: Google Kubernetes Engine

## AI integration

Coding agents use your Tabsdata Server through the **`tdk` CLI**, in their own shell. The **Tabsdata skill** tells an agent when Tabsdata fits a task and how to use it, and before any work against a Server the agent loads that Server's own skills, so its instructions always match the Server it works on. See [Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent) to get started.

There are two ways to use AI in Tabsdata:

-   A **built-in agent** called Tabby for operational tasks within Tabsdata.
-   External coding agents, such as **Claude Code** and **Codex**, working through `tdk` with the Tabsdata skill.

## Community & contributing

[Community

Ask questions and talk with other users on Slack.

↗](https://join.slack.com/t/tabsdata-community/shared_invite/zt-322toyigx-ZGFioMV2Gbza4bJDAR7wSQ)[Contribute

Report bugs or open a pull request on GitHub.

↗](https://www.github.com/tabsdata/tabsdata/)[License

License terms for Tabsdata.

↗](https://tabsdata.com/license)
