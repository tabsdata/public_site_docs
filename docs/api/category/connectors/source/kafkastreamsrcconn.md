# KafkaStreamSrcConn

> Kafka connection used by `KafkaStreamSrc`.

Source: https://docs.tabsdata.com/api/category/connectors/source/kafkastreamsrcconn

class

```python
class KafkaStreamSrcConn(
    servers: KafkaServersSpec,
    credentials: KafkaCredentialsSpec | None = None,
    group_id: KafkaGroupSpec,
    schema_registry: SchemaRegistrySpec | None = None,
    conn_cfg: CfgSpec | None = None,
)
```

Bases: [Conn](https://docs.tabsdata.com/api/category/spi/spi/conn)

**Categories:** source

Kafka connection used by [`KafkaStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/kafkastreamsrc).

Registered on a collection; the runtime resolves it and hands it to the source at run time. `servers` and `group_id` accept a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

## Examples

A connection with a Confluent schema registry for SR-aware serdes:

```python
KafkaStreamSrcConn(
    servers="broker:9092",
    group_id="ingest",
    schema_registry=ConfluentSchemaRegistry(
        url="http://registry:8081",
    ),
)
```

## Parameters

parameter

`servers`[KafkaServersSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.KafkaServersSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Bootstrap-server list as a single comma-separated string of `host[:port]` items (any non-empty value), or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret) that resolves to one.

parameter

`credentials`[KafkaCredentialsSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.KafkaCredentialsSpec) | None ([UserPassword](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) | None)

Optional [`UserPassword`](https://docs.tabsdata.com/api/category/connectors/credentials/userpassword) for SASL/SCRAM auth; omit for an unauthenticated cluster.

parameter

`group_id`[KafkaGroupSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.KafkaGroupSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str) | [Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret))

Consumer-group id used by the polling consumer (any non-empty value). Required.

parameter

`schema_registry`[SchemaRegistrySpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.SchemaRegistrySpec) | None ([ConfluentSchemaRegistry](https://docs.tabsdata.com/api/category/connectors/source/confluentschemaregistry) | [AwsGlueSchemaRegistry](https://docs.tabsdata.com/api/category/connectors/source/awsglueschemaregistry) | None)

Optional [`ConfluentSchemaRegistry`](https://docs.tabsdata.com/api/category/connectors/source/confluentschemaregistry) or [`AwsGlueSchemaRegistry`](https://docs.tabsdata.com/api/category/connectors/source/awsglueschemaregistry); omit for schema-less ingest.

parameter

`conn_cfg`[CfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec) | None ([dict](https://docs.python.org/3/library/stdtypes.html#dict) | None)

Optional connector config forwarded as consumer `configs` to `confluent_kafka.Consumer` (see [`CfgSpec`](https://docs.tabsdata.com/api/module/tabsdatak-conn-common-types#tabsdatak.conn.common.types.CfgSpec)). The connector sets `auto.offset.reset=earliest` and `enable.auto.commit=false` itself, and defaults `partition.assignment.strategy=cooperative-sticky`, `topic.metadata.refresh.interval.ms=30000`, `fetch.queue.backoff.ms=0` and `socket.keepalive.enable=true`; a value given here wins over each default. Settings worth knowing: `max.poll.interval.ms` (raise it when a stage takes longer than its 5 minute default; the stream warns past half of it and restarts itself if evicted), `queued.max.messages.kbytes` (memory the fetch queue may hold), `fetch.min.bytes` / `fetch.wait.max.ms` (latency against throughput) and `fetch.message.max.bytes`.
