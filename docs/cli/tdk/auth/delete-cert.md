# tdk auth delete-cert

> Delete a certificate for a Tabsdata Server

Source: https://docs.tabsdata.com/cli/tdk/auth/delete-cert

Delete a certificate for a Tabsdata Server

```bash
tdk auth delete-cert \
  --server https://tabsdata.example.com \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--server, -s` | string | Required | Tabsdata Server URL |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
