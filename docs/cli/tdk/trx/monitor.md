# tdk trx monitor

> Monitor the execution of a transaction.

Source: https://docs.tabsdata.com/cli/tdk/trx/monitor

Monitor the execution of a transaction.

```bash
tdk trx monitor \
  --trx trx-8c1d40 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--trx` | string | Required | ID of the transaction to monitor. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
