# tdk table diff

> Show how a table's schema changed, or how it differs from another's.

Source: https://docs.tabsdata.com/cli/tdk/table/diff

Show how a table's schema changed, or how it differs from another's.

With no '--from' or '--against', lists the schema changes over the committed data versions, newest first

```bash
tdk table diff \
  --proj quickstart \
  --name country \
  --coll <function pinned.<locals>.default at 0x10b6a3ec0> \
  --from from-example \
  --to to-example \
  --against against-example \
  --max-events 10 \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Optional | Name of the table. |
| `--coll, -c` | string | Optional | Name of the collection to which the table belongs. Defaults to `<function pinned.<locals>.default at 0x10b6a3ec0>`. |
| `--from` | string | Optional | Compare the schema at this data version (ID, HEAD, HEAD^ or HEAD~N) with the one at '--to' instead of listing the schema history. NOTE: This argument is mutually exclusive with arguments: \[against\]. |
| `--to` | string | Optional | The data version '--from' compares with. Defaults to the newest. NOTE: This argument is mutually exclusive with arguments: \[against\]. |
| `--against` | string | Optional | Compare the table's schema with that of another table, as COLLECTION/TABLE or, in the same collection, TABLE. |
| `--max-events` | string | Optional | Most schema changes the history lists, newest first. Defaults to `10`. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
