# tdkserver config put

> Replace the configmaps of a tabsdata instance from edited files

Source: https://docs.tabsdata.com/cli/tdkserver/config/put

Replace the configmaps of a tabsdata instance from edited files

```bash
tdkserver config put \
  --instance tabsdata \
  --apply true \
  --details true \
  --yes true \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | string | Optional | Name of the instance whose configmaps are replaced. Defaults to 'tabsdata'. |
| `--apply` | true \| false | Optional | Restart the instance after replacing the configmaps. Defaults to 'false'. |
| `--details` | true \| false | Optional | Show the summary of resolved values before replacing the configmaps. Defaults to 'true'. Pass '--details false' to skip the summary. |
| `-y, --yes` | true \| false | Optional | Skip the interactive confirmation prompt and proceed immediately. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
