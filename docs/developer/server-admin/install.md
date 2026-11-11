# Install Tabsdata

Source: https://docs.tabsdata.com/developer/server-admin/install

Tabsdata requires the `tabsdata` python package, which is installable through `pip` and requires **no admin or root privileges**.

Requirements

-   Machine with a supported OS
    -   Linux (x86)
    -   macOS (Apple Silicon/ARM64)
    -   Windows (x86)
-   **Python 3.12.13 or later**

### Create a Python Virtual Environment

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

-   uv
-   pip

```bash
uv pip install "tabsdata[all]"
```

```bash
pip install "tabsdata[all]"
```

Where the server runs

Tabsdata runs on Kubernetes, and this install uses `kminus`: a lightweight provider that runs pods as native processes in your Python environment instead of Docker containers, so it needs no root or administrator access. Continue with [Deploy on k-minus](https://docs.tabsdata.com/developer/server-admin/kminus), or deploy on [AWS EKS](https://docs.tabsdata.com/developer/server-admin/eks-install), [Azure AKS](https://docs.tabsdata.com/developer/server-admin/aks-install), or [Google GKE](https://docs.tabsdata.com/developer/server-admin/gke-install).

Next: [Deploy on k-minus](https://docs.tabsdata.com/developer/server-admin/kminus) to start a local Tabsdata Server.

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

Then run the AI agent configuration again from the new virtual environment, starting with `tdk ai agents install`. See [Configure Your AI Agent](https://docs.tabsdata.com/server-admin/connect-agent).
