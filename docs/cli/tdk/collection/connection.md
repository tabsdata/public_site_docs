# tdk collection connection

> Display the connection of a source/destination collection.

Source: https://docs.tabsdata.com/cli/tdk/collection/connection

Display the connection of a source/destination collection.

Emits the dehydrated connection document as JSON or YAML; secret and var names are never shown.

```bash
tdk collection connection \
  --proj quickstart \
  --format table \
  --name sales_data \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `json`. |
| `--name, -n` | string | Optional | Name of the source/destination collection whose connection to display. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
