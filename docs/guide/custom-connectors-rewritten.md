# Custom Connectors

Source: https://docs.tabsdata.com/guide/custom-connectors-rewritten

A **custom connector** is a Python package that defines how Tabsdata connects to an external system. It contains the configuration classes and the code needed to read from or write to that system.

Once installed, the connector becomes available as a Publisher source, Subscriber destination, or both.

AI agents connected through the MCP Server can also create custom connectors.

## File structure

This guide builds a SQLite connector as an example.

Create a directory named `sqlite_connector` with the following files. The Python package lives in `src/tabsdata_sqlite`.

pyproject.toml

error.py

\_\_init\_\_.py

\_plugin.py

`pyproject.toml` defines the package, dependencies, and entry points Tabsdata uses to discover the connector.

`error.py` defines errors for invalid configuration and failed reads or writes.

`__init__.py` defines the connection and function configuration classes users import.

`_plugin.py` implements the read and write logic and registers the connector with Tabsdata.

Download the complete connector directory using the button beside `sqlite_connector`, or copy the files below. The highlighted lines are the main parts you would change when adapting this example to another system.

### pyproject.toml

Step 1Define the package and entry points

`pyproject.toml` defines the package metadata, Python dependencies, and entry points Tabsdata uses to load the connector.

When adapting this file:

1.  Set the package `name`, `version`, and `description`.
2.  Add any Python packages the connector needs to `dependencies`.
3.  Define one entry point for each source or destination the package provides.

pyproject.toml

```toml
[build-system]
requires = ["setuptools>=69"]
build-backend = "setuptools.build_meta"

[project]
name = "tabsdata-conn-sqlite"
version = "0.1.0"
description = "Tabsdata source and destination connector for SQLite databases."
requires-python = ">=3.12"
dependencies = [
  "tabsdata>=2.1,<2.2",
]

[tool.setuptools.packages.find]
where = ["src"]

[project.entry-points."tabsdatak.connectors"]
src_sqlite = "tabsdata_sqlite._plugin:SQLITE_SRC"
dest_sqlite = "tabsdata_sqlite._plugin:SQLITE_DEST"
```

### error.py

Step 2Define connector errors

`SqliteRuntimeException` extends `ConnException` for errors that happen while reading or writing data.

`SqliteErrorCode` defines the errors the connector can raise and maps each one to an exception type and message.

`SQLITE_1` through `SQLITE_4` are used when validating the configuration classes in `__init__.py`.

The plugins use:

-   `SQLITE_5` when a query fails.
-   `SQLITE_6` when the number of returned tables does not match the configured destination tables.
-   `SQLITE_7` when a write fails.

Message placeholders such as `{table}` are filled when `.exception()` is called.

error.py

```python
from tabsdatak.conn.common.error import ConnException, ConnInitException
from tabsdatak.error import ErrorCode, ErrorDef


class SqliteRuntimeException(ConnException):
  """A SQLite read or write failed."""


class SqliteErrorCode(ErrorCode):
  SQLITE_1 = ErrorDef(ConnInitException, "SqliteSrcConn validation failed")
  SQLITE_2 = ErrorDef(ConnInitException, "SqliteDestConn validation failed")
  SQLITE_3 = ErrorDef(ConnInitException, "SqliteSrc validation failed")
  SQLITE_4 = ErrorDef(ConnInitException, "SqliteDest validation failed")
  SQLITE_5 = ErrorDef(SqliteRuntimeException, "SQLite query {index} failed")
  SQLITE_6 = ErrorDef(
      SqliteRuntimeException,
      "SQLite received {slots} table(s) for {tables} target table(s)",
  )
  SQLITE_7 = ErrorDef(SqliteRuntimeException, "SQLite write to {table} failed")
```

### **init**.py

Step 3Define connection and function settings

`__init__.py` defines the classes users import from `tabsdata_sqlite`.

`StrOrSecretSpec` allows a field to accept either a plain string or a Tabsdata secret. The `resolve` helper returns the underlying value.

`TableName` restricts SQLite table names to letters, numbers, and underscores, with the first character limited to a letter or underscore.

