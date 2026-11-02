# User Interface

> Tabsdata web UI pages for the Overview, Projects, Collections, Functions, Tables, Executions, Worker logs, Triggers, Search, Tabby, Security, System, and Account, plus the local URL and demo.

Source: https://docs.tabsdata.com/guide/user-interface

The Tabsdata **User Interface** (UI) is a web interface for inspecting and managing the resources within a Tabsdata Server.

When running Tabsdata locally, the UI is available at `http://localhost:2457`, where `2457` is the Server's default public port. Sign in using the same username and password used with the `tdk` CLI.

The UI demo provides a read-only Tabsdata Server with three Projects and existing execution history. Actions that create, modify, trigger, or delete resources are disabled.

[Explore the UI](https://docs.tabsdata.com/ui-demo/)

## Overview

The **Overview** page summarizes activity across every Project in the Server.

For each Project, the page shows:

-   Tables committed
-   Rows committed
-   Running Executions
-   Warnings
-   Errors

Activity can be viewed across six time ranges.

## Projects

The **Projects** page shows activity for the selected Project, including data that is currently in flight and data that has already been committed.

The page also includes a graph of committed data over time.

From the UI, you can:

-   Create Projects
-   Share Projects
-   Switch the currently selected Project

Most pages in the UI are scoped to the selected Project. Use the Project selector in the side panel to switch between Projects.

## Collections

The **Collections** page lists the Collections within the selected Project.

Opening a Collection shows its:

-   Functions
-   Tables
-   Connection configuration

Sensitive credentials stored in a Connection are hidden from the UI.

From the UI, you can also:

-   Create, edit, and delete Collections
-   Grant a Collection access to Tables in another Collection
-   Remove previously granted access

## Functions

Opening a **Function** shows the code registered with Tabsdata and its version history.

Function versions are retained so you can inspect previous versions, including the version used for a particular Function Run.

From the UI, you can:

-   Trigger a Function
-   Delete a Function

Editing a Function's code is performed using `tdk` rather than through the UI.

## Tables

Opening a **Table** shows its schema, sample rows, and version history.

Each Table version includes the Execution that wrote it, allowing changes in the Table to be traced back to the Execution that produced them.

The Table page also includes **Run SQL query**, which lets you edit and run a SQL query against the Table's sample data.

From the UI, you can also delete a Table.

## Executions

The **Executions** page shows the Execution Plans created within the selected Project.

Execution Plans are separated into:

-   Active
-   Issues
-   Finished

Opening an Execution Plan shows a graph of its execution flow and provides access to the Transactions, Function Runs, and Workers created as part of the Execution.

Transactions, Function Runs, and Workers can each be filtered by status.

### Worker logs

Opening a Worker provides access to the logs produced while it was running.

Worker logs can be:

-   Viewed in the UI
-   Viewed in their raw form
-   Downloaded

When a Function Run fails, its Worker logs contain the output and errors produced during execution.

### Triggers

The Executions area also shows the triggers configured for the Project, including:

-   Cron Triggers
-   Stream Sources

This lets you inspect both what causes Functions to run and the Execution Plans created when they run.

## Search

The **Search** page searches for resources across the Tabsdata Server.

Use Search to locate a resource without navigating through its Project and Collection.

## Tabby

**Tabby** is the built-in Tabsdata agent for interacting with and inspecting a Tabsdata Server. See [Tabby](https://docs.tabsdata.com/guide/tabby) for setup, commands, and an example chat.

Tabby requires an Anthropic or OpenAI API key to be configured on the Server.

From Tabby, you can:

-   Start a new chat
-   Continue existing chats
-   Stop a response while it is being generated
-   Search previous messages
-   Export a chat as Markdown
-   Use page-specific suggested prompts
-   Run a Server health check

Suggested prompts depend on the page you are viewing. For example, a Collection page may include prompts for listing Functions or creating a Publisher.

The **Run health check** action generates an AI-written report about the current health of the Server.

## Security

The **Security** page manages users, roles, and permissions for the Tabsdata Server.

From the UI, you can:

-   Create, edit, and delete users
-   Create and delete roles
-   Add users to roles
-   Remove users from roles
-   Grant permissions
-   Remove permissions

## System

The **System** page shows the status and runtime information for the Tabsdata Server.

## Account

The **Account** page shows information about the currently signed-in user.

From the UI, you can also:

-   Change your password
-   Log out
-   Switch between light and dark themes
-   Pin resources to the side panel
-   Clear pinned resources

The Server's SSL certificate can also be downloaded from the login page.
