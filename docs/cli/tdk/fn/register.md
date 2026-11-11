# tdk fn register

> Register a function. Runs the code of the '--path' file on this

Source: https://docs.tabsdata.com/cli/tdk/fn/register

Register a function. Runs the code of the '--path' file on this

machine, since it imports it.

Dynamically imports the symbol named by `--path` (which must be a tabsdatak `PublisherInfo` / `TransformerInfo` / `SubscriberInfo` produced by a `@publisher` / `@transformer` / `@subscriber` decorator) and registers it via the v2 bundle producer (`tabsdatak.common._archive.bundle.build_bundle`).

With `--update`, behaves idempotently: if the function already exists in the collection it is updated; otherwise it is registered.

With `--dry-run`, checks the function as 'tdk fn check --coll' does and reports what would be registered, uploading nothing.

```bash
tdk fn register \
  --proj quickstart \
  --format table \
  --coll <function pinned.<locals>.default at 0x10b614d60> \
  --description Ingests raw sales data from Postgres \
  --path functions/read_world.py::read_world \
  --dir-to-bundle ./qs-example \
  --requirements requirements.txt \
  --local-pkg ./dist/mypkg-1.0.0-py3-none-any.whl \
  --reuse-tables \
  --enabled \
  --update \
  --storage-path /prod \
  --dry-run \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. Defaults to `<function pinned.<locals>.default at 0x10b614d60>`. |
| `--description` | string | Optional | Description of the function. |
| `--path` | string | Required | Path to the function file. Must be of the form '/path/to/file.py::function\_name'. Will be prompted for it if not provided. |
| `--dir-to-bundle` | string | Optional | Path to the directory that should be stored in the bundle for execution in the backend. If not provided, the folder where the function file is will be used. |
| `--requirements` | string | Optional | Path to a requirements.yaml to embed in the bundle verbatim, instead of the snapshot of this machine's Python environment. Use it when the runtime environment differs from this one. |
| `--local-pkg` | string | Optional | Path to a local package directory to include in the bundle; repeatable. Local packages are pip-installed into the function's runtime environment, separately from the '--dir-to-bundle' source tree. Import them absolutely ('import mypkg'). If a local package shares a name with a module in that tree, the installed package wins at runtime. |
| `--reuse-tables` | flag | Optional | Reuse previously created tables. If provided, any tables that the function produces that already exist in the system (but no longer have a function that generates them) will be reused, adding to their data history. If not provided, those tables will be recreated and their data history re-initialized. |
| `--enabled, --disabled` | flag | Optional | Enable or disable the feature |
| `--update` | flag | Optional | If provided, update the function if it already exists in the collection. If not present, the command falls through to the normal register flow. |
| `--storage-path` | string | Optional | Optional storage-prefix override for this function's output table data. When omitted, the collection's base\_path is used. |
| `--dry-run` | flag | Optional | Check the function as 'tdk fn check' does and show what would be registered, without uploading anything. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
