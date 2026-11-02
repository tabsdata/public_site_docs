# tdkserver help

> Show the commands of tabsdata on kubernetes

Source: https://docs.tabsdata.com/cli/tdkserver/help

Show the commands of tabsdata on kubernetes

```bash
tdkserver help \
  --full \
  --format table \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--full` | flag | Optional | Print the help of every command and subcommand, instead of the summary help. |
| `--format` | table \| json \| yaml | Optional | Format of the full help: text or json. Valid only together with --full. Defaults to `text`. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
