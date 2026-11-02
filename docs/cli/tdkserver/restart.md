# tdkserver restart

> Restart a tabsdata instance

Source: https://docs.tabsdata.com/cli/tdkserver/restart

Restart a tabsdata instance

```bash
tdkserver restart \
  --instance tabsdata \
  --loglevel info \
  --details true \
  --yes true \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | string | Optional | Name of the instance to restart. Defaults to 'tabsdata'. |
| `--loglevel` | trace \| debug \| info \| warn \| error | Optional | Log level for the kminus orchestrator and pod runner. When given, it is applied and saved as the instance's new log level; otherwise the saved value is used. Only valid with the 'kminus' provider.      Example:     tdk restart --loglevel info |
| `--details` | true \| false | Optional | Show the summary of resolved values before restarting the instance. Defaults to 'true'. Pass '--details false' to skip the summary. |
| `-y, --yes` | true \| false | Optional | Skip the interactive confirmation prompt and proceed immediately. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
