# tdk table schema

> Show table schema

Source: https://docs.tabsdata.com/cli/tdk/table/schema

Show table schema

```bash
tdk table schema \
  --proj quickstart \
  --name country \
  --coll <function pinned.<locals>.default at 0x10b6a2980> \
  --at 2024-05-20T10:00:00Z \
  --at-trx trx-8c1d40 \
  --extra-cols none \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Required | Name of the table. |
| `--coll, -c` | string | Optional | Name of the collection to which the table belongs. Defaults to `<function pinned.<locals>.default at 0x10b6a2980>`. |
| `--at` | string | Optional | If provided, the table values at the given time will be shown. Must be either a valid timestamp in the form of a unix timestamp (milliseconds since epoch without a dot, e.g. '1750074554472') or a valid date-time format. The valid formats are 'YYYY-MM-DD', 'YYYY-MM-DDTHH', 'YYYY-MM-DDTHH:MM', 'YYYY-MM-DDTHH:MM:SS', and 'YYYY-MM-DDTHH:MM:SS.sss'. A 'Z' character can be added at the end to indicate UTC time (e.g., '2023-10-01T12Z' or '2023-10-01T12:00:00.000Z') or it can be omitted to indicate local time (e.g., '2023-10-01T12' or '2023-10-01T12:00:00.000'). NOTE: This argument is mutually exclusive with arguments: \[at-trx, version\]. |
| `--at-trx` | string | Optional | ID of a transaction. If provided, the table values at the end of the given transaction will be shown. NOTE: This argument is mutually exclusive with arguments: \[at, version\]. |
| `--extra-cols` | none \| meta \| sys \| all | Optional | Which non-user columns to show on top of the user ones: 'meta' adds the '@td.' connector metadata, 'sys' adds the '$td.' system columns, 'all' adds both. Defaults to 'none'. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
