# DatabricksSrcConn

> Databricks workspace connection used by `DatabricksSrc`.

Source: https://docs.tabsdata.com/api/category/connectors/source/databrickssrcconn

class

```python
class DatabricksSrcConn(
    host_url: HostUrlSpec,
    token: CredentialsSpec,
    volume: VolumeSpec,
    warehouse: WarehouseSpec | None = None,
    warehouse_id: WarehouseIdSpec | None = None,
    catalog: IdentifierSpec | None = None,
    schema: IdentifierSpec | None = None,
    entity_whitelist: EntityWhitelistSpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** source

Databricks workspace connection used by [`DatabricksSrc`](https://docs.tabsdata.com/api/category/connectors/source/databrickssrc).

Registered on a collection; the runtime resolves it and hands it to the plugin at run time. `host_url` and `token` are bare [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret) values; the identifier fields accept a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

## Parameters

parameter

`host_url`[HostUrlSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.HostUrlSpec) ([Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

The workspace URL (a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret)), e.g. `https://<workspace>.cloud.databricks.com`.

parameter

`token`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.CredentialsSpec) ([Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

The personal access token (PAT), a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

parameter

`volume`[VolumeSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.VolumeSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A Unity Catalog Volume used to stage parquet, given as a `[catalog.][schema.]volume` name (backtick-quote a part for special characters).

parameter

`warehouse`[WarehouseSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.WarehouseSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional SQL warehouse name (1-100 characters, no leading / trailing whitespace). Mutually exclusive with `warehouse_id`.

parameter

`warehouse_id`[WarehouseIdSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.WarehouseIdSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional SQL warehouse id (16-character lowercase hex). Mutually exclusive with `warehouse`.

parameter

`catalog`[IdentifierSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.IdentifierSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional default catalog (a Databricks identifier).

parameter

`schema`[IdentifierSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.IdentifierSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional default schema (a Databricks identifier); requires `catalog`.

parameter

`entity_whitelist`[EntityWhitelistSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.EntityWhitelistSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional list of regex patterns narrowing which tables the source considers; `None` (the default) filters nothing.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector-config dict (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation: `warehouse` and `warehouse_id` are mutually exclusive, and `schema` requires `catalog`.

Called by the framework; raises `DatabricksValidateException`.
