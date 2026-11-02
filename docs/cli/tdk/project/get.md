# tdk project get

> Display a project by name

Source: https://docs.tabsdata.com/cli/tdk/project/get

Display a project by name

```bash
tdk project get \
  --format table \
  --name quickstart \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--name, -n` | string | Required | Name of the project to display. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
