# tdk info third-party

> Show the third-party dependencies of tabsdata.

Source: https://docs.tabsdata.com/cli/tdk/info/third-party

Show the third-party dependencies of tabsdata.

```bash
tdk info third-party \
  --format table \
  --wide \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--wide` | flag | Optional | Show the license column at its full width, instead of wrapping it. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
