# tdk fn patches

> List patch versions of a function (latest first).

Source: https://docs.tabsdata.com/cli/tdk/fn/patches

List patch versions of a function (latest first).

```bash
tdk fn patches \
  --proj quickstart \
  --format table \
  --name read_world \
  --coll sales_data \
  --max-result 100 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--name, -n` | string | Required | Name of the function whose patches will be listed. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. |
| `--max-result` | string | Optional | Maximum number of rows to list. Use 0 for no limit. Defaults to `100`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