`SqliteSrcConn` and `SqliteDestConn` define the database path stored in the Collection's connection document.

Both extend `Conn` and require a `path` field. In the connection document, that value appears as `spec.path`.

`SqliteSrc` defines the queries a Publisher should run.

`SqliteDest` defines the tables a Subscriber should write to and whether existing tables should be replaced or appended to.

The order matters:

-   Query results are returned in the same order as `queries`.
-   Subscriber results are written in the same order as `tables`.

`if_table_exists` accepts `"append"` or `"replace"` and defaults to `"replace"`.

The `@_api.dataclass` decorator validates each class using the provided error code. `kw_only=True` requires named arguments, such as `SqliteSrcConn(path="/data/shop.db")`.

\_\_init\_\_.py

```python
from typing import Annotated, Literal

from pydantic import StringConstraints

import tabsdatak._api as _api
from tabsdatak.api import Dest, Secret, Src, StrOrSecretSpec
from tabsdatak.spi import Conn
from tabsdata_sqlite.error import SqliteErrorCode


TableName = Annotated[str, StringConstraints(pattern=r"^[A-Za-z_][A-Za-z0-9_]*$")]


def resolve(spec: StrOrSecretSpec) -> str:
  return spec.value() if isinstance(spec, Secret) else spec


@_api.dataclass(SqliteErrorCode.SQLITE_1, kw_only=True)
class SqliteSrcConn(Conn):
  """Connection to the SQLite database a publisher reads."""

  path: StrOrSecretSpec


@_api.dataclass(SqliteErrorCode.SQLITE_2, kw_only=True)
class SqliteDestConn(Conn):
  """Connection to the SQLite database a subscriber writes."""

  path: StrOrSecretSpec


@_api.dataclass(SqliteErrorCode.SQLITE_3, kw_only=True)
class SqliteSrc(Src):
  """Queries a publisher runs against SQLite."""

  queries: list[str]


@_api.dataclass(SqliteErrorCode.SQLITE_4, kw_only=True)
class SqliteDest(Dest):
  """SQLite tables that receive a subscriber's returned data."""

  tables: list[TableName]
  if_table_exists: Literal["append", "replace"] = "replace"
```

The connection defines **where** Tabsdata connects. The Publisher or Subscriber defines **what** to read or write.

During execution, Tabsdata passes both objects to the connector plugin.

\_\_init\_\_.py · Connection

```
class SqliteSrcConn(Conn):
    path: StrOrSecretSpec
```

→

conn-sqlite-in.yaml

```
kind: connectionDef
apiVersion: '1.0'
type: tabsdata_sqlite:SqliteSrcConn
spec:
  path: str:/data/shop.db
```

\_\_init\_\_.py · Source

```
class SqliteSrc(Src):
    queries: list[str]
```

→

pub\_shop.py

```
source=SqliteSrc(
    queries=[
        "SELECT * FROM customers",
        "SELECT * FROM orders",
    ],
)
```

### \_plugin.py

Step 4Implement and register the reads and writes

`_plugin.py` contains the connector's runtime logic.

The plugins receive the connection and function settings defined in `__init__.py`. The shared `connect` helper resolves the configured database path and opens the SQLite connection.

`SqliteSrcPlugin.read_in`:

1.  Runs each query from the Publisher configuration.
2.  Writes each query result to a Parquet file in `ctx.work_dir`.
3.  Returns those files in the same order as `src.queries`.

Each result is wrapped in its own inner list because the connector uses `TableMode.SINGLE`.

If a query fails, the plugin raises `SQLITE_5` with the query index and original exception.

`SqliteDestPlugin.write_out`:

1.  Checks that the number of returned table slots matches `dest.tables`.
2.  Matches each returned file to the destination table in the same position.
3.  Skips any `None` file reference.
4.  Reads each remaining Parquet file.
5.  Replaces or appends to the destination table based on `dest.if_table_exists`.

The explicit `BEGIN` keeps table creation, replacement, and inserts in the same transaction. If a write fails, those changes are rolled back together.

note

The database path is resolved on the machine running the Function. If Functions run on separate workers, the SQLite file must also be accessible from those workers.

