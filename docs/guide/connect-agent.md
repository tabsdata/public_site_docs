# Connect to MCP

> Installs the tabsdata-agent package and registers the Tabsdata MCP Server with Claude Code or Codex, with per-shell commands for Linux, macOS, and Windows.

Source: https://docs.tabsdata.com/guide/connect-agent

Connect your coding agent to the [Tabsdata MCP Server](https://docs.tabsdata.com/guide/mcp) to build and run data workflows. Claude Code and Codex are currently supported.

Step 1Install the Tabsdata MCP package

Install `tabsdata-agent` in the virtual environment containing `tabsdata[all]` from [Install Tabsdata](https://docs.tabsdata.com/guide/install).

-   uv
-   pip

```bash
uv pip install tabsdata-agent
```

```bash
pip install tabsdata-agent
```

Step 2Connect your agent to MCP

Start the agent from a shell whose virtual environment has Tabsdata installed.

-   Claude Code
-   Codex

```bash
claude mcp add tabsdata -- python -m tabsdatak.ag.mcp -
```

-   Linux / macOS
-   Windows PowerShell
-   Windows cmd.exe

```bash
codex mcp add tabsdata -- "$(python -c 'import sys; print(sys.executable)')" -m tabsdatak.ag.mcp -
```

```powershell
codex mcp add tabsdata -- (python -c "import sys; print(sys.executable)") -m tabsdatak.ag.mcp -
```

```bat
for /f "delims=" %i in ('python -c "import sys; print(sys.executable)"') do codex mcp add tabsdata -- "%i" -m tabsdatak.ag.mcp -
```

Step 3Use the agent

You need an active session with the Tabsdata server before starting your agent. Log in, then start it from the same terminal:

-   Claude Code
-   Codex

```bash
tdk login --server localhost --user admin --password tabsdata
claude
```

```bash
tdk login --server localhost --user admin --password tabsdata
codex
```

The agent authenticates through your session, so it can only do what you're authorized to do. The Server's AI agent service must be running. See [MCP Server requirements](https://docs.tabsdata.com/guide/mcp#server-requirements).

Next: [Run Your First Data Integration](https://docs.tabsdata.com/guide/run-your-first-data-integration)
