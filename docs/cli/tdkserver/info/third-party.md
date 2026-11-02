# tdkserver info third-party

> Show the third-party dependencies of tabsdata

Source: https://docs.tabsdata.com/cli/tdkserver/info/third-party

Show the third-party dependencies of tabsdata

```bash
tdkserver info third-party \
  --wide \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--wide` | flag | Optional | Show the license column at its full width, instead of wrapping it. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
