# tdk project create

> Create a new project

Source: https://docs.tabsdata.com/cli/tdk/project/create

Create a new project

```bash
tdk project create \
  --format table \
  --name quickstart \
  --description Ingests raw sales data from Postgres \
  --secrets-file secrets_file-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Required | Name of the project to create. |
| `--description` | string | Optional | Description of the project. |
| `--secrets-file` | string | Optional | YAML file with the secrets of the project, or '-' for stdin. Maps each secret to its keys and each key to its value. A value '$secret:VARIABLE' is read from that environment variable; a key with no value keeps the value already stored (empty if there is none). |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
