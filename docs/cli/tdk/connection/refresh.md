# tdk connection refresh

> Explore a collection's connection again, as a server-side probe, and

Source: https://docs.tabsdata.com/cli/tdk/connection/refresh

Explore a collection's connection again, as a server-side probe, and

replace its catalog of entities

```bash
tdk connection refresh \
  --proj quickstart \
  --name sales_data \
  --no-wait \
  --timeout timeout-example \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Optional | Name of the source/destination collection whose connection to use. Default: the pinned collection. Defaults to `<function pinned.<locals>.default at 0x10b5ab6a0>`. |
| `--no-wait` | flag | Optional | Return at once instead of waiting for the probe to end. Exits 7 when '--timeout' runs out and 8 when the probe did not succeed. |
| `--timeout` | string | Optional | Stop waiting after S seconds, at most 300. Default: 60. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
