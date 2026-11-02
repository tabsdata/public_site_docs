# tdk auth add-cert

> Add a certificate for a Tabsdata Server.

Source: https://docs.tabsdata.com/cli/tdk/auth/add-cert

Add a certificate for a Tabsdata Server.

Only needed for self-signed certificates.

```bash
tdk auth add-cert \
  --server https://tabsdata.example.com \
  --pem ./certs/server.pem \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--server, -s` | string | Required | Tabsdata Server URL |
| `--pem` | string | Required | Path to the certificate PEM file, or '-' to read it from stdin. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
