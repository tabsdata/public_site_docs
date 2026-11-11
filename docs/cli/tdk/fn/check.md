# tdk fn check

> Check a function file before registering it. Runs the code of the

Source: https://docs.tabsdata.com/cli/tdk/fn/check

Check a function file before registering it. Runs the code of the

'--path' file on this machine, since it imports it.

Imports the function as 'tdk fn register' does, reports what it declares (kind, input and output tables, triggers, connector), builds its bundle and flags calls such as eval, exec or subprocess. Nothing is uploaded. Exits 1 when a finding is an error; warnings do not fail.

```bash
tdk fn check \
  --proj quickstart \
  --format table \
  --path functions/read_world.py::read_world \
  --dir-to-bundle ./qs-example \
  --requirements requirements.txt \
  --local-pkg ./dist/mypkg-1.0.0-py3-none-any.whl \
  --coll sales_data \
  --name read_world \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--path` | string | Optional | Path to the function file. Must be of the form '/path/to/file.py::function\_name'. Will be prompted for it if not provided. |
| `--dir-to-bundle` | string | Optional | Path to the directory that should be stored in the bundle for execution in the backend. If not provided, the folder where the function file is will be used. |
| `--requirements` | string | Optional | Path to a requirements.yaml to embed in the bundle verbatim, instead of the snapshot of this machine's Python environment. Use it when the runtime environment differs from this one. |
| `--local-pkg` | string | Optional | Path to a local package directory to include in the bundle; repeatable. Local packages are pip-installed into the function's runtime environment, separately from the '--dir-to-bundle' source tree. Import them absolutely ('import mypkg'). If a local package shares a name with a module in that tree, the installed package wins at runtime. |
| `--coll, -c` | string | Optional | Collection to check the function against on the server: that it exists, that the input tables exist, that no other function produces the output tables and that the server accepts the Python version. Without it the check is local. |
| `--name, -n` | string | Optional | Name the function is registered under, if it differs from the decorated function's; used by the '--coll' checks. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
