# tdkserver trash

> Trash a local kminus tabsdata instance, moving its folder to the trash. A running instance is stopped first. An instance created by another tabsdata version, or whose settings cannot be read, only gets a best-effort stop of its kminus cluster, after a confirmation. If the stop fails, trashing it needs another confirmation, as processes and stale files may be left behind; on Windows, files they hold open can make the trash fail. Pass -y to confirm every prompt.

Source: https://docs.tabsdata.com/cli/tdkserver/trash

Trash a local kminus tabsdata instance, moving its folder to the trash. A running instance is stopped first. An instance created by another tabsdata version, or whose settings cannot be read, only gets a best-effort stop of its kminus cluster, after a confirmation. If the stop fails, trashing it needs another confirmation, as processes and stale files may be left behind; on Windows, files they hold open can make the trash fail. Pass -y to confirm every prompt.

```bash
tdkserver trash \
  --instance tabsdata \
  --details true \
  --yes true \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | string | Optional | Name of the instance to trash. Defaults to 'tabsdata'. |
| `--details` | true \| false | Optional | Show the summary of resolved values before trashing the instance. Defaults to 'true'. Pass '--details false' to skip the summary. |
| `-y, --yes` | true \| false | Optional | Skip the interactive confirmation prompt and proceed immediately. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