`SQLITE_SRC` and `SQLITE_DEST` register the connection classes, function settings, and plugin implementations with Tabsdata.

Their names must match the entry points defined in `pyproject.toml`.

\_plugin.py

```python
import sqlite3
from pathlib import Path

import polars as pl

from tabsdatak.spi import (
  DestContext,
  DestDef,
  DestPlugin,
  SrcDef,
  SrcPlugin,
  SrcPluginCtx,
  TableFileInput,
  TableFileSpec,
  TableMode,
)
from tabsdata_sqlite import (
  SqliteDest,
  SqliteDestConn,
  SqliteSrc,
  SqliteSrcConn,
  resolve,
)
from tabsdata_sqlite.error import SqliteErrorCode


def connect(conn: SqliteSrcConn | SqliteDestConn) -> sqlite3.Connection:
  return sqlite3.connect(resolve(conn.path))


class SqliteSrcPlugin(SrcPlugin[SqliteSrcConn, SqliteSrc]):
  def read_in(
      self,
      ctx: SrcPluginCtx,
      conn: SqliteSrcConn,
      src: SqliteSrc,
  ) -> list[list[TableFileInput]]:
      con = connect(conn)
      try:
          slots = []
          for index, query in enumerate(src.queries):
              try:
                  frame = pl.read_database(query, con)
              except Exception as e:
                  raise SqliteErrorCode.SQLITE_5.exception(cause=e, index=index)
              parquet = Path(ctx.work_dir) / f"{index}.parquet"
              frame.write_parquet(parquet)
              slots.append([TableFileInput(file=parquet)])
          return slots
      finally:
          con.close()


class SqliteDestPlugin(DestPlugin[SqliteDestConn, SqliteDest]):
  def write_out(
      self,
      ctx: DestContext,
      conn: SqliteDestConn,
      dest: SqliteDest,
      tables: list[TableFileSpec],
  ) -> None:
      if len(tables) != len(dest.tables):
          raise SqliteErrorCode.SQLITE_6.exception(
              slots=len(tables), tables=len(dest.tables)
          )

      con = connect(conn)
      try:
          with con:
              con.execute("BEGIN")
              for table, parquet in zip(dest.tables, tables):
                  if parquet is None:
                      continue
                  try:
                      frame = pl.read_parquet(parquet)
                      columns = ", ".join(
                          '"' + c.replace('"', '""') + '"' for c in frame.columns
                      )
                      if dest.if_table_exists == "replace":
                          con.execute(f'DROP TABLE IF EXISTS "{table}"')
                      con.execute(
                          f'CREATE TABLE IF NOT EXISTS "{table}" ({columns})'
                      )
                      marks = ", ".join("?" for _ in frame.columns)
                      con.executemany(
                          f'INSERT INTO "{table}" ({columns}) VALUES ({marks})',
                          frame.iter_rows(),
                      )
                  except Exception as e:
                      raise SqliteErrorCode.SQLITE_7.exception(cause=e, table=table)
      finally:
          con.close()


SQLITE_SRC = SrcDef(
  conn=SqliteSrcConn,
  type_="sqlite-sql-in",
  system="SQLite",
  src_version="v1",
  src=SqliteSrc,
  table_mode=TableMode.SINGLE,
  cardinality=lambda src: len(src.queries),
  plugin=SqliteSrcPlugin,
  explorer=None,
  icon=None,
)

SQLITE_DEST = DestDef(
  conn=SqliteDestConn,
  type_="sqlite-sql-out",
  system="SQLite",
  dest_version="v1",
  dest=SqliteDest,
  cardinality=lambda dest: len(dest.tables),
  plugin=SqliteDestPlugin,
  explorer=None,
  icon=None,
)
```

`type_` is the connector's registration identifier and must be unique across installed connectors.

It is different from the `type` field in a connection document. The connection document's `type` identifies the Python connection class to instantiate.

`cardinality` tells Tabsdata how many results the source or destination expects.

For the source, `TableMode.SINGLE` means each query result contains one file.

This connector does not provide an explorer or icon, so both are set to `None`.

