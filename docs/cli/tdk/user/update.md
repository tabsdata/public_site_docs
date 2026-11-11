# tdk user update

> Update a user by name

Source: https://docs.tabsdata.com/cli/tdk/user/update

Update a user by name

```bash
tdk user update \
  --format table \
  --name admin \
  --full-name Jane Smith \
  --email admin@example.com \
  --password tabsdata \
  --enabled enabled-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Required | Name of the user to update. |
| `--full-name, -f` | string | Optional | New full name of the user. |
| `--email, -e` | string | Optional | New email of the user. |
| `--password, -p` | string | Optional | New password for the user. |
| `--enabled` | string | Optional | Indicate if the user is enabled or disabled |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
