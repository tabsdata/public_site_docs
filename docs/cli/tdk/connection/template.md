# tdk connection template

> Print a fill-in connection template for a connector type

Source: https://docs.tabsdata.com/cli/tdk/connection/template

Print a fill-in connection template for a connector type

```bash
tdk connection template \
  --type postgres-sql-in \
  --file conn-postgres.yaml \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--type, -t` | string | Optional | Connector type, e.g. 'mysql-sql-in', 's3-file-out'. See 'tdk connection types'. |
| `--file, -f` | string | Optional | Write the template to this file. '-' (or omitting it) writes to stdout. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
