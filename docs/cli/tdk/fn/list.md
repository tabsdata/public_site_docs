# tdk fn list

> List all functions in a collection

Source: https://docs.tabsdata.com/cli/tdk/fn/list

List all functions in a collection

```bash
tdk fn list \
  --proj quickstart \
  --format table \
  --coll sales_data \
  --max-result 100 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--coll, -c` | string | Optional | Name of the collection to which the functions belong. |
| `--max-result` | string | Optional | Maximum number of rows to list. Use 0 for no limit. Defaults to `100`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