## Installing a connector

The connector package must be installed in two places:

1.  Wherever `tdk` runs, so Tabsdata can validate connections and register Functions.
2.  In the server's Function environment, so the connector is available when those Functions execute.

Step 5aInstall the package where tdk runs

From the directory that contains `sqlite_connector`, run:

```bash
pip install ./sqlite_connector
```

Step 5bInstall the package in the server's function environment

Make the package available to the server, such as through a Git repository.

Replace `<org>` and `<repo>` with the repository that contains `sqlite_connector`, then add the package to a requirements file:

connectors.txt

```text
tabsdata-conn-sqlite @ git+https://github.com/<org>/<repo>.git#subdirectory=sqlite_connector
```

Update the Function environment, then restart the instance. Updating the environment stops the instance.

```bash
tdkserver venv update --name fn --requirements connectors.txt
tdkserver start
```

The requirements file replaces the environment's current list of complementary packages. Include every complementary package the server still needs.

## Using the connector

Step 6aCreate the connections and attach them to Collections

Create connection documents for the source and destination.

The `type` field selects one of the connection classes defined in [the connection classes](#connector-connection-classes).

`spec.path` provides the required `path` value. The `str:` prefix marks it as a literal string.

conn-sqlite-in.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdata_sqlite:SqliteSrcConn
spec:
  path: str:/data/shop.db
```

conn-sqlite-out.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdata_sqlite:SqliteDestConn
spec:
  path: str:/data/warehouse.db
```

The source database must already contain the `customers` and `orders` tables used by the Publisher.

The destination database is created the first time SQLite opens it if it does not already exist. Its parent directory must already exist and be writable.

Attach the source connection to a `shop` Collection in the `sources` group and the destination connection to a `warehouse` Collection in the `destinations` group:

```bash
tdk collection create --name shop --group sources --conn-file conn-sqlite-in.yaml
tdk collection create --name warehouse --group destinations --conn-file conn-sqlite-out.yaml
```

Step 6bUse the source in a Publisher

Create `pub_shop.py`.

Set `queries` on `SqliteSrc`, which is the source field defined in [the function settings](#connector-function-classes).

Before `pub_shop` runs, the source plugin executes both queries and passes their results into the Function.

The Function returns those results as the `customers` and `orders` Tabsdata tables.

pub\_shop.py

```python
from tabsdatak.api import publisher, TableFrameSpec
from tabsdata_sqlite import SqliteSrc


@publisher(
    source=SqliteSrc(queries=["SELECT * FROM customers", "SELECT * FROM orders"]),
    output_tables=["customers", "orders"],
)
def pub_shop(
    customers: TableFrameSpec, orders: TableFrameSpec
) -> tuple[TableFrameSpec, TableFrameSpec]:
    return customers, orders
```

Register the Publisher in the `shop` Collection. It automatically uses the source connection attached to that Collection.

```bash
tdk fn register --coll shop --path pub_shop.py::pub_shop
```

Step 6cUse the destination in a Subscriber

Create `sub_warehouse.py`.

Set `tables` and `if_table_exists` on `SqliteDest`, which are the destination fields defined in [the function settings](#connector-function-classes).

The Subscriber reads `shop/customers` and `shop/orders`, then returns those tables to the destination plugin.

Use `"replace"` to drop and recreate each configured SQLite table on every write.

Use `"append"` to keep the existing rows and add the returned rows.

sub\_warehouse.py

```python
from tabsdatak.api import subscriber, TableFrameSpec
from tabsdata_sqlite import SqliteDest


@subscriber(
    destination=SqliteDest(tables=["customers", "orders"], if_table_exists="replace"),
    input_tables=["shop/customers", "shop/orders"],
)
def sub_warehouse(
    customers: TableFrameSpec, orders: TableFrameSpec
) -> tuple[TableFrameSpec, TableFrameSpec]:
    return customers, orders
```

Register the Subscriber in the `warehouse` Collection. It automatically uses the destination connection attached to that Collection.

```bash
tdk fn register --coll warehouse --path sub_warehouse.py::sub_warehouse
```
