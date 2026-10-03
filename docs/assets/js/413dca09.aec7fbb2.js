"use strict";(self.webpackChunktabsdata_docs=self.webpackChunktabsdata_docs||[]).push([["817275"],{853250(e,t,n){n.r(t),n.d(t,{metadata:()=>s,CONNECTOR_TREE:()=>j,default:()=>b,contentTitle:()=>u,frontMatter:()=>p,assets:()=>x,toc:()=>m});var s=JSON.parse('{"id":"developer/guide/plugins","title":"Custom Connectors","description":"A custom connector is a Python package that contains the configuration classes and read or write code for an external system. Installing the package adds that system as a source for publishers or a destination for subscribers.","source":"@site/docs/developer/guide/plugins.mdx","sourceDirName":"developer/guide","slug":"/developer/guide/plugins","permalink":"/developer/guide/plugins","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Custom Connectors","sidebarTitle":"Custom Connectors","sidebar_class_name":"nav-icon-plugins","toc_max_heading_level":3},"sidebar":"devGuideSidebar","previous":{"title":"StarRocks","permalink":"/developer/guide/connectors/starrocks"},"next":{"title":"Trigger Overview","permalink":"/developer/guide/execution-and-triggers"}}'),i=n(474848),r=n(28453),o=n(781925),a=n(343052),c=n(647776),l=n(238077),d=n(1113),h=n(475342);let p={title:"Custom Connectors",sidebarTitle:"Custom Connectors",sidebar_class_name:"nav-icon-plugins",toc_max_heading_level:3},u,x={},j={name:"sqlite_connector",downloadPath:"/downloads/sqlite_connector.zip",children:[{name:"pyproject.toml",type:"toml"},{name:"src",children:[{name:"tabsdata_sqlite",children:[{name:"error.py",type:"py"},{name:"__init__.py",type:"py"},{name:"_plugin.py",type:"py"}]}]}]},m=[{value:"File structure",id:"file-structure",level:2},{value:"pyproject.toml",id:"pyprojecttoml",level:3},{value:"error.py",id:"errorpy",level:3},{value:"__init__.py",id:"__init__py",level:3},{value:"_plugin.py",id:"_pluginpy",level:3},{value:"Installing a connector",id:"installing-a-connector",level:2},{value:"Using the connector",id:"using-the-connector",level:2}];function f(e){let t={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(t.p,{children:["A ",(0,i.jsx)(t.strong,{children:"custom connector"})," is a Python package that contains the configuration classes and read or write code for an external system. Installing the package adds that system as a source for publishers or a destination for subscribers."]}),"\n",(0,i.jsx)(t.p,{children:"AI agents connected through the MCP Server can also write custom connectors. "}),"\n",(0,i.jsx)(t.h2,{id:"file-structure",children:"File structure"}),"\n",(0,i.jsx)(t.p,{children:"The following code uses an example for an sqlite connector."}),"\n",(0,i.jsxs)(t.p,{children:["Create a directory named ",(0,i.jsx)(t.code,{children:"sqlite_connector"})," with the following files. The Python files belong in ",(0,i.jsx)(t.code,{children:"src/tabsdata_sqlite"}),", which is the package users will import."]}),"\n",(0,i.jsxs)(c.A,{children:[(0,i.jsx)(a.A,{data:j}),(0,i.jsxs)(c.Q,{children:[(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"pyproject.toml"})," defines the package, its dependencies, and the entry points Tabsdata uses to find the connector."]}),(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"error.py"})," defines the errors reported when configuration is invalid or a read or write fails."]}),(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"__init__.py"})," defines the fields used in connection documents and Python functions."]}),(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"_plugin.py"})," implements the reads and writes, and registers the classes they use."]})]})]}),"\n",(0,i.jsxs)(t.p,{children:["Download the complete connector directory using the button beside ",(0,i.jsx)(t.code,{children:"sqlite_connector"}),", or copy the files below. Highlighted lines show the names, settings, and database code to adapt when building a connector for another system."]}),"\n",(0,i.jsx)(t.h3,{id:"pyprojecttoml",children:"pyproject.toml"}),"\n",(0,i.jsx)(o.A,{n:"1",children:"Define the package and entry points"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"pyproject.toml"})," defines the package name, dependencies, and entry points Tabsdata uses to load the connector. The name ",(0,i.jsx)(t.code,{children:"tabsdata-conn-sqlite"})," is what pip installs, while ",(0,i.jsx)(t.code,{children:"tabsdata_sqlite"})," is the Python package under ",(0,i.jsx)(t.code,{children:"src/"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["The Tabsdata dependency targets the 2.1 release series. SQLite is included in Python; for a system that requires another client library, add it to ",(0,i.jsx)(t.code,{children:"dependencies"}),"."]}),"\n",(0,i.jsx)("div",{id:"connector-entry-points"}),"\n",(0,i.jsxs)(t.p,{children:["The entry points load ",(0,i.jsx)(t.code,{children:"SQLITE_SRC"})," and ",(0,i.jsx)(t.code,{children:"SQLITE_DEST"})," from ",(0,i.jsx)(t.code,{children:"tabsdata_sqlite._plugin"}),". These registrations are defined in ",(0,i.jsx)(t.a,{href:"#connector-registration",children:"_plugin.py"})," below."]}),"\n",(0,i.jsx)(l.Ay,{name:"pyproject.toml",children:(0,i.jsx)(d.A,{language:"toml",metastring:"{6-8,10-12,19-20}",children:`[build-system]
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
dest_sqlite = "tabsdata_sqlite._plugin:SQLITE_DEST"`})}),"\n",(0,i.jsx)(t.h3,{id:"errorpy",children:"error.py"}),"\n",(0,i.jsx)(o.A,{n:"2",children:"Define the connector errors"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"SqliteRuntimeException"})," extends ",(0,i.jsx)(t.code,{children:"ConnException"})," for failed reads and writes. ",(0,i.jsx)(t.code,{children:"SqliteErrorCode"})," then associates each error with an exception type and message."]}),"\n",(0,i.jsx)("div",{id:"connector-error-codes"}),"\n",(0,i.jsxs)(t.p,{children:["Codes ",(0,i.jsx)(t.code,{children:"SQLITE_1"})," through ",(0,i.jsx)(t.code,{children:"SQLITE_4"})," validate the configuration classes in ",(0,i.jsx)(t.code,{children:"__init__.py"}),". The plugins use ",(0,i.jsx)(t.code,{children:"SQLITE_5"})," for query failures, ",(0,i.jsx)(t.code,{children:"SQLITE_6"})," for a table count mismatch, and ",(0,i.jsx)(t.code,{children:"SQLITE_7"})," for write failures. Message placeholders such as ",(0,i.jsx)(t.code,{children:"{table}"})," receive their values through ",(0,i.jsx)(t.code,{children:".exception()"}),"."]}),"\n",(0,i.jsx)(l.Ay,{name:"error.py",children:(0,i.jsx)(d.A,{language:"python",metastring:"{5-6,9-19}",children:`from tabsdatak.conn.common.error import ConnException, ConnInitException
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
  SQLITE_7 = ErrorDef(SqliteRuntimeException, "SQLite write to {table} failed")`})}),"\n",(0,i.jsx)(t.h3,{id:"__init__py",children:"__init__.py"}),"\n",(0,i.jsx)(o.A,{n:"3",children:"Define the connection and function settings"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"__init__.py"})," defines the classes users import from ",(0,i.jsx)(t.code,{children:"tabsdata_sqlite"}),". ",(0,i.jsx)(t.code,{children:"StrOrSecretSpec"})," accepts a string or secret, and ",(0,i.jsx)(t.code,{children:"resolve"})," reads its value. ",(0,i.jsx)(t.code,{children:"TableName"})," limits table names to letters, numbers, and underscores, starting with a letter or underscore."]}),"\n",(0,i.jsx)("div",{id:"connector-connection-classes"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"SqliteSrcConn"})," and ",(0,i.jsx)(t.code,{children:"SqliteDestConn"})," define the database path supplied by the Collection's connection document. Both extend ",(0,i.jsx)(t.code,{children:"Conn"})," and require a ",(0,i.jsx)(t.code,{children:"path"})," field, which becomes ",(0,i.jsx)(t.code,{children:"spec.path"})," in the document."]}),"\n",(0,i.jsx)("div",{id:"connector-function-classes"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"SqliteSrc"})," defines the queries supplied by a Publisher. ",(0,i.jsx)(t.code,{children:"SqliteDest"})," defines the destination tables and write mode supplied by a Subscriber. Query results and returned data follow the order of ",(0,i.jsx)(t.code,{children:"queries"})," and ",(0,i.jsx)(t.code,{children:"tables"}),", respectively. The write mode accepts ",(0,i.jsx)(t.code,{children:"append"})," or ",(0,i.jsx)(t.code,{children:"replace"})," and defaults to ",(0,i.jsx)(t.code,{children:"replace"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"@_api.dataclass"})," decorator validates these settings using the specified error code. Its ",(0,i.jsx)(t.code,{children:"kw_only=True"})," argument requires named arguments, such as ",(0,i.jsx)(t.code,{children:'SqliteSrcConn(path="/data/shop.db")'}),"."]}),"\n",(0,i.jsx)(l.Ay,{name:"__init__.py",children:(0,i.jsx)(d.A,{language:"python",metastring:"{8,11,18-22,25-29,32-36,39-44}",children:`from typing import Annotated, Literal

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
  if_table_exists: Literal["append", "replace"] = "replace"`})}),"\n",(0,i.jsx)(t.p,{children:"The connection supplies the database path, while the Publisher or Subscriber supplies what to read or write. Tabsdata passes both objects to the plugin during execution."}),"\n",(0,i.jsx)(h.A,{}),"\n",(0,i.jsx)(t.h3,{id:"_pluginpy",children:"_plugin.py"}),"\n",(0,i.jsx)(o.A,{n:"4",children:"Implement and register the reads and writes"}),"\n",(0,i.jsxs)(t.p,{children:["The plugins receive the connection and function settings from ",(0,i.jsx)(t.code,{children:"__init__.py"}),". The shared ",(0,i.jsx)(t.code,{children:"connect"})," helper resolves the database path and opens SQLite."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"SqliteSrcPlugin.read_in"})," runs the Publisher's queries and writes each result to a Parquet file in ",(0,i.jsx)(t.code,{children:"ctx.work_dir"}),". It returns the files in query order, with an inner list for each result. If a query fails, it raises ",(0,i.jsx)(t.code,{children:"SQLITE_5"})," with the query index and original exception."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"SqliteDestPlugin.write_out"})," matches the Subscriber's returned files to ",(0,i.jsx)(t.code,{children:"dest.tables"})," and skips any ",(0,i.jsx)(t.code,{children:"None"})," file reference. It reads the remaining files and either replaces the destination tables or appends rows, according to ",(0,i.jsx)(t.code,{children:"dest.if_table_exists"}),". The explicit ",(0,i.jsx)(t.code,{children:"BEGIN"})," includes table creation and replacement in the transaction, so failed writes roll back those changes too."]}),"\n",(0,i.jsx)(t.admonition,{type:"note",children:(0,i.jsx)(t.p,{children:"The database path is resolved on the machine running the Function. The SQLite file must be accessible there, including when Functions run on separate workers."})}),"\n",(0,i.jsx)("div",{id:"connector-registration"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"SQLITE_SRC"})," and ",(0,i.jsx)(t.code,{children:"SQLITE_DEST"})," register the connection classes, function settings, and plugins together. Their names must match the entry points in ",(0,i.jsx)(t.code,{children:"pyproject.toml"}),"."]}),"\n",(0,i.jsx)(l.Ay,{name:"_plugin.py",children:(0,i.jsx)(d.A,{language:"python",metastring:"{1,17-24,27-28,41-45,69-70,76-90,95-105,108-117}",children:`import sqlite3
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
)`})}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"type_"})," is the registration identifier and must be unique across installed connectors. It differs from the connection document's ",(0,i.jsx)(t.code,{children:"type"}),", which names the Python connection class."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"cardinality"})," gives the number of query results or destination tables. ",(0,i.jsx)(t.code,{children:"TableMode.SINGLE"})," means each source result contains a single file. This connector has no explorer or icon, so both are set to ",(0,i.jsx)(t.code,{children:"None"}),"."]}),"\n",(0,i.jsx)(t.h2,{id:"installing-a-connector",children:"Installing a connector"}),"\n",(0,i.jsxs)(t.p,{children:["The connector package must be available where ",(0,i.jsx)(t.code,{children:"tdk"})," runs to validate connections and register functions. It must also be installed in the server's function environment to execute those functions."]}),"\n",(0,i.jsx)(o.A,{n:"5a",children:"Install the package where tdk runs"}),"\n",(0,i.jsxs)(t.p,{children:["From the directory containing ",(0,i.jsx)(t.code,{children:"sqlite_connector"}),", run:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"pip install ./sqlite_connector\n"})}),"\n",(0,i.jsx)(o.A,{n:"5b",children:"Install the package in the server's function environment"}),"\n",(0,i.jsxs)(t.p,{children:["Make the package available to the server, for example through a Git repository. Replace ",(0,i.jsx)(t.code,{children:"<org>"})," and ",(0,i.jsx)(t.code,{children:"<repo>"})," with the repository that contains ",(0,i.jsx)(t.code,{children:"sqlite_connector"}),", then add the package to a requirements file:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-text",metastring:'title="connectors.txt"',children:"tabsdata-conn-sqlite @ git+https://github.com/<org>/<repo>.git#subdirectory=sqlite_connector\n"})}),"\n",(0,i.jsx)(t.p,{children:"Update the function environment and restart the instance. The environment update stops the instance."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"tdkserver venv update --name fn --requirements connectors.txt\ntdkserver start\n"})}),"\n",(0,i.jsx)(t.p,{children:"The requirements file replaces the environment's current list of complementary packages. Include every complementary package the server still needs."}),"\n",(0,i.jsx)(t.h2,{id:"using-the-connector",children:"Using the connector"}),"\n",(0,i.jsx)(o.A,{n:"6a",children:"Set the connection fields and attach each connection to a collection"}),"\n",(0,i.jsxs)(t.p,{children:["Create connection documents for the source and destination. The ",(0,i.jsx)(t.code,{children:"type"})," field selects a connection class from ",(0,i.jsx)(t.a,{href:"#connector-connection-classes",children:"the connection classes"}),", and ",(0,i.jsx)(t.code,{children:"spec.path"})," supplies the required ",(0,i.jsx)(t.code,{children:"path"})," field. The ",(0,i.jsx)(t.code,{children:"str:"})," prefix represents a literal string in the connection document."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-yaml",metastring:'title="conn-sqlite-in.yaml"',children:"kind: connectionDef\napiVersion: '1.0'\ntype: tabsdata_sqlite:SqliteSrcConn\nspec:\n  path: str:/data/shop.db\n"})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-yaml",metastring:'title="conn-sqlite-out.yaml"',children:"kind: connectionDef\napiVersion: '1.0'\ntype: tabsdata_sqlite:SqliteDestConn\nspec:\n  path: str:/data/warehouse.db\n"})}),"\n",(0,i.jsxs)(t.p,{children:["The source database must already contain the ",(0,i.jsx)(t.code,{children:"customers"})," and ",(0,i.jsx)(t.code,{children:"orders"})," tables used by the publisher. The destination database is created on first use if it does not exist; its parent directory must exist and be writable."]}),"\n",(0,i.jsxs)(t.p,{children:["Attach the source connection to ",(0,i.jsx)(t.code,{children:"shop"})," in the ",(0,i.jsx)(t.code,{children:"sources"})," group, and the destination connection to ",(0,i.jsx)(t.code,{children:"warehouse"})," in the ",(0,i.jsx)(t.code,{children:"destinations"})," group:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"tdk collection create --name shop --group sources --conn-file conn-sqlite-in.yaml\ntdk collection create --name warehouse --group destinations --conn-file conn-sqlite-out.yaml\n"})}),"\n",(0,i.jsx)(o.A,{n:"6b",children:"Set the source fields in a publisher"}),"\n",(0,i.jsxs)(t.p,{children:["Create ",(0,i.jsx)(t.code,{children:"pub_shop.py"})," and set ",(0,i.jsx)(t.code,{children:"queries"}),", the field defined on ",(0,i.jsx)(t.code,{children:"SqliteSrc"})," in ",(0,i.jsx)(t.a,{href:"#connector-function-classes",children:"the function settings"}),". The source plugin reads the query results before ",(0,i.jsx)(t.code,{children:"pub_shop"})," runs. The function returns those results into the ",(0,i.jsx)(t.code,{children:"customers"})," and ",(0,i.jsx)(t.code,{children:"orders"})," Tabsdata tables."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-python",metastring:'title="pub_shop.py"',children:'from tabsdatak.api import publisher, TableFrameSpec\nfrom tabsdata_sqlite import SqliteSrc\n\n\n@publisher(\n    source=SqliteSrc(queries=["SELECT * FROM customers", "SELECT * FROM orders"]),\n    output_tables=["customers", "orders"],\n)\ndef pub_shop(\n    customers: TableFrameSpec, orders: TableFrameSpec\n) -> tuple[TableFrameSpec, TableFrameSpec]:\n    return customers, orders\n'})}),"\n",(0,i.jsxs)(t.p,{children:["Register the publisher in ",(0,i.jsx)(t.code,{children:"shop"}),". Its connection comes from the ",(0,i.jsx)(t.code,{children:"shop"})," collection created in step 6a."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"tdk fn register --coll shop --path pub_shop.py::pub_shop\n"})}),"\n",(0,i.jsx)(o.A,{n:"6c",children:"Set the destination fields in a subscriber"}),"\n",(0,i.jsxs)(t.p,{children:["Create ",(0,i.jsx)(t.code,{children:"sub_warehouse.py"})," and set ",(0,i.jsx)(t.code,{children:"tables"})," and ",(0,i.jsx)(t.code,{children:"if_table_exists"}),", the fields defined on ",(0,i.jsx)(t.code,{children:"SqliteDest"}),". The subscriber reads ",(0,i.jsx)(t.code,{children:"shop/customers"})," and ",(0,i.jsx)(t.code,{children:"shop/orders"}),", then returns the data to the destination plugin."]}),"\n",(0,i.jsxs)(t.p,{children:["Using ",(0,i.jsx)(t.code,{children:'"replace"'})," drops and recreates the named SQLite tables on each write. Use ",(0,i.jsx)(t.code,{children:'"append"'})," to keep existing rows and insert the returned rows."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-python",metastring:'title="sub_warehouse.py"',children:'from tabsdatak.api import subscriber, TableFrameSpec\nfrom tabsdata_sqlite import SqliteDest\n\n\n@subscriber(\n    destination=SqliteDest(tables=["customers", "orders"], if_table_exists="replace"),\n    input_tables=["shop/customers", "shop/orders"],\n)\ndef sub_warehouse(\n    customers: TableFrameSpec, orders: TableFrameSpec\n) -> tuple[TableFrameSpec, TableFrameSpec]:\n    return customers, orders\n'})}),"\n",(0,i.jsxs)(t.p,{children:["Register the subscriber in ",(0,i.jsx)(t.code,{children:"warehouse"})," so it uses that collection's destination connection."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"tdk fn register --coll warehouse --path sub_warehouse.py::sub_warehouse\n"})})]})}function b(e={}){let{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(f,{...e})}):f(e)}},475342(e,t,n){n.d(t,{A:()=>d});var s=n(474848),i=n(296540),r=n(634164);let o="mappingRow_jyfE",a="arrow_LHMw";function c({lines:e,selected:t}){return(0,s.jsx)("pre",{className:"code_ZqaY",children:(0,s.jsx)("code",{children:e.map((e,n)=>(0,s.jsxs)("span",{className:(0,r.A)("line_Nkv3",e.field===t&&"highlight_P5cx"),children:[e.text,"\n"]},n))})})}function l({name:e,children:t}){return(0,s.jsxs)("div",{className:"file_R1WF",children:[(0,s.jsx)("div",{className:"filename_sXr5",children:e}),t]})}function d(){let[e,t]=(0,i.useState)("source"),[n,r]=(0,i.useState)("path"),d="source"===e,h=d?"SqliteSrcConn":"SqliteDestConn",p=d?"shop":"warehouse",u=d?["path","queries"]:["path","tables","if_table_exists"],x={path:(0,s.jsxs)(s.Fragment,{children:["The ",(0,s.jsx)("code",{children:"path"})," field belongs to ",(0,s.jsx)("code",{children:h}),". Its value is set in the collection's connection document and passed to the plugin as ",(0,s.jsx)("code",{children:"conn.path"}),"."]}),queries:(0,s.jsxs)(s.Fragment,{children:["The ",(0,s.jsx)("code",{children:"queries"})," field belongs to ",(0,s.jsx)("code",{children:"SqliteSrc"}),". Its value is set in the publisher's ",(0,s.jsx)("code",{children:"source="})," argument and passed to the plugin as ",(0,s.jsx)("code",{children:"src.queries"}),"."]}),tables:(0,s.jsxs)(s.Fragment,{children:["The ",(0,s.jsx)("code",{children:"tables"})," field belongs to ",(0,s.jsx)("code",{children:"SqliteDest"}),". Its value is set in the subscriber's ",(0,s.jsx)("code",{children:"destination="})," argument and passed to the plugin as ",(0,s.jsx)("code",{children:"dest.tables"}),"."]}),if_table_exists:(0,s.jsxs)(s.Fragment,{children:["The ",(0,s.jsx)("code",{children:"if_table_exists"})," field belongs to ",(0,s.jsx)("code",{children:"SqliteDest"}),". The subscriber can set it to ",(0,s.jsx)("code",{children:'"append"'})," or ",(0,s.jsx)("code",{children:'"replace"'}),". If omitted, the plugin receives the default, ",(0,s.jsx)("code",{children:'"replace"'}),"."]})};function j(e){t(e),r("path")}return(0,s.jsxs)("section",{className:"wrapper_psQo","aria-label":"Connector fields from definition to execution",children:[(0,s.jsx)("div",{className:"toolbar_K4Ow",children:(0,s.jsxs)("div",{className:"choices_pupy",role:"group","aria-label":"Connector direction",children:[(0,s.jsx)("button",{type:"button","aria-pressed":d,onClick:()=>j("source"),children:"Source / Publisher"}),(0,s.jsx)("button",{type:"button","aria-pressed":!d,onClick:()=>j("destination"),children:"Destination / Subscriber"})]})}),(0,s.jsxs)("div",{className:"fieldControls_vmii",children:[(0,s.jsx)("span",{children:"Select a field to follow its value"}),(0,s.jsx)("div",{className:"fields_iz7V",role:"group","aria-label":"Field to follow",children:u.map(e=>(0,s.jsx)("button",{type:"button","aria-pressed":n===e,onClick:()=>r(e),children:e},e))})]}),(0,s.jsxs)("div",{className:"mapping_tyZn",children:[(0,s.jsxs)("div",{className:"columnLabels_E1g9","aria-hidden":"true",children:[(0,s.jsx)("span",{children:"Define the fields"}),(0,s.jsx)("span",{}),(0,s.jsx)("span",{children:"Set their values"})]}),(0,s.jsxs)("div",{className:o,children:[(0,s.jsx)(l,{name:"__init__.py \xb7 Connection",children:(0,s.jsx)(c,{selected:n,lines:[{text:`class ${h}(Conn):`},{text:"    path: StrOrSecretSpec",field:"path"}]})}),(0,s.jsx)("span",{className:a,"aria-hidden":"true",children:"\u2192"}),(0,s.jsx)(l,{name:`conn-sqlite-${d?"in":"out"}.yaml`,children:(0,s.jsx)(c,{selected:n,lines:[{text:"kind: connectionDef"},{text:"apiVersion: '1.0'"},{text:`type: tabsdata_sqlite:${h}`},{text:"spec:"},{text:`  path: str:/data/${p}.db`,field:"path"}]})})]}),(0,s.jsxs)("div",{className:o,children:[(0,s.jsx)(l,{name:`__init__.py \xb7 ${d?"Source":"Destination"}`,children:(0,s.jsx)(c,{selected:n,lines:d?[{text:"class SqliteSrc(Src):"},{text:"    queries: list[str]",field:"queries"}]:[{text:"class SqliteDest(Dest):"},{text:"    tables: list[TableName]",field:"tables"},{text:"    if_table_exists: Literal[",field:"if_table_exists"},{text:'        "append", "replace"',field:"if_table_exists"},{text:'    ] = "replace"',field:"if_table_exists"}]})}),(0,s.jsx)("span",{className:a,"aria-hidden":"true",children:"\u2192"}),(0,s.jsx)(l,{name:d?"pub_shop.py \xb7 decorator excerpt":"sub_warehouse.py \xb7 decorator excerpt",children:(0,s.jsx)(c,{selected:n,lines:d?[{text:"source=SqliteSrc("},{text:"    queries=[",field:"queries"},{text:'        "SELECT * FROM customers",',field:"queries"},{text:'        "SELECT * FROM orders",',field:"queries"},{text:"    ],",field:"queries"},{text:")"}]:[{text:"destination=SqliteDest("},{text:'    tables=["customers", "orders"],',field:"tables"},{text:'    if_table_exists="replace",',field:"if_table_exists"},{text:")"}]})})]}),(0,s.jsxs)("div",{className:"join_TUFP",children:[(0,s.jsx)("span",{"aria-hidden":"true",children:"\u2193"}),"Tabsdata passes the collection's connection and the function's settings to the plugin."]}),(0,s.jsxs)(l,{name:`_plugin.py \xb7 ${d?"read_in":"write_out"} receives`,children:[(0,s.jsxs)("div",{className:"runtimeTypes_xXq5",children:[(0,s.jsxs)("code",{children:["conn: ",h]}),(0,s.jsxs)("code",{children:[d?"src":"dest",": ",d?"SqliteSrc":"SqliteDest"]})]}),(0,s.jsx)(c,{selected:n,lines:[{text:`conn.path  # "/data/${p}.db"`,field:"path"},...d?[{text:'src.queries  # ["SELECT * FROM customers", "SELECT * FROM orders"]',field:"queries"}]:[{text:'dest.tables  # ["customers", "orders"]',field:"tables"},{text:'dest.if_table_exists  # "replace"',field:"if_table_exists"}]]})]})]}),(0,s.jsx)("p",{className:"description_Qc4Q","aria-live":"polite","aria-atomic":"true",children:x[n]})]})}},343052(e,t,n){n.d(t,{A:()=>x});var s=n(474848),i=n(296540),r=n(634164),o=n(366497);function a({path:e}){let t=(0,o.Ay)(e),n=e.split("/").pop();return(0,s.jsx)("a",{className:"download_ELew",href:t,download:n,"aria-label":`Download ${n}`,title:`Download ${n}`,children:(0,s.jsx)("svg",{"aria-hidden":"true",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("path",{d:"M12 3v12m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"})})})}let c="treeName_KaXb",l="treeFileIcon_z0ri";function d(){return(0,s.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",children:(0,s.jsx)("path",{d:"M3 6.5A1.5 1.5 0 014.5 5h4.7l1.6 1.8h9.2A1.5 1.5 0 0121.5 8.3v9.2A1.5 1.5 0 0120 19H4.5A1.5 1.5 0 013 17.5v-11Z",stroke:"var(--ft-tree-folder)",strokeWidth:"1.6",strokeLinejoin:"round"})})}function h(){return(0,s.jsx)("span",{className:(0,r.A)(l,"treeFileYaml_eS18"),children:(0,s.jsxs)("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",children:[(0,s.jsx)("path",{d:"M5 3h10l4 4v14a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1Z",stroke:"#fff",strokeWidth:"1.8",strokeLinejoin:"round"}),(0,s.jsx)("line",{x1:"7",y1:"12",x2:"17",y2:"12",stroke:"#fff",strokeWidth:"1.8",strokeLinecap:"round"}),(0,s.jsx)("line",{x1:"7",y1:"16",x2:"17",y2:"16",stroke:"#fff",strokeWidth:"1.8",strokeLinecap:"round"})]})})}let p={csv:(0,s.jsx)(function(){return(0,s.jsx)("span",{className:(0,r.A)(l,"treeFileCsv_IXSz"),children:(0,s.jsxs)("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",children:[(0,s.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",stroke:"#fff",strokeWidth:"2"}),(0,s.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10",stroke:"#fff",strokeWidth:"2"}),(0,s.jsx)("line",{x1:"9",y1:"10",x2:"9",y2:"21",stroke:"#fff",strokeWidth:"2"})]})})},{}),jsonl:(0,s.jsx)(function(){return(0,s.jsx)("span",{className:(0,r.A)(l,"treeFileJsonl_qdSd"),children:(0,s.jsx)("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",children:(0,s.jsx)("path",{d:"M9 3c-2 0-3 1-3 3v3c0 1.2-.6 2-2 2 1.4 0 2 .8 2 2v3c0 2 1 3 3 3M15 3c2 0 3 1 3 3v3c0 1.2.6 2 2 2-1.4 0-2 .8-2 2v3c0 2-1 3-3 3",stroke:"#fff",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})})},{}),yaml:(0,s.jsx)(h,{}),toml:(0,s.jsx)(h,{}),txt:(0,s.jsx)(function(){return(0,s.jsx)("span",{className:(0,r.A)(l,"treeFileTxt_YAu7"),children:(0,s.jsxs)("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",children:[(0,s.jsx)("circle",{cx:"12",cy:"12",r:"9",stroke:"#fff",strokeWidth:"1.8"}),(0,s.jsx)("line",{x1:"12",y1:"11",x2:"12",y2:"16",stroke:"#fff",strokeWidth:"1.8",strokeLinecap:"round"}),(0,s.jsx)("circle",{cx:"12",cy:"7.8",r:"1",fill:"#fff"})]})})},{}),py:(0,s.jsx)(function(){return(0,s.jsx)("span",{className:(0,r.A)(l,"treeFilePy_ySAz"),children:(0,s.jsxs)("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",children:[(0,s.jsx)("path",{d:"m18 16 4-4-4-4",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,s.jsx)("path",{d:"m6 8-4 4 4 4",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]})})},{})};function u({node:e,depth:t,highlight:n,collapsed:o}){let l=n.includes(e.name),[h,x]=(0,i.useState)(!o.includes(e.name)),j=(0,r.A)("treeLine_Tovd",l&&"treeLineActive_mlOj"),m={paddingLeft:16*t};return e.children?(0,s.jsxs)("div",{children:[(0,s.jsxs)("div",{className:"folderRow_e0rO",children:[(0,s.jsxs)("button",{type:"button",className:(0,r.A)(j,"treeFolderButton_XrVN"),style:m,"aria-expanded":h,onClick:()=>x(e=>!e),children:[(0,s.jsx)("span",{className:(0,r.A)("treeChevron_lKOM",!h&&"treeChevronClosed_EXRL"),children:"\u2304"}),(0,s.jsx)(d,{}),(0,s.jsx)("span",{className:c,children:e.name})]}),e.downloadPath&&(0,s.jsx)(a,{path:e.downloadPath})]}),h&&e.children.map(e=>(0,s.jsx)(u,{node:e,depth:t+1,highlight:n,collapsed:o},e.name))]}):(0,s.jsxs)("div",{className:j,style:m,children:[(0,s.jsx)("span",{className:"treeChevronSpacer_X5mr"}),p[e.type],(0,s.jsx)("span",{className:c,children:e.name})]})}function x({data:e,highlight:t=[],collapsed:n=[]}){return(0,s.jsx)("div",{className:"treeBox_U8zF",children:(0,s.jsx)(u,{node:e,depth:0,highlight:t,collapsed:n})})}},647776(e,t,n){n.d(t,{Q:()=>c,A:()=>a});var s=n(474848),i=n(296540),r=n(634164);let o="col_BGC7";function a({children:e,wrap:t=!1}){let[n,...r]=i.Children.toArray(e);return t?(0,s.jsxs)("div",{className:"wrapRow_RlgU",children:[(0,s.jsx)("div",{className:"floatCol_T3Pm",children:n}),r]}):(0,s.jsxs)("div",{className:"row_urB2",children:[(0,s.jsx)("div",{className:o,children:n}),(0,s.jsx)("div",{className:o,children:r[0]})]})}function c({children:e,className:t}){return(0,s.jsx)("div",{className:(0,r.A)("textPane_Y9At",t),children:e})}},781925(e,t,n){n.d(t,{A:()=>i});var s=n(474848);n(296540);function i({n:e,children:t}){return(0,s.jsxs)("div",{className:"row_D783",children:[(0,s.jsxs)("span",{className:"tag_Qpdz",children:["Step ",e]}),(0,s.jsx)("span",{className:"title_TIiH",children:t})]})}},28453(e,t,n){n.d(t,{R:()=>o,x:()=>a});var s=n(296540);let i={},r=s.createContext(i);function o(e){let t=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);