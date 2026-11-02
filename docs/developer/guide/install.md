# Install Tabsdata

Source: https://docs.tabsdata.com/developer/guide/install

This is a lightweight local setup that requires **no admin or root privileges**.

Requirements

-   Machine with a supported OS
    -   Linux (x86)
    -   macOS (Apple Silicon/ARM64)
    -   Windows (x86)
-   **Python 3.12.13 or later**

### Create a Python Virtual Environment

Using a Virtual Environment provides a layer of isolation and prevents interference from other python environments on your machine.

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

-   uv
-   pip

```bash
uv pip install "tabsdata[all]"
```

```bash
pip install "tabsdata[all]"
```

### Start the Tabsdata server

`tdkserver quickstart` initializes and deploys a Tabsdata Instance. The command should take around 30 seconds to fully execute.

```bash
tdkserver quickstart
```

Where the server runs

Tabsdata runs on Kubernetes, and this install uses `kminus`: a lightweight provider that runs pods as native processes in your Python environment instead of Docker containers, so it needs no root or administrator access. See [Deploy a Server on k-minus](https://docs.tabsdata.com/developer/server-admin/kminus) for the full lifecycle. Tabsdata can also be deployed on [AWS EKS](https://docs.tabsdata.com/developer/server-admin/eks-install), [Azure AKS](https://docs.tabsdata.com/developer/server-admin/aks-install), or [Google GKE](https://docs.tabsdata.com/developer/server-admin/gke-install).

note

If you plan to use the MySQL, PostgreSQL, or Oracle connectors, they need database drivers that Tabsdata cannot redistribute. See [Installing Third-Party Database Drivers](https://docs.tabsdata.com/developer/server-admin/third-party-database-drivers).

### Check Tabsdata Server Status

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

Next: [Run Your First Data Integration](https://docs.tabsdata.com/developer/guide/run-your-first-data-integration). Register and run your first pipeline.
