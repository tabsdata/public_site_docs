# tdk fn update

> Update a function.

Source: https://docs.tabsdata.com/cli/tdk/fn/update

Update a function.

Dynamically imports the symbol named by `--path` (a tabsdatak `*Info` descriptor) and updates the existing function via the v2 bundle producer (`tabsdatak.common._archive.bundle.build_bundle`).

The new version applies to runs planned from here on. Runs already planned keep the version they were planned with, so an update does not reach a stalled plan: to change the code such a run executes, patch its version with 'tdk fn patch'.

```bash
tdk fn update \
  --proj quickstart \
  --name read_world \
  --coll sales_data \
  --description Ingests raw sales data from Postgres \
  --path functions/read_world.py::read_world \
  --dir-to-bundle ./qs-example \
  --reuse-tables \
  --enabled \
  --storage-path /prod \
  --reset-state \
  --reset-stage \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--name, -n` | string | Required | Name of the function to be updated. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. |
| `--description` | string | Optional | Description of the function. |
| `--path` | string | Required | Path to the function file. Must be of the form '/path/to/file.py::function\_name'. Will be prompted for it if not provided. |
| `--dir-to-bundle` | string | Optional | Path to the directory that should be stored in the bundle for execution in the backend. If not provided, the folder where the function file is will be used. |
| `--reuse-tables` | flag | Optional | Reuse previously created tables. If provided, any tables that the function produces that already exist in the system (but no longer have a function that generates them) will be reused, adding to their data history. If not provided, those tables will be recreated and their data history re-initialized. |
| `--enabled, --disabled` | flag | Optional | Enable or disable the feature |
| `--storage-path` | string | Optional | Optional storage-prefix override for this function's output table data. When omitted, the previous version's value is carried forward. |
| `--reset-state` | flag | Optional | Regenerate the function's state table id instead of carrying it forward, so publishers re-read their initial configuration values from scratch. |
| `--reset-stage` | flag | Optional | Regenerate the function's stage id (a fresh stage/checkpoint dir), discarding accumulated stage state. The stage's storage prefix is unchanged. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
