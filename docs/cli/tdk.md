# tdk

> Every tdk command, generated from the CLI itself.

Source: https://docs.tabsdata.com/cli/tdk/

`tdk` is the command-line client for Tabsdata.

| Group | Commands |
| --- | --- |
| [Auth](https://docs.tabsdata.com/cli/tdk/auth/) | `add-cert`, `delete-cert`, `info`, `password-change`, `service-token-create`, `service-token-list`, `service-token-revoke` |
| [Projects](https://docs.tabsdata.com/cli/tdk/project/) | `create`, `delete`, `get`, `graph`, `list`, `secrets`, `tag-delete`, `tag-keys`, `tag-list`, `tag-set`, `tag-values`, `topology-list`, `update` |
| [Collections](https://docs.tabsdata.com/cli/tdk/collection/) | `create`, `delete`, `get`, `list`, `tag-delete`, `tag-list`, `tag-set`, `update` |
| [Groups](https://docs.tabsdata.com/cli/tdk/group/) | `create`, `delete`, `get`, `list`, `tag-delete`, `tag-list`, `tag-set`, `update` |
| [Connections](https://docs.tabsdata.com/cli/tdk/connection/) | `check`, `entities`, `get`, `list`, `probe`, `refresh`, `sample`, `template`, `types`, `validate` |
| [Functions](https://docs.tabsdata.com/cli/tdk/fn/) | `bundle`, `check`, `delete`, `disable`, `enable`, `get`, `list`, `patch`, `patches`, `register`, `tag-delete`, `tag-list`, `tag-set`, `trigger`, `update` |
| [Function Runs](https://docs.tabsdata.com/cli/tdk/fnrun/) | `diagnose`, `get`, `list`, `logs`, `recover`, `replay` |
| [Plans](https://docs.tabsdata.com/cli/tdk/plan/) | `cancel`, `diagnose`, `get`, `list`, `logs`, `monitor`, `recover` |
| [Transactions](https://docs.tabsdata.com/cli/tdk/trx/) | `cancel`, `get`, `list`, `logs`, `monitor`, `recover` |
| [Workers](https://docs.tabsdata.com/cli/tdk/worker/) | `list`, `logs`, `recover` |
| [Tables](https://docs.tabsdata.com/cli/tdk/table/) | `data`, `delete`, `diff`, `download`, `flow`, `list`, `profile`, `schema`, `stats`, `tag-delete`, `tag-list`, `tag-set`, `versions` |
| [Streams](https://docs.tabsdata.com/cli/tdk/stream/) | `disable`, `enable`, `list`, `plans` |
| [Crons](https://docs.tabsdata.com/cli/tdk/cron/) | `disable`, `enable`, `list`, `plans` |
| [Permissions](https://docs.tabsdata.com/cli/tdk/permission/) | `grant`, `list`, `revoke` |
| [Users](https://docs.tabsdata.com/cli/tdk/user/) | `create`, `delete`, `get`, `list`, `update` |
| [Metrics](https://docs.tabsdata.com/cli/tdk/metrics/) | `inflight`, `show` |
| [Examples](https://docs.tabsdata.com/cli/tdk/examples/) | `extract`, `list`, `path`, `scaffold`, `show` |
| [Info](https://docs.tabsdata.com/cli/tdk/info/) | `license`, `release-notes`, `third-party` |
| [ai](https://docs.tabsdata.com/cli/tdk/ai/) | `agents-install`, `agents-status`, `agents-uninstall`, `load-skill` |
| [docs](https://docs.tabsdata.com/cli/tdk/docs/) | `list`, `search`, `show` |

## Standalone commands

| Command | Description |
| --- | --- |
| [`about`](https://docs.tabsdata.com/cli/tdk/about) | Show build metadata and system information |
| [`doctor`](https://docs.tabsdata.com/cli/tdk/doctor) | Check that this machine is ready to develop and register functions. |
| [`login`](https://docs.tabsdata.com/cli/tdk/login) | Login to the Tabsdata Server |
| [`logout`](https://docs.tabsdata.com/cli/tdk/logout) | Logout from the Tabsdata Server: the login stored here always goes; the |
| [`set`](https://docs.tabsdata.com/cli/tdk/set) | Give a setting a value. |
| [`settings`](https://docs.tabsdata.com/cli/tdk/settings) | Show the current settings: the global ones, and the pinned project and |
| [`shell`](https://docs.tabsdata.com/cli/tdk/shell) | Start an interactive shell session |
| [`status`](https://docs.tabsdata.com/cli/tdk/status) | Check the status of the server |
| [`unset`](https://docs.tabsdata.com/cli/tdk/unset) | Drop a setting back to its default. |
