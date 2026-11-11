# tdk fnrun list

> List function runs across every project you can view.

Source: https://docs.tabsdata.com/cli/tdk/fnrun/list

List function runs across every project you can view.

```bash
tdk fnrun list \
  --proj quickstart \
  --status status-example \
  --health health-example \
  --coll sales_data \
  --fn read_world \
  --plan pln-3f9a2b \
  --plan-name my_plan* \
  --trx trx-8c1d40 \
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
| `--proj, -P` | string | Optional | Name of the project to filter function runs by. |
| `--status` | string (repeatable) | Optional | Filter function runs by status: 'Committed/C, Done/D, Error/E, Failed/F, On Hold/H, Running/R, Run Requested/RR, Rescheduled/RS, Scheduled/S, Canceled/X, Yanked/Y' (case-insensitive). Not together with '--health'. |
| `--health` | string | Optional | Filter function runs by health, the 'health' of each listed row: error: Failed; warning: Error, On Hold, Yanked; running: Done, Running, Run Requested, Rescheduled, Scheduled; ok: Committed, Canceled. Not together with '--status'. |
| `--coll, -c` | string | Optional | Collection of the function to which the function runs belong. |
| `--fn` | string | Optional | Name of the function to which the function runs belong. |
| `--plan` | string | Optional | ID of the plan to filter function runs by. |
| `--plan-name` | string | Optional | A plan name wildcard to match. For example, 'my\_plan\*' will match all plans with names starting with 'my\_plan'. |
| `--trx` | string | Optional | ID of the transaction to filter function runs by. |
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
