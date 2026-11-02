# Publish data from a Kafka topic

Source: https://docs.tabsdata.com/developer/tutorials/publishers/kafka

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

A Kafka source lets a stream publisher ingest a Kafka topic into a Tabsdata table as messages arrive, handing them to the function in batches.

What you’ll do

1.  [Configure a connection to Kafka](#configure-a-connection-to-kafka)
2.  [Write and Register the Stream Publisher](#write-and-register-the-stream-publisher)

## Configure a connection to Kafka

Step 1Generate a connection template

```bash
tdk connection template --type kafka-topic-in --file conn-kafka.yaml
```

Step 2Fill in the bootstrap servers, group id, and credentials within the connection document

tip

Click a field to expand its details and highlight where it sits in the file; type your own values to build a file you can copy straight out. Toggle optional fields to add or remove them. Credential fields show a sample value and cannot be edited here.

conn-kafka.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.kafka:KafkaStreamSrcConn
spec:
  servers: 'kafka-broker-1:9092,kafka-broker-2:9092'
  group_id: 'tabsdata_consumer_group'
```

-   required
    
-   required
    
-   optional
    

Credentials are written as `secret:<value>`, a literal secret. The CLI strips the value out of the document before it reaches the server and stores it separately, so the file you keep on disk is the only place the plain value ever appears. Reads return the secret's name, never its value. See [Connections](https://docs.tabsdata.com/developer/guide/connections) for the full syntax.

Step 3Validate the filled-in connection document (optional)

```bash
tdk connection validate --file conn-kafka.yaml
```

Step 4Bind the connection to a new or existing collection

-   Create a New Collection
-   Attach to an Existing Collection

```bash
tdk collection create --name events --group sources --conn-file conn-kafka.yaml
```

```bash
tdk collection update --name events --conn-file conn-kafka.yaml
```

## Write and Register the Stream Publisher

Step 5Build the stream publisher file locally

read\_flight\_events.py

```
1from tabsdatak.api import stream_publisher, TableFrameSpec, TableFramesSpec2from tabsdatak.conn.kafka import KafkaStreamSrc3from tabsdatak.tableframe.functions import concat4 5FLIGHT_EVENT_SCHEMA = open("flight_event.schema.json").read()6 7 8@stream_publisher(9  source=KafkaStreamSrc(1      topic="flight_events",2      data_format="json",3      schema=FLIGHT_EVENT_SCHEMA,13  ),4  batch_max_secs=120,5  output_tables=["flight_events"],16)6def read_flight_events(events: TableFramesSpec) -> TableFrameSpec:7  return concat(events, how="diagonal_relaxed")
```

-   Kafka topic to consume. A name starting with ^ is a regular expression.
    
-   Payload wire format: "avro", "json", or a Protobuf(message\_name=...) marker.
    
-   Schema definition string for data\_format, required even in schema-registry mode.
    
-   Hands the consumed messages to the function at least every 120 seconds.
    
-   A Kafka source has a single slot, so one output table. Its name comes from here, not from the topic.
    
-   One TableFramesSpec parameter for the single source slot, always array mode. No ctx parameter.
    
-   One frame for the output table. concat folds the batch's frames into one, filling columns a frame lacks with nulls.
    

The `source` parameter defines the Kafka topic to consume from, the format of the messages, and the schema used to parse them.

`batch_max_secs=120` hands the consumed messages to the function at least every two minutes. See [Batch parameters](https://docs.tabsdata.com/developer/guide/functions/stream-publishers#batch-parameters) for the other `batch_*` parameters.

Step 6Register the stream publisher into the collection

```bash
tdk fn register --coll events --path read_flight_events.py::read_flight_events
```

Step 7Inspect the resulting table

```bash
tdk table list --coll events
tdk table data --coll events --name flight_events
```

flight\_events

Tabsdata›Collections›events›flight\_events

### Schema

Table schema defines the structure of a table by listing its columns and their data types.

| Object | Type |
| --- | --- |
| flight\_id | str |
| departure\_airport | str |
| arrival\_airport | str |
| status | str |
| @td.kafka.topic | str |

## Batches and consumer tuning

`src_cfg` takes these keys, and no others:

| `src_cfg` key | Default | Description |
| --- | --- | --- |
| `tabsdata.kafka.buffer.max_rows` | `10000` | Messages buffered in the worker before they are written out to a file. |
| `tabsdata.kafka.buffer.max_bytes` | none | Bytes buffered before they are written out, measured on the decoded messages. |
| `tabsdata.kafka.buffer.max_secs` | `60` | Longest time a message waits in the buffer. |
| `tabsdata.kafka.poll.max_secs` | `2` | Longest time one read of the topic takes. |
| `tabsdata.kafka.poll.idle_secs` | `0` | Pause after a read that found no messages. |
| `tabsdata.kafka.consume.max_messages` | `10000` | Most messages fetched from the brokers at once. |
| `kafka.connect_timeout_secs` | `16` | Seconds to wait for the brokers when the stream starts, and for the dead letter topic to acknowledge writes. |
| `kafka.logging_level` | `40` | Logging verbosity of the connector, as a Python logging level number. |

The buffer settings only decide when the worker writes what it has read to a file. When a batch is handed to the function is decided by the `batch_*` parameters of `@stream_publisher`:

```python
@stream_publisher(
    source=KafkaStreamSrc(
        topic="flight_events",
        data_format="json",
        schema=FLIGHT_EVENT_SCHEMA,
    ),
    batch_max_secs=120,
    batch_max_rows=500,
    output_tables=["flight_events"],
)
```

## Dead-letter topic

`dlq_topic` on `KafkaStreamSrc` names an optional topic that messages failing deserialization are written to while the stream carries on. Without one, such a message stops the stream. The connector does not create the topic.

## Pausing and resuming the stream

A stream publisher can be stopped and started without deleting it, which is useful for maintenance on the Kafka side or to hold off consuming while other setup finishes:

```bash
tdk stream disable --coll events --name read_flight_events
tdk stream enable --coll events --name read_flight_events
```

Registering with `--disabled` puts the publisher in the collection without starting consumption; start it later with `tdk stream enable` once you're ready. A disabled stream resumes from the consumer group's committed offsets.

See [Kafka](https://docs.tabsdata.com/developer/guide/connectors/kafka) for every option of the source and the connection.
