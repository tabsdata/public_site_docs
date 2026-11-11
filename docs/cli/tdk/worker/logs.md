# tdk worker logs

> Show the logs of a worker, with the error signature of its log when it

Source: https://docs.tabsdata.com/cli/tdk/worker/logs

Show the logs of a worker, with the error signature of its log when it

did not succeed.

```bash
tdk worker logs \
  --worker wkr-5e21f0 \
  --tail tail-example \
  --file wkr-5e21f0.log \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--worker` | string | Required | ID of the worker whose logs to show. |
| `--tail` | string | Optional | Show only the last N lines of each log. |
| `--file` | string | Optional | Path of the file where the logs will be saved, or '-' to write them to stdout. Any folders provided before the file must already exist. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
