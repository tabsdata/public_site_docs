# tdkserver shell

> Open an interactive shell. The commands listed under it are entered at the shell prompt, not on the tdkserver command line.

Source: https://docs.tabsdata.com/cli/tdkserver/shell

Open an interactive shell. The commands listed under it are entered at the shell prompt, not on the tdkserver command line.

```bash
tdkserver shell \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
