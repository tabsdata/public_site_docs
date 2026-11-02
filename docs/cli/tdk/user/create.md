# tdk user create

> Create a new user

Source: https://docs.tabsdata.com/cli/tdk/user/create

Create a new user

```bash
tdk user create \
  --name admin \
  --full-name Jane Smith \
  --email admin@example.com \
  --password tabsdata \
  --disabled \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--name, -n` | string | Required | Name of the user to create. |
| `--full-name, -f` | string | Required | Full name of the user. |
| `--email, -e` | string | Required | Email of the user. |
| `--password, -p` | string | Optional | Password for the user. Will be prompted for it if not provided. |
| `--disabled` | flag | Optional | Disable the user. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
