# tdk auth add-cert

> Add a certificate for a Tabsdata Server.

Source: https://docs.tabsdata.com/cli/tdk/auth/add-cert

Add a certificate for a Tabsdata Server.

Only needed for self-signed certificates.

```bash
tdk auth add-cert \
  --format table \
  --server https://tabsdata.example.com \
  --pem ./certs/server.pem \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--server, -s` | string | Required | Tabsdata Server URL |
| `--pem` | string | Required | Path to the certificate PEM file, or '-' to read it from stdin. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
