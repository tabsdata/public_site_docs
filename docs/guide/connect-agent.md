# Configure Your AI Agent

> Install the Tabsdata skill so a coding agent works with Tabsdata through tdk in its own shell, then log in so the agent acts through your session.

Source: https://docs.tabsdata.com/guide/connect-agent

Tabsdata provides a skill that enables your AI agent to use the `tdk` CLI for development. Supported agents are Claude Code, Codex, Cursor, VS Code, Gemini CLI and Antigravity. Your AI Agent can use Tabsdata's CLI without the skill installation, but the skill file provides the available commands for an easier experience.

Step 1Install the Tabsdata skill

After installing `tabsdata` from [Install Tabsdata](https://docs.tabsdata.com/guide/install), install the Tabsdata skill files into your shared agents folder. You can also ask your agent to do this step for you:

```bash
tdk ai agents install
```

Step 2Log in to the Tabsdata Server

Use the password you have configured for the `--password` flag

```bash
tdk login --server http://127.0.0.1:2457 --user admin --password tabsdata
```

Step 3Use you AI Agent for building Tabsdata Workflows

Once your session is logged in, your agents are able to connect to Tabsdata through the CLI.

Next: [Run Your First Data Integration](https://docs.tabsdata.com/guide/run-your-first-data-integration)
