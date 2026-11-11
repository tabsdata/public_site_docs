# tdk fnrun logs

> Show the logs of the function run's workers (one per attempt): every

Source: https://docs.tabsdata.com/cli/tdk/fnrun/logs

Show the logs of the function run's workers (one per attempt): every

worker's with '--all', newest first; else one worker's, picked from the listing when several ran. Each worker that did not succeed carries the error signature of its log.

```bash
tdk fnrun logs \
  --fnrun fnr-27ac91 \
  --all \
  --max-result 20 \
  --tail tail-example \
  --file fnr-27ac91.log \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--fnrun` | string | Required | ID of the function run whose logs to show. |
| `--all` | flag | Optional | Show the logs of every worker, newest first, instead of picking one. |
| `--max-result` | string | Optional | With '--all', the most workers to show. Use 0 for no limit. Defaults to `20`. |
| `--tail` | string | Optional | Show only the last N lines of each log. |
| `--file` | string | Optional | Path of the file where the logs will be saved, or '-' to write them to stdout. Any folders provided before the file must already exist. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
