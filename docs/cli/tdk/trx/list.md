# tdk trx list

> List transactions across every project you can view.

Source: https://docs.tabsdata.com/cli/tdk/trx/list

List transactions across every project you can view.

```bash
tdk trx list \
  --proj quickstart \
  --status status-example \
  --coll sales_data \
  --plan pln-3f9a2b \
  --plan-name my_plan* \
  --last \
  --at 2024-05-20T10:00:00Z \
  --monitor \
  --format table \
  --max-result 100 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj` | string | Optional | Name of the project to filter transactions by. |
| `--status` | string (repeatable) | Optional | Filter transactions by status. The possible statuses are 'Committed/C, Stalled/L, Running/R, Scheduled/S, Unexpected/U, Canceled/X, Yanked/Y'. This field is case-insensitive. |
| `--coll` | string | Optional | Name of the collection to filter transactions by. |
| `--plan` | string | Optional | ID of the plan to filter transactions by. |
| `--plan-name` | string | Optional | A plan name wildcard to match. For example, 'my\_plan\*' will match all plans with names starting with 'my\_plan'. |
| `--last` | flag | Optional | If set, only the last transaction of the list will be shown. |
| `--at` | string | Optional | If provided, only transactions started before that time will be shown. Must be either a valid timestamp in the form of a unix timestamp (milliseconds since epoch without a dot, e.g. '1750074554472') or a valid date-time format. The valid formats are 'YYYY-MM-DD', 'YYYY-MM-DDTHH', 'YYYY-MM-DDTHH:MM', 'YYYY-MM-DDTHH:MM:SS', and 'YYYY-MM-DDTHH:MM:SS.sss'. A 'Z' character can be added at the end to indicate UTC time (e.g., '2023-10-01T12Z' or '2023-10-01T12:00:00.000Z') or it can be omitted to indicate local time (e.g., '2023-10-01T12' or '2023-10-01T12:00:00.000'). |
| `--monitor` | flag | Optional | If set, the command will monitor the listed transactions until they all reach a final state. A lost connection to the server is retried for up to two minutes before the command fails. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--max-result` | string | Optional | Maximum number of rows to list. Use 0 for no limit. Defaults to `100`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
