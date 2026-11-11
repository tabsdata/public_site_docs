# Publish data from log files with Grok

> Parses single-column log files into typed TableFrame columns with the grok function, using Elasticsearch-style patterns, named captures, and a schema, from LocalFileSrc or object storage publishers.

Source: https://docs.tabsdata.com/tutorials/publishers/grok-for-log-files

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

## Ingest log files as typed columns

The grok function is a powerful log parsing tool for TableFrames that extracts structured data from log files and similar text formats. Originally developed for log analysis, it transforms a single text column into multiple typed columns by applying grok patterns with named captures.

Grok is based on the Elasticsearch implementation and follows the same pattern syntax. For comprehensive pattern documentation, see the official [Elasticsearch Grok documentation](https://www.elastic.co/docs/explore-analyze/scripting/grok) and the [predefined pattern library](https://github.com/elastic/elasticsearch/tree/main/libs/grok/src/main/resources/patterns).

Grok uses regular expressions with predefined patterns to parse text. Each pattern includes named captures that become columns in your result. The function takes three inputs:

-   Column Expression: Any expression that selects one column containing text to parse
-   Pattern: A grok pattern string with named captures
-   Schema: A mapping that defines output column names and data types for each capture

While not technically a full-fledged connector like S3, Postgres, or Databricks, the grok log parser can be used with Publishers for Local File Systems and Object Storage in order to parse and convert single column logs into structured, tabular data.

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish access.log into a table using grok log parsing

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

That needs a file publisher plus a grok pattern to split the lines. Three values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   log directory and file
-   log format, or a sample line

❯everything you need is in 

Read 2 files, called tabsdata 2 times (ctrl+o to expand)

⏺

Read the first line of access.log to confirm the format before writing a pattern against it:

```text
192.168.1.1 - frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326
```

⏺

Combined access log, as stated. No credentials here, so nothing is secret in this connection: a local file source carries only `base_path`.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **log\_src** created from it in group `sources` with `base_path` `/var/log/acme`. Connection check passed.

Called tabsdata 3 times (ctrl+o to expand)

⏺

Checked the pattern with `grok_fields` before writing the schema, which returned 9 captures. Five of them are worth keeping and the rest are matched and discarded, so the schema maps only those five:

```python
PATTERN = (
  r"%{IPV4:client_ip} "
  r"%{USER:ident} "
  r"%{USER:auth} "
  r"\[%{HTTPDATE:timestamp}\] "
  r'"%{WORD:method} '
  r'%{URIPATHPARAM:request} '
  r'HTTP/%{NUMBER:http_version}" '
  r"%{INT:response_code} %{INT:bytes}"
)

SCHEMA = {
  "client_ip": tdf.Column("ip_address", td.String),
  "method": tdf.Column("http_method", td.String),
  "response_code": tdf.Column("status_code", td.Int32),
  "bytes": tdf.Column("response_bytes", td.Int64),
  "timestamp": tdf.Column("request_time", td.String),
}


@publisher(
  source=LocalFileSrc(
      paths=["access.log"],
      format=SrcFileFormat.CSV,
      format_cfg={
          SrcFileFormat.CSV: {"has_header": False, "separator": "\x00"},
      },
  ),
  output_tables=["access_logs"],
)
def read_access_logs(lines: TableFramesSpec) -> tuple[TableFrameSpec]:
  if lines is None:
      return (None,)
  return (lines[0].grok("column_0", PATTERN, SCHEMA),)
```

⏺

The CSV options turn the header off and set a separator that cannot occur in the text, so each line reaches `grok` whole rather than being split on its commas first.

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

**log\_src/access\_logs** is live, 5 typed columns out of what was one text column. 12 rows did not match the pattern and carry null across all five:

```
┌────────────────┬────────┬───────────────┐
│     column     │  type  │ from capture  │
├────────────────┼────────┼───────────────┤
│ ip_address     │ String │ client_ip     │
├────────────────┼────────┼───────────────┤
│ http_method    │ String │ method        │
├────────────────┼────────┼───────────────┤
│ status_code    │ Int32  │ response_code │
├────────────────┼────────┼───────────────┤
│ response_bytes │ Int64  │ bytes         │
├────────────────┼────────┼───────────────┤
│ request_time   │ String │ timestamp     │
└────────────────┴────────┴───────────────┘
```

A row the pattern fails to match is kept with null in every grok column, so nothing is dropped and the run does not fail. A block of nulls across the parsed columns means the pattern stopped matching rather than that the source went empty.

Reading logs out of a bucket rather than a local directory changes only the connection, to `s3-file-in` or `az-file-in`. The parsing lives in the publisher body either way.

The pattern syntax follows the Elasticsearch implementation. See the [Elasticsearch Grok documentation](https://www.elastic.co/docs/explore-analyze/scripting/grok) for the reference and the [predefined pattern library](https://github.com/elastic/elasticsearch/tree/main/libs/grok/src/main/resources/patterns) for the names available to `%{NAME:alias}`.
