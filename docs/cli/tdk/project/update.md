# tdk project update

> Update a project by name

Source: https://docs.tabsdata.com/cli/tdk/project/update

Update a project by name

```bash
tdk project update \
  --name quickstart \
  --new-name sales_data_v2 \
  --description Ingests raw sales data from Postgres \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--name, -n` | string | Required | Name of the project to update. |
| `--new-name` | string | Optional | New name for the project. |
| `--description` | string | Optional | New description for the project. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
