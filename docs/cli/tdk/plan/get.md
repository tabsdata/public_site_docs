# tdk plan get

> Display a plan: its details plus its function runs and workers.

Source: https://docs.tabsdata.com/cli/tdk/plan/get

Display a plan: its details plus its function runs and workers.

```bash
tdk plan get \
  --plan pln-3f9a2b \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--plan` | string | Required | ID of the plan to display. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
