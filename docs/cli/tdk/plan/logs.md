# tdk plan logs

> Show the logs of the plan's workers: every worker's with '--all', newest

Source: https://docs.tabsdata.com/cli/tdk/plan/logs

Show the logs of the plan's workers: every worker's with '--all', newest

first; else one worker's, picked from the listing when several ran. Each worker that did not succeed carries the error signature of its log.

```bash
tdk plan logs \
  --plan pln-3f9a2b \
  --all \
  --max-result 20 \
  --tail tail-example \
  --failed-only \
  --file pln-3f9a2b.log \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--plan` | string | Required | ID of the plan whose logs to show. |
| `--all` | flag | Optional | Show the logs of every worker, newest first, instead of picking one. |
| `--max-result` | string | Optional | With '--all', the most workers to show. Use 0 for no limit. Defaults to `20`. |
| `--tail` | string | Optional | Show only the last N lines of each log. |
| `--failed-only` | flag | Optional | Only the workers whose health is warning or error. |
| `--file` | string | Optional | Path of the file where the logs will be saved, or '-' to write them to stdout. Any folders provided before the file must already exist. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
