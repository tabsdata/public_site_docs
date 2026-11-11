# Install Tabsdata

> Installs the Tabsdata Python package with pip or uv, creates a virtual environment, sets the Anthropic or OpenAI LLM key, runs tdkserver quickstart with the kminus provider, and logs in.

Source: https://docs.tabsdata.com/guide/install

Deploy a Tabsdata Server on your Machine in under 5 minutes.

Tabsdata is published as a python package, installable with `pip`

Requirements

-   Machine with a supported OS
    -   Linux (x86)
    -   macOS (Apple Silicon/ARM64)
    -   Windows (x86)
-   **Python 3.12.13 or later**
-   An LLM API key from **Anthropic** or **OpenAI (Required for AI features)**

### Create a Python virtual environment

Using a virtual environment provides a layer of isolation and prevents interference from other python environments on your machine.

-   macOS / Linux
-   Windows (PowerShell)

-   conda
-   uv
-   pyenv
-   venv

```bash
conda create -n tabsdata python=3.12 -y
conda activate tabsdata
```

```bash
uv venv --python 3.12.13 .venv
source .venv/bin/activate
```

```bash
pyenv install 3.12.13
pyenv local 3.12.13
python -m venv .venv
source .venv/bin/activate
```

```bash
python3 -m venv .venv
source .venv/bin/activate
```

-   conda
-   uv
-   pyenv
-   venv

```powershell
conda create -n tabsdata python=3.12 -y
conda activate tabsdata
```

```powershell
uv venv --python 3.12.13 .venv
.venv\Scripts\activate
```

```powershell
pyenv install 3.12.13
pyenv local 3.12.13
python -m venv .venv
.venv\Scripts\activate
```

```powershell
python -m venv .venv
.venv\Scripts\activate
```

### Install Tabsdata

After installing, add the Tabsdata skill for your coding agent; see [Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent).

-   uv
-   pip

```bash
uv pip install "tabsdata[all]"
```

```bash
pip install "tabsdata[all]"
```

### Set LLM key as environment variable in terminal

-   macOS / Linux
-   Windows (PowerShell)

-   Anthropic
-   OpenAI

```bash
export ANTHROPIC_KEY="sk-ant-..."
```

```bash
export OPENAI_KEY="sk-..."
```

-   Anthropic
-   OpenAI

```powershell
$env:ANTHROPIC_KEY = "sk-ant-..."
```

```powershell
$env:OPENAI_KEY = "sk-..."
```

### Start the Tabsdata server

`tdkserver quickstart` initializes and deploys a Tabsdata Instance. The command should take around 30 seconds to fully execute.

-   Anthropic
-   OpenAI

```bash
tdkserver quickstart --config anthropic-key=env:ANTHROPIC_KEY
```

```bash
tdkserver quickstart --config openai-key=env:OPENAI_KEY
```

Some Notes on Tabsdata Server Providers

