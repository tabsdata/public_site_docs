# tdk permission list

> List a user's permissions, or who has access to a project

Source: https://docs.tabsdata.com/cli/tdk/permission/list

List a user's permissions, or who has access to a project

```bash
tdk permission list \
  --user admin \
  --proj quickstart \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--user, -u` | string | Optional | List the effective flat permissions of this user. NOTE: This argument is mutually exclusive with arguments: \[project\]. |
| `--proj, -P` | string | Optional | List everyone with authority on this project. NOTE: This argument is mutually exclusive with arguments: \[user\]. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
