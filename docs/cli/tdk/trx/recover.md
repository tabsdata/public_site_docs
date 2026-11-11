# tdk trx recover

> Recover a transaction: its failed or on-hold function runs are

Source: https://docs.tabsdata.com/cli/tdk/trx/recover

Recover a transaction: its failed or on-hold function runs are

re-scheduled, each re-running its pinned function version and that version's latest patch.

```bash
tdk trx recover \
  --format table \
  --trx trx-8c1d40 \
  --wait \
  --timeout timeout-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--trx` | string | Required | ID of the transaction to recover. |
| `--wait` | flag | Optional | Wait until the recovered transaction reaches a final status. Exits 7 when '--timeout' runs out and 8 when a function run did not succeed. |
| `--timeout` | string | Optional | Stop waiting after S seconds. Default: no limit. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
