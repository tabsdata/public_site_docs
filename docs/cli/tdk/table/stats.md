# tdk table stats

> Show the size and schema of a table

Source: https://docs.tabsdata.com/cli/tdk/table/stats

Show the size and schema of a table

```bash
tdk table stats \
  --proj quickstart \
  --name country \
  --coll <function pinned.<locals>.default at 0x10b6a3ce0> \
  --at 2024-05-20T10:00:00Z \
  --at-trx trx-8c1d40 \
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
| `--coll, -c` | string | Optional | Name of the collection to which the table belongs. Defaults to `<function pinned.<locals>.default at 0x10b6a3ce0>`. |
| `--at` | string | Optional | Read the table as it was at this time: a unix timestamp in milliseconds (e.g. '1750074554472') or 'YYYY-MM-DD', 'YYYY-MM-DDTHH', 'YYYY-MM-DDTHH:MM', 'YYYY-MM-DDTHH:MM:SS' or 'YYYY-MM-DDTHH:MM:SS.sss', in UTC with a trailing 'Z' and in local time without it. NOTE: This argument is mutually exclusive with arguments: \[at-trx, version\]. |
| `--at-trx` | string | Optional | Read the table as it was at the end of this transaction. NOTE: This argument is mutually exclusive with arguments: \[at, version\]. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
