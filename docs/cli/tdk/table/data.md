# tdk table data

> Show rows of data from the table

Source: https://docs.tabsdata.com/cli/tdk/table/data

Show rows of data from the table

```bash
tdk table data \
  --proj quickstart \
  --name country \
  --coll <function pinned.<locals>.default at 0x10b6a1f80> \
  --len 20 \
  --offset 0 \
  --sql sql-example \
  --at 2024-05-20T10:00:00Z \
  --at-trx trx-8c1d40 \
  --file country.ndjson \
  --extra-cols none \
  --browse \
  --wrap \
  --max-width max_width-example \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Required | Name of the table. |
| `--coll, -c` | string | Optional | Name of the collection to which the table belongs. Defaults to `<function pinned.<locals>.default at 0x10b6a1f80>`. |
| `--len` | string | Optional | Maximum amount of rows to be shown. Defaults to 100 rows, and to 20 when a program runs tdk. Cannot be greater than 1000. |
| `--offset` | string | Optional | How many rows to skip before starting to read. If not provided, reading will start at the first row. |
| `--sql` | string | Optional | A SQL query to run on the table server-side, before the rows are returned. The table is the only queryable relation and is referenced by its own name (for example, 'SELECT a, b FROM my\_table WHERE a > 10'); referencing any other table, a join or a file-reading function is rejected. '--offset' and '--len' page the query's result. |
| `--at` | string | Optional | If provided, the table values at the given time will be shown. Must be either a valid timestamp in the form of a unix timestamp (milliseconds since epoch without a dot, e.g. '1750074554472') or a valid date-time format. The valid formats are 'YYYY-MM-DD', 'YYYY-MM-DDTHH', 'YYYY-MM-DDTHH:MM', 'YYYY-MM-DDTHH:MM:SS', and 'YYYY-MM-DDTHH:MM:SS.sss'. A 'Z' character can be added at the end to indicate UTC time (e.g., '2023-10-01T12Z' or '2023-10-01T12:00:00.000Z') or it can be omitted to indicate local time (e.g., '2023-10-01T12' or '2023-10-01T12:00:00.000'). NOTE: This argument is mutually exclusive with arguments: \[at-trx, version\]. |
| `--at-trx` | string | Optional | ID of a transaction. If provided, the table values at the end of the given transaction will be shown. NOTE: This argument is mutually exclusive with arguments: \[at, version\]. |
| `--file` | string | Optional | File in which the table will be stored as a NDJSON. Can be an absolute or a relative path. Any directory that appears must already exist (it will not be created as part of the download). |
| `--extra-cols` | none \| meta \| sys \| all | Optional | Which non-user columns to show on top of the user ones: 'meta' adds the '@td.' connector metadata, 'sys' adds the '$td.' system columns, 'all' adds both. Defaults to 'none'. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
