# KafkaStreamSrc

> Kafka streaming source for `@stream_publisher` -- one batch per due batch limit.

Source: https://docs.tabsdata.com/api/category/connectors/source/kafkastreamsrc

class

```python
class KafkaStreamSrc(
    data_format: KafkaMessageFormatSpec,
    schema: str,
    topic: KafkaTopicSpec,
    dlq_topic: KafkaTopicSpec | None = None,
    src_cfg: SrcCfgSpec | None = None,
)
```

Bases: [StreamSrc](https://docs.tabsdata.com/api/category/connectors/source/streamsrc)

**Categories:** source

Kafka streaming source for `@stream_publisher` -- one batch per due batch limit.

Consumes a Kafka `topic` (every topic matching it when it starts with `^`) in two levels. The `buffer` keys decide when the buffered messages are written to a parquet file; the `@stream_publisher` batch settings decide when the written files are staged as one tableframe batch. Messages of incompatible schemas land in separate files of the same batch; the files of one schema keep the column types of the run's earlier files of that schema, and a row whose values do not fit them is a dead letter.

Used as the `source` of a `@stream_publisher`; that function receives the batch as a list of frames and must NOT declare a `ctx` parameter. The emitted table name is the `topic`.

Every batch this source stages automatically carries a `@td.kafka.topic` column holding the topic the message was consumed from.

## Examples

Consume Avro payloads, staging a batch as soon as 500 messages are waiting, and no sooner than a minute after the last one:

```python
@stream_publisher(
    source=KafkaStreamSrc(
        topic="users",
        data_format="avro",
        schema=AVRO_SCHEMA,
    ),
    batch_max_rows=500,
    output_tables=["users"],
)
def ingest(users: TableFramesSpec) -> TableFrameSpec:
    return concat(users)
```

Consume Protobuf payloads; the [`Protobuf`](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.Protobuf) marker carries the message type name:

```python
@stream_publisher(
    source=KafkaStreamSrc(
        topic="persons",
        data_format=Protobuf(message_name="PersonV1"),
        schema=PROTO_SCHEMA,
    ),
    batch_max_secs=60,
    output_tables=["persons"],
)
def ingest(persons: TableFramesSpec) -> TableFrameSpec:
    return concat(persons)
```

## Parameters

parameter

`data_format`[KafkaMessageFormatSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.KafkaMessageFormatSpec) (Literal\['avro', 'json'\] | [Protobuf](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.Protobuf))

Payload wire format -- `"avro"`, `"json"` or a `Protobuf(message_name=...)` marker.

parameter

`schema`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Schema definition string for `data_format` (an Avro schema, a JSON Schema, or a Protobuf `.proto`). Required; in schema-registry mode it also cross-checks the registry's resolved schema.

parameter

`topic`[KafkaTopicSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.KafkaTopicSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str))

Kafka topic to consume -- a regular expression over the topic names when it starts with `^`; also the emitted table name.

parameter

`dlq_topic`[KafkaTopicSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.KafkaTopicSpec) | None ([str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Optional dead-letter topic for the messages the source cannot stage: the ones that fail to decode, that the schema refuses, or whose values do not fit the types of their table (the envelope then carries the decoded `record`). Without it such a message stops the stream. A broker error is never a dead letter.

parameter

`src_cfg`[SrcCfgSpec](https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka#tabsdatak.conn.kafka.SrcCfgSpec) | None (Mapping\[Literal\['tabsdata.kafka.poll.max\_secs', 'tabsdata.kafka.poll.idle\_secs', 'kafka.connect\_timeout\_secs', 'kafka.logging\_level', 'tabsdata.kafka.buffer.max\_rows', 'tabsdata.kafka.buffer.max\_bytes', 'tabsdata.kafka.buffer.max\_secs', 'tabsdata.kafka.consume.max\_messages'\], [Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | None)

Optional connector config over the keys `tabsdata.kafka.poll.max_secs` (how long one poll waits for messages, default 2), `tabsdata.kafka.poll.idle_secs` (how long to wait after a poll that brought nothing, default 0: the poll already waits on the broker), `kafka.connect_timeout_secs` (default 16), `kafka.logging_level`, and the buffer limits `tabsdata.kafka.buffer.max_rows` (default 10000), `tabsdata.kafka.buffer.max_bytes` (memory the decoded records hold, off by default) and `tabsdata.kafka.buffer.max_secs` (default 60). The batch limits are the `@stream_publisher` batch settings. Every limit is a positive whole number. A byte limit is measured on every record and slows ingestion down; bounding by rows is the cheap option and the preferred one. `tabsdata.kafka.consume.max_messages` (default 10000) is how many messages one fetch from the consumer hands over at once; a JSON schema of plain typed properties lets such a fetch be decoded as one Arrow table, so a backlog reads faster with a larger fetch, up to what librdkafka prefetches into its local queue (`queued.min.messages`, 100000 by default, within `queued.max.messages.kbytes`, 64 MiB by default); a fetch asking for more waits out the poll.

## Methods

method

`output_table`

```python
def output_table() -> str
```

Return the emitted table name -- the source's `topic`.
