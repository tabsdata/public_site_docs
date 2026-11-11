# tdk fn bundle

> Download, unpack or print the bundle of a function version.

Source: https://docs.tabsdata.com/cli/tdk/fn/bundle

Download, unpack or print the bundle of a function version.

The bundle is addressed by its function version id (fvid), or by '--name' for the function's current version; only Active or Frozen versions can be read (a version whose function has been deleted is not found). It holds the code that actually runs: the whole module tree the function was registered with, and its requirements.

```bash
tdk fn bundle \
  --proj quickstart \
  --format table \
  --fn-version fv-9d21ac \
  --coll sales_data \
  --name read_world \
  --file read_world.tar.zst \
  --extract extract-example \
  --force \
  --print \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--fn-version` | string | Required | Function version id (fvid) whose bundle will be read. Use 'tdk fn get --show-history' to find available fvids. |
| `--coll, -c` | string | Optional | Collection of the function whose current version is read, together with '--name'. |
| `--name, -n` | string | Optional | Function whose current version is read, instead of '--fn-version'. |
| `--file, -f` | string | Required | Path to write the downloaded bundle to. The bundle is a zstandard-compressed tar archive (.tar.zst). |
| `--extract` | string | Optional | Directory to unpack the bundle into, instead of writing the archive. It must be empty or new, unless '--force' is given. |
| `--force` | flag | Optional | With '--extract', unpack into a directory that is not empty. |
| `--print` | flag | Optional | Print the module that defines the function. With '-o json', every text file of the bundle, within a size budget. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
