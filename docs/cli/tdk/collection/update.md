# tdk collection update

> Update a collection by name

Source: https://docs.tabsdata.com/cli/tdk/collection/update

Update a collection by name

```bash
tdk collection update \
  --proj quickstart \
  --format table \
  --name sales_data \
  --new-name sales_data_v2 \
  --description Ingests raw sales data from Postgres \
  --storage-path /prod \
  --conn-file conn-postgres.yaml \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Optional | Name of the collection to update. Defaults to `<function pinned.<locals>.default at 0x105b977e0>`. |
| `--new-name` | string | Optional | New name for the collection. |
| `--description` | string | Optional | New description for the collection. |
| `--storage-path` | string | Optional | New logical storage prefix for the collection's artifacts. Existing data versions keep their stamped path; only new artifacts use the new prefix. |
| `--conn-file` | string | Optional | Connection YAML document ('-' to read from stdin) to create or replace the source/destination collection's connection. Validated and dehydrated client-side; secret values are stripped into the secret payload. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
