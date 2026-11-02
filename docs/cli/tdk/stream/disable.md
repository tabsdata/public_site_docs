# tdk stream disable

> Disable a stream-publisher function

Source: https://docs.tabsdata.com/cli/tdk/stream/disable

Disable a stream-publisher function

'tdk fn disable' restricted to stream publishers; disabling an already-disabled one does nothing.

```bash
tdk stream disable \
  --proj quickstart \
  --name sales_data \
  --coll sales_data \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Optional | Name of the stream-publisher function to disable. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
