# tdk unset

> Drop a setting back to its default.

Source: https://docs.tabsdata.com/cli/tdk/unset

Drop a setting back to its default.

The counterpart of 'tdk set': it removes what was stored for every setting it is given, so the shipped default applies again. The pinned project and collection are per profile, every other setting is global. More than one can be unset at once.

Examples:

```bash
tdk unset --hints
tdk unset --prompt
tdk unset --trigger-wait
tdk unset --server
tdk unset --coll                        # unpin the collection only
tdk unset --proj                        # unpins the collection too
tdk unset --all                         # every setting, the profile's pins
tdk unset --profile                     # back to the default profile
```

```bash
tdk unset \
  --format table \
  --hints \
  --prompt \
  --trigger-wait \
  --server \
  --proj \
  --coll \
  --all \
  --profile
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--hints` | flag | Optional | Restore the hints default (true). Global. |
| `--prompt` | flag | Optional | Restore the prompting default (true). Global. |
| `--trigger-wait` | flag | Optional | Restore the default of 'tdk fn trigger' (true: wait for its plan). Global. |
| `--server` | flag | Optional | Clear the configured server. Global. |
| `--proj, -P` | flag | Optional | Unpin the project. Unpins the collection too, since a collection pin only resolves under a project. Per profile. |
| `--coll, -c` | flag | Optional | Unpin the collection. Per profile. |
| `--all` | flag | Optional | Unset every setting and the pins of the profile: shorthand for --hints, --prompt, --trigger-wait, --server, --proj and --coll, leaving every one of them at its default. The profile set with 'tdk set --profile' stays as it is. |
| `--profile` | flag | Optional | Drop the profile set with 'tdk set --profile', so commands given no --profile use the default profile again. |
