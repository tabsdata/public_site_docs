# tdk examples extract

> Extract an example into a new directory

Source: https://docs.tabsdata.com/cli/tdk/examples/extract

Extract an example into a new directory

```bash
tdk examples extract \
  --name quickstart \
  --dir ./qs-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--name, -n` | string | Required | Name of the example to extract. See 'tdk examples list'. |
| `--dir, -d` | string | Required | Directory to generate the example in. The directory must not exist beforehand, as it will be created by the CLI. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
