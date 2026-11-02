# tdkserver venv update

> Update the complementary packages of a tabsdata virtual environment

Source: https://docs.tabsdata.com/cli/tdkserver/venv/update

Update the complementary packages of a tabsdata virtual environment

```bash
tdkserver venv update \
  --instance tabsdata \
  --name td \
  --requirements requirements.txt \
  --details true \
  --yes true \
  --accept-terms yes \
  --verbose \
  --keep-progress true
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--instance` | string | Optional | Name of the instance whose virtual environment is updated. Defaults to 'tabsdata'. |
| `--name` | td \| fn \| ag | Required | Virtual environment to update. Run 'tdkserver venv list' to see the virtual environments and what each one is used for. |
| `--requirements` | string | Required | File with the complementary packages of the virtual environment, in pip requirements format. It replaces the requirements file the instance currently holds for the virtual environment. |
| `--details` | true \| false | Optional | Show the summary of resolved values before the update. Defaults to 'true'. Pass '--details false' to skip the summary. |
| `-y, --yes` | true \| false | Optional | Skip the interactive confirmation prompt and proceed immediately. |
| `--accept-terms` | string | Optional | Accept or decline the license terms without interactive prompt \[y/yes/n/no\]. |
| `--verbose` | flag | Optional | Show the output of each step that this command runs. |
| `--keep-progress` | true \| false | Optional | Keep the progress line of each step that this command runs, instead of clearing it when the step finishes \[true/false\]. Defaults to `true`. |
