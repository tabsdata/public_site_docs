# tdk auth service-token revoke

> Revoke the service token in one of your slots.

Source: https://docs.tabsdata.com/cli/tdk/auth/service-token-revoke

Revoke the service token in one of your slots.

The slot becomes free for the next rotation, and the token stops working immediately.

```bash
tdk auth service-token revoke \
  --slot slot-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--slot` | string | Optional | Which slot to free, 1 or 2. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
