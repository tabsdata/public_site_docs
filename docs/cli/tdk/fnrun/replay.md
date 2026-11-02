# tdk fnrun replay

> Re-execute a finished function run.

Source: https://docs.tabsdata.com/cli/tdk/fnrun/replay

Re-execute a finished function run.

Mints a new concrete physical function run against the latest patch (or head, if no patch exists). The pointer stays bound to the previous attempt's outputs until the new attempt finishes successfully.

```bash
tdk fnrun replay \
  --fnrun fnr-27ac91 \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--fnrun` | string | Required | ID of the function run to replay. |
| `--profile` | string | Optional | Profile whose connection and settings this command uses: '<NAME>-connection.json' and '<NAME>-options.json' under the Tabsdata directory. Default: the profile set with 'tdk set --profile', else 'connection.json' and 'options.json'. |
