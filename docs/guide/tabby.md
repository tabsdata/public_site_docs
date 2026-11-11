# Tabby

> The built-in operational agent, opened from the UI. It answers questions about the server's resources, monitors dataflows, traces failures to root cause and suggests fixes, and, when the server allows it, creates and changes resources on request. It runs in the server's AI agent service (port 2459) and needs an Anthropic or OpenAI key, set with `tdkserver quickstart --config anthropic-key=env:ANTHROPIC_API_KEY`.

Source: https://docs.tabsdata.com/guide/tabby

**Tabby** is the built-in Tabsdata agent, opened from the **Tabby** page of the [User Interface](https://docs.tabsdata.com/guide/user-interface). Tabby answers questions about the resources on a Tabsdata Server and, when the Server allows it, creates and changes them on request.

Tabby

Did any execution plans fail in customer\_management?

No. The 10 most recent execution plans in customer\_management all finished, and each one committed 5 function runs with no errors. The three latest:

| Execution plan | Triggered by | Status | Duration |
| --- | --- | --- | --- |
| ep20260924-14 | salesforce/ingest\_opportunities | Finished | 11s |
| ep20260924-13 | salesforce/ingest\_leads | Finished | 12s |
| ep20260924-12 | salesforce/ingest\_customers | Finished | 12s |

Each plan runs the Salesforce ingest for one entity, then its bronze, silver, and gold transformers and the Snowflake load.

anthropic claude-sonnet-4-6

Ask anything about your data flows… (⌘K)

↑

The UI demo includes the Tabby page. Messages cannot be sent from the demo.

[Open Tabby in the UI demo](https://docs.tabsdata.com/ui-demo/tabby)

## Requirements

Tabby runs in the Server's AI agent service, on port `2459` by default, and requires an Anthropic or OpenAI API key. When no key is configured, the Server starts without the AI agent service and Tabby is unavailable.

The key is set when the instance is created, with `--config anthropic-key=…` or `--config openai-key=…`:

```bash
tdkserver quickstart --config anthropic-key=env:ANTHROPIC_API_KEY
```

To add or change the key on an existing instance, download the instance's config, set `api_key` under `ai_providers.anthropic` or `ai_providers.openai` in `aiagent.yaml`, and apply the change:

```bash
tdkserver config get --with-secrets
tdkserver config put --apply
```

note

Tabby runs in the Server's AI Agent process, on port `2459`. The process starts only when an API key is provided during server initialization, and Tabby needs that key to be valid.

## Starting a chat

Open **Tabby** from the side navigation, or press **⌘K** from any page to ask Tabby about the page you are viewing.

A new chat offers four starting prompts:

-   Set up a data flow
-   Connect to an external system
-   Check executions health
-   Show me what Tabsdata can do

Other pages suggest prompts for what they show. A Collection page, for example, suggests listing its Functions, listing its Tables, and creating a Publisher.

## Commands

Commands are typed into the message box.

| Command | Description |
| --- | --- |
| `/help` | Show available commands |
| `/new` | Start a new conversation |
| `/clear` | Clear the current conversation |
| `/export` | Export the conversation as Markdown |
| `/models` | List available providers and models |
| `/provider <name>` | Switch AI provider |
| `/model <name>` | Switch to a specific model, by full or partial name |
| `/health` | Show agent health and status |
| `/pop [name]` | Open resources from the conversation in new tabs, or one resource by name |

The provider and model can also be switched from the selector above the message box.

## Managing chats

Chats are stored on the Server and can be continued later.

From a chat, you can:

-   Search the chat's messages
-   Export the chat as Markdown
-   Stop a response while it is being generated
-   Retry a response that failed

## Building custom connectors

Tabby can write a custom connector for a system that Tabsdata does not support natively. Tabby's reference includes the connector interface in `tabsdatak.spi`, and every connector installed on the Server, including custom ones, is part of what Tabby knows. Installing the connector remains a manual step. See [Custom Connectors](https://docs.tabsdata.com/guide/plugins).

## Changes to resources

Whether Tabby can create, change, or delete resources is set by `allow_writes` in the Server's `aiagent.yaml` config.
