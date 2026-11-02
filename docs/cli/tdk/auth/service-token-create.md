# tdk auth service-token create

> Create a service token in one of your two slots.

Source: https://docs.tabsdata.com/cli/tdk/auth/service-token-create

Create a service token in one of your two slots.

The token is shown once, here, and cannot be recovered afterwards: the server keeps only a SHA-256 digest of it.

```bash
tdk auth service-token create \
  --slot slot-example \
  --expires-in-days expires_in_days-example \
  --comment comment-example \
  --format table \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--slot` | string | Optional | Which slot to fill, 1 or 2. |
| `--expires-in-days` | string | Optional | Days until the token expires, or -1 for a token that never expires (only where the deployment permits it). There is no default. |
| `--comment` | string | Optional | A label, so the two slots tell themselves apart. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. Defaults to `table`. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
