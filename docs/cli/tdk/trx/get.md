# tdk trx get

> Display a transaction: its details plus its function runs and workers.

Source: https://docs.tabsdata.com/cli/tdk/trx/get

Display a transaction: its details plus its function runs and workers.

```bash
tdk trx get \
  --trx trx-8c1d40 \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--trx` | string | Required | ID of the transaction to display. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
