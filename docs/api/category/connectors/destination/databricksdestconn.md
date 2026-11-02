# DatabricksDestConn

> Databricks workspace connection used by `DatabricksDest`.

Source: https://docs.tabsdata.com/api/category/connectors/destination/databricksdestconn

class

```python
class DatabricksDestConn(
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

**Categories:** destination

Databricks workspace connection used by [`DatabricksDest`](https://docs.tabsdata.com/api/category/connectors/destination/databricksdest).

Field-identical to [`DatabricksSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/databrickssrcconn) but a distinct class; source and destination connections are separate types and cannot be used in place of one another. See [`DatabricksSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/databrickssrcconn) for the field meanings.

## Parameters

parameter

`host_url`[HostUrlSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.HostUrlSpec) ([Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`token`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.CredentialsSpec) ([Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`volume`[VolumeSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.VolumeSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

parameter

`warehouse`[WarehouseSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.WarehouseSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

parameter

`warehouse_id`[WarehouseIdSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.WarehouseIdSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

parameter

`catalog`[IdentifierSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.IdentifierSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

parameter

`schema`[IdentifierSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-databricks#tabsdatak.conn.databricks.IdentifierSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

parameter

`entity_whitelist`[EntityWhitelistSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.EntityWhitelistSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation: `warehouse` and `warehouse_id` are mutually exclusive, and `schema` requires `catalog`.

Called by the framework; raises `DatabricksValidateException`.
