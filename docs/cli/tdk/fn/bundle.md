# tdk fn bundle

> Download the bundle of a function version as a tar.zst archive.

Source: https://docs.tabsdata.com/cli/tdk/fn/bundle

Download the bundle of a function version as a tar.zst archive.

The bundle is addressed by its function version id (fvid); only Active or Frozen versions can be downloaded (a version whose function has been deleted is not found).

```bash
tdk fn bundle \
  --proj quickstart \
  --fn-version fv-9d21ac \
  --file read_world.tar.zst \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--proj, -P` | string | Optional | Project to target; overrides the pinned project. Prompted for when a command needs one and neither is set. |
| `--fn-version` | string | Required | Function version id (fvid) whose bundle will be downloaded. Use 'tdk fn get --show-history' to find available fvids. |
| `--file, -f` | string | Required | Path to write the downloaded bundle to. The bundle is a zstandard-compressed tar archive (.tar.zst). |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
