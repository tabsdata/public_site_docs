# tdk info release-notes

> Show the release notes of the current version of tabsdata.

Source: https://docs.tabsdata.com/cli/tdk/info/release-notes

Show the release notes of the current version of tabsdata.

```bash
tdk info release-notes \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
