# Introduction

> Introduction to Tabsdata, an open-source Python data integration platform: deployment requirements, Python functions with Polars expressions, automatic DAG orchestration, data versioning, MCP integration, and connectors.

Source: https://docs.tabsdata.com/guide/introduction

Tabsdata is an open-source, distributed, horizontally scalable data integration platform that allows users to turn their Python functions into automated, AI-friendly workflows that move and transform data between a variety of different systems.

Built atop [Kubernetes](https://kubernetes.io/) and the [Polars](https://pola.rs/) DataFrame API, Tabsdata can be deployed on almost any machine that runs Python, requires no admin permissions or Docker dependency, and allows users to move and transform tabular data through an expression-based Pythonic interface.

Through Tabsdata's MCP integration, users can also use AI to build and analyze their workflows.

_Video: Leads data pipeline animation_

## Key Features

-   
-   
-   
-   
-   
-   
-   

Tabsdata can be deployed on almost any machine and requires only Python as a dependency.

See [Architecture Overview](https://docs.tabsdata.com/guide/architecture) for more detail on how these pieces fit together.

## Next steps

1.  [Install Tabsdata](https://docs.tabsdata.com/guide/install) -- get the server running locally.
2.  [Connect to MCP](https://docs.tabsdata.com/guide/connect-agent) -- point your LLM at the MCP server.
3.  [Run Your First Data Integration](https://docs.tabsdata.com/guide/run-your-first-data-integration) -- build a working flow end to end.

## LLM-friendly formats

The documentation is also published in [llms.txt format](https://llmstxt.org) for AI agents:

-   [llms.txt](https://docs.tabsdata.com/llms.txt): an index of the guide, tutorial and server administration pages, one line per page.
-   [llms-full.txt](https://docs.tabsdata.com/llms-full.txt): the full text of every page in that index, in one file of about 1 MB, which can exceed an agent's context window.

Any page is available as markdown at its URL with `.md` appended. This page, for example, is at [`/guide/introduction.md`](https://docs.tabsdata.com/guide/introduction.md).

## Community

You can join the Tabsdata community on [Github](https://www.github.com/tabsdata/tabsdata/) or [Slack](https://join.slack.com/t/tabsdata-community/shared_invite/zt-322toyigx-ZGFioMV2Gbza4bJDAR7wSQ).

## Contributing

We appreciate all contributions, from reporting bugs to implementing new features. You can access the Tabsdata Github repository [here](https://www.github.com/tabsdata/tabsdata/).

## License

For license information, see the [Tabsdata website](https://tabsdata.com/license).
