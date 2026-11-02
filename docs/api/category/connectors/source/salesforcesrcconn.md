# SalesforceSrcConn

> Salesforce org connection used by `SalesforceSrc` / `SalesforceReportSrc`.

Source: https://docs.tabsdata.com/api/category/connectors/source/salesforcesrcconn

class

```python
class SalesforceSrcConn(
    credentials: CredentialsSpec,
    instance_url: InstanceUrlSpec | None = None,
    category: str | None = None,
    objects: ObjectsNameSpec | None = None,
    entity_whitelist: EntityWhitelistSpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** source

Salesforce org connection used by [`SalesforceSrc`](https://docs.tabsdata.com/api/category/connectors/source/salesforcesrc) / [`SalesforceReportSrc`](https://docs.tabsdata.com/api/category/connectors/source/salesforcereportsrc).

Registered on a collection; the runtime resolves it and hands it to the source at run time.

## Parameters

parameter

`credentials`[CredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-salesforce#tabsdatak.conn.salesforce.CredentialsSpec) ([SalesforceTokenCredentials](https://docs.tabsdata.com/api/category/connectors/credentials/salesforcetokencredentials))

[`SalesforceTokenCredentials`](https://docs.tabsdata.com/api/category/connectors/credentials/salesforcetokencredentials) (username + password + security token).

parameter

`instance_url`[InstanceUrlSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-salesforce#tabsdatak.conn.salesforce.InstanceUrlSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret) | None)

Optional explicit instance URL; must be an `https://` URL on a Salesforce domain (`salesforce.com` / `force.com` / `cloudforce.com` / `salesforce-setup.com`). Accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

parameter

`category`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

Optional category hint for entity discovery; mutually exclusive with `objects`.

parameter

`objects`[ObjectsNameSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-salesforce#tabsdatak.conn.salesforce.ObjectsNameSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional non-empty list of explicit Salesforce object API names (each 1-80 chars, starting with a letter, then letters / digits / single underscores, optionally ending `__c` or `__r`). Mutually exclusive with `category`.

parameter

`entity_whitelist`[EntityWhitelistSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.EntityWhitelistSpec) | None ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\] | None)

Optional list of regex patterns narrowing which objects the source considers.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector config dict (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).
