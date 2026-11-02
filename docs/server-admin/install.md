# Install Tabsdata

> Installs the tabsdata Python package and tabsdata-agent into a virtual environment using uv, pip, conda, pyenv, or venv on Linux, macOS, and Windows.

Source: https://docs.tabsdata.com/server-admin/install

Tabsdata requires the `tabsdata` python package, which is installable through `pip` and requires **no admin or root privileges**.

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
uv pip install "tabsdata[all]" tabsdata-agent
```

```bash
pip install "tabsdata[all]" tabsdata-agent
```

Some Notes on Tabsdata Server Providers

Tabsdata runs on Kubernetes, and the local deployment uses `kminus`: a lightweight provider that runs pods as native processes in your Python environment instead of Docker containers, so it needs no root or administrator access. Continue with [Deploy on k-minus](https://docs.tabsdata.com/server-admin/kminus), or deploy on [AWS EKS](https://docs.tabsdata.com/server-admin/eks-install), [Azure AKS](https://docs.tabsdata.com/server-admin/aks-install), or [Google GKE](https://docs.tabsdata.com/server-admin/gke-install).
