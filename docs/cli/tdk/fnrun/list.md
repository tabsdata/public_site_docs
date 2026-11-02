# tdk fnrun list

> List function runs across every project you can view.

Source: https://docs.tabsdata.com/cli/tdk/fnrun/list

List function runs across every project you can view.

```bash
tdk fnrun list \
  --proj quickstart \
  --status status-example \
  --coll sales_data \
  --fn read_world \
  --plan pln-3f9a2b \
  --plan-name my_plan* \
  --trx trx-8c1d40 \
  --format table \
  --max-result 100 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj` | string | Optional | Name of the project to filter function runs by. |
| `--status` | string (repeatable) | Optional | Filter function runs by status. The possible statuses are 'Committed/C, Done/D, Error/E, Failed/F, On Hold/H, Running/R, Run Requested/RR, Rescheduled/RS, Scheduled/S, Canceled/X, Yanked/Y, Unexpected/U'. This field is case-insensitive. |
| `--coll` | string | Optional | Collection of the function to which the function runs belong. |
| `--fn` | string | Optional | Name of the function to which the function runs belong. |
| `--plan` | string | Optional | ID of the plan to filter function runs by. |
| `--plan-name` | string | Optional | A plan name wildcard to match. For example, 'my\_plan\*' will match all plans with names starting with 'my\_plan'. |
| `--trx` | string | Optional | ID of the transaction to filter function runs by. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--max-result` | string | Optional | Maximum number of rows to list. Use 0 for no limit. Defaults to `100`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
