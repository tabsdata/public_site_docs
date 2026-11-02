# Trigger off a Kafka Stream

Source: https://docs.tabsdata.com/developer/tutorials/trigger-setup/kafka

Before you begin

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

A Kafka stream source consumes one topic continuously and writes it into one Tabsdata table, named in `output_tables`. What runs the publisher is neither a clock nor an upstream commit but a **batch**: the stream worker reads messages as they arrive, and when a batch is due, by the `batch_*` parameters of `@stream_publisher`, it hands the messages read since the previous batch to the publisher.

`@stream_publisher` therefore takes no `trigger_by` at all.

Step 1Create the connection

```bash
tdk connection template --type kafka-topic-in --file conn-kafka.yaml
```

Fill in the bootstrap servers and the consumer group, then create the collection with it:

```bash
tdk collection create \
  --name events \
  --group sources \
  --conn-file conn-kafka.yaml
```

`servers` and `group_id` are the required fields. `credentials` is optional, so a broker that takes SASL gets a `UserPassword` block here and a broker without authentication gets none. The topic is not a connection field: it belongs to the source in the function, along with the message format and schema.

A Kafka connection registers with direction `stream-src`, which maps to the `sources` group like a plain source does.

Step 2Write the stream publisher

read\_clicks.py

```python
from tabsdatak.api import TableFrameSpec, TableFramesSpec, stream_publisher
from tabsdatak.conn.kafka import KafkaStreamSrc
from tabsdatak.tableframe.functions import concat

CLICK_SCHEMA = """
{
  "type": "object",
  "properties": {
    "user_id": {"type": "string"},
    "url": {"type": "string"},
    "ts": {"type": "integer"}
  },
  "required": ["user_id", "url", "ts"]
}
"""


@stream_publisher(
    source=KafkaStreamSrc(
        topic="clicks",
        data_format="json",
        schema=CLICK_SCHEMA,
    ),
    batch_max_secs=300,
    output_tables=["clicks"],
)
def read_clicks(clicks: TableFramesSpec) -> TableFrameSpec:
    return concat(clicks, how="diagonal_relaxed")
```

A Kafka source has a single slot, so there is one output table, named in `output_tables`. `schema` is required. Without a schema registry, every JSON message is validated against it.

The function takes one `TableFramesSpec` per source slot, always in array mode. A batch can hold several frames when the messages change shape, so `concat` with `how="diagonal_relaxed"` fills the missing columns with nulls. The function must **not** declare a `ctx` parameter: it runs inside the runtime's stream loop rather than per-transaction, so no transaction context exists at the call boundary.

Step 3Register it

```bash
tdk fn register \
  --coll events \
  --path read_clicks.py::read_clicks
```

Registration starts the stream worker. It consumes continuously from that point.

## When a batch is due

Once `batch_min_secs` have passed since the previous batch (60 seconds, and never less), a batch is due when `batch_max_secs` have passed, or when at least `batch_max_rows` messages or `batch_max_bytes` bytes are waiting. At least one of the three is required. To hand over a batch as soon as 10,000 messages are waiting, or after 5 minutes at the latest:

```python
    batch_max_secs=300,
    batch_max_rows=10_000,
```

The buffer settings in `src_cfg`, such as `tabsdata.kafka.buffer.max_rows`, only decide when the worker writes to a file. See [Batch parameters](https://docs.tabsdata.com/developer/guide/functions/stream-publishers#batch-parameters) for every rule.

## Messages that fail to deserialize

Set `dlq_topic` on the source, and Kafka messages that cannot be decoded are written there while the stream carries on. Without one, such a message stops the stream.

## What to do next

[Trigger off CDC in an SQL Database](https://docs.tabsdata.com/developer/tutorials/trigger-setup/cdc) covers the other three stream sources, which use the same batch parameters against a database log.

See [Stream Triggers](https://docs.tabsdata.com/developer/guide/triggers/stream) for how a batch becomes a run, and [Kafka](https://docs.tabsdata.com/developer/guide/connectors/kafka) for every option of the source and the connection.
