# tdk fn update

> Update a function. With '--path', runs the code of that file on this

Source: https://docs.tabsdata.com/cli/tdk/fn/update

Update a function. With '--path', runs the code of that file on this

machine, since it imports it.

Dynamically imports the symbol named by `--path` (a tabsdatak `*Info` descriptor) and updates the existing function via the v2 bundle producer (`tabsdatak.common._archive.bundle.build_bundle`).

The new version applies to runs planned from here on. Runs already planned keep the version they were planned with, so an update does not reach a stalled plan: to change the code such a run executes, patch its version with 'tdk fn patch'.

```bash
tdk fn update \
  --proj quickstart \
  --format table \
  --name read_world \
  --coll <function pinned.<locals>.default at 0x10b614d60> \
  --description Ingests raw sales data from Postgres \
  --path functions/read_world.py::read_world \
  --dir-to-bundle ./qs-example \
  --requirements requirements.txt \
  --local-pkg ./dist/mypkg-1.0.0-py3-none-any.whl \
  --reuse-tables \
  --enabled \
  --storage-path /prod \
  --reset-state \
  --reset-stage \
  --dry-run \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--name, -n` | string | Required | Name of the function to be updated. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. Defaults to `<function pinned.<locals>.default at 0x10b614d60>`. |
| `--description` | string | Optional | Description of the function. |
| `--path` | string | Required | Path to the function file. Must be of the form '/path/to/file.py::function\_name'. Will be prompted for it if not provided. |
| `--dir-to-bundle` | string | Optional | Path to the directory that should be stored in the bundle for execution in the backend. If not provided, the folder where the function file is will be used. |
| `--requirements` | string | Optional | Path to a requirements.yaml to embed in the bundle verbatim, instead of the snapshot of this machine's Python environment. Use it when the runtime environment differs from this one. |
| `--local-pkg` | string | Optional | Path to a local package directory to include in the bundle; repeatable. Local packages are pip-installed into the function's runtime environment, separately from the '--dir-to-bundle' source tree. Import them absolutely ('import mypkg'). If a local package shares a name with a module in that tree, the installed package wins at runtime. |
| `--reuse-tables` | flag | Optional | Reuse previously created tables. If provided, any tables that the function produces that already exist in the system (but no longer have a function that generates them) will be reused, adding to their data history. If not provided, those tables will be recreated and their data history re-initialized. |
| `--enabled, --disabled` | flag | Optional | Enable or disable the feature |
| `--storage-path` | string | Optional | Optional storage-prefix override for this function's output table data. When omitted, the previous version's value is carried forward. |
| `--reset-state` | flag | Optional | Regenerate the function's state table id instead of carrying it forward, so publishers re-read their initial configuration values from scratch. |
| `--reset-stage` | flag | Optional | Regenerate the function's stage id (a fresh stage/checkpoint dir), discarding accumulated stage state. The stage's storage prefix is unchanged. |
| `--dry-run` | flag | Optional | Check the function as 'tdk fn check' does and show what would be registered, without uploading anything. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
