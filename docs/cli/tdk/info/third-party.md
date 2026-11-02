# tdk info third-party

> Show the third-party dependencies of tabsdata.

Source: https://docs.tabsdata.com/cli/tdk/info/third-party

Show the third-party dependencies of tabsdata.

```bash
tdk info third-party \
  --wide \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--wide` | flag | Optional | Show the license column at its full width, instead of wrapping it. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
