# tdk doctor

> Check that this machine is ready to develop and register functions.

Source: https://docs.tabsdata.com/cli/tdk/doctor

Check that this machine is ready to develop and register functions.

Exits 1 when any check fails; warnings do not fail

```bash
tdk doctor \
  --check check-example \
  --offline \
  --proj quickstart \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--check` | string | Optional | Run only this check; repeat for several. Default: every check. |
| `--offline` | flag | Optional | Skip the checks that need the server: server, login and connectors. |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
