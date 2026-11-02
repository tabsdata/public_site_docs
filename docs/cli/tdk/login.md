# tdk login

> Login to the Tabsdata Server

Source: https://docs.tabsdata.com/cli/tdk/login

Login to the Tabsdata Server

```bash
tdk login \
  --server https://tabsdata.example.com \
  --user admin \
  --password tabsdata \
  --token token-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--server, -s` | string | Optional | URL of the Tabsdata Server. Defaults to the server set with 'tdk set --server'; will be prompted for it if neither is provided. If omitted, the protocol defaults to 'http://' and the port to 2457. |
| `--user, -u` | string | Required | Username for the Tabsdata Server. Will be prompted for it if not provided. |
| `--password, -p` | string | Required | Password for the Tabsdata Server. It is discouraged to send the password as a plain argument, it should be either sent as the value of an environment variable or written through the prompt. Will be prompted for it if not provided. |
| `--token` | string | Optional | Log in with a service token instead of a username and password, for automation. Reads TDK\_TOKEN when the option is given no value. A token session is never renewed: it works until the token expires or is revoked. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
