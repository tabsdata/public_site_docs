# tdk plan recover

> Recover a plan: its failed or on-hold function runs are re-scheduled,

Source: https://docs.tabsdata.com/cli/tdk/plan/recover

Recover a plan: its failed or on-hold function runs are re-scheduled,

each re-running its pinned function version and that version's latest patch.

```bash
tdk plan recover \
  --plan pln-3f9a2b \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--plan` | string | Required | ID of the plan to recover. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
