# tdk docs show

> Show the reference page of a symbol

Source: https://docs.tabsdata.com/cli/tdk/docs/show

Show the reference page of a symbol

```bash
tdk docs show \
  --name sales_data \
  --category category-example \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--name, -n` | string | Optional | Symbol whose page to show: a qualified or bare name, a 'Class.member', or a connection type id. Will be prompted for it if not provided. |
| `--category` | string | Optional | Restrict to one category of the reference. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
