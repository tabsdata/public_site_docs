# tdk permission list

> List a user's permissions, or who has access to a project

Source: https://docs.tabsdata.com/cli/tdk/permission/list

List a user's permissions, or who has access to a project

```bash
tdk permission list \
  --user admin \
  --proj quickstart \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--user, -u` | string | Optional | List the effective flat permissions of this user. NOTE: This argument is mutually exclusive with arguments: \[project\]. |
| `--proj` | string | Optional | List everyone with authority on this project. NOTE: This argument is mutually exclusive with arguments: \[user\]. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
