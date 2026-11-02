# tdkserver stubs

> Copy the configuration stubs for '--config' into the tabsdata home folder

Source: https://docs.tabsdata.com/cli/tdkserver/stubs

Copy the configuration stubs for '--config' into the tabsdata home folder

```bash
tdkserver stubs \
  --yes true \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-y, --yes` | true \| false | Optional | Skip the interactive confirmation prompt and replace an existing stubs folder immediately. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
