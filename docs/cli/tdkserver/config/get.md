# tdkserver config get

> Download the configmaps of a tabsdata instance for editing

Source: https://docs.tabsdata.com/cli/tdkserver/config/get

Download the configmaps of a tabsdata instance for editing

```bash
tdkserver config get \
  --instance tabsdata \
  --with-secrets true \
  --force true \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | string | Optional | Name of the instance whose configmaps are downloaded. Defaults to 'tabsdata'. |
| `--with-secrets` | true \| false | Optional | Materialize secret values into the downloaded files. Values the user cannot modify are kept as placeholders. Defaults to 'false'. |
| `--force` | true \| false | Optional | Delete the existing edit folder without asking before downloading the configs. Defaults to 'false'. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
