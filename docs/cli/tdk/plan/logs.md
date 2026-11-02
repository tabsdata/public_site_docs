# tdk plan logs

> Show logs of one of the plan's workers; when several ran, pick one from

Source: https://docs.tabsdata.com/cli/tdk/plan/logs

Show logs of one of the plan's workers; when several ran, pick one from

the listing.

```bash
tdk plan logs \
  --plan pln-3f9a2b \
  --file pln-3f9a2b.log \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--plan` | string | Required | ID of the plan whose logs to show. |
| `--file` | string | Optional | Path of the file where the logs will be saved, or '-' to write them to stdout. Any folders provided before the file must already exist. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
