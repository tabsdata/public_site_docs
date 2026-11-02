# ConfluentSchemaRegistry

> Confluent-style schema registry attached to a `KafkaStreamSrcConn`.

Source: https://docs.tabsdata.com/api/category/connectors/source/confluentschemaregistry

class

```python
class ConfluentSchemaRegistry(
    url: ConfluentSchemaRegistryUrlNameSpec,
    credentials: ConfluentSchemaRegistryCredentialsSpec | None = None,
    configs: CfgSpec | None = None,
)
```

**Categories:** source

Confluent-style schema registry attached to a [`KafkaStreamSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/kafkastreamsrcconn).

Set as the connection's `schema_registry` for SR-aware serdes.

## Parameters

parameter

`url`[ConfluentSchemaRegistryUrlNameSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.ConfluentSchemaRegistryUrlNameSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Registry HTTP(S) URL; accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

parameter

`credentials`[ConfluentSchemaRegistryCredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.ConfluentSchemaRegistryCredentialsSpec) | None ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) | None)

Optional [`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) basic-auth credentials.

parameter

`configs`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional dict of registry-client overrides forwarded to `confluent_kafka.schema_registry.SchemaRegistryClient` (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).
