# tdk user update

> Update a user by name

Source: https://docs.tabsdata.com/cli/tdk/user/update

Update a user by name

```bash
tdk user update \
  --name admin \
  --full-name Jane Smith \
  --email admin@example.com \
  --password tabsdata \
  --enabled enabled-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--name, -n` | string | Required | Name of the user to update. |
| `--full-name, -f` | string | Optional | New full name of the user. |
| `--email, -e` | string | Optional | New email of the user. |
| `--password, -p` | string | Optional | New password for the user. |
| `--enabled` | string | Optional | Indicate if the user is enabled or disabled |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
