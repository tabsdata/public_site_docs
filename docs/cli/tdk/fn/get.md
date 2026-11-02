# tdk fn get

> Display a function

Source: https://docs.tabsdata.com/cli/tdk/fn/get

Display a function

```bash
tdk fn get \
  --proj quickstart \
  --format table \
  --name read_world \
  --coll sales_data \
  --show-history \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--name, -n` | string | Required | Name of the function to be displayed. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. |
| `--show-history` | flag | Optional | Show the history of the function, newest first. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
