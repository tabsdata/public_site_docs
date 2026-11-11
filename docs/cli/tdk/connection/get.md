# tdk connection get

> Display the catalog of a collection's connection: probe status, schema

Source: https://docs.tabsdata.com/cli/tdk/connection/get

Display the catalog of a collection's connection: probe status, schema

fingerprint and the compatible local connectors

```bash
tdk connection get \
  --proj quickstart \
  --name sales_data \
  --definition \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Optional | Name of the source/destination collection whose connection to use. Default: the pinned collection. Defaults to `<function pinned.<locals>.default at 0x10b5aad40>`. |
| `--definition` | flag | Optional | Add the connection document, dehydrated (no secret values or names). Needs a user session with manage\_project. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
