# Publish data from a Kafka topic

> Publishes a Kafka topic into a Tabsdata table with the @stream_publisher decorator and KafkaStreamSrc, covering schema, dlq_topic, and batch_max_secs/batch_max_bytes settings.

Source: https://docs.tabsdata.com/tutorials/publishers/kafka

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

## Ingest a topic continuously

A Kafka source lets a stream publisher ingest a Kafka topic into a Tabsdata table as messages arrive, handing them to the function in batches.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish the page\_views kafka topic into a table

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The Kafka publisher guide and connection template are loaded. This one is a stream publisher, so it also needs to know when to hand over a batch. Six values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   bootstrap servers and SASL credentials
-   consumer group
-   topic
-   message format and schema
-   when to hand over a batch

❯everything you need is in 

Read 2 files, called tabsdata 2 times (ctrl+o to expand)

⏺

SASL password found, and the Avro schema read from ~/page\_views.avsc. Reading back what is not secret: broker.internal:9092, group tabsdata\_page\_views, topic page\_views, format avro, dead letter topic page\_views\_dlq, collection events\_src.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Collection **events\_src** created in group `sources`, with a `KafkaStreamSrcConn` to broker.internal:9092. The topic exists with 6 partitions.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The stream publisher, registered in `events_src`. A batch is due after 5 minutes, or sooner once 128 MB are waiting, but never sooner than a minute after the previous one:

```python
@stream_publisher(
  source=KafkaStreamSrc(
      topic="page_views",
      data_format="avro",
      schema=PAGE_VIEWS_SCHEMA,
      dlq_topic="page_views_dlq",
  ),
  batch_max_secs=300,
  batch_max_bytes=128 * 1024 * 1024,
  output_tables=["page_views"],
)
def read_page_views(page_views: TableFramesSpec) -> TableFrameSpec:
  return concat(page_views, how="diagonal_relaxed")
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Stream worker started. First batch committed after 128 MB, 0 failures.

⏺

**events\_src/page\_views** is live and keeps gaining versions, one per batch:

```
┌───────────────────┬───────────────┐
│       field       │     value     │
├───────────────────┼───────────────┤
│ collection        │ events_src    │
├───────────────────┼───────────────┤
│ table             │ page_views    │
├───────────────────┼───────────────┤
│ rows this version │ 1,904,338     │
├───────────────────┼───────────────┤
│ columns           │ 14            │
├───────────────────┼───────────────┤
│ batch due on      │ size (128 MB) │
├───────────────────┼───────────────┤
│ offsets committed │ yes           │
└───────────────────┴───────────────┘
```

`schema` is required, and messages that fail to deserialize go to `dlq_topic` while the stream carries on. Without a `dlq_topic`, such a message stops the stream. A stream publisher takes no `trigger_by` at all, and it must not declare a `ctx` parameter, because it runs inside the stream loop rather than once per transaction.

See [Kafka](https://docs.tabsdata.com/guide/connectors/kafka) for every option of the source and the connection, and [Batch parameters](https://docs.tabsdata.com/guide/functions/stream-publishers#batch-parameters) for when a batch is due.
