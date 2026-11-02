# tdk project create

> Create a new project

Source: https://docs.tabsdata.com/cli/tdk/project/create

Create a new project

```bash
tdk project create \
  --name quickstart \
  --description Ingests raw sales data from Postgres \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--name, -n` | string | Required | Name of the project to create. |
| `--description` | string | Optional | Description of the project. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
