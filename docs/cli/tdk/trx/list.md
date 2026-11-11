# tdk trx list

> List transactions across every project you can view.

Source: https://docs.tabsdata.com/cli/tdk/trx/list

List transactions across every project you can view.

```bash
tdk trx list \
  --proj quickstart \
  --status status-example \
  --health health-example \
  --coll sales_data \
  --plan pln-3f9a2b \
  --plan-name my_plan* \
  --last \
  --at 2024-05-20T10:00:00Z \
  --monitor \
  --timeout timeout-example \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --max-result 100 \
  --filter filter-example \
  --order-by order_by-example \
  --cursor cursor-example \
  --fields fields-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Name of the project to filter transactions by. |
| `--status` | string (repeatable) | Optional | Filter transactions by status: 'Committed/C, Stalled/L, Running/R, Scheduled/S, Unexpected/U, Canceled/X, Yanked/Y' (case-insensitive). Not together with '--health'. |
| `--health` | string | Optional | Filter transactions by health, the 'health' of each listed row: error: Stalled, Unexpected; warning: Yanked; running: Running, Scheduled; ok: Committed, Canceled. Not together with '--status'. |
| `--coll, -c` | string | Optional | Name of the collection to filter transactions by. |
| `--plan` | string | Optional | ID of the plan to filter transactions by. |
| `--plan-name` | string | Optional | A plan name wildcard to match. For example, 'my\_plan\*' will match all plans with names starting with 'my\_plan'. |
| `--last` | flag | Optional | If set, only the last transaction of the list will be shown. |
| `--at` | string | Optional | If provided, only transactions started before that time will be shown. Must be either a valid timestamp in the form of a unix timestamp (milliseconds since epoch without a dot, e.g. '1750074554472') or a valid date-time format. The valid formats are 'YYYY-MM-DD', 'YYYY-MM-DDTHH', 'YYYY-MM-DDTHH:MM', 'YYYY-MM-DDTHH:MM:SS', and 'YYYY-MM-DDTHH:MM:SS.sss'. A 'Z' character can be added at the end to indicate UTC time (e.g., '2023-10-01T12Z' or '2023-10-01T12:00:00.000Z') or it can be omitted to indicate local time (e.g., '2023-10-01T12' or '2023-10-01T12:00:00.000'). |
| `--monitor` | flag | Optional | If set, the command will monitor the listed transactions until they all reach a final state. Exits 7 when '--timeout' runs out. A lost connection to the server is retried for up to two minutes before the command fails. |
| `--timeout` | string | Optional | Stop waiting after S seconds. Default: no limit. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--max-result` | string | Optional | Maximum number of rows to list. Use 0 for no limit, or for the most a program running tdk allows. Defaults to `100`. |
| `--filter` | string | Optional | Filter on a field, with OP one of eq, ne, gt, ge, lt, le, lk, btw, is. Repeatable: conditions on different fields must all hold, conditions on the same field are alternatives. Combines with the command's own filters. |
| `--order-by` | string | Optional | Sort by a field, ascending (+, the default) or descending (-). |
| `--cursor` | string | Optional | Continue a listing from the 'next' cursor it returned, with the same filters and order. |
| `--fields` | string | Optional | Keep only these fields of each row, comma-separated; '?' lists the fields the rows have and 'all' keeps every one, which a program running tdk otherwise gets without the internal ids. Not in the table view. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
