# tdk stream enable

> Enable a stream-publisher function

Source: https://docs.tabsdata.com/cli/tdk/stream/enable

Enable a stream-publisher function

'tdk fn enable' restricted to stream publishers; enabling an already-enabled one does nothing.

```bash
tdk stream enable \
  --proj quickstart \
  --name sales_data \
  --coll sales_data \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Optional | Name of the stream-publisher function to enable. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
