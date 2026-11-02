# Connect to MCP

> Registers the Tabsdata MCP server (tabsdata-agent) with Claude Code or Codex using `claude mcp add` or `codex mcp add`, with shell-specific commands for Linux, macOS, PowerShell, and cmd.exe.

Source: https://docs.tabsdata.com/server-admin/connect-agent

Before you begin

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install)

Tabsdata's agentic workflow uses an MCP server so a coding agent builds and runs your workflows for you. Install it into your agent before deploying a server. Claude Code and Codex are currently supported.

Start the agent from a shell whose virtual environment has Tabsdata installed.

note

The MCP server needs `tabsdata-agent`, which ships as its own package and is not yet pulled in by `tabsdata[all]`. Install it if you have not done so yet:

-   uv
-   pip

```bash
uv pip install tabsdata-agent
```

```bash
pip install tabsdata-agent
```

[Install Tabsdata](https://docs.tabsdata.com/server-admin/install) covers this as part of the full install, so skip this if you followed that page.

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
