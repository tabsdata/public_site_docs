# BigQueryDestConn

> BigQuery connection.

Source: https://docs.tabsdata.com/api/category/connectors/destination/bigquerydestconn

class

```python
class BigQueryDestConn(
    staging: GCSLocation,
    credentials: CredentialsSpec,
    project: ProjectSpec | None = None,
    dataset: DatasetSpec | None = None,
    entity_whitelist: EntityWhitelistSpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

BigQuery connection.

Registered on a collection; the runtime resolves it and hands it to the plugin at run time. Each string field accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

## Parameters

parameter

`staging`[GCSLocation](https://docs.tabsdata.com/api/category/connectors/destination/gcslocation-bigquery)

A `GCSLocation` used as the parquet staging bucket for load jobs.

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery#tabsdatak.conn.bigquery.CredentialsSpec) ([GCPJson](https://docs.tabsdata.com/api/category/connectors/credentials/gcpjson))

GCP service-account JSON credentials ([`GCPJson`](https://docs.tabsdata.com/api/category/connectors/credentials/gcpjson)).

parameter

`project`[ProjectSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery#tabsdatak.conn.bigquery.ProjectSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional default GCP project id (6-30 characters, lowercase letters, digits and hyphens, starting with a letter, ending alphanumeric). Required when `dataset` is set.

parameter

`dataset`[DatasetSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-bigquery#tabsdatak.conn.bigquery.DatasetSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional default BigQuery dataset id (1-1024 characters, letters, digits and underscores).

parameter

`entity_whitelist`[EntityWhitelistSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.EntityWhitelistSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional list of regex patterns narrowing which tables the connector considers; `None` (the default) filters nothing.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector-config dict (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation: `dataset` requires `project`.

Called by the framework; raises `BigQueryValidateException`.
