# tdk worker list

> List workers across every project you can view.

Source: https://docs.tabsdata.com/cli/tdk/worker/list

List workers across every project you can view.

```bash
tdk worker list \
  --proj quickstart \
  --status status-example \
  --coll sales_data \
  --fn read_world \
  --plan pln-3f9a2b \
  --plan-name my_plan* \
  --fnrun fnr-27ac91 \
  --trx trx-8c1d40 \
  --format table \
  --max-result 100 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj` | string | Optional | Name of the project to filter workers by. |
| `--status` | string (repeatable) | Optional | Filter workers by status. The possible statuses are 'Done/D, Error/E, Failed/F, Running/R, Run Requested/RR, Scheduled/S, Stopped/SP, Stop Requested/SPR, Stop Scheduled/SPS, Canceled/X'. This field is case-insensitive. |
| `--coll` | string | Optional | Collection of the function to which the workers belong. |
| `--fn` | string | Optional | Name of the function to which the workers belong. |
| `--plan` | string | Optional | ID of the plan to filter workers by. |
| `--plan-name` | string | Optional | A plan name wildcard to match. For example, 'my\_plan\*' will match all plans with names starting with 'my\_plan'. |
| `--fnrun` | string | Optional | ID of the function run to filter workers by. |
| `--trx` | string | Optional | ID of the transaction to filter workers by. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--max-result` | string | Optional | Maximum number of rows to list. Use 0 for no limit. Defaults to `100`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
