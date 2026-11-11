# tdk connection template

> Print a fill-in connection template for a connector type

Source: https://docs.tabsdata.com/cli/tdk/connection/template

Print a fill-in connection template for a connector type

```bash
tdk connection template \
  --type postgres-sql-in \
  --format table \
  --file conn-postgres.yaml \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--type, -t` | string | Optional | Connector type, e.g. 'mysql-sql-in', 's3-file-out'. See 'tdk connection types'. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--file, -f` | string | Optional | Write the template to this file. '-' (or omitting it) writes to stdout. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
