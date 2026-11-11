# tdk fn disable

> Disables a function

Source: https://docs.tabsdata.com/cli/tdk/fn/disable

Disables a function

Disabling an already-disabled function does nothing.

```bash
tdk fn disable \
  --proj quickstart \
  --format table \
  --name read_world \
  --coll <function pinned.<locals>.default at 0x10b614d60> \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Required | Name of the function to disable. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. Defaults to `<function pinned.<locals>.default at 0x10b614d60>`. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
