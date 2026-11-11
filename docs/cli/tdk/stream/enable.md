# tdk stream enable

> Enable a stream-publisher function

Source: https://docs.tabsdata.com/cli/tdk/stream/enable

Enable a stream-publisher function

'tdk fn enable' restricted to stream publishers; enabling an already-enabled one does nothing.

```bash
tdk stream enable \
  --proj quickstart \
  --format table \
  --name sales_data \
  --coll <function pinned.<locals>.default at 0x10b6c9c60> \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Optional | Name of the stream-publisher function to enable. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. Defaults to `<function pinned.<locals>.default at 0x10b6c9c60>`. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
