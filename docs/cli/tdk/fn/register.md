# tdk fn register

> Register a function.

Source: https://docs.tabsdata.com/cli/tdk/fn/register

Register a function.

Dynamically imports the symbol named by `--path` (which must be a tabsdatak `PublisherInfo` / `TransformerInfo` / `SubscriberInfo` produced by a `@publisher` / `@transformer` / `@subscriber` decorator) and registers it via the v2 bundle producer (`tabsdatak.common._archive.bundle.build_bundle`).

With `--update`, behaves idempotently: if the function already exists in the collection it is updated; otherwise it is registered.

```bash
tdk fn register \
  --proj quickstart \
  --coll sales_data \
  --description Ingests raw sales data from Postgres \
  --path functions/read_world.py::read_world \
  --dir-to-bundle ./qs-example \
  --reuse-tables \
  --enabled \
  --update \
  --storage-path /prod \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--coll, -c` | string | Optional | Name of the collection to which the function belongs. |
| `--description` | string | Optional | Description of the function. |
| `--path` | string | Required | Path to the function file. Must be of the form '/path/to/file.py::function\_name'. Will be prompted for it if not provided. |
| `--dir-to-bundle` | string | Optional | Path to the directory that should be stored in the bundle for execution in the backend. If not provided, the folder where the function file is will be used. |
| `--reuse-tables` | flag | Optional | Reuse previously created tables. If provided, any tables that the function produces that already exist in the system (but no longer have a function that generates them) will be reused, adding to their data history. If not provided, those tables will be recreated and their data history re-initialized. |
| `--enabled, --disabled` | flag | Optional | Enable or disable the feature |
| `--update` | flag | Optional | If provided, update the function if it already exists in the collection. If not present, the command falls through to the normal register flow. |
| `--storage-path` | string | Optional | Optional storage-prefix override for this function's output table data. When omitted, the collection's base\_path is used. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
