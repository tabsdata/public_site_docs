# tdkserver set

> Set a session setting used when commands omit it

Source: https://docs.tabsdata.com/cli/tdkserver/set

Set a session setting used when commands omit it

```bash
tdkserver set \
  --instance tabsdata \
  --provider kminus \
  --kubeconfig ~/.kube/config \
  --context docker-desktop \
  --namespace tabsdata \
  --save true \
  --details true \
  --autoconfirm true \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | string | Optional | Set the instance name used when a command omits --instance. |
| `--provider` | kminus \| eks \| aks \| gke | Optional | Set the provider used when a command omits --provider. |
| `--kubeconfig` | string | Optional | Set the kubeconfig path used when a command omits --kubeconfig. |
| `--context` | string | Optional | Set the kubeconfig context used when a command omits --context. |
| `--namespace` | string | Optional | Set the namespace used when a command omits --namespace. |
| `--save` | true \| false | Optional | Set the --save value used when a command omits --save. |
| `--details` | true \| false | Optional | Set the --details value used when a command omits --details. |
| `--autoconfirm` | true \| false | Optional | Set the autoconfirm value (accepting 'true'/'false') used as the default for --yes when a command omits it. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
