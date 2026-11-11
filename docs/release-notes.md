# Release Notes

Source: https://docs.tabsdata.com/release-notes

## Tabsdata 2.3.0

**New:**

-   Full streaming data processing. Local file system is not used during function execution for caching and staging data anymore. Data is directly read and written from external systems and the configured data storage system.
-   When running in a cloud Kubernetes, Tabsdata system logs and functions logs are accessible in the cloud Log Management Service and accessible via Tabsdata UI and CLI.
-   SQL destination connectors (MySQL, MS SqlServer, Postgres, Oracle, DB2) now support schema evolution (Iceberg semantics).
-   Project secrets. A project can store secrets, function within the project can access those secrets through their context. See [Project secrets](https://docs.tabsdata.com/guide/projects#project-secrets).

**Fixes and improvements:**

-   Simplified AI agent: Tabsdata integration, a skill replaces Tabsdata MCP delivering additional functionality.
-   Performance improvements calculating execution plans.
-   Scalability improvements.
-   Lighter Kubernetes jobs, reduced the number of containers in function execution pods.
-   Unified type inference and schema evolution handling across connectors.

## Tabsdata 2.2.1

**Fixes and improvements:**

-   Kafka sources that use a schema registry now work out of the box. The missing dependencies reported as a known issue in 2.2.0 are now included, and the workaround is no longer needed.
-   `if_table_exists="merge"` on Databricks, Snowflake and BigQuery destinations now handles initial load and truncate operations, so CDC streams that use `start_from="full"` or capture table truncates can be merged directly into these destinations. When a load operation arrives from an initial load, the destination table is truncated before the rows of the initial load are inserted.
-   Fixed a corner case where a stream publisher could lose data under extreme load (tens of thousands of concurrent jobs) on an undersized server.

## Tabsdata 2.2.0

**New:**

-   CDC full load for the Postgres, MySQL and Db2 CDC connectors. With `start_from="full"`, a CDC stream takes a consistent snapshot of the tracked tables and then switches to change capture on its own, from the exact point of the snapshot, with no gaps and no duplicates.
-   Data quality trends. Declare a trend on a data quality summary and Tabsdata keeps a rolling history of your data quality metrics, by run, week and month. Trends are stored as Tabsdata tables and are visible in the Tabsdata UI.
-   `tdkserver quickstart` takes `--config` to set any value of the instance configuration and `--fill` to fill in the provider's configuration stub in the terminal, and works with the `eks`, `aks` and `gke` providers.
-   Service tokens for programmatic access. CI jobs, schedulers and scripts can call Tabsdata as a user without a password, with only that user's project development permissions.

**Fixes and improvements:**

-   CDC streams for Postgres and MySQL now capture table truncates.
-   New batch settings for `@stream_publisher` providing finer processing control.
-   Various performance improvements and bug fixes.

**Deprecations:**

-   `flush_interval_mins` on `@stream_publisher`. Replace `flush_interval_mins=N` with `batch_max_secs=N * 60`.
-   `--anthropic-key`, `--openai-key` and `--uv-index` on `tdkserver quickstart`. Use `--config anthropic-key=…`, `--config openai-key=…` and `--config tabsdata:pods.global.envs.UV_INDEX=…`.

Known issues

-   Kafka sources that use a schema registry require additional dependencies. Kafka sources without a schema registry are not affected. Fixed in 2.2.1.
    
    **Workaround**:
    
    1.  Stop the instance.
        
    2.  Create a requirements file with this line:
        
        ```text
        confluent-kafka[avro,schemaregistry]==2.14.0
        ```
        
    3.  Add the requirements file to the instance's `fn`, `ag` and `td` virtual environments:
        
        ```bash
        tdkserver venv update --instance <instance> --name fn --requirements <file>
        tdkserver venv update --instance <instance> --name ag --requirements <file>
        tdkserver venv update --instance <instance> --name td --requirements <file>
        ```
        
    4.  Start the instance again.
        

### CDC full load

Set `start_from="full"` on a CDC source:

```python
from tabsdatak.api import TableFrameSpec, TableFramesSpec, stream_publisher
from tabsdatak.conn.postgres import PostgresCdcStreamSrc
from tabsdatak.tableframe.functions import concat


@stream_publisher(
    source=PostgresCdcStreamSrc(
        tables=["public.orders", "public.customers"],
        replication_slot="tabsdata_sales",
        start_from="full",
    ),
    batch_max_secs=120,
    output_tables=["orders_changes", "customers_changes"],
)
def stream_sales_changes(
    orders: TableFramesSpec,
    customers: TableFramesSpec,
) -> tuple[TableFrameSpec, TableFrameSpec]:
    return concat(orders), concat(customers)
```

Each table's snapshot starts with a `LOAD` row, which tells the consumer to empty its copy of the table before applying the rows that follow. See [Postgres CDC](https://docs.tabsdata.com/guide/connectors/postgres-cdc), [MySQL CDC](https://docs.tabsdata.com/guide/connectors/mysql-cdc) and [Db2 CDC](https://docs.tabsdata.com/guide/connectors/db2-cdc).

### Batch settings for stream publishers

`batch_min_secs`, `batch_max_secs`, `batch_max_rows`, `batch_max_bytes` and `batch_idle_secs` decide when a batch is handed to a stream publisher. See [Stream Publishers](https://docs.tabsdata.com/guide/functions/stream-publishers#batch-parameters).

### Data quality trends

Pass `Trends()` to the `trends` argument of `Summary`:

```python
from tabsdatak.dataquality import Summary, Trends

Summary(trends=Trends())
```

See [Data Quality Trends](https://docs.tabsdata.com/guide/data-quality-trends).

### Service tokens

Create a token in the UI under **Account → Service tokens**, or with the `tdk` CLI, then log in with the token:

```bash
tdk auth service-token create --slot 1 --expires-in-days 90 --comment "nightly CI"
export TDK_TOKEN=tdst_v1_...
tdk login --server https://tabsdata.example.com --token
```

Each user holds at most two tokens, so a new token can be created while the old one is still in use. See [Service Tokens](https://docs.tabsdata.com/guide/service-tokens).

## Tabsdata 2.1.0

**New:**

-   Support for Google Kubernetes Engine (GKE) and Azure Kubernetes Service (AKS).
-   SQL merge support for Databricks, Snowflake, and BigQuery destinations, with schema drift support using Apache Iceberg semantics where not supported natively.
-   Excel file support for Local File System, Amazon S3, Google Cloud Storage, and Azure Storage sources.
-   Tabsdata CLI (`tdk`) profiles for working with multiple Tabsdata systems concurrently.

**Fixes and improvements:**

-   Data quality columns now include the missing `@` metadata marker.
-   Fixed inverted filtering in the data quality Filter operator.
-   Various performance improvements.

### Merge into SQL destinations

Set `if_table_exists="merge"` on a Databricks, Snowflake, or BigQuery destination. The following example uses Databricks:

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdatak.conn.databricks import DatabricksDest, MergeCfg


@subscriber(
    destination=DatabricksDest(
        tables=["cap_merge"],
        if_table_exists="merge",
        merge_cfg=[MergeCfg(on=["cap_id"], op_column="op")],
        watermark_column="dedup_id",
    ),
    input_tables=["caps_input/cap_merge_v2"],
)
def merge(rows: TableFrameSpec) -> TableFrameSpec:
    return rows
```

-   `MergeCfg.on` specifies the key columns used to match incoming rows to destination rows.
-   `MergeCfg.op_column` identifies the column containing each row's operation: `i` for insert, `u` for update, or `d` for delete.
-   `watermark_column`, when set, prevents duplicate writes when retrying after an in-flight failure.

See the merge configuration reference for [Databricks](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-databricks), [Snowflake](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-snowflake), and [BigQuery](https://docs.tabsdata.com/api/category/connectors/destination/mergecfg-bigquery).

For merge behavior, schema evolution, and retry handling, see [Merging into SQL destinations](https://docs.tabsdata.com/guide/functions/sql-merge).

### CLI profiles

Use `--profile` to choose a command's connection and settings, or set a default profile:

```bash
tdk login --profile production
tdk project list --profile production
tdk set --profile production
```

See [Log in](https://docs.tabsdata.com/cli/tdk/login) and [CLI settings](https://docs.tabsdata.com/cli/tdk/set) for the available options.

## Tabsdata 2.0.2 — August 31, 2026

**New:**

-   Packages now require Python 3.12.13 or later to install.
-   Tabsdata now installs on non-containerized Ubuntu.

## Tabsdata 2.0.1 — August 25, 2026

**New:**

-   Distribution of Tabsdata 2.0.1 is now through PyPI. We've changed the packaging structure to comply with PyPI's package size constraints.
-   Improved Tabsdata jobs handling during start/stop. In Tabsdata 2.0.0 there were cases where, after a restart, some jobs required a manual restart. Parallel teardown of running jobs significantly shortens the shutdown sequence.
-   Fixed Tabsdata Kminus (local deployments only) continuous liveness and readiness checks.
-   Specialized admin commands to recreate jobs' virtual environments with user additional requirements post installation.

### Installation of Tabsdata 2.0.1

**No need to use the Tabsdata package index (`https://pypi.tabsdata.com`).** You can remove the `UV_INDEX`, `UV_INDEX_STRATEGY`, and `PIP_EXTRA_INDEX_URL` environment variables from your setup.

**EKS Init:** The `apiserver.database.yaml` configuration file no longer needs to be edited to set the passwords for the apiserver and agent schema users. The `tabsdata.yaml` configuration file no longer needs an `envs` entry — remove it if present.

### Upgrading from Tabsdata 2.0.0 to Tabsdata 2.0.1

The upgrade process is identical for Tabsdata with EKS and Kminus providers. If Tabsdata is running, the upgrade process will stop it. It must be done on the same machine from which Tabsdata 2.0.0 was installed.

Upgrade steps:

1.  Create a new Python virtual environment.
2.  Install Tabsdata 2.0.1 in the new Python virtual environment.
3.  Run `tdkserver upgrade`.
4.  Run `tdkserver start`.

You can now discard the Python virtual environment with Tabsdata 2.0.0.

### Adding Additional Python Requirements for Function Execution

To use packages not distributed by Tabsdata, add them to the list of requirements Tabsdata needs to run functions.

Tabsdata cannot distribute packages required for the Oracle, MySQL, and Postgres CDC connectors due to licensing issues. If you need them, add them to the requirements of your Tabsdata instance.

Provide the additional requirements as Python `requirements.txt` files.

**On installation:** If installing with `tdkserver quickstart`, follow up with the "On an existing instance" steps below after the quickstart completes. If installing with `tdkserver init` + `tdkserver create`, add the requirements to `requirements-ag.txt` and `requirements-fn.txt` in the `/<HOME_DIR>/.tabsdata/instances/<TABSDATA_INSTANCE>/init/input/assets/` directory after running `tdkserver init`. You need to add the requirements to both files — otherwise the Tabsdata AI Agent and MCP server won't be able to access your external systems to fetch metadata and sample data.

**On an existing instance:** To change the available custom Python packages on an existing Tabsdata instance, use `tdkserver venv update`. Create a requirements file with your additional Python packages — the requirements replace any previous ones, so include everything you need; it is a replace, not an addition. Then run:

```bash
tdkserver venv update --instance <TABSDATA_INSTANCE> --name fn --requirements <REQS_FILE>
tdkserver venv update --instance <TABSDATA_INSTANCE> --name ag --requirements <REQS_FILE>
```

You need to add the requirements to both `fn` and `ag`, otherwise the Tabsdata AI Agent and MCP server won't be able to access your external systems to fetch metadata and sample data.

When using Kminus (quickstart), Tabsdata is restarted as part of this update. When using EKS, Tabsdata is not restarted.

## Tabsdata 2.0.0 — August 12, 2026

Tabsdata 2.0.0 installation

Tabsdata 2.0.0 is temporarily unavailable on PyPI because the release exceeded PyPI's upload constraints. Until it is available there, the 2.0.0 packages are hosted on the Tabsdata package index at `https://pypi.tabsdata.com/simple/`.

### 1\. Configure the Tabsdata package index

Before installing Tabsdata, configure `pip` and `uv` to resolve packages from the Tabsdata package index in addition to PyPI:

```bash
export PIP_EXTRA_INDEX_URL=https://pypi.tabsdata.com/simple/
export UV_INDEX=https://pypi.tabsdata.com/simple/
export UV_INDEX_STRATEGY=unsafe-best-match
```

Keep these environment variables set while running `tdkserver quickstart`. When a Tabsdata instance is created, it installs its own Tabsdata environment and also needs access to the Tabsdata package index.

You can remove the variables after the instance has been created and run successfully.

For EKS installations, configure these values in the instance's `tabsdata.yaml` instead.

### 2\. Install Tabsdata 2.0.0

Earlier versions of Tabsdata are still available on PyPI, so you must explicitly install version `2.0.0`:

```bash
uv pip install "tabsdata[all]"==2.0.0 tabsdata-agent==2.0.0
```

`tabsdata-agent` is a separate package required to use Tabsdata's AI features.

These additional installation steps will no longer be necessary once Tabsdata 2.0.0 is available on PyPI.

Tabsdata 2.0 introduces a new architecture built around **AI-assisted data engineering and Kubernetes-native execution**.

### AI Integration

Tabsdata 2.0 introduces first-class support for working with AI agents.

The new **Tabsdata MCP server** gives agents access to Tabsdata operations, allowing them to create collections, generate and register functions, configure connections, and trigger executions.

The new `tabsdata-agent` package provides a built-in agent experience, while the MCP server can also be used with external agents such as Claude.

### Kubernetes-Native Execution

Tabsdata 2.0 runs function workloads through a Kubernetes-based execution model.

The new `tdkserver` CLI manages the server, with multiple providers available depending on the environment:

-   `kminus` for lightweight local development without requiring Kubernetes or root access
-   `docker` for local container-based execution
-   `eks` for deployment on AWS

This provides a consistent execution model from local development through production Kubernetes environments.

### Projects, Groups, and Collections

Tabsdata now organizes resources into a hierarchy of **projects → groups → collections**.

Every project includes `sources`, `default`, and `destinations` groups. The group determines whether a collection contains publisher, transformer, or subscriber functions.

Connections are now defined at the collection level. Publisher and subscriber functions reference the system they interact with, while credentials and connection configuration are managed separately through Connections.

### New SDK and CLI

Tabsdata 2.0 introduces the `tabsdatak` SDK and replaces the previous `td` CLI with:

-   `tdk` for client operations
-   `tdkserver` for server management

Function decorators now come from `tabsdatak.api`, and several APIs have been simplified or renamed.

Because these changes affect imports, function definitions, connections, and server management, **Tabsdata 2.0 is not backward compatible with 1.9.x applications**.

### Also New in 2.0

Tabsdata 2.0 also adds:

-   **Stream publishers** for long-running ingestion and CDC workloads
-   **Data quality rules** with declarative checks and configurable actions
-   **Expanded connector registry** for source, destination, and CDC integrations
-   **Improved secrets management**, keeping credentials separate from stored connection definitions

## Tabsdata 1.9.1 — April 16, 2026

**New:**

-   Resolved the known issue from 1.9.0: the incomplete requirements lock file that could cause import errors at startup has been corrected. All necessary dependency pins are now included.

## Tabsdata 1.9.0 — March 27, 2026

**New:**

-   New Source connector: Databricks.
-   ClickHouse destination connector supports Iceberg schema evolution. StarRocks did not apply its `schema_evolution` setting until 2.3.0.
-   MySQL CDC, Postgres CDC, and Db2 CDC triggers support schema changes.
-   File-based sources (Local, S3, Azure, GCS) can add columns with file URI/name and row position.
-   New UI functionality: lineage tracking — given a table data version or a function version, it is possible to see all execution plans where they were used.
-   UI improvements: Table data versions show when new data is available, and when schema changes have happened.
-   Fixed the Homebrew `liblzma` runtime dependency issue from 1.8.0.

Known issues

-   Tabsdata 1.9.0 was shipped with an incomplete requirements lock file that does not include all necessary dependency pins. This can cause import errors at startup when the supervisor resolves dependencies to incompatible versions. This issue is resolved in Tabsdata 1.9.1.
    
    **Workaround**:
    
    1.  Download the corrected constraints file [tdconstraints.txt](https://docs.tabsdata.com/assets/files/tdconstraints-bfc2bab0977322b2f1a2a40c342be1a1.txt) to a persistent location on your system.
        
    2.  Export the `UV_CONSTRAINT` environment variable pointing to the file **before** starting the supervisor or server:
        
        ```bash
        export UV_CONSTRAINT=/path/to/tdconstraints.txt
        ```
        
    3.  Start the supervisor/server as usual. UV will now resolve all dependencies to the pinned versions in the constraints file.
        
-   File-based sources on Windows do not add the `file://` scheme to the URI when using the `file_info` parameter.
    

## Tabsdata 1.8.0 — March 19, 2026

**New:**

-   New Source connectors: Db2 CDC, MySQL CDC, and Postgres CDC.
-   New Destination connectors: ClickHouse, StarRocks, and Apache Druid.
-   UI, navigation improvements, new look & feel.

Known issues

-   Some tabsdata binaries are linked against a Homebrew-installed liblzma library during the build process, creating a runtime dependency on `/opt/homebrew/opt/xz/lib/liblzma.5.dylib`. If the library is not installed on your system, commands like `tdserver` will fail with the error `/opt/homebrew/opt/xz/lib/liblzma.5.dylib (no such file)`. This will be corrected in the next release.
    
    **Workaround**: Install the required library by running `brew install xz`.
    

## Tabsdata 1.7.1 — February 25, 2026

**New:**

-   New Source connector: Db2.

## Tabsdata 1.7.0 — February 24, 2026

**New:**

-   UI navigation re-design for improved user experience.
-   User-friendly IDs for Execution Plans, Transactions, and Data Versions.
-   Improved documentation across the platform.

## Tabsdata 1.6.0 — February 3, 2026

**New:**

-   KafkaTrigger, a Kafka topic consumer to load messages into Tabsdata tables.
-   CronTrigger, periodic triggering of publishers/subscribers/transformers.
-   Declarative data quality API for validation, classification and quarantining data.
-   New SQL connectors supporting Database transactions both for publishers and subscribers.
-   Revamped UI navigation.

Known issues

-   When installing tabsdata with uv as the package manager, the databricks-sql-connector dependency must be pinned to version 4.2.0. For example: `uv pip install "tabsdata[all]==1.6.0" "databricks-sql-connector==4.2.0"`.
-   To have the tabsdata agent working, you need to edit the file `~/.tabsdata/instances/tabsdata/workspace/config/proc/regular/aiagent/config/requirements.txt` and replace `tabsdata_agent` with `tabsdata-agent`. This will get corrected in the next release.

## Tabsdata 1.5.1 — November 18, 2025

**Fixes:**

-   Fixes a 1.5.0 regression that stopped parts of the UI from working correctly.

## Tabsdata 1.5.0 — November 15, 2025

**New:**

-   **Version System Columns:** All TableFrames now have a set of system columns with version information (execution ID, transaction ID, version ID and timestamp). These system columns enable advanced multi-time query functionality.
-   BigQuery Subscriber Connector.
-   Several improvements and new functionality for Lineage/Execution graphs in the UI.

## Tabsdata 1.4.0 — October 20, 2025

**New:**

-   Tabsdata AI agent (Preview). Explore collections and tables, and create publishers and subscribers using a natural language interface.
-   User Defined Functions support. Integrate custom logic or external functions with TableFrame's processing.
-   Interactive Execution/Lineage graphs in the UI.

## Tabsdata 1.3.0 — September 26, 2025

**New:**

-   Google Cloud Storage publisher and subscriber connectors.
-   Avro support for publishing and subscribing using file based connectors (File, S3, Azure storage, Google Cloud Storage).
-   Salesforce reports publisher connector.
-   Grok parser support for TableFrames columns.
-   Permissions CLI.

**Improvements:**

-   Minor CLI usability improvements.
-   Minor UI usability improvements.
-   Non functional improvements.

## Tabsdata 1.2.0 — August 14, 2025

**New:**

-   New publisher and subscriber connectors for Microsoft SQL Server.
-   UI usability improvements.

## Tabsdata 1.1.0 — August 4, 2025

**New:**

-   Internal module reorganization to clearly separate public and private APIs.
-   No user-facing changes.

## Tabsdata 1.0.0 — July 24, 2025

**New:**

-   **Browser Interface:** You can now interact with various powerful functionalities of Tabsdata using the browser interface.
-   **New Connectors:** Built-in support for Snowflake and Databricks is now live. Seamless integrations, out of the box.
-   **Catalog Support:** Enhanced support for Unity Catalog, and AWS Glue Catalog, with Parquet format compatibility.
-   **CLI Improvements:** We've reimagined the CLI experience with streamlined commands and contextual hints to make onboarding easier.
-   **Richer Metadata:** We're capturing and displaying more metadata to give users better visibility and control over their data.
-   **Backend Enhancements:** Under-the-hood upgrades to improve security, stability, and scalability in production environments.

## Tabsdata 0.9.6 — April 24, 2025

**New:**

-   Changes logs from ANSI to ASCII.
-   Improved schema inference when publishing files into Tabsdata.
-   Added column rename to TableFrames.
-   Fixed initial\_values bugs on first run and when there is no additional incremental data.

## Tabsdata 0.9.5 — April 12, 2025

**New:**

-   AWS Glue Iceberg connector to seamlessly subscribe data from Tabsdata to AWS as Iceberg Tables.
-   MongoDB destination connector to seamlessly subscribe data from Tabsdata to MongoDB.
-   Richer support for Hashicorp Vault.
-   Corrections and restructuring in documentation.

## Tabsdata 0.9.3 — March 14, 2025

**New:**

-   Salesforce connector to seamlessly publish data from Salesforce to Tabsdata.
-   Stronger security protocols with support for Hashicorp secrets.
-   Isolation of the server's python environment from that of the user for better controls.

## Tabsdata 0.9.2 — February 28, 2025

**New:**

-   Improvements in CLI experience.
-   Enhancements in backend to debug edge cases and performance improvement.

## Tabsdata 0.9.1 — February 14, 2025

**New:**

-   Python 3.13 support.
-   New `TableFrame.item(self)` method for extracting a single value from Tabsdata TableFrames.
-   Renamed some TableFrame classes for better clarity.
-   Corrections and restructuring in documentation.
