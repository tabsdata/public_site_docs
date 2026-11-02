# tdk metrics inflight

> Point-in-time `/inflight` — non-terminal LFRs per

Source: https://docs.tabsdata.com/cli/tdk/metrics/inflight

Point-in-time `/inflight` — non-terminal LFRs per

(collection, group, status).

```bash
tdk metrics inflight \
  --proj quickstart \
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
| `--collection` | string | Optional | Comma-separated collection ids to include. |
| `--collection-exclude` | string | Optional | Comma-separated collection ids to exclude. |
| `--group` | string | Optional | Comma-separated group ids to include. |
| `--group-exclude` | string | Optional | Comma-separated group ids to exclude. |
| `--status` | string | Optional | Comma-separated non-terminal function run statuses to include (e.g. `S,R,H`). |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
