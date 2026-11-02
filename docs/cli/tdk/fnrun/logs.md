# tdk fnrun logs

> Show logs of one of the function run's workers; when several ran (retries),

Source: https://docs.tabsdata.com/cli/tdk/fnrun/logs

Show logs of one of the function run's workers; when several ran (retries),

pick one from the listing.

```bash
tdk fnrun logs \
  --fnrun fnr-27ac91 \
  --file fnr-27ac91.log \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--fnrun` | string | Required | ID of the function run whose logs to show. |
| `--file` | string | Optional | Path of the file where the logs will be saved, or '-' to write them to stdout. Any folders provided before the file must already exist. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
