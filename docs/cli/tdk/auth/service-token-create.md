# tdk auth service-token create

> Create a service token in one of your two slots.

Source: https://docs.tabsdata.com/cli/tdk/auth/service-token-create

Create a service token in one of your two slots.

The token is shown once, here, and cannot be recovered afterwards: the server keeps only a SHA-256 digest of it.

```bash
tdk auth service-token create \
  --slot slot-example \
  --expires-in-days expires_in_days-example \
  --comment comment-example \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--slot` | string | Optional | Which slot to fill, 1 or 2. |
| `--expires-in-days` | string | Optional | Days until the token expires, or -1 for a token that never expires (only where the deployment permits it). There is no default. |
| `--comment` | string | Optional | A label, so the two slots tell themselves apart. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
