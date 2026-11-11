# tdk metrics inflight

> Point-in-time `/inflight` — non-terminal LFRs per

Source: https://docs.tabsdata.com/cli/tdk/metrics/inflight

Point-in-time `/inflight` — non-terminal LFRs per

(collection, group, status).

```bash
tdk metrics inflight \
  --proj quickstart \
  --all-projects \
  --collection sales_data \
  --collection-exclude staging_data \
  --group sources \
  --group-exclude destinations \
  --status status-example \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--all-projects` | flag | Optional | List across every project you can view, ignoring any pinned or --proj project. |
| `--collection` | string | Optional | Comma-separated collection ids to include. |
| `--collection-exclude` | string | Optional | Comma-separated collection ids to exclude. |
| `--group` | string | Optional | Comma-separated group ids to include. |
| `--group-exclude` | string | Optional | Comma-separated group ids to exclude. |
| `--status` | string | Optional | Comma-separated non-terminal function run statuses to include (e.g. `S,R,H`). |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
