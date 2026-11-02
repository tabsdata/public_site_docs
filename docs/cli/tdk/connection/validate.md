# tdk connection validate

> Validate a connection YAML document against its connector schema

Source: https://docs.tabsdata.com/cli/tdk/connection/validate

Validate a connection YAML document against its connector schema

```bash
tdk connection validate \
  --file conn-postgres.yaml \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--file, -f` | string | Required | Connection YAML file to validate, or '-' to read from stdin. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
