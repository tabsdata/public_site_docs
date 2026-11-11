# tdk plan cancel

> Cancel a plan: every non-committed transaction in it is canceled, and so

Source: https://docs.tabsdata.com/cli/tdk/plan/cancel

Cancel a plan: every non-committed transaction in it is canceled, and so

is every non-committed transaction that read its output and every queued run of the same functions, in later plans too. Canceled runs cannot be recovered; the result lists every run canceled.

```bash
tdk plan cancel \
  --format table \
  --plan pln-3f9a2b \
  --confirm cancel \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--plan` | string | Required | ID of the plan to cancel. |
| `--confirm` | string | Optional | Write 'cancel' to confirm cancellation. Will be prompted for it if not provided. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
