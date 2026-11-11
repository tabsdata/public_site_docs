# tdk examples list

> List the bundled examples, optionally filtered

Source: https://docs.tabsdata.com/cli/tdk/examples/list

List the bundled examples, optionally filtered

```bash
tdk examples list \
  --kind kind-example \
  --connector connector-example \
  --tag tag-example \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--kind` | string | Optional | Only examples of this kind. |
| `--connector` | string | Optional | Only examples using this connection type, e.g. 'postgres-sql-in'. |
| `--tag` | string | Optional | Only examples with this tag. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
