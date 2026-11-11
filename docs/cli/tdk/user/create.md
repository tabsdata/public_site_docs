# tdk user create

> Create a new user

Source: https://docs.tabsdata.com/cli/tdk/user/create

Create a new user

```bash
tdk user create \
  --format table \
  --name admin \
  --full-name Jane Smith \
  --email admin@example.com \
  --password tabsdata \
  --disabled \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Required | Name of the user to create. |
| `--full-name, -f` | string | Required | Full name of the user. |
| `--email, -e` | string | Required | Email of the user. |
| `--password, -p` | string | Optional | Password for the user. Will be prompted for it if not provided. |
| `--disabled` | flag | Optional | Disable the user. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
