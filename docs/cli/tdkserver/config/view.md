# tdkserver config view

> View the configmaps of a tabsdata instance

Source: https://docs.tabsdata.com/cli/tdkserver/config/view

View the configmaps of a tabsdata instance

```bash
tdkserver config view \
  --instance tabsdata \
  --with-secrets true \
  --with-protected true \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | string | Optional | Name of the instance whose configmaps are viewed. Defaults to 'tabsdata'. |
| `--with-secrets` | true \| false | Optional | Show secret values resolved. Values resolved only when applied are shown unresolved. Defaults to 'false'. |
| `--with-protected` | true \| false | Optional | Show protected values resolved. Protected values are derived by the system and cannot be edited, and are shown as their placeholder unless this flag is given. Defaults to 'false'. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
