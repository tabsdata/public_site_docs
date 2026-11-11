# tdk docs list

> List the documented symbols

Source: https://docs.tabsdata.com/cli/tdk/docs/list

List the documented symbols

```bash
tdk docs list \
  --category category-example \
  --max-result 100 \
  --fields fields-example \
  --cursor cursor-example \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--category` | string | Optional | Restrict to one category of the reference. |
| `--max-result` | string | Optional | Maximum number of rows to list. Use 0 for no limit, or for the most a program running tdk allows. Defaults to `100`. |
| `--fields` | string | Optional | Keep only these fields of each row, comma-separated; '?' lists the fields the rows have and 'all' keeps every one, which a program running tdk otherwise gets without the internal ids. Not in the table view. |
| `--cursor` | string | Optional | Continue a listing from the 'next' cursor it returned, with the same filters and order. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
