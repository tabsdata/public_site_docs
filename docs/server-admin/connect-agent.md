# Configure Your AI Agent

> Install the Tabsdata skill for your coding agents with tdk ai agents install, then log in so each agent acts through your session.

Source: https://docs.tabsdata.com/server-admin/connect-agent

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

A coding agent uses Tabsdata through `tdk`, in its own shell, and the Tabsdata skill tells it when Tabsdata fits a task and how to use it. Supported agents are Claude Code, Codex, Cursor, VS Code, Gemini CLI and Antigravity.

Install the skill from the virtual environment that has `tabsdata[all]`. It is installed for every supported agent on the machine:

```bash
tdk ai agents install
```

`tdk ai agents status` shows where the skill is installed and for which agents, and `tdk ai agents uninstall` removes it. See [tdk ai agents install](https://docs.tabsdata.com/cli/tdk/ai/agents-install) for the options.

note

Upgrading from an earlier version of Tabsdata? Remove the old MCP connection with `claude mcp remove tabsdata` or `codex mcp remove tabsdata` before installing the skill.

The agent works through the session of the user who logs in, so it can only do what that user is authorized to do. Log in from your own terminal before starting the agent:

```bash
tdk login --server http://127.0.0.1:2457 --user admin --password tabsdata
```
