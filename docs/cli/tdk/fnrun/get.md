# tdk fnrun get

> Display a function run: its details plus its workers.

Source: https://docs.tabsdata.com/cli/tdk/fnrun/get

Display a function run: its details plus its workers.

```bash
tdk fnrun get \
  --fnrun fnr-27ac91 \
  --wait \
  --attempt attempt-example \
  --timeout timeout-example \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--fnrun` | string | Required | ID of the function run to display. |
| `--wait` | flag | Optional | Wait until the function run reaches a final status. Exits 7 when '--timeout' runs out and 8 when a function run did not succeed. |
| `--attempt` | string | Optional | With '--wait', wait for this attempt (a physical function run id, such as the 'new\_function\_run\_id' of a replay) to end instead. |
| `--timeout` | string | Optional | Stop waiting after S seconds. Default: no limit. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
