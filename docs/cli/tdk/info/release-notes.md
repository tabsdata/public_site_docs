# tdk info release-notes

> Show the release notes of the current version of tabsdata.

Source: https://docs.tabsdata.com/cli/tdk/info/release-notes

Show the release notes of the current version of tabsdata.

```bash
tdk info release-notes \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
