# tdk plan cancel

> Cancel a plan: every non-committed transaction in it is canceled.

Source: https://docs.tabsdata.com/cli/tdk/plan/cancel

Cancel a plan: every non-committed transaction in it is canceled.

Canceled runs cannot be recovered.

```bash
tdk plan cancel \
  --plan pln-3f9a2b \
  --confirm cancel \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--plan` | string | Required | ID of the plan to cancel. |
| `--confirm` | string | Optional | Write 'cancel' to confirm cancellation. Will be prompted for it if not provided. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
