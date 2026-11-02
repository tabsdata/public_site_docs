# tdkserver inspect

> Show the configuration and state of a tabsdata instance

Source: https://docs.tabsdata.com/cli/tdkserver/inspect

Show the configuration and state of a tabsdata instance

```bash
tdkserver inspect \
  --instance tabsdata \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | string | Optional | Registered instance name. When omitted, the set default instance is used; when no instance is set, the 'tabsdata' instance is used. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
