# tdk table data

> Show rows of data from the table

Source: https://docs.tabsdata.com/cli/tdk/table/data

Show rows of data from the table

```bash
tdk table data \
  --proj quickstart \
  --name country \
  --coll sales_data \
  --len 20 \
  --offset 0 \
  --sql sql-example \
  --at 2024-05-20T10:00:00Z \
  --at-trx trx-8c1d40 \
  --file country.ndjson \
  --extra-cols none \
  --print \
  --wide \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name` | string | Required | Name of the table. |
| `--coll, -c` | string | Optional | Name of the collection to which the table belongs. |
| `--len` | string | Optional | Maximum amount of rows to be shown. If not provided, the server default of 100 rows applies. Cannot be greater than 1000. |
| `--offset` | string | Optional | How many rows to skip before starting to read. If not provided, reading will start at the first row. |
| `--sql` | string | Optional | A SQL query to run on the table server-side, before the rows are returned. The table is the only queryable relation and is referenced by its own name (for example, 'SELECT a, b FROM my\_table WHERE a > 10'); referencing any other table or a file-reading function is rejected. '--offset' is applied before the query and '--len' caps its result. |
| `--at` | string | Optional | If provided, the table values at the given time will be shown. Must be either a valid timestamp in the form of a unix timestamp (milliseconds since epoch without a dot, e.g. '1750074554472') or a valid date-time format. The valid formats are 'YYYY-MM-DD', 'YYYY-MM-DDTHH', 'YYYY-MM-DDTHH:MM', 'YYYY-MM-DDTHH:MM:SS', and 'YYYY-MM-DDTHH:MM:SS.sss'. A 'Z' character can be added at the end to indicate UTC time (e.g., '2023-10-01T12Z' or '2023-10-01T12:00:00.000Z') or it can be omitted to indicate local time (e.g., '2023-10-01T12' or '2023-10-01T12:00:00.000'). NOTE: This argument is mutually exclusive with arguments: \[at-trx, version\]. |
| `--at-trx` | string | Optional | ID of a transaction. If provided, the table values at the end of the given transaction will be shown. NOTE: This argument is mutually exclusive with arguments: \[at, version\]. |
| `--file` | string | Optional | File in which the table will be stored as a NDJSON. Can be an absolute or a relative path. Any directory that appears must already exist (it will not be created as part of the download). |
| `--extra-cols` | none \| meta \| sys \| all | Optional | Which non-user columns to show on top of the user ones: 'meta' adds the '@td.' connector metadata, 'sys' adds the '$td.' system columns, 'all' adds both. Defaults to 'none'. |
| `--print` | flag | Optional | Print the table and return, instead of opening it in the viewer. Each row stays on one line, cut at the width of the terminal; add '--wide' to keep every column and let the terminal wrap the rows instead. |
| `--wide` | flag | Optional | With '--print', print every column at its full width, letting the terminal wrap rows wider than itself, instead of cutting them. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
