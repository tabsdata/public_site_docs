# tdk unset

> Drop a setting back to its default.

Source: https://docs.tabsdata.com/cli/tdk/unset

Drop a setting back to its default.

The counterpart of 'tdk set': it removes what was stored for every setting it is given, so the shipped default applies again. More than one can be unset at once.

Examples:

```bash
tdk unset --hints
tdk unset --prompt
tdk unset --server
tdk unset --coll                        # unpin the collection only
tdk unset --proj                        # unpins the collection too
tdk unset --all                         # every setting of the profile
tdk unset --profile                     # back to the default profile
```

```bash
tdk unset \
  --hints \
  --prompt \
  --server \
  --proj \
  --coll \
  --all \
  --profile
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--hints` | flag | Optional | Restore the hints default (true). |
| `--prompt` | flag | Optional | Restore the prompting default (true). |
| `--server` | flag | Optional | Clear the configured server. |
| `--proj, -P` | flag | Optional | Unpin the project. Unpins the collection too, since a collection pin only resolves under a project. |
| `--coll, -c` | flag | Optional | Unpin the collection. |
| `--all` | flag | Optional | Unset every setting stored in the profile: shorthand for --hints, --prompt, --server, --proj and --coll, leaving every one of them at its default. The default profile stays as it is. |
| `--profile` | flag | Optional | Drop the default profile set with 'tdk set --profile', so commands given no --profile use 'connection.json' and 'options.json' again. |
