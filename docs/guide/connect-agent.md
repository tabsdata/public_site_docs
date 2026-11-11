# Configure Your AI Agent

> Install the Tabsdata skill so a coding agent works with Tabsdata through tdk in its own shell, then log in so the agent acts through your session.

Source: https://docs.tabsdata.com/guide/connect-agent

Tabsdata provides a skill that enables your AI agent to use the `tdk` CLI for development. Supported agents are Claude Code, Codex, Cursor, VS Code, Gemini CLI and Antigravity. Your AI Agent can use Tabsdata's CLI without the skill installation, but the skill file provides the available commands for an easier experience.

Step 1Install the Tabsdata skill

After installing `tabsdata[all]` from [Install Tabsdata](https://docs.tabsdata.com/guide/install), install the Tabsdata skill files into your shared agents folder. You can also just ask your agent to do this step for you:

```bash
tdk ai agents install
```

The skill is installed for every supported agent on the machine. See [tdk ai agents install](https://docs.tabsdata.com/cli/tdk/ai/agents-install) for its options.

note

Upgrading from an earlier version of Tabsdata? Remove the old MCP connection with `claude mcp remove tabsdata` or `codex mcp remove tabsdata`, then follow this step.

Step 2Log in to the Tabsdata Server

Use the password you have configured for the `--password` flag

```bash
tdk login --server http://127.0.0.1:2457 --user admin --password tabsdata
```

Step 3Use you AI Agent for building Tabsdata Workflows

Start your agent and describe what you need.

```bash
claude
```

Next: [Run Your First Data Integration](https://docs.tabsdata.com/guide/run-your-first-data-integration)
