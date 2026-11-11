# tdk connection check

> Check that a collection's connection connects, as a server-side probe.

Source: https://docs.tabsdata.com/cli/tdk/connection/check

Check that a collection's connection connects, as a server-side probe.

A check that ran and could not connect exits 0 with 'ok: false' in its result

```bash
tdk connection check \
  --proj quickstart \
  --name sales_data \
  --no-wait \
  --timeout timeout-example \
  --conn-file conn-postgres.yaml \
  --metadata \
  --sample sample-example \
  --len 20 \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Optional | Name of the source/destination collection whose connection to use. Default: the pinned collection. |
| `--no-wait` | flag | Optional | Return at once instead of waiting for the probe to end. Exits 7 when '--timeout' runs out and 8 when the probe did not succeed. |
| `--timeout` | string | Optional | Stop waiting after S seconds, at most 300. Default: 60. |
| `--conn-file` | string | Optional | Check this connection document ('-' for stdin) here instead, with the locally installed connector and no server. |
| `--metadata` | flag | Optional | With '--conn-file': also list the entities. |
| `--sample` | string | Optional | With '--conn-file': also read rows of FQN. |
| `--len` | string | Optional | With '--sample': rows to read. Default: 20. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
