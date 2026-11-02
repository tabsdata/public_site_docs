# tdk group delete

> Delete a group by name. System groups cannot be deleted.

Source: https://docs.tabsdata.com/cli/tdk/group/delete

Delete a group by name. System groups cannot be deleted.

```bash
tdk group delete \
  --proj quickstart \
  --name bronze \
  --confirm delete \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Required | Name of the group to delete. |
| `--confirm` | string | Required | Write 'delete' to confirm deletion. Will be prompted for it if not provided. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
