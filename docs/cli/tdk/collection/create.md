# tdk collection create

> Create a new collection

Source: https://docs.tabsdata.com/cli/tdk/collection/create

Create a new collection

```bash
tdk collection create \
  --proj quickstart \
  --format table \
  --name sales_data \
  --description Ingests raw sales data from Postgres \
  --group sources \
  --storage-path /prod \
  --conn-file conn-postgres.yaml \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Optional | Name of the collection to create. Defaults to `<function pinned.<locals>.default at 0x105b96700>`. |
| `--description` | string | Optional | Description of the collection. |
| `--group` | string | Optional | Name of the group to assign. Defaults to 'default' when omitted. Use 'tdk group list' to see available groups. |
| `--storage-path` | string | Optional | Logical storage prefix for the collection's artifacts. Defaults to '/'. The physical backend is selected by the server's configured mounts. |
| `--conn-file` | string | Optional | Connection YAML document ('-' to read from stdin). Required for a source/destination collection — it is created WITH its connection. The connection is validated and dehydrated client-side; secret values are stripped into the secret payload. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
