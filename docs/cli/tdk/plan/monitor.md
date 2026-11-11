# tdk plan monitor

> Monitor the execution of a plan until it finishes. Exits 7 when

Source: https://docs.tabsdata.com/cli/tdk/plan/monitor

Monitor the execution of a plan until it finishes. Exits 7 when

'--timeout' runs out and 8 when a function run did not succeed.

```bash
tdk plan monitor \
  --format table \
  --plan pln-3f9a2b \
  --timeout timeout-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--plan` | string | Required | ID of the plan to monitor. |
| `--timeout` | string | Optional | Stop waiting after S seconds. Default: no limit. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
