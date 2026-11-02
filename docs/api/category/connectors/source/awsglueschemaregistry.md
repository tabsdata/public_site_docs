# AwsGlueSchemaRegistry

> AWS Glue schema registry attached to a `KafkaStreamSrcConn`.

Source: https://docs.tabsdata.com/api/category/connectors/source/awsglueschemaregistry

class

```python
class AwsGlueSchemaRegistry(
    region_name: AwsRegionSpec,
    credentials: AwsGlueSchemaRegistryCredentialsSpec,
    registry_name: RegistryNameSpec,
    schema_name: SchemaNameSpec,
    configs: CfgSpec | None = None,
)
```

**Categories:** source

AWS Glue schema registry attached to a [`KafkaStreamSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/kafkastreamsrcconn).

Set as the connection's `schema_registry` for SR-aware serdes.

## Parameters

parameter

`region_name`[AwsRegionSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.AwsRegionSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

AWS region the registry lives in, e.g. `us-east-1`; accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

parameter

`credentials`[AwsGlueSchemaRegistryCredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.AwsGlueSchemaRegistryCredentialsSpec) ([AwsAccessSecretKey](https://docs.tabsdata.com/api/category/connectors/credentials/awsaccesssecretkey))

[`AwsAccessSecretKey`](https://docs.tabsdata.com/api/category/connectors/credentials/awsaccesssecretkey) (access key id / secret access key) Glue authenticates against.

parameter

`registry_name`[RegistryNameSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.RegistryNameSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Glue registry name; plain string or [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

parameter

`schema_name`[SchemaNameSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.SchemaNameSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Schema name within the registry; plain string or [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

parameter

`configs`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional dict of boto3-client overrides (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)).
