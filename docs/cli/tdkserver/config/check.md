# tdkserver config check

> Check the values still to be provided in the configs of a tabsdata instance

Source: https://docs.tabsdata.com/cli/tdkserver/config/check

Check the values still to be provided in the configs of a tabsdata instance

```bash
tdkserver config check \
  --instance tabsdata \
  --init \
  --edit \
  --all true \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | string | Optional | Name of the instance whose configs are checked. Defaults to 'tabsdata'. |
| `--init` | flag | Optional | Check the configs of the instance creation input. This is the default. |
| `--edit` | flag | Optional | Check the configs of the instance edition input, instead of the creation one. |
| `--all` | true \| false | Optional | Show also the values already provided, besides the pending ones. Defaults to 'false'. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
