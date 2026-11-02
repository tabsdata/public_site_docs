# Delete a Function

> Explains how to delete a registered Tabsdata function, noting that its output tables remain and downstream functions are frozen rather than deleted.

Source: https://docs.tabsdata.com/tutorials/managing-functions/delete

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

[Connect to MCP](https://docs.tabsdata.com/guide/connect-agent)

[Register a Function](https://docs.tabsdata.com/tutorials/managing-functions/register)

AI agent session

❯delete the summarize function from reporting

Called tabsdata 2 times (ctrl+o to expand)

⏺

Deleted **summarize** from `reporting`. The tables it wrote are still there — deleting a function does not delete its tables.

⏺

Anything downstream that read from those tables is now frozen rather than deleted: it stays registered and stops running until it is re-registered against tables that still exist.
