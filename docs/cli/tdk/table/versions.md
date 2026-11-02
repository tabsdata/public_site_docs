# tdk table versions

> List all versions of the data of a table.

Source: https://docs.tabsdata.com/cli/tdk/table/versions

List all versions of the data of a table.

```bash
tdk table versions \
  --proj quickstart \
  --coll sales_data \
  --name country \
  --format table \
  --max-result 100 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--coll, -c` | string | Optional | Name of the collection to which the data belongs. |
| `--name` | string | Required | The name of the table to which the data belongs. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--max-result` | string | Optional | Maximum number of rows to list. Use 0 for no limit. Defaults to `100`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