Tabsdata runs on Kubernetes, and this install uses `kminus`: a lightweight provider that runs pods as native processes in your Python environment instead of Docker containers, so it needs no root or administrator access. See [Deploy a Server on k-minus](https://docs.tabsdata.com/server-admin/kminus) for the full lifecycle. Tabsdata can also be deployed on [AWS EKS](https://docs.tabsdata.com/server-admin/eks-install), [Azure AKS](https://docs.tabsdata.com/server-admin/aks-install), or [Google GKE](https://docs.tabsdata.com/server-admin/gke-install).

Installing Third-party Database Drivers

If you plan to use the PostgreSQL connectors, they need a database driver that Tabsdata cannot redistribute. Please review [Installing Third-Party Database Drivers](https://docs.tabsdata.com/server-admin/third-party-database-drivers) for more information.

### Check Tabsdata server status

View all your Tabsdata Instances

```bash
tdkserver list
```

Output

```
Instances
┌──────────┬──────────────────────────────────────────────────┬──────────┬─────────┬─────────┬─────────┬─────────────────┬───────────────┬───────────────────────┐
│ Name     │ Folder                                           │ Provider │ Version │ State   │ Status  │ API Server Port │ Database Port │ API Server URL        │
├──────────┼──────────────────────────────────────────────────┼──────────┼─────────┼─────────┼─────────┼─────────────────┼───────────────┼───────────────────────┤
│ tabsdata │ ~/.tabsdata/instances/tabsdata                   │ kminus   │ 2.0.2   │ created │ Running │ 2457            │ 2460          │ http://localhost:2457 │
└──────────┴──────────────────────────────────────────────────┴──────────┴─────────┴─────────┴─────────┴─────────────────┴───────────────┴───────────────────────┘
```

View the status of the Tabsdata Instance you just deployed.

```bash
tdkserver status
```

Output

```
Deployments
┌──────────────────────┬─────────┬───────┬─────┐
│ Name                 │ Status  │ Ready │ Age │
├──────────────────────┼─────────┼───────┼─────┤
│ srv-aiagent          │ Running │ 1/1   │ 1m  │
│ srv-aitdk            │ Running │ 1/1   │ 1m  │
│ srv-apiserver        │ Running │ 1/1   │ 1m  │
│ srv-catalog-classify │ Running │ 1/1   │ 1m  │
│ srv-database         │ Running │ 1/1   │ 1m  │
│ srv-embedder         │ Running │ 1/1   │ 1m  │
└──────────────────────┴─────────┴───────┴─────┘

Pods
┌───────────────────────────────────────┬─────────┬───────┬─────┐
│ Name                                  │ Status  │ Ready │ Age │
├───────────────────────────────────────┼─────────┼───────┼─────┤
│ srv-aiagent-6c9697fcc4-2wl6n          │ Running │ 1/1   │ 1m  │
│ srv-aitdk-6b8b6764c-8wlzt             │ Running │ 1/1   │ 1m  │
│ srv-apiserver-597b4799cf-x6btf        │ Running │ 1/1   │ 1m  │
│ srv-catalog-classify-587769cd89-cnr8d │ Running │ 1/1   │ 1m  │
│ srv-database-8448f99777-8tsbj         │ Running │ 1/1   │ 1m  │
│ srv-embedder-5d7b9bcc7c-xg977         │ Running │ 1/1   │ 1m  │
└───────────────────────────────────────┴─────────┴───────┴─────┘

CronJobs
No rows found.

Jobs
┌────────────────┬──────────┬─────────────┬─────┐
│ Name           │ Status   │ Completions │ Age │
├────────────────┼──────────┼─────────────┼─────┤
│ ini-inspector  │ Complete │ 1/1         │ 1m  │
│ ini-venvloader │ Complete │ 1/1         │ 1m  │
└────────────────┴──────────┴─────────────┴─────┘
```

tip

`tdkserver` commands usually require an `--instance` flag that specifies the specific instance you want to interact with. If no `--instance` flag is passed, Tabsdata defaults the instance name to `tabsdata`

### Log in

```bash
tdk login --server localhost --user admin --password tabsdata
```

Or access the UI at [http://localhost:2457/login](http://localhost:2457/login)

Next: [Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent). Install the Tabsdata skill for your coding agent, then run your first pipeline.

## Upgrade Tabsdata

To upgrade Tabsdata, install the new version in a clean virtual environment and run `tdkserver upgrade` from it. The upgrade keeps the instance's custom configuration, for example additional virtual environment requirements.

### Create a new virtual environment

Create a new, clean virtual environment for the new version, as in [Create a Python virtual environment](#create-a-python-virtual-environment), with a new name such as `tabsdata-new` or `.venv-new`. Do not install the new version in the environment of the version you are upgrading from.

### Install the new version

In the new virtual environment, install Tabsdata as in [Install Tabsdata](#install-tabsdata).

### Upgrade the server

From the new virtual environment, run:

```bash
tdkserver upgrade
```

The upgrade stops the Tabsdata Server and leaves it stopped. To start it again as soon as the upgrade completes, pass `--apply true`:

```bash
tdkserver upgrade --apply true
```

Without `--apply true`, start the server with `tdkserver start` when you are ready. `tdkserver upgrade` upgrades the instance named `tabsdata` unless `--instance` names another; see [tdkserver upgrade](https://docs.tabsdata.com/cli/tdkserver/upgrade) for every option.

### Remove the previous virtual environment

Once the upgrade is complete, the virtual environment of the previous version is no longer used and can be deleted.

### Upgrade the clients

Every machine that runs `tdk` needs the new version too. On each one, create a new virtual environment and install the new version, as in the first two steps.

Then run the AI agent configuration again from the new virtual environment, starting with `tdk ai agents install`. See [Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent).
