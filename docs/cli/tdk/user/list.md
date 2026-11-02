# tdk user list

> List all users

Source: https://docs.tabsdata.com/cli/tdk/user/list

List all users

```bash
tdk user list \
  --format table \
  --max-result 100 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--max-result` | string | Optional | Maximum number of rows to list. Use 0 for no limit. Defaults to `100`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
