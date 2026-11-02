# tdk fnrun get

> Display a function run: its details plus its workers.

Source: https://docs.tabsdata.com/cli/tdk/fnrun/get

Display a function run: its details plus its workers.

```bash
tdk fnrun get \
  --fnrun fnr-27ac91 \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--fnrun` | string | Required | ID of the function run to display. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
