# tdk ai load-skill

> Print the Tabsdata skill of the server a profile is logged in to, as

Source: https://docs.tabsdata.com/cli/tdk/ai/load-skill

Print the Tabsdata skill of the server a profile is logged in to, as

markdown, for a coding agent to follow: the rules, how to work, the server's skills and the commands you can run. Without a login it names the login to run. It always exits 0

```bash
tdk ai load-skill \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
