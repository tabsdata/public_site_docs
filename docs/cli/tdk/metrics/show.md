# tdk metrics show

> Per-collection (or per-group) operational summary over the window.

Source: https://docs.tabsdata.com/cli/tdk/metrics/show

Per-collection (or per-group) operational summary over the window.

Renders one row per `(dim_entity, status)` with `Runs / Tables in / Rows in / Tables out / Rows out` (bytes columns added when any non-zero). Edges are dropped from the rendering — they belong in a flow visualization; use `-o json` for the raw shape.

```bash
tdk metrics show \
  --proj quickstart \
  --all-projects \
  --dim collection \
  --unit day \
  --align calendar \
  --from from-example \
  --span 7d \
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
| `--dim` | collection \| group | Optional | Breakout dimension. Defaults to `collection` server-side. |
| `--unit` | hour \| day \| week \| month \| quarter \| year | Optional | Window unit. Defaults to `day` server-side. |
| `--align` | calendar \| rolling | Optional | `calendar` (default) snaps the start of the window to the calendar-unit boundary containing `from` (week/month/quarter/year-to-date); `rolling` is a fixed `span*unit`\-long window ending exactly at `from`. |
| `--from` | string | Optional | Right edge of the window (UTC epoch ms, exclusive). Defaults to server-now. Pass a past instant to look at a past window. |
| `--span` | string | Optional | Window width in `unit`s. Default 1. |
| `--collection` | string | Optional | Comma-separated collection ids to include. |
| `--collection-exclude` | string | Optional | Comma-separated collection ids to exclude. |
| `--group` | string | Optional | Comma-separated group ids to include. |
| `--group-exclude` | string | Optional | Comma-separated group ids to exclude. |
| `--status` | string | Optional | Comma-separated function run statuses to include (e.g. `C,D,E`). |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
