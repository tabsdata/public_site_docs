# tdk project secrets

> List the secrets of a project, with their keys (never their values)

Source: https://docs.tabsdata.com/cli/tdk/project/secrets

List the secrets of a project, with their keys (never their values)

```bash
tdk project secrets \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --name quickstart \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--name, -n` | string | Optional | Name of the project whose secrets to list. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
