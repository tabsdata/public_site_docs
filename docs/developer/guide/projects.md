# Projects

> How Projects organize and isolate resources within a Tabsdata Server.

Source: https://docs.tabsdata.com/developer/guide/projects

A **Project** is the top-level workspace inside a Tabsdata Server. Projects organize related workflows and their resources while isolating them from other Projects on the same Server.

This allows multiple teams to share a single Server without interfering with each other's work.

## Working in a Project

Most Tabsdata operations are performed within the context of a Project. You can set a default Project for the `tdk` CLI using:

```bash
tdk set --proj sales_analytics
```

The selected Project remains the default for subsequent commands. Commands that support the `--proj` option can target a different Project without changing the default.

## Managing Projects

Creating a Project establishes an empty workspace within an existing Server. Groups and Collections can then be created to organize the Functions and Tables that make up your workflows.

Deleting a Project removes the Project and its resources without affecting other Projects on the Server.

See [Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create), [Update a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/update), and [Delete a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/delete) for step-by-step instructions.
