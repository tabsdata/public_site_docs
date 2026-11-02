# tdk user delete

> Delete a user by name

Source: https://docs.tabsdata.com/cli/tdk/user/delete

Delete a user by name

```bash
tdk user delete \
  --name admin \
  --confirm delete \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--name, -n` | string | Required | Name of the user to delete. |
| `--confirm` | string | Required | Write 'delete' to confirm deletion. Will be prompted for it if not provided. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
