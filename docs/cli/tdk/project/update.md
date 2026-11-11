# tdk project update

> Update a project by name

Source: https://docs.tabsdata.com/cli/tdk/project/update

Update a project by name

```bash
tdk project update \
  --format table \
  --name quickstart \
  --new-name sales_data_v2 \
  --description Ingests raw sales data from Postgres \
  --secrets-file secrets_file-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Required | Name of the project to update. |
| `--new-name` | string | Optional | New name for the project. |
| `--description` | string | Optional | New description for the project. |
| `--secrets-file` | string | Optional | YAML file with the secrets of the project, or '-' for stdin. Maps each secret to its keys and each key to its value. A value '$secret:VARIABLE' is read from that environment variable; a key with no value keeps the value already stored (empty if there is none). Replaces all the secrets of the project. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
