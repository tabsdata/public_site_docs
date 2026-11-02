# tdkserver unset

> Unset a session setting

Source: https://docs.tabsdata.com/cli/tdkserver/unset

Unset a session setting

```bash
tdkserver unset \
  --instance \
  --provider \
  --kubeconfig \
  --context \
  --namespace \
  --save \
  --details \
  --autoconfirm \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | flag | Optional |  |
| `--provider` | flag | Optional |  |
| `--kubeconfig` | flag | Optional |  |
| `--context` | flag | Optional |  |
| `--namespace` | flag | Optional |  |
| `--save` | flag | Optional |  |
| `--details` | flag | Optional |  |
| `--autoconfirm` | flag | Optional |  |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
