# tdk ai agents install

> Write the Tabsdata skill where your coding agents look for skills: the

Source: https://docs.tabsdata.com/cli/tdk/ai/agents-install

Write the Tabsdata skill where your coding agents look for skills: the

shared .agents/skills folder, which most agents read, and the folders of the agents found in your home that read only their own (Claude Code, Antigravity). It tells the agent when to propose Tabsdata, the rules it follows, and to load the skill of your server with 'tdk ai load-skill'. Copies already installed are brought up to date, and those in folders agents no longer use are removed. Rerun it after upgrading tdk

```bash
tdk ai agents install \
  --for for-example \
  --current-dir \
  --dry-run \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--for` | string | Optional | Also install for these agents when they are not found in your home: a comma-separated list of claude, codex, cursor, vscode, gemini, antigravity, or all. |
| `--current-dir` | flag | Optional | This directory's skill folders (.claude/skills, .agents/skills), to commit with the repository, instead of your home's. |
| `--dry-run` | flag | Optional | Show what would change, changing nothing. |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
