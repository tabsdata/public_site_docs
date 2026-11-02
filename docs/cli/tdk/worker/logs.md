# tdk worker logs

> Show the logs of a worker.

Source: https://docs.tabsdata.com/cli/tdk/worker/logs

Show the logs of a worker.

```bash
tdk worker logs \
  --worker wkr-5e21f0 \
  --file wkr-5e21f0.log \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--worker` | string | Required | ID of the worker whose logs to show. |
| `--file` | string | Optional | Path of the file where the logs will be saved, or '-' to write them to stdout. Any folders provided before the file must already exist. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
