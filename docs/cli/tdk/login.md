# tdk login

> Login to the Tabsdata Server

Source: https://docs.tabsdata.com/cli/tdk/login

Login to the Tabsdata Server

```bash
tdk login \
  --format table \
  --server https://tabsdata.example.com \
  --user admin \
  --password tabsdata \
  --token token-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--server, -s` | string | Optional | URL of the Tabsdata Server. Defaults to the server set with 'tdk set --server'; will be prompted for it if neither is provided. If omitted, the protocol defaults to 'http://' and the port to 2457. |
| `--user, -u` | string | Required | Username for the Tabsdata Server. Will be prompted for it if not provided. |
| `--password, -p` | string | Required | Password for the Tabsdata Server. Discouraged: a password on the command line stays in the shell history and is visible to other processes; let tdk prompt for it. Will be prompted for it if not provided. |
| `--token` | string | Optional | Log in with a service token instead of a username and password, for automation. Reads TDK\_TOKEN when the option is given no value. A token session is never renewed: it works until the token expires or is revoked. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
