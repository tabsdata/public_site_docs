# tdk connection list

> List the connections of source and destination collections

Source: https://docs.tabsdata.com/cli/tdk/connection/list

List the connections of source and destination collections

```bash
tdk connection list \
  --proj quickstart \
  --all-projects \
  --type postgres-sql-in \
  --mode mode-example \
  --status status-example \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --max-result 100 \
  --filter filter-example \
  --order-by order_by-example \
  --cursor cursor-example \
  --fields fields-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--all-projects` | flag | Optional | List across every project you can view, ignoring any pinned or --proj project. |
| `--type, -t` | string | Optional | Only connections of this connector type (see 'tdk connection types'). |
| `--mode` | string | Optional | Only source (src) or destination (dest) connections. |
| `--status` | string | Optional | Only connections whose last check ended so: ok, error, unknown, timeout, unsupported. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--max-result` | string | Optional | Maximum number of rows to list. Use 0 for no limit, or for the most a program running tdk allows. Defaults to `100`. |
| `--filter` | string | Optional | Filter on a field, with OP one of eq, ne, gt, ge, lt, le, lk, btw, is. Repeatable: conditions on different fields must all hold, conditions on the same field are alternatives. Combines with the command's own filters. |
| `--order-by` | string | Optional | Sort by a field, ascending (+, the default) or descending (-). |
| `--cursor` | string | Optional | Continue a listing from the 'next' cursor it returned, with the same filters and order. |
| `--fields` | string | Optional | Keep only these fields of each row, comma-separated; '?' lists the fields the rows have and 'all' keeps every one, which a program running tdk otherwise gets without the internal ids. Not in the table view. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
