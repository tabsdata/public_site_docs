# tdk plan monitor

> Monitor the execution of a plan.

Source: https://docs.tabsdata.com/cli/tdk/plan/monitor

Monitor the execution of a plan.

```bash
tdk plan monitor \
  --plan pln-3f9a2b \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--plan` | string | Required | ID of the plan to monitor. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
