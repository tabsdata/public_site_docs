# tdk plan diagnose

> Diagnose why a plan did not succeed.

Source: https://docs.tabsdata.com/cli/tdk/plan/diagnose

Diagnose why a plan did not succeed.

Reports the failed and retrying function runs, first failure first, each with its repair handles (the replay, recover and patch argv) and the error signature of its latest worker's log; the held runs with the failed runs that block them; and the root cause, the earliest failure, with its category. Exits 0 whenever the diagnosis is produced; the verdict is the plan's 'health'. A plan that is not found exits 5.

```bash
tdk plan diagnose \
  --plan pln-3f9a2b \
  --max-runs 5 \
  --log-lines 200 \
  --no-logs \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--plan` | string | Required | ID of the plan to diagnose. |
| `--max-runs` | string | Optional | The most failed runs to report, first failure first; 0 for all. Defaults to `5`. |
| `--log-lines` | string | Optional | The last lines of each worker log to include, with repeated blocks kept once and the excerpt capped at 4000 characters. Defaults to `200`. |
| `--no-logs` | flag | Optional | Diagnose from statuses alone, without reading worker logs. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
