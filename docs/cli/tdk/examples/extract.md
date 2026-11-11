# tdk examples extract

> Extract an example into a directory

Source: https://docs.tabsdata.com/cli/tdk/examples/extract

Extract an example into a directory

```bash
tdk examples extract \
  --format table \
  --name quickstart \
  --dir ./qs-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Required | Name of the example to extract. See 'tdk examples list'. |
| `--dir, -d` | string | Required | Directory to extract the example into. A snippet is written as 'DIR/NAME.py' (the directory may exist); a project needs a directory that does not exist yet. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
