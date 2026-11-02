# tdk fn enable

> Enables a function

Source: https://docs.tabsdata.com/cli/tdk/fn/enable

Enables a function

Enabling an already-enabled function does nothing.

```bash
tdk fn enable \
  --proj quickstart \
  --name read_world \
  --coll sales_data \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Required | Name of the function to enable. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
