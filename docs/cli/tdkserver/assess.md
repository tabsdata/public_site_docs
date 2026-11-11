# tdkserver assess

> Check whether a tabsdata instance can be created

Source: https://docs.tabsdata.com/cli/tdkserver/assess

Check whether a tabsdata instance can be created

```bash
tdkserver assess \
  --instance tabsdata \
  --provider kminus \
  --context docker-desktop \
  --kubeconfig ~/.kube/config \
  --current \
  --namespace tabsdata \
  --loglevel info \
  --explain \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | string | Optional | Name of the instance whose creation is assessed. Defaults to 'tabsdata'. |
| `--provider` | kminus \| eks \| aks \| gke | Optional | Provider of the cluster: 'kminus' for a development kminus cluster, 'eks' for AWS EKS, 'aks' for Azure AKS, 'gke' for Google GKE. When unspecified, the value from the active tabsdata session is taken; when no active tabsdata session is set, this argument is required. |
| `--context` | string | Optional | Name of the kubeconfig context to use. Valid for every provider except 'kminus'. The context must reach a cluster run by the platform of --provider, as told by the provider ID of its nodes; a context of another platform is rejected. Mutually exclusive with --current. Composes with --kubeconfig. |
| `--kubeconfig` | string | Optional | Path to a kubeconfig file. Valid for every provider except 'kminus'. When unspecified, the file pointed to by the KUBECONFIG environment variable, or ~/.kube/config, is used. Composes with --context and --current. |
| `--current` | flag | Optional | Use the current-context entry of the kubeconfig file. Valid for every provider except 'kminus'. As with --context, it must reach a cluster run by the platform of --provider. Mutually exclusive with --context. Composes with --kubeconfig. |
| `--namespace` | string | Optional | Namespace for the instance. Valid for every provider except 'kminus'. Overrides the namespace defined in the kubeconfig context. When neither is set, the kubernetes default namespace is used. |
| `--loglevel` | trace \| debug \| info \| warn \| error | Optional | Log level for the kminus orchestrator and pod runner. Defaults to 'debug'. Only valid with the 'kminus' provider.      Example:     tdkserver assess --provider kminus --loglevel info |
| `--explain` | flag | Optional | Explain what every check asks, after the report. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
