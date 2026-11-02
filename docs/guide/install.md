# Install Tabsdata

> Installs Tabsdata with pip or uv into a Python 3.12 virtual environment, sets the Anthropic or OpenAI key, runs tdkserver quickstart with the kminus provider, and logs in.

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

Install `tabsdata-agent` alongside `tabsdata[all]` to enable AI features.

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

If you plan to use the MySQL or PostgreSQL CDC connectors, they need database drivers that Tabsdata cannot redistribute. Please review [Installing Third-Party Database Drivers](https://docs.tabsdata.com/server-admin/third-party-database-drivers) for more information.

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
┌───────────────┬─────────┬───────┬─────┐
│ Name          │ Status  │ Ready │ Age │
├───────────────┼─────────┼───────┼─────┤
│ srv-aiagent   │ Running │ 1/1   │ 15s │
│ srv-apiserver │ Running │ 1/1   │ 15s │
│ srv-database  │ Running │ 1/1   │ 24s │
└───────────────┴─────────┴───────┴─────┘
Pods                                                      
┌────────────────────────────────┬─────────┬───────┬─────┐
│ Name                           │ Status  │ Ready │ Age │
├────────────────────────────────┼─────────┼───────┼─────┤
│ srv-aiagent-7476c88484-4klx8   │ Running │ 2/2   │ 15s │
│ srv-apiserver-56bbbb559d-8cnxl │ Running │ 1/1   │ 15s │
│ srv-database-fd4f8f85-dsxcj    │ Running │ 1/1   │ 24s │
└────────────────────────────────┴─────────┴───────┴─────┘
CronJobs                                                            
┌──────────────────┬─────────┬─────────────┬─────────────────┬─────┐
│ Name             │ Status  │ Expression  │ Explanation     │ Age │
├──────────────────┼─────────┼─────────────┼─────────────────┼─────┤
│ srv-aiembeddings │ Running │ */5 * * * * │ Every 5 minutes │ 6s  │
│ srv-aimetadata   │ Running │ */5 * * * * │ Every 5 minutes │ 6s  │
└──────────────────┴─────────┴─────────────┴─────────────────┴─────┘
Jobs                                             
┌────────────────┬──────────┬─────────────┬─────┐
│ Name           │ Status   │ Completions │ Age │
├────────────────┼──────────┼─────────────┼─────┤
│ ini-inspector  │ Complete │ 1/1         │ 16s │
│ ini-venvloader │ Complete │ 1/1         │ 17s │
└────────────────┴──────────┴─────────────┴─────┘
```

tip

`tdkserver` commands usually require an `--instance` flag that specifies the specific instance you want to interact with. If no `--instance` flag is passed, Tabsdata defaults the instance name to `tabsdata`

### Log in

```bash
tdk login --server localhost --user admin --password tabsdata
```

Or access the UI at [http://localhost:2457/login](http://localhost:2457/login)

Next: [Connect to MCP](https://docs.tabsdata.com/guide/connect-agent). Point your LLM at the MCP server, then run your first pipeline.
