# tdk project tag set

> Set a user tag, replacing its value if the key is set

Source: https://docs.tabsdata.com/cli/tdk/project/tag-set

Set a user tag, replacing its value if the key is set

```bash
tdk project tag set \
  --proj quickstart \
  --format table \
  --key key-example \
  --value  \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--key, -k` | string | Optional | Key of the tag. |
| `--value, -v` | string | Optional | Value of the tag. Defaults to \`\`. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
