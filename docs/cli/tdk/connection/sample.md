# tdk connection sample

> Read sample rows of a catalog entity, as a server-side probe. The rows

Source: https://docs.tabsdata.com/cli/tdk/connection/sample

Read sample rows of a catalog entity, as a server-side probe. The rows

are kept on the server for ten minutes and the read is audit-logged

```bash
tdk connection sample \
  --proj quickstart \
  --entity entity-example \
  --name sales_data \
  --len 20 \
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
| `--entity` | string | Required | Catalog entity to read rows of (see 'tdk connection entities'). |
| `--name, -n` | string | Optional | Name of the source/destination collection whose connection to use. Default: the pinned collection. Defaults to `<function pinned.<locals>.default at 0x10b5abec0>`. |
| `--len` | string | Optional | Rows to read. Defaults to `20`. |
| `--no-wait` | flag | Optional | Return at once instead of waiting for the probe to end. Exits 7 when '--timeout' runs out and 8 when the probe did not succeed. |
| `--timeout` | string | Optional | Stop waiting after S seconds, at most 300. Default: 60. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
