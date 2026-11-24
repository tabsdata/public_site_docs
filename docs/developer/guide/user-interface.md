# User Interface

Source: https://docs.tabsdata.com/developer/guide/user-interface

The Tabsdata **User Interface** (UI) is a web interface for inspecting and managing the resources within a Tabsdata Server.

When running Tabsdata locally, the UI is available at `http://localhost:2457`, where `2457` is the Server's default public port. Sign in using the same username and password used with the `tdk` CLI.

## Projects

Opening a Project shows a graph of its data flow or its execution flow. Selecting a group, Collection, Table, Function or Execution shows its details in the panel on the right.

From a Project, you can:

-   Switch between the data flow and execution flow views
-   View a Collection's Tables, Functions and Connection
-   Inspect a Table's schema, versions, lineage and data quality
-   Run a SQL query against a Table's data
-   Read a Function's registered code
-   Share the Project with other users
-   Pin items for quick access

## Executions

From the **Executions** pages, you can:

-   Filter Executions, Transactions, Function Runs and Workers by status
-   Open an Execution to see the status of each run on its graph
-   Cancel or recover an Execution
-   Open a Worker's log
-   View cron triggers and stream sources

When a Function Run fails, its Worker logs contain the output and errors produced during execution.

## Tabby

**Tabby** is the built-in Tabsdata agent for interacting with and inspecting a Tabsdata Server. It requires an Anthropic or OpenAI API key to be configured on the Server. See [Tabby](https://docs.tabsdata.com/developer/guide/tabby) for setup, commands, and an example chat.

From Tabby, you can:

-   Ask about the Project you are viewing
-   Start a new conversation or continue a past one
-   Copy a conversation
-   Choose the model

## Search

**Search** finds Collections, Tables and Functions by name within a Project.

## Admin

From **Admin**, you can:

-   View the Server's users
-   Set a user's system permissions
-   Check the Server's status and version
-   View Executions and triggers across every Project

## Account

From **Account**, you can:

-   Change your password
-   Switch between light and dark themes
-   See your roles
-   Set the time zone dates are shown in
-   Create and revoke service tokens
-   Log out

A service token lets scripts and CI jobs act on your behalf. Clients send it in the `Authorization` header as a bearer token.
