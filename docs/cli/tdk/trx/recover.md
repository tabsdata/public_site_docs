# tdk trx recover

> Recover a transaction: its failed or on-hold function runs are

Source: https://docs.tabsdata.com/cli/tdk/trx/recover

Recover a transaction: its failed or on-hold function runs are

re-scheduled, each re-running its pinned function version and that version's latest patch.

```bash
tdk trx recover \
  --trx trx-8c1d40 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--trx` | string | Required | ID of the transaction to recover. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
