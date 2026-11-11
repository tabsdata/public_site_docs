# Trigger off a Kafka Stream

> Tabsdata Kafka stream source guide: setting up a kafka-topic-in connection and a stream publisher with KafkaStreamSrc, batch_* parameters, schema, and dlq_topic for failed messages.

Source: https://docs.tabsdata.com/tutorials/trigger-setup/kafka

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

A Kafka stream source consumes one topic continuously and writes it into one Tabsdata table, named in `output_tables`. What runs the publisher is neither a clock nor an upstream commit but a **batch**: the stream worker reads messages as they arrive, and when a batch is due, by the `batch_*` parameters of `@stream_publisher`, it hands the messages read since the previous batch to the publisher.

A stream publisher therefore takes no trigger at all.

The brokers and the consumer group live on the collection's connection, not in the function, so the collection has to exist with a `kafka-topic-in` connection bound to it before a stream publisher can be registered there. `servers` and `group_id` are required. A broker that takes SASL needs credentials alongside them, and one that does not takes none.

AI agent session

❯read the clicks topic from kafka into a table

⏺

Needs a stream publisher, and a source collection with a Kafka connection to hold it. Five values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   bootstrap servers
-   consumer group
-   topic
-   message format and schema

❯it's all in 

Read 2 files, called tabsdata 2 times (ctrl+o to expand)

⏺

Schema read from ~/clicks.json. No credentials in the file, so the connection goes out unauthenticated: `credentials` is optional on a Kafka connection, and this broker takes no SASL. Reading back: broker.internal:9092, group tabsdata\_clicks, topic clicks, format json, collection events.

Called tabsdata 3 times (ctrl+o to expand)

⏺

Collection **events** created in group `sources`, with a `KafkaStreamSrcConn` to broker.internal:9092.

⏺

Generating — `KafkaStreamSrc` on the `clicks` topic. A Kafka source has a single slot, so there is one output table, and `concat` folds the batch's frames into it.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The stream publisher, registered in events:

```python
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

Called tabsdata 2 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

events/clicks is live — the worker is consuming, and the first batch lands within 5 minutes:

```
┌────────────────┬───────────┐
│     field      │   value   │
├────────────────┼───────────┤
│ topic          │ clicks    │
├────────────────┼───────────┤
│ format         │ json      │
├────────────────┼───────────┤
│ output table   │ clicks    │
├────────────────┼───────────┤
│ batch_max_secs │ 300       │
├────────────────┼───────────┤
│ worker         │ consuming │
└────────────────┴───────────┘
```

`schema` is required. Without a schema registry, every JSON message is validated against it. The function takes one input slot per source, always in array mode, and declares no transaction context: it runs inside the runtime's stream loop rather than per-transaction.

## When a batch is due

Once `batch_min_secs` have passed since the previous batch (60 seconds, and never less), a batch is due when `batch_max_secs` have passed, or when at least `batch_max_rows` messages or `batch_max_bytes` bytes are waiting. At least one of the three is required.

AI agent session

❯hand over a batch as soon as 10,000 clicks are waiting

Called tabsdata 3 times (ctrl+o to expand)

⏺

Added `batch_max_rows=10_000`. A batch is now due once 10,000 messages are waiting, or after 5 minutes, whichever comes first, and never sooner than a minute after the previous one.

```python
    batch_max_secs=300,
  batch_max_rows=10_000,
```

See [Batch parameters](https://docs.tabsdata.com/guide/functions/stream-publishers#batch-parameters) for every rule.

## Messages that fail to deserialize

Set a dead letter topic on the source with `dlq_topic`, and messages that cannot be decoded are written there while the stream carries on. Without one, such a message stops the stream.

## What to do next

[Trigger off CDC in an SQL Database](https://docs.tabsdata.com/tutorials/trigger-setup/cdc) covers the other three stream sources, which use the same batch parameters against a database log.

See [Stream Triggers](https://docs.tabsdata.com/guide/triggers/stream) for how a batch becomes a run, and [Kafka](https://docs.tabsdata.com/guide/connectors/kafka) for every option of the source and the connection.
