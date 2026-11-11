# tdk collection tag delete

> Remove a user tag

Source: https://docs.tabsdata.com/cli/tdk/collection/tag-delete

Remove a user tag

```bash
tdk collection tag delete \
  --proj quickstart \
  --name sales_data \
  --format table \
  --key key-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Optional | Name of the collection whose tags to use. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--key, -k` | string | Optional | Key of the tag. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
