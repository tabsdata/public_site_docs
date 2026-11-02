# tdk settings

> Show the current settings.

Source: https://docs.tabsdata.com/cli/tdk/settings

Show the current settings.

The machine formats mirror what the profile's options file stores, plus the profile itself.

```bash
tdk settings \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
