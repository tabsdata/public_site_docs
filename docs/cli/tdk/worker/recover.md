# tdk worker recover

> Recover the transaction a worker belongs to: the transaction's failed or

Source: https://docs.tabsdata.com/cli/tdk/worker/recover

Recover the transaction a worker belongs to: the transaction's failed or

on-hold function runs are re-scheduled.

```bash
tdk worker recover \
  --worker wkr-5e21f0 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--worker` | string | Required | ID of the worker to recover. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
