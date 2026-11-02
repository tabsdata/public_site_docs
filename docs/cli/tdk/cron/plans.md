# tdk cron plans

> List the execution plans the cron triggers started, newest first

Source: https://docs.tabsdata.com/cli/tdk/cron/plans

List the execution plans the cron triggers started, newest first

```bash
tdk cron plans \
  --proj quickstart \
  --all-projects \
  --name sales_data \
  --coll sales_data \
  --format table \
  --max-result 100 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--all-projects` | flag | Optional | List across every project you can view, ignoring any pinned or --proj project. |
| `--name, -n` | string | Optional | Only list the plans triggered for this function. |
| `--coll, -c` | string | Optional | Only list the plans of functions in this collection. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--max-result` | string | Optional | Maximum number of rows to list. Use 0 for no limit. Defaults to `100`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
