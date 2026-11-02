# tdk cron enable

> Enable a cron-triggered function

Source: https://docs.tabsdata.com/cli/tdk/cron/enable

Enable a cron-triggered function

'tdk fn enable' restricted to functions that have a cron trigger; enabling an already-enabled one does nothing.

```bash
tdk cron enable \
  --proj quickstart \
  --name sales_data \
  --coll sales_data \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Optional | Name of the cron-triggered function to enable. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
