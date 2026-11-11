# tdk set

> Give a setting a value.

Source: https://docs.tabsdata.com/cli/tdk/set

Give a setting a value.

Settings apply to every later invocation. The pinned project and collection are per profile: they belong to the profile the command runs under. Every other setting is global: one value for all profiles. 'tdk unset' drops them back to their default and 'tdk settings' shows them. More than one can be set at once.

Examples:

```bash
tdk set --hints false
tdk set --prompt false
tdk set --trigger-wait false            # fn trigger returns at once
tdk set --server http://127.0.0.1:2457
tdk set --server 127.0.0.1              # http://127.0.0.1:2457
tdk set --proj sales
tdk set --proj sales --coll orders
tdk set --profile dev                   # default profile for commands
tdk set --profile dev --proj sales      # ...and pin dev's project
```

```bash
tdk set \
  --format table \
  --hints true \
  --prompt true \
  --trigger-wait trigger_wait-example \
  --server https://tabsdata.example.com \
  --proj quickstart \
  --coll sales_data \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--hints` | true \| false | Optional | Show the hints the CLI adds to errors. Default: true. Global. |
| `--prompt` | true \| false | Optional | Prompt for a value a command needs but was not given. Default: true; 'tdk set --prompt false' is the standing form of the root '--no-prompt' flag. Global. |
| `--trigger-wait` | string | Optional | Make 'tdk fn trigger' wait for the plan it starts, as '--wait' does; '--no-wait' still returns at once. Default: true. Global. |
| `--server` | string | Optional | URL of the Tabsdata Server 'tdk login' uses without '--server'. If omitted, the protocol defaults to 'http://' and the port to 2457. Global. |
| `--proj, -P` | string | Optional | Project to pin as the default of project-scoped commands. Per profile: pinned in the profile the command runs under. |
| `--coll, -c` | string | Optional | Collection to pin (requires a pinned project). Per profile. |
| `--profile` | string | Optional | Profile commands run under when given no --profile, instead of the default profile. Global. A --proj or --coll of the same command is pinned in it. |
