# Custom Connectors

Source: https://docs.tabsdata.com/developer/guide/plugins

A **custom connector** allows Tabsdata to connect to external systems that are not officially supported by the current suite of Tabsdata connectors.

Custom Connectors are Python packages that can be coded by hand or by coding agents working with Tabsdata through `tdk`.

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

tip

Download the connector template using the button at the top right of the file tree, or copy the files below. The highlighted lines are the main parts you would change when adapting this example to another system.

### pyproject.toml

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

`error.py` defines the different errors that can occur during connector usage.

`SQLITE_1` through `SQLITE_4` are assigned to the configuration classes in `__init__.py` and report invalid connection or function settings.

-   `SQLITE_1` when the source connection document fails validation (invalid credentials)
-   `SQLITE_1` when the destination connection document fails validation (invalid credentials)
-   `SQLITE_3` when the source connector fails validation (missing/invalid arguments provided)
-   `SQLITE_4` when the destination connector fails validation (missing/invalid arguments provided)

You can define additional error codes in `error.py` and raise them in `_plugin.py` to handle failures during execution.

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

### `__init__.py`

`__init__.py` defines the classes users import from `tabsdata_sqlite` and what arguments these classes can accept.

-   `SqliteSrcConn`: Connection Document for Source Connectors
-   `SqliteSrc`: Source Connector
-   `SqliteDestConn`: Connection for Destination Connectors
-   `SqliteDest`: Destination Connector

Within each class, define the configuration fields and their types. Pass the appropriate validation error code as the first argument to the `@_api.dataclass` decorator.

```text
@_api.dataclass(SqliteErrorCode.SQLITE_1, kw_only=True)
class SqliteSrcConn(Conn):
  """Connection to the SQLite database a publisher reads."""

  path: StrOrSecretSpec
```

tip

The `SqlLiteSrcConn` above is configured to accept a single `path` argument as either a string or a secret. If this condition is not met, it throws the `SQLite_1` error code.

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

Under this configuration,

-   the source connection defines **where** Tabsdata connects
-   the source connector defines **what** query to read from the database
-   the destination connection defines **where** Tabsdata connects
-   the destination connector defines **what** Tabsdata tables are written into SQLite and whether to append or replace existing tables.

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

`_plugin.py` contains the connector's runtime logic that uses the inputs defined in `__init__.py`

`SqliteSrcPlugin.read_in`:

1.  Runs each query from the Publisher configuration.
2.  Wraps each query result as a polars `LazyFrame`.
3.  Returns the frames as `LazyFrameInput`s with `to_lazy_frame_inputs`, in the same order as `src.queries`.

If a query fails, the plugin raises `SQLITE_5` with the query index and original exception.

`SqliteDestPlugin.write_out`:

1.  Checks that the number of returned table slots matches `dest.tables`.
2.  Matches each returned file to the destination table in the same position.
3.  Skips any `None` file reference.
4.  Reads each remaining Parquet file.
5.  Replaces or appends to the destination table based on `dest.if_table_exists`.

\_plugin.py

```python
import sqlite3
from collections.abc import Iterable

import polars as pl

from tabsdatak.spi import (
  DestContext,
  DestDef,
  DestPlugin,
  LazyFrameInput,
  SrcDef,
  SrcPlugin,
  SrcPluginCtx,
  TableFileSpec,
  TableMode,
  to_lazy_frame_inputs,
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
  ) -> list[Iterable[LazyFrameInput]]:
      con = connect(conn)
      try:
          frames = []
          for index, query in enumerate(src.queries):
              try:
                  frame = pl.read_database(query, con)
              except Exception as e:
                  raise SqliteErrorCode.SQLITE_5.exception(cause=e, index=index)
              frames.append([frame.lazy()])
          return to_lazy_frame_inputs(frames)
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

## Installing a connector

The connector package must be installed in two places:

1.  Wherever `tdk` runs locally, so Tabsdata can validate connections and register Functions.
2.  In the server's Function environment, so the connector is available when those Functions execute.

-   Local
-   Git
-   PyPI

Step 1Install the local package where tdk runs

From the directory containing `sqlite_connector`, run:

```bash
pip install ./sqlite_connector
```

Step 2Add the local package to the server's Function environment

requirements.txt

```text
tabsdata-conn-sqlite @ file:///absolute/path/to/sqlite_connector
```

Step 3Update the server's Function environment

```bash
tdkserver venv update \
  --name fn \
  --requirements requirements.txt
```

danger

This command overwrites Tabsdata's existing list of package requirements. Include every complementary package the environment still needs, not just the new one being added.

Step 1Install the Git package where tdk runs

Replace `<org>` and `<repo>` with the repository containing the connector:

```bash
pip install "git+https://github.com/<org>/<repo>.git#subdirectory=sqlite_connector"
```

Step 2Add the Git package to the server's Function environment

requirements.txt

```text
tabsdata-conn-sqlite @ git+https://github.com/<org>/<repo>.git#subdirectory=sqlite_connector
```

Step 3Update the server's Function environment

After `tdkserver quickstart` has created the instance, update its `fn` environment to include the package.

```bash
tdkserver venv update \
  --instance <TABSDATA_INSTANCE> \
  --name fn \
  --requirements requirements.txt
```

danger

This command overwrites Tabsdata's existing list of package requirements. Include every complementary package the environment still needs, not just the new one being added.

Step 1Install the published package where tdk runs

After publishing the connector to PyPI, install its package:

```bash
pip install tabsdata-conn-sqlite==0.1.0
```

Step 2Add the published package to the server's Function environment

requirements.txt

```text
tabsdata-conn-sqlite==0.1.0
```

Step 3Update the server's Function environment

After `tdkserver quickstart` has created the instance, update its `fn` environment to include the package.

```bash
tdkserver venv update \
  --instance <TABSDATA_INSTANCE> \
  --name fn \
  --requirements requirements.txt
```

danger

This command overwrites Tabsdata's existing list of package requirements. Include every complementary package the environment still needs, not just the new one being added.

## Using the connector

Step 4Generate the connection documents

This works as long as `SQLITE_SRC` and `SQLITE_DEST` are registered through the `tabsdatak.connectors` entry points in `pyproject.toml`.

tip

Run `tdk connection types` to confirm that `tdk` can discover both custom connector types.

Generate the appropriate connection template:

-   Source
-   Destination

```bash
tdk connection template --type sqlite-sql-in --file conn-sqlite-in.yaml
```

```bash
tdk connection template --type sqlite-sql-out --file conn-sqlite-out.yaml
```

Step 5Fill out the connection documents

The `spec` field contains the arguments defined in `__init__.py`. A completed document will look like this:

-   Source
-   Destination

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

Step 6Attach the connections to Collections

-   New Collection
-   Existing Collection

Create a new collection and attach the filled-out connection document.

-   Source
-   Destination

```bash
tdk collection create --name shop --group sources --conn-file conn-sqlite-in.yaml
```

```bash
tdk collection create --name warehouse --group destinations --conn-file conn-sqlite-out.yaml
```

Update an existing collection with the filled-out connection document.

-   Source
-   Destination

```bash
tdk collection update --name shop --conn-file conn-sqlite-in.yaml
```

```bash
tdk collection update --name warehouse --conn-file conn-sqlite-out.yaml
```

## Use the connectors in a Function

-   Publisher
-   Subscriber

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

### Register into Tabsdata

```bash
tdk fn register --coll shop --path pub_shop.py::pub_shop
```

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

### Register into Tabsdata

```bash
tdk fn register --coll warehouse --path sub_warehouse.py::sub_warehouse
```
