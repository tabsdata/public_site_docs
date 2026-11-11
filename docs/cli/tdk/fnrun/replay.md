# tdk fnrun replay

> Re-execute a finished function run.

Source: https://docs.tabsdata.com/cli/tdk/fnrun/replay

Re-execute a finished function run.

Mints a new concrete physical function run against the latest patch (or head, if no patch exists). The pointer stays bound to the previous attempt's outputs until the new attempt finishes successfully. '--wait' waits for the new attempt to end.

```bash
tdk fnrun replay \
  --format table \
  --fnrun fnr-27ac91 \
  --wait \
  --timeout timeout-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--fnrun` | string | Required | ID of the function run to replay. |
| `--wait` | flag | Optional | Wait until the new attempt reaches a final status. Exits 7 when '--timeout' runs out and 8 when a function run did not succeed. |
| `--timeout` | string | Optional | Stop waiting after S seconds. Default: no limit. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
