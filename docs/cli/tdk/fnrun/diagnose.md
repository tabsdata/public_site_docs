# tdk fnrun diagnose

> Diagnose why a function run did not succeed: its repair handles, the

Source: https://docs.tabsdata.com/cli/tdk/fnrun/diagnose

Diagnose why a function run did not succeed: its repair handles, the

error signature of its latest worker's log and, when it is on hold, the failed runs that block it. Exits 0 whenever the diagnosis is produced; a function run that is not found exits 5.

```bash
tdk fnrun diagnose \
  --fnrun fnr-27ac91 \
  --log-lines 200 \
  --no-logs \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--fnrun` | string | Required | ID of the function run to diagnose. |
| `--log-lines` | string | Optional | The last lines of each worker log to include, with repeated blocks kept once and the excerpt capped at 4000 characters. Defaults to `200`. |
| `--no-logs` | flag | Optional | Diagnose from statuses alone, without reading worker logs. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
