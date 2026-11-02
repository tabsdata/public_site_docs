# tdk collection update

> Update a collection by name

Source: https://docs.tabsdata.com/cli/tdk/collection/update

Update a collection by name

```bash
tdk collection update \
  --proj quickstart \
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
| `--name, -n` | string | Optional | Name of the collection to update. |
| `--new-name` | string | Optional | New name for the collection. |
| `--description` | string | Optional | New description for the collection. |
| `--storage-path` | string | Optional | New logical storage prefix for the collection's artifacts. Existing data versions keep their stamped path; only new artifacts use the new prefix. |
| `--conn-file` | string | Optional | Connection YAML document ('-' to read from stdin) to create or replace the source/destination collection's connection. Validated and dehydrated client-side; secret values are stripped into the secret payload. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
