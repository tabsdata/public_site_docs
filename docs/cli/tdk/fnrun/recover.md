# tdk fnrun recover

> Recover the transaction a function run belongs to: the transaction's

Source: https://docs.tabsdata.com/cli/tdk/fnrun/recover

Recover the transaction a function run belongs to: the transaction's

failed or on-hold function runs are re-scheduled, each re-running its pinned function version and that version's latest patch.

```bash
tdk fnrun recover \
  --fnrun fnr-27ac91 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--fnrun` | string | Required | ID of the function run to recover. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
