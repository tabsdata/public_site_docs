# tdk status

> Check the status of the server

Source: https://docs.tabsdata.com/cli/tdk/status

Check the status of the server

```bash
tdk status \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
