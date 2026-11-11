# tdk connection validate

> Validate a connection YAML document against its connector schema

Source: https://docs.tabsdata.com/cli/tdk/connection/validate

Validate a connection YAML document against its connector schema

```bash
tdk connection validate \
  --format table \
  --file conn-postgres.yaml \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--file, -f` | string | Required | Connection YAML file to validate, or '-' to read from stdin. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
