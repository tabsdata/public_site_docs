# Kafka

> Reference for the Tabsdata Kafka stream source: message formats, schema registries, dead letter topics, consumer groups, and the connection.

Source: https://docs.tabsdata.com/developer/guide/connectors/kafka

The Kafka connector lets Tabsdata read messages from Kafka topics as they arrive, and publish them into Tabsdata tables.

The `KafkaStreamSrc` connector can be used by a [stream publisher](https://docs.tabsdata.com/developer/guide/functions/stream-publishers) function to consume a topic, decode its messages from JSON, Avro or Protobuf, with or without a schema registry, and write them into a Tabsdata table.

Unlike a regular publisher, which runs on a trigger, a Kafka source runs continuously: registering the stream publisher starts a long-lived worker that keeps consuming the topic until the function is disabled or deleted.

## Publisher

The `KafkaStreamSrc` connector can be used by a stream publisher function to publish Kafka messages into Tabsdata tables. [See the full publisher walkthrough](https://docs.tabsdata.com/developer/tutorials/publishers/kafka)

The stream publisher is registered in a collection created with a `KafkaStreamSrcConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   The brokers are reachable from the Tabsdata server.
-   The connecting principal can `Describe` and `Read` the topic (every matching topic, for a regular expression), `Read` the consumer group, and read the cluster metadata.
-   With a `dlq_topic`, the principal can also `Describe` and `Write` the dead letter topic, and the topic exists. The connector does not create it.
-   With a Confluent schema registry, the registry user can read schemas.
-   With an AWS Glue schema registry, the AWS credentials allow `glue:GetSchemaVersion` and `glue:GetSchemaByDefinition`, and also `glue:RegisterSchemaVersion` and `glue:CreateSchema` unless the schema given in the publisher is already registered. See [`schema`](#schema).

### Publisher

Configure `KafkaStreamSrc` as the `source` of a `@stream_publisher` function to select the topic Tabsdata consumes.

read\_orders.py

```python
from tabsdatak.api import TableFrameSpec, TableFramesSpec, stream_publisher
from tabsdatak.conn.kafka import KafkaStreamSrc
from tabsdatak.tableframe.functions import concat

ORDER_SCHEMA = """
{
  "type": "object",
  "properties": {
    "order_id": {"type": "integer"},
    "customer": {"type": "string"},
    "amount": {"type": "number"}
  },
  "required": ["order_id", "customer", "amount"]
}
"""

@stream_publisher(
    source=KafkaStreamSrc(
        topic="orders",
        data_format="json",
        schema=ORDER_SCHEMA,
    ),
    batch_max_secs=120,
    output_tables=["orders"],
)
def read_orders(orders: TableFramesSpec) -> TableFrameSpec:
    return concat(orders, how="diagonal_relaxed")
```

-   required
    
-   required
    
-   required
    
-   optional
    
-   optional
    

`batch_max_secs=120` hands the consumed messages to the function at least every two minutes. The `batch_*` parameters decide when a batch of messages is handed to the function, and are the same for every stream source. See [Stream Publishers](https://docs.tabsdata.com/developer/guide/functions/stream-publishers#batch-parameters) for all of them.

A stream publisher differs from a regular publisher in three ways:

-   It has no trigger. Registering it starts the stream worker, which runs until the function is disabled or deleted.
-   A Kafka source has a single slot, so the function has a single parameter. It receives a list of frames: the messages consumed since the previous batch. Fold them with `concat`, which also returns `None` when the batch carried no messages.
-   The function must not declare a `ctx` parameter.

The table names come from `output_tables`, not from the topic.

### Function Config Parameters

#### `topic`

The topic to consume. A name starting with `^` is a regular expression, and the stream consumes every topic that matches it, all into the same slot. The `@td.kafka.topic` column of each row tells which topic the message came from.

#### `data_format`

How the message values are encoded:

-   `"json"`: a JSON object per message.
-   `"avro"`: Avro.
-   `Protobuf(message_name="<package>.<Message>")`: Protobuf. `message_name` is the full name of the message type, including the `.proto` package: `com.example.Order`, not `Order`.

```python
from tabsdatak.conn.kafka import KafkaStreamSrc, Protobuf

KafkaStreamSrc(
    topic="orders",
    data_format=Protobuf(message_name="com.example.Order"),
    schema=ORDER_PROTO,
)
```

#### `schema`

The schema of the messages, as a string. What it is used for depends on the format and on the connection's schema registry:

| Format | No schema registry | Confluent | AWS Glue |
| --- | --- | --- | --- |
| `"json"` | A JSON Schema. Every message is validated against it. An empty string skips validation. | A JSON Schema the messages are validated against. An empty string validates against the registry's schema. | Used to find the schema in the registry. Messages are validated against the registry's schema. |
| `"avro"` | The Avro schema the messages were written with. | The schema to read the messages as (Avro reader schema). An empty string reads them as written. | Used to find the schema in the registry. Messages are read with the registry's schema. |
| `Protobuf` | The `.proto` definition. | The `.proto` definition. | The `.proto` definition. |

-   A `.proto` definition is compiled on its own: it cannot `import` other files, including the Google well-known types such as `google/protobuf/timestamp.proto`.
-   With AWS Glue, the stream looks the schema up in the registry each time it starts. If the registry does not have it, the stream registers it as a new version of `schema_name`, or creates `schema_name` if it does not exist.
-   The schema is not checked when the function is defined. A malformed schema fails the stream when it starts.
-   The schema does not set the column types of the output table. They come from the decoded values; see [Message rows](#message-rows).

#### `dlq_topic`

A dead letter topic. A message that cannot be decoded, does not match the schema, or does not fit the column types of the batch is written to this topic, and the stream carries on.

Without a `dlq_topic`, such a message stops the stream. Tabsdata restarts the stream after a while, but it stops again on the same message, so set a `dlq_topic` for any topic that may carry malformed messages.

Each dead letter is a JSON object with the original value (`original_value`), the error (`error`), and the message's `topic`, `partition`, `offset` and `timestamp`. A message that was decoded but did not fit the column types carries the decoded message in `record` instead of `original_value`. The message key is kept for decoding errors. Headers are not copied.

#### `src_cfg`

Sets additional source configuration. Only these keys are accepted:

| Key | Default | Description |
| --- | --- | --- |
| `tabsdata.kafka.buffer.max_rows` | `10000` | Messages buffered in the worker before they are written out to a file. |
| `tabsdata.kafka.buffer.max_bytes` | none | Bytes buffered before they are written out, measured on the decoded messages. |
| `tabsdata.kafka.buffer.max_secs` | `60` | Longest time a message waits in the buffer. |
| `tabsdata.kafka.poll.max_secs` | `2` | Longest time one read of the topic takes. |
| `tabsdata.kafka.poll.idle_secs` | `0` | Pause after a read that found no messages. |
| `tabsdata.kafka.consume.max_messages` | `10000` | Most messages fetched from the brokers at once. |
| `kafka.connect_timeout_secs` | `16` | Seconds to wait for the brokers when the stream starts, and for the dead letter topic to acknowledge writes. |
| `kafka.logging_level` | `40` | Logging verbosity of the connector, as a Python logging level number (`10` debug, `20` info, `30` warning, `40` error). |

The buffer settings control when consumed messages are written to files inside the worker. When those files are handed to the function is controlled by the [batch parameters](https://docs.tabsdata.com/developer/guide/functions/stream-publishers#batch-parameters) of `@stream_publisher`.

## Message rows

Each message becomes one row: the fields of the decoded message value, as columns sorted by name, plus one metadata column:

| Column | Type | Description |
| --- | --- | --- |
| `@td.kafka.topic` | `str` | The topic the message came from. |

The message key, headers, timestamp, partition and offset are not part of the row.

Column types come from the decoded values:

-   **JSON:** integers are `int64`, numbers are `int64` or `float64`, strings are strings (a date in a string stays a string), objects are structs and arrays are lists.
-   **Avro:** Avro types map to their Arrow counterparts, including logical types: `timestamp-millis` becomes a UTC timestamp and `date` a date.
-   **Protobuf:** messages are converted the way Protobuf converts them to JSON: `int64` and `uint64` fields become strings, `bytes` become base64 strings, enums become their names, and fields left at their default value are included.

A message with a `null` value, such as a compaction tombstone, cannot be decoded and goes to the `dlq_topic`.

The function can receive several frames in one batch. A new frame starts when the messages change shape: without a schema registry, when a message has a field the frame does not; with a registry, when the schema version changes. Combine them with `concat(frames, how="diagonal_relaxed")`, which fills the missing columns with nulls.

Within a frame, the first messages fix the column types. A later message whose values do not fit them goes to the `dlq_topic`.

## Operational notes

### Where the stream starts

There is no start position to configure. The stream resumes from the offsets committed to the consumer group; a group with none starts from the earliest message the topic retains.

### Delivery

A Kafka stream is at least once. The stream commits the offsets of a batch once the batch is handed over. If the stream stops between handing over a batch and committing it, the messages of that batch are published again after the restart, so remove duplicates downstream if they matter.

Disabling the function stops the stream. Messages read but not yet handed over are read again when it is enabled.

### One consumer group per collection

Every stream publisher in a collection consumes with the `group_id` of the collection's connection, so Kafka treats them as members of one consumer group:

-   Two stream publishers that read the same topic split its partitions between them, and each publishes only part of the messages.
-   Stream publishers that read different topics each get all the partitions of their own topic, and their committed offsets do not mix. They still take part in each other's rebalances whenever one of them starts, stops or restarts. With the connector's default `partition.assignment.strategy` (`cooperative-sticky`), the others keep their partitions. With an eager strategy set in `conn_cfg` (`range` or `roundrobin`), every rebalance takes all partitions from every member, and each stream publisher hands over what it has read as an early batch (see [Rebalances](#rebalances)).
-   The same applies to collections whose connections use the same `group_id`.

Give each stream publisher that reads a topic its own collection, with its own `group_id`.

### Replaying a topic

`tdk fn update --reset-stage` does not rewind a Kafka stream, because its position is the consumer group's. To read a topic again, update the collection's connection with a new `group_id`, which makes every stream publisher in the collection start over, or reset the group's offsets for that topic with the Kafka tools while the function is disabled.

### Rebalances

When the brokers move partitions away from the stream, everything read from them so far is handed over at once, even before `batch_min_secs` has passed.

### Retention

Messages the brokers delete before the stream reads them are skipped. If the brokers expire the group's offsets while the stream is stopped, the stream starts again from the earliest message retained.

### Failures

If the brokers cannot be reached when the stream starts, or a schema registry cannot be reached while decoding, the stream stops without committing, and Tabsdata restarts it after a while. Nothing is sent to the `dlq_topic` for these errors.

The stream warns in its log when the time between two reads of the topic gets close to the consumer's `max.poll.interval.ms`. Raise it in `conn_cfg` if batches take long to hand over.

## Connection

Kafka stream publishers use `KafkaStreamSrcConn` to define the brokers, the consumer group and the credentials used by the stream.

conn-kafka.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.kafka:KafkaStreamSrcConn
spec:
  servers: 'broker1.internal:9092,broker2.internal:9092'
  group_id: 'tabsdata_orders'
```

-   required
    
-   required
    
-   optional
    
-   optional
    
-   optional
    

### Create the collection

A stream publisher is registered in a source collection, and a source collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type kafka-topic-in --file conn-kafka.yaml
```

Edit the template file with the Kafka connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-kafka.yaml
```

```bash
tdk collection create --name orders_kafka --conn-file conn-kafka.yaml
```

Then register the stream publisher in the collection:

```bash
tdk fn register --coll orders_kafka --path read_orders.py::read_orders
```

-   The collection goes in the `sources` group, because the connection is a source connection. `--group` can be left out; if it is given, it must be `sources`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `KafkaStreamSrc` for a collection created with `KafkaStreamSrcConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate a password, run `tdk collection update --name orders_kafka --conn-file conn-kafka.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.
-   Every stream publisher in the collection consumes with the connection's `group_id`. Two stream publishers of one collection that read the same topic would split its partitions between them, each publishing only part of the messages. Give each stream publisher that reads a topic its own collection, with its own `group_id`. See [One consumer group per collection](#one-consumer-group-per-collection).

### Connection Config Parameters

#### `servers`

The bootstrap servers, as a comma-separated list of `host:port`. Written as a plain value here, but accepts `secret:` too.

#### `group_id`

The Kafka consumer group the stream consumes with. The stream commits its progress to this group, and resumes from it after a restart. A `group_id` with no committed offsets starts from the earliest message the topic retains. Written as a plain value here, but accepts `secret:` too.

The consumer group belongs to the connection, not to the function: every stream publisher registered in the collection consumes with this same `group_id`. See [One consumer group per collection](#one-consumer-group-per-collection).

#### `credentials`

A user and password for SASL authentication. With `credentials`, the connector uses `SCRAM-SHA-256` over `SASL_PLAINTEXT`, which does not encrypt the connection, and ignores any `security.protocol` or `sasl.mechanism` in `conn_cfg`.

For TLS, another SASL mechanism, or mutual TLS, leave `credentials` out and set the client properties in `conn_cfg` instead.

#### `schema_registry`

The schema registry the messages are encoded against. Leave it out for messages encoded without a registry. It is a mapping with the fields of one of two registry kinds, recognized by their fields.

A Confluent schema registry takes a required `url`, optional `credentials` (`UserPassword`), and optional `configs` with extra Confluent schema registry client properties:

```yaml
  schema_registry:
    url: 'https://registry.internal:8081'
    credentials:
      kind: userPasswordCredentials
      apiVersion: '1.0'
      type: tabsdatak.conn.common.types:UserPassword
      spec:
        user: 'secret:registry_user'
        password: 'secret:example-password'
```

An AWS Glue schema registry takes a required `region_name`, `credentials` (`AwsAccessSecretKey`), `registry_name` and `schema_name`, and optional `configs` with extra keyword arguments for the AWS Glue client, such as `endpoint_url`:

```yaml
  schema_registry:
    region_name: 'us-east-1'
    registry_name: 'orders-registry'
    schema_name: 'orders'
    credentials:
      kind: awsAccessSecretKeyCredentials
      apiVersion: '1.0'
      type: tabsdatak.conn.common.types:AwsAccessSecretKey
      spec:
        access_key_id: 'secret:AKIAEXAMPLE'
        secret_access_key: 'secret:example-secret-key'
```

#### `conn_cfg`

Kafka client properties, as [librdkafka](https://github.com/confluentinc/librdkafka/blob/master/CONFIGURATION.md) names them, for example `security.protocol`, `ssl.ca.location`, `sasl.mechanism` or `sasl.username`. They are passed as they are to the consumer, and to the producer that writes to the `dlq_topic`.

```yaml
  conn_cfg:
    security.protocol: 'SASL_SSL'
    sasl.mechanism: 'SCRAM-SHA-512'
    sasl.username: 'tabsdata'
    sasl.password: 'example-password'
    ssl.ca.location: '/etc/tabsdata/kafka-ca.pem'
```

-   `bootstrap.servers`, `group.id`, `enable.auto.commit` (`false`) and `auto.offset.reset` (`earliest`) are always set by the connector, and cannot be changed here.
-   `partition.assignment.strategy` (`cooperative-sticky`) can be changed here.
-   Values in `conn_cfg` are not secrets: they are stored and shown as written, passwords included. Use `credentials` for a password when SCRAM-SHA-256 is enough.
-   File paths, such as `ssl.ca.location`, must exist where Tabsdata runs the stream.
