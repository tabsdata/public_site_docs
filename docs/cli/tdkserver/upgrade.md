# tdkserver upgrade

> Upgrade a tabsdata instance to the running tabsdata version

Source: https://docs.tabsdata.com/cli/tdkserver/upgrade

Upgrade a tabsdata instance to the running tabsdata version

```bash
tdkserver upgrade \
  --instance tabsdata \
  --apply true \
  --unlock true \
  --details true \
  --yes true \
  --uv-index uv_index-example \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | string | Optional | Name of the instance to upgrade. Defaults to 'tabsdata'. |
| `--apply` | true \| false | Optional | Start the instance once the upgrade completes. Defaults to 'false'. |
| `--unlock` | true \| false | Optional | Take over the upgrade lock of an interrupted upgrade and carry on. The version the instance is being upgraded to is kept, so only a tabsdata of that version can resume it. Does nothing when no lock is held. |
| `--details` | true \| false | Optional | Show the summary of resolved values before the upgrade. Defaults to 'true'. Pass '--details false' to skip the summary. |
| `-y, --yes` | true \| false | Optional | Accept every confirmation prompt and proceed immediately. |
| `--uv-index` | string | Optional | Python package index the rebuilt virtual environments resolve from. The URI is set as the 'UV\_INDEX' global environment variable of the instance, which every container of every pod receives, and it takes precedence over the 'UV\_INDEX' and 'PIP\_INDEX\_URL' variables of this machine.      Only valid for a 'kminus' instance with 'TD\_KUBE\_UV\_MODE' unset, because only then are the packages resolved from this machine's environment.      Example:     tdk upgrade --uv-index [http://localhost:8000/+simple](http://localhost:8000/+simple) |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
