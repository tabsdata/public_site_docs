# tdk group get

> Display a group by name

Source: https://docs.tabsdata.com/cli/tdk/group/get

Display a group by name

```bash
tdk group get \
  --proj quickstart \
  --format table \
  --name bronze \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--name, -n` | string | Required | Name of the group to display. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
