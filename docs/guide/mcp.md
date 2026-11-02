# MCP

> The MCP page covers the `python -m tabsdatak.ag.mcp -` proxy command, its use of `tdk login` sessions, the `/ai-agent/proxy/mcp` endpoint on port 2459, and the API key and connection troubleshooting steps.

Source: https://docs.tabsdata.com/guide/mcp

The **Model Context Protocol (MCP) Server** lets an external AI agent work with your Tabsdata Server. An agent can inspect resources, write and register Functions, query Tables, and investigate failed executions. Claude Code and Codex connect to it through the `tabsdata-agent` package.

The MCP Server and [Tabby](https://docs.tabsdata.com/guide/tabby) share the same tools. Tabby is the chat in the Tabsdata UI; MCP makes those tools available to the agent you use in your terminal or editor.

## Working with Tabsdata

The MCP Server gives the agent access to:

-   **Resources**: Projects, Groups, Collections, Connections, Functions, and Tables.
-   **Data**: Table schemas, data versions, and queries against published data.
-   **Executions**: Execution Plans, Transactions, Function Runs, and logs for diagnosing failures.
-   **Reference**: SDK documentation, connector information, and code examples for writing Functions.
-   **Skills**: instructions for tasks such as creating a data flow or fixing an execution.

The agent searches for the tools and skills it needs as it works. For example, you can ask it to list the Tables in a Collection, inspect a failed Function Run, or build a Publisher from a database table.

## Connection

Your agent starts a local MCP proxy with:

```bash
python -m tabsdatak.ag.mcp -
```

The trailing `-` selects standard input and output as the transport between the agent and the proxy. This command belongs in the agent's MCP configuration. See [Connect to MCP](https://docs.tabsdata.com/guide/connect-agent) for the installation commands.

The proxy reads the Server address and session saved by `tdk login`, then forwards requests to the Server's `/ai-agent/proxy/mcp` endpoint over HTTP. The agent uses your Tabsdata session and has your permissions.

The proxy reads the session again on each request. If your login expires or you switch Servers, run `tdk login` again. The next request uses the new session without restarting the proxy.

## Server requirements

The MCP Server runs in the same AI agent service as Tabby, on port `2459` by default. That service must be running before an external agent can use its tools.

An Anthropic or OpenAI API key must be set when the Server is created for the AI agent service to start. MCP itself does not need a valid LLM key, so a placeholder is sufficient when only using an external agent. Tabby requires a valid key. See [Tabby requirements](https://docs.tabsdata.com/guide/tabby#requirements) for setting or changing it.

## Connection problems

If the agent cannot reach Tabsdata, check that the Server and its AI agent service are running. If the session is no longer valid, log in again and retry the request.

If Python cannot find `tabsdatak.ag.mcp`, install `tabsdata-agent` in the environment used by the agent's MCP command.
