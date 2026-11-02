# tdk fn patch

> Register a code-only patch of a function version.

Source: https://docs.tabsdata.com/cli/tdk/fn/patch

Register a code-only patch of a function version.

A patch shares the parent's topology (tables, dependencies, triggers, workers) — only bundle / snippet / runtime values / description can be overridden.

A patch is the only way to change the code a planned run executes: both 'tdk fnrun replay' and 'tdk plan recover' / 'tdk fnrun recover' re-run the function version the plan pinned, picking up its latest patch. Registering a new version with 'tdk fn update' does not affect runs that are already planned.

```bash
tdk fn patch \
  --proj quickstart \
  --name read_world \
  --coll sales_data \
  --fn-version fv-9d21ac \
  --path functions/read_world.py::read_world \
  --description Ingests raw sales data from Postgres \
  --dir-to-bundle ./qs-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Required | Name of the function to patch. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. |
| `--fn-version` | string | Required | Function-version id (fvid) this patch overrides. Use 'tdk fn get --show-history' to find available fvids. |
| `--path` | string | Required | Path to the function file. Must be of the form '/path/to/file.py::function\_name'. Will be prompted for it if not provided. |
| `--description` | string | Optional | Description of the patch. |
| `--dir-to-bundle` | string | Optional | Path to the directory that should be stored in the bundle for execution in the backend. If not provided, the folder where the function file is will be used. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
