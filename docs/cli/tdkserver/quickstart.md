# tdkserver quickstart

> Initialize, create and start a tabsdata instance in one step

Source: https://docs.tabsdata.com/cli/tdkserver/quickstart

Initialize, create and start a tabsdata instance in one step

```bash
tdkserver quickstart \
  --instance tabsdata \
  --loglevel info \
  --provider kminus \
  --context docker-desktop \
  --kubeconfig ~/.kube/config \
  --current \
  --namespace tabsdata \
  --port 2457 \
  --config tabsdata:pods.service.resources.memory=8Gi \
  --fill \
  --save true \
  --details true \
  --yes true \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | string | Optional | Name of the instance to initialize, create and start. Defaults to 'tabsdata'. |
| `--loglevel` | trace \| debug \| info \| warn \| error | Optional | Log level for the kminus orchestrator and pod runner. Defaults to 'debug'. Only valid with the 'kminus' provider.      Example:     tdkserver quickstart --provider kminus --loglevel info |
| `--provider` | kminus \| eks \| aks \| gke | Optional | Provider of the cluster: 'kminus' for a development kminus cluster, 'eks' for AWS EKS, 'aks' for Azure AKS, 'gke' for Google GKE. When unspecified, the value from the active tabsdata session is taken; when no active tabsdata session is set, this argument is required. |
| `--context` | string | Optional | Name of the kubeconfig context to use. Valid only for the cloud providers ('eks', 'aks', 'gke'). Mutually exclusive with --current. Composes with --kubeconfig. |
| `--kubeconfig` | string | Optional | Path to a kubeconfig file. Valid only for the cloud providers ('eks', 'aks', 'gke'). When unspecified, the file pointed to by the KUBECONFIG environment variable, or ~/.kube/config, is used. Composes with --context and --current. |
| `--current` | flag | Optional | Use the current-context entry of the kubeconfig file. Valid only for the cloud providers ('eks', 'aks', 'gke'). Mutually exclusive with --context. Composes with --kubeconfig. |
| `--namespace` | string | Optional | Namespace for the instance. Valid only for the cloud providers ('eks', 'aks', 'gke'). Overrides the namespace defined in the kubeconfig context. When neither is set, the kubernetes default namespace is used. |
| `--port` | integer | Optional | Base HTTP/HTTPS port. Ports for the instance services are assigned sequentially starting from this value. Defaults to `2457`. |
| `--anthropic-key` | string | Optional | Deprecated: use '--config anthropic-key=<KEY>' instead. Anthropic API key for the aiagent. Optional. |
| `--openai-key` | string | Optional | Deprecated: use '--config openai-key=<KEY>' instead. OpenAI API key for the aiagent. Optional. |
| `--uv-index` | string | Optional | Deprecated: use '--config tabsdata:pods.global.envs.UV\_INDEX=<URI>' instead. Python package index for the instance. The URI is set as the 'UV\_INDEX' global environment variable of the initialized instance, which every container of every pod receives, and it takes precedence over the 'UV\_INDEX' and 'PIP\_INDEX\_URL' variables of this machine.      Only valid with 'TD\_KUBE\_UV\_MODE' unset, because only then are the packages resolved from this machine's environment.      Example:     tdkserver quickstart --uv-index [http://localhost:8000/+simple](http://localhost:8000/+simple) |
| `--config` | string | Optional | Sets a value of the instance configuration. The value is written into the config files under 'init/input/configs' of the new instance before anything reads them. Repeat the option to set several values. Each value can be set only once, even with the same content. Every setting is checked before the instance folder is created, so an invalid setting leaves nothing behind.      A setting has the form ADDRESS=VALUE, where ADDRESS names what to set in one of three ways.      By placeholder category:     Config files hold placeholders such as '${{literal:tdk\_database\_host}}' or '${{secret:postgres\_system\_password}}'. The word before the colon is the placeholder kind (literal, literalAuto, secret or secretAuto can be set), and the word after it is the category. Naming the category sets every placeholder of that category, in every config file at once:       tdk\_database\_host=db.internal     The kind can be prefixed to the category, and it must be when two kinds share one category:       secret:postgres\_system\_user=tabsdata      By file and key path:     Any final value of a config file, placeholder or not, is addressed by the file name (with or without '.yaml'), a colon, and the path of keys down to the value, joined by dots:       tabsdata:pods.service.resources.cpu=4     A list item is selected by its position, starting at 0, or by the value of one of its keys:       tabsdata:pods.service.placement.tolerations\[0\].effect=NoExecute       tabsdata:pods.service.placement.tolerations\[operator=Exists\].effect=NoExecute     A key that contains dots is quoted, as in 'section."key.with.dots".value'.      From a settings file:     '@FILE' reads settings from a YAML file. It may be a list of 'ADDRESS=VALUE' strings, a mapping of addresses to values, or a mapping with two sections: 'files', with the keys of each config file nested as in the file itself, and 'values', a mapping of addresses to values:       files:         tabsdata:           pods:             service:               resources:                 cpu: "4"       values:         tdk\_database\_host: db.internal         secret:postgres\_system\_password: env:POSTGRES\_PASSWORD      Only values that already exist can be set: never new keys, and never a key that holds other keys or a list. The one exception is 'tabsdata:pods.global.envs', where new environment variables can be added for every pod and function:       tabsdata:pods.global.envs.MY\_API\_KEY=env:MY\_API\_KEY   Their values are written as strings. A string value replaces a string, while numbers and booleans replace only values of their own type. A VALUE starting with 'env:' is read from that environment variable of this machine, so secrets need not be written in any file of yours. To combine variables with fixed text, wrap each variable in '${...}': 'env:${BUCKET\_URI}/root' reads BUCKET\_URI and appends '/root'. 'val:' keeps a value that literally starts with 'env:'. Secret values end up in the instance input config files.      Examples:     tdkserver init --provider gke --config tdk\_database\_host=db.internal --config secret:postgres\_system\_password=env:POSTGRES\_PASSWORD     tdkserver quickstart --config tabsdata:pods.service.resources.memory=8Gi     tdkserver quickstart --config anthropic-key=env:ANTHROPIC\_API\_KEY     tdkserver quickstart --config tabsdata:pods.global.envs.MY\_API\_KEY=env:MY\_API\_KEY     tdkserver quickstart --config @settings.yaml |
| `--fill` | flag | Optional | Fill the configuration stub of the provider in a built-in editor before anything is created. The editor opens the stub of the chosen provider, or the file left by an earlier '--fill' of the same instance, with the required values marked. Ctrl+Q saves and continues once the settings are valid, Ctrl+S saves without leaving, and Esc quits without saving, which cancels the quickstart.      Editing keys use Ctrl, also on macOS: the terminal keeps Cmd for itself. Ctrl+C, Ctrl+X and Ctrl+V use the system clipboard, so text moves between the editor and other applications, and Cmd+V pastes too. Ctrl+A selects all; Shift with the arrows, or a mouse drag, selects a block.      The filled file is used as '--config @FILE', together with any other '--config' settings, and it is kept in the 'init/fill' folder of the instance.      Example:     tdkserver quickstart --provider gke --fill |
| `--save` | true \| false | Optional | Copy the cluster settings files (kubeconfig, etc.) into the instance folder so the instance is self-contained. |
| `--details` | true \| false | Optional | Show the summary of resolved values before each step. Defaults to 'true'. Pass '--details false' to skip the summaries. |
| `-y, --yes` | true \| false | Optional | Skip the interactive confirmation prompts and proceed immediately. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
