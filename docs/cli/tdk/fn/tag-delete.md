# tdk fn tag delete

> Remove a user tag

Source: https://docs.tabsdata.com/cli/tdk/fn/tag-delete

Remove a user tag

```bash
tdk fn tag delete \
  --proj quickstart \
  --name read_world \
  --coll <function pinned.<locals>.default at 0x10b617ba0> \
  --format table \
  --key key-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Optional | Name of the function whose tags to use. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. Defaults to `<function pinned.<locals>.default at 0x10b617ba0>`. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--key, -k` | string | Optional | Key of the tag. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
