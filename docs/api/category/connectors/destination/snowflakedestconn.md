# SnowflakeDestConn

> Snowflake account connection.

Source: https://docs.tabsdata.com/api/category/connectors/destination/snowflakedestconn

class

```python
class SnowflakeDestConn(
    account: AccountSpec,
    credentials: CredentialsSpec,
    role: NameSpec | None = None,
    database: NameSpec | None = None,
    schema: NameSpec | None = None,
    warehouse: NameSpec | None = None,
    stage: IdentifierSpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** destination

Snowflake account connection.

Registered on a collection; the runtime resolves it and hands it to the plugin at run time. Each string field accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret). `role` / `database` / `schema` / `warehouse` follow the same Snowflake identifier rules as `stage`.

## Parameters

parameter

`account`[AccountSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.AccountSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

A valid Snowflake account identifier / locator, e.g. `ABCDEFG-XY12345` (alphanumerics with dots, hyphens and underscores; starts and ends alphanumeric).

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.CredentialsSpec) ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword))

[`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) (user + password or PAT).

parameter

`role`[NameSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.NameSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional default role to `USE` before writing.

parameter

`database`[NameSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.NameSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional default database. Required when `schema` is set.

parameter

`schema`[NameSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.NameSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional default schema. Requires `database`.

parameter

`warehouse`[NameSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.NameSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional default warehouse; the plugin issues `USE WAREHOUSE` only when set.

parameter

`stage`[IdentifierSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-snowflake#tabsdatak.conn.snowflake.IdentifierSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional permanent stage for `PUT` + `COPY INTO`; when unset the plugin creates a session-scoped `TEMPORARY` stage. A Snowflake identifier -- unquoted, or double-quoted for case-sensitive / special-char names.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector-config dict (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)), forwarded to snowflake-connector-python.

## Methods

method

`validate`

```python
def validate()
```

Cross-field validation: `schema` requires `database`.

Called by the framework; raises `SnowflakeValidateException`.
