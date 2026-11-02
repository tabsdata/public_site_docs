# tdk about

> Show build metadata and system information.

Source: https://docs.tabsdata.com/cli/tdk/about

Show build metadata and system information.

```bash
tdk about \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
