# tdk fn delete

> Delete a function

Source: https://docs.tabsdata.com/cli/tdk/fn/delete

Delete a function

```bash
tdk fn delete \
  --proj quickstart \
  --name read_world \
  --coll sales_data \
  --confirm delete \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Required | Name of the function to be deleted. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. |
| `--confirm` | string | Required | Write 'delete' to confirm deletion. Will be prompted for it if not provided. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
