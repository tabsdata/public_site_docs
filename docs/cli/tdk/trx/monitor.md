# tdk trx monitor

> Monitor the execution of a transaction until it finishes. Exits 7 when

Source: https://docs.tabsdata.com/cli/tdk/trx/monitor

Monitor the execution of a transaction until it finishes. Exits 7 when

'--timeout' runs out and 8 when a function run did not succeed.

```bash
tdk trx monitor \
  --format table \
  --trx trx-8c1d40 \
  --timeout timeout-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--trx` | string | Required | ID of the transaction to monitor. |
| `--timeout` | string | Optional | Stop waiting after S seconds. Default: no limit. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
