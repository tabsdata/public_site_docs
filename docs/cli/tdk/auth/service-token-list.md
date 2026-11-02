# tdk auth service-token list

> List your service tokens.

Source: https://docs.tabsdata.com/cli/tdk/auth/service-token-list

List your service tokens.

`Last used` has a resolution of ten minutes, which is what the rotation runbook needs to tell a retired token from one still in production.

```bash
tdk auth service-token list \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
