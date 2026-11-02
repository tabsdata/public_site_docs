# tdk table download

> Download the table as a parquet file

Source: https://docs.tabsdata.com/cli/tdk/table/download

Download the table as a parquet file

```bash
tdk table download \
  --proj quickstart \
  --name country \
  --coll sales_data \
  --file country.parquet \
  --at 2024-05-20T10:00:00Z \
  --at-trx trx-8c1d40 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name` | string | Required | Name of the table. |
| `--coll, -c` | string | Optional | Name of the collection to which the table belongs. |
| `--file` | string | Required | File in which the table will be stored. Can be an absolute or a relative path. Any directory that appears must already exist (it will not be created as part of the download). |
| `--at` | string | Optional | If provided, the table values at the given time will be shown. Must be either a valid timestamp in the form of a unix timestamp (milliseconds since epoch without a dot, e.g. '1750074554472') or a valid date-time format. The valid formats are 'YYYY-MM-DD', 'YYYY-MM-DDTHH', 'YYYY-MM-DDTHH:MM', 'YYYY-MM-DDTHH:MM:SS', and 'YYYY-MM-DDTHH:MM:SS.sss'. A 'Z' character can be added at the end to indicate UTC time (e.g., '2023-10-01T12Z' or '2023-10-01T12:00:00.000Z') or it can be omitted to indicate local time (e.g., '2023-10-01T12' or '2023-10-01T12:00:00.000'). NOTE: This argument is mutually exclusive with arguments: \[at-trx, version\]. |
| `--at-trx` | string | Optional | ID of a transaction. If provided, the table values at the end of the given transaction will be shown. NOTE: This argument is mutually exclusive with arguments: \[at, version\]. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
