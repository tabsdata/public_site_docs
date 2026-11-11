# tdk plan recover

> Recover a plan: its failed or on-hold function runs are re-scheduled,

Source: https://docs.tabsdata.com/cli/tdk/plan/recover

Recover a plan: its failed or on-hold function runs are re-scheduled,

each re-running its pinned function version and that version's latest patch.

```bash
tdk plan recover \
  --format table \
  --plan pln-3f9a2b \
  --wait \
  --timeout timeout-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--plan` | string | Required | ID of the plan to recover. |
| `--wait` | flag | Optional | Wait until the recovered plan reaches a final status. Exits 7 when '--timeout' runs out and 8 when a function run did not succeed. |
| `--timeout` | string | Optional | Stop waiting after S seconds. Default: no limit. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
