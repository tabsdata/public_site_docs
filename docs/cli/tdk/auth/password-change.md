# tdk auth password-change

> Change the password of a user in a Tabsdata Server

Source: https://docs.tabsdata.com/cli/tdk/auth/password-change

Change the password of a user in a Tabsdata Server

```bash
tdk auth password-change \
  --user admin \
  --old-password OldP@ss123 \
  --new-password NewP@ss456 \
  --profile production \
  https://tabsdata.example.com
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--user, -u` | string | Required | Username for the Tabsdata Server. Will be prompted for it if not provided. |
| `--old-password, -p` | string | Optional | Old password for the Tabsdata Server. It is discouraged to send the password as a plain argument, it should be either sent as the value of an environment variable or written through the prompt. Will be prompted for it if not provided. |
| `--new-password` | string | Optional | New password for the Tabsdata Server. It is discouraged to send the password as a plain argument, it should be either sent as the value of an environment variable or written through the prompt. Will be prompted for it if not provided. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
| `<server_url>` | string | Required |  |
