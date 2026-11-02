# tdk metrics show

> Per-collection (or per-group) operational summary over the window.

Source: https://docs.tabsdata.com/cli/tdk/metrics/show

Per-collection (or per-group) operational summary over the window.

Renders one row per `(dim_entity, status)` with `Runs / Txns / Tables in / Rows in / Tables out / Rows out` (bytes columns added when any non-zero). Edges are dropped from the rendering — they belong in a flow visualization; use `-o json` for the raw shape.

```bash
tdk metrics show \
  --proj quickstart \
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
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
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
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
