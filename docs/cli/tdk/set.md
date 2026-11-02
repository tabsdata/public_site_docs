# tdk set

> Give a setting a value.

Source: https://docs.tabsdata.com/cli/tdk/set

Give a setting a value.

Settings are persisted in 'options.json' under the Tabsdata directory ('~/.tabsdata') -- or in '<NAME>-options.json' under a profile -- and apply to every later invocation; 'tdk unset' drops them back to their default and 'tdk settings' shows them. More than one can be set at once.

Examples:

```bash
tdk set --hints false
tdk set --prompt false
tdk set --server http://127.0.0.1:2457
tdk set --server 127.0.0.1              # http://127.0.0.1:2457
tdk set --proj sales
tdk set --proj sales --coll orders
tdk set --profile dev                   # default profile for commands
tdk set --profile dev --server dev-host # ...and dev's server
```

```bash
tdk set \
  --hints true \
  --prompt true \
  --server https://tabsdata.example.com \
  --proj quickstart \
  --coll sales_data \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--hints` | true \| false | Optional | Show the hints the CLI adds to errors. Default: true. |
| `--prompt` | true \| false | Optional | Prompt for a value a command needs but was not given. Default: true; 'tdk set --prompt false' is the standing form of the root '--no-prompt' flag. |
| `--server` | string | Optional | URL of the Tabsdata Server 'tdk login' uses without '--server'. If omitted, the protocol defaults to 'http://' and the port to 2457. |
| `--proj, -P` | string | Optional | Project to pin as the default of project-scoped commands. |
| `--coll, -c` | string | Optional | Collection to pin (requires a pinned project). |
| `--profile` | string | Optional | Profile commands run under when given no --profile: their connection and settings come from '<NAME>-connection.json' and '<NAME>-options.json'. Recorded in 'profile.json'. The other settings of this command are stored in that profile. |
