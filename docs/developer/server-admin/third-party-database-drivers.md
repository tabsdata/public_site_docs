# Install Third-Party Database Drivers

Source: https://docs.tabsdata.com/developer/server-admin/third-party-database-drivers

Some Tabsdata connectors depend on Python database drivers that Tabsdata cannot redistribute because of their licensing terms. These drivers are **not** included in the Tabsdata distribution, and are not installed by default.

If you use one of the affected connectors, you must install its driver explicitly as part of the Tabsdata installation.

## Which drivers do I need?

| Connector | Required package |
| --- | --- |
| PostgreSQL, PostgreSQL CDC | `psycopg2-binary` |
| Oracle | `oracledb` |
| SQL Server | Microsoft ODBC Driver 18 for SQL Server, installed on the server (not a Python package) |

## Declaring the drivers

The Tabsdata package must be installed twice when creating a Tabsdata server: once in your own terminal before running `tdkserver quickstart`, and once more by the Tabsdata server's own shell process when it is being created. As a result, driver installation instructions must be passed as a plain [pip requirements file](https://pip.pypa.io/en/stable/reference/requirements-file-format/) listing the drivers and their versions that should be installed on Tabsdata's shell process.

requirements-td.txt

```txt
psycopg2-binary==2.9.12
oracledb==3.2.0
```

## Adding drivers when creating a Tabsdata server

Pass the requirements file with `--requirements` on `tdkserver quickstart` or `tdkserver init`. Its packages are added to every Tabsdata virtual environment of the new instance. They are installed when the instance is created.

Requirements File

```bash
tdkserver quickstart --requirements <REQS_FILE>
```

## Adding a driver to a Tabsdata server

Use `tdkserver venv update` to add or change database drivers on an instance that already exists. `--name` takes a comma-separated list of virtual environments, such as `fn,ag`. Leave it out to update all of them.

Step 1Create a requirements file with your additional drivers

The requirements file fully replaces all driver configs defined previously, so add all drivers to the file, not only the new one.

Step 2Run

Tabsdata InstanceRequirements File

```bash
tdkserver venv update --instance <TABSDATA_INSTANCE> --name fn,ag --requirements <REQS_FILE>
```

You need to add the requirements to both `fn` and `ag`, otherwise the Tabsdata AI Agent won't be able to access your external systems to fetch metadata and sample data.

Until the driver is present in the environment that executes functions, any connector that needs it will fail at run time.

note

When using Kminus (quickstart), Tabsdata is restarted as part of this update. When using EKS, Tabsdata is not restarted.

## EKS installation

For an EKS installation the requirements file lives inside the instance's init assets.

Step 1Initialise the instance

```bash
tdkserver init
```

Step 2Edit the requirements file in the instance config directory

Tabsdata Instance

```bash
~/.tabsdata/instances/<TABSDATA_INSTANCE>/init/assets/configs/requirements-td.txt
```

Add the necessary database drivers as shown in [Declaring the drivers](#declaring-the-drivers):

requirements-td.txt

```txt
psycopg2-binary==2.9.12
oracledb==3.2.0
```

Step 3Continue with the rest of the Tabsdata EKS setup instructions

See [Install on EKS](https://docs.tabsdata.com/developer/server-admin/eks-install).

The drivers are baked into the function runner environment during setup, so they are available to connector functions at execution time.

note

Tabsdata always reads `requirements-td.txt` from the instance configs directory; a file under any other name, or in any other directory, is ignored.

## Troubleshooting

**A connector fails with a missing-module error.** The driver for that connector is not installed in the environment running the function. Confirm that the package is listed in the requirements file, that `tdkserver venv update` ran against both `fn` and `ag` (or, for EKS, that the file is in the instance configs directory), and that the update has been re-run since the file changed.

**The driver fails to build during installation.** Prefer the binary distributions named above (`psycopg2-binary` rather than `psycopg2`). If a build is still attempted, the installation environment is missing the compiler or client-library headers that the driver's source distribution needs.
