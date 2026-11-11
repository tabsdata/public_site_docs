# tdk auth service-token revoke

> Revoke the service token in one of your slots.

Source: https://docs.tabsdata.com/cli/tdk/auth/service-token-revoke

Revoke the service token in one of your slots.

The slot becomes free for the next rotation, and the token stops working immediately.

```bash
tdk auth service-token revoke \
  --format table \
  --slot slot-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--slot` | string | Optional | Which slot to free, 1 or 2. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
