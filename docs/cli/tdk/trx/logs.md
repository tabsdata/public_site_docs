# tdk trx logs

> Show logs of one of the transaction's workers; when several ran, pick one

Source: https://docs.tabsdata.com/cli/tdk/trx/logs

Show logs of one of the transaction's workers; when several ran, pick one

from the listing.

```bash
tdk trx logs \
  --trx trx-8c1d40 \
  --file trx-8c1d40.log \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--trx` | string | Required | ID of the transaction whose logs to show. |
| `--file` | string | Optional | Path of the file where the logs will be saved, or '-' to write them to stdout. Any folders provided before the file must already exist. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
