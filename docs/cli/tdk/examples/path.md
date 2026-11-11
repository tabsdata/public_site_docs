# tdk examples path

> Print the absolute path of the examples directory, or of one example

Source: https://docs.tabsdata.com/cli/tdk/examples/path

Print the absolute path of the examples directory, or of one example

```bash
tdk examples path \
  --name quickstart \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--name, -n` | string | Optional | Name of the example whose path to print. Default: the examples directory. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
