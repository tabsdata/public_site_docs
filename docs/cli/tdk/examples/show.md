# tdk examples show

> Print an example: the source of a snippet, or the README and function

Source: https://docs.tabsdata.com/cli/tdk/examples/show

Print an example: the source of a snippet, or the README and function

files of a project

```bash
tdk examples show \
  --name quickstart \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--name, -n` | string | Required | Name of the example to show. See 'tdk examples list'. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
