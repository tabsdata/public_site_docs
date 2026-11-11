# tdk fn patch

> Register a code-only patch of a function version. With '--path' or

Source: https://docs.tabsdata.com/cli/tdk/fn/patch

Register a code-only patch of a function version. With '--path' or

'--source', runs the code of that file on this machine, since it imports it.

A patch shares the parent's topology (tables, dependencies, triggers, workers) — only bundle / snippet / runtime values / description can be overridden.

With '--source', the patch is the bundle of '--fn-version' with only the module that defines the function replaced, so its sibling modules, its requirements and its local packages carry over ('--requirements' and '--local-pkg' replace them).

A patch is the only way to change the code a planned run executes: both 'tdk fnrun replay' and 'tdk plan recover' / 'tdk fnrun recover' re-run the function version the plan pinned, picking up its latest patch. Registering a new version with 'tdk fn update' does not affect runs that are already planned.

```bash
tdk fn patch \
  --proj quickstart \
  --format table \
  --coll <function pinned.<locals>.default at 0x10b614d60> \
  --name read_world \
  --fn-version fv-9d21ac \
  --path functions/read_world.py::read_world \
  --description Ingests raw sales data from Postgres \
  --dir-to-bundle ./qs-example \
  --source source-example \
  --add-package add_package-example \
  --requirements requirements.txt \
  --local-pkg ./dist/mypkg-1.0.0-py3-none-any.whl \
  --dry-run \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. Defaults to `<function pinned.<locals>.default at 0x10b614d60>`. |
| `--name, -n` | string | Required | Name of the function to patch. |
| `--fn-version` | string | Required | Function-version id (fvid) this patch overrides. Use 'tdk fn get --show-history' to find available fvids. |
| `--path` | string | Required | Path to the function file. Must be of the form '/path/to/file.py::function\_name'. Will be prompted for it if not provided. |
| `--description` | string | Optional | Description of the patch. |
| `--dir-to-bundle` | string | Optional | Path to the directory that should be stored in the bundle for execution in the backend. If not provided, the folder where the function file is will be used. |
| `--source` | string | Optional | Python file that replaces the module defining the function in the bundle of '--fn-version'; the rest of that bundle's tree and its requirements are kept. Instead of '--path' and '--dir-to-bundle'. |
| `--add-package` | string | Optional | Package requirement (e.g. 'requests==2.32.3') added to the kept requirements, replacing any pin of the same package; repeatable. Only with '--source', and not with '--requirements'. |
| `--requirements` | string | Optional | Path to a requirements.yaml to embed in the bundle verbatim, instead of the snapshot of this machine's Python environment. Use it when the runtime environment differs from this one. |
| `--local-pkg` | string | Optional | Path to a local package directory to include in the bundle; repeatable. Local packages are pip-installed into the function's runtime environment, separately from the '--dir-to-bundle' source tree. Import them absolutely ('import mypkg'). If a local package shares a name with a module in that tree, the installed package wins at runtime. |
| `--dry-run` | flag | Optional | Check the function as 'tdk fn check' does and show what would be registered, without uploading anything. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
