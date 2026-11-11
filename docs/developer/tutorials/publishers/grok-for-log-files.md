# Publish data from log files with Grok

Source: https://docs.tabsdata.com/developer/tutorials/publishers/grok-for-log-files

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/developer/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/developer/server-admin/start)

[Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create)

The grok function is a powerful log parsing tool for TableFrames that extracts structured data from log files and similar text formats. Originally developed for log analysis, it transforms a single text column into multiple typed columns by applying grok patterns with named captures.

Grok is based on the Elasticsearch implementation and follows the same pattern syntax. For comprehensive pattern documentation, see the official [Elasticsearch Grok documentation](https://www.elastic.co/docs/explore-analyze/scripting/grok) and the [predefined pattern library](https://github.com/elastic/elasticsearch/tree/main/libs/grok/src/main/resources/patterns).

Grok uses regular expressions with predefined patterns to parse text. Each pattern includes named captures that become columns in your result. The function takes three inputs:

-   Column Expression: Any expression that selects one column containing text to parse
-   Pattern: A grok pattern string with named captures
-   Schema: A mapping that defines output column names and data types for each capture

While not technically a full-fledged connector like S3, Postgres, or Databricks, the grok log parser can be used with Publishers for Local File Systems and Object Storage in order to parse and convert single column logs into structured, tabular data.

What you’ll do

1.  [Configure a connection to the log source](#configure-a-connection-to-the-log-source)
2.  [Write and Register a Publisher Function](#write-and-register-a-publisher-function)
3.  [Trigger the publisher function](#trigger-the-publisher-function)

## Configure a connection to the log source

Log files sit on disk or in object storage, so the connection is a file connection rather than anything grok-specific. A local directory:

Step 1Generate a connection template using the CLI

```bash
tdk connection template --type local-file-in --file conn-logs.yaml
```

Step 2Point base\_path at the log directory

conn-logs.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.localfile:LocalFileSrcConn
spec:
  base_path: '/var/log/acme'
```

Reading logs out of a bucket instead means `s3-file-in` or `az-file-in` here. Nothing else on this page changes: the parsing happens in the publisher body, not in the connection.

## Bind connection document to a collection

Step 3Bind connection to a new or existing collection

```bash
tdk collection create --name log_src --group sources --conn-file conn-logs.yaml
```

## Write and Register a Publisher Function

Grok patterns use the format `%{name:alias:extract:definition}` where:

-   name: A predefined pattern name (e.g., IPV4, WORD, INT)
-   alias: A custom name for this capture (becomes the capture name)
-   extract: Reserved for future use (not used in current version)
-   definition: A regular expression definition (required if name is not specified)

The publisher function ingests the log file as a single-column tableframe and applies the `grok` method which accepts the `column` to parse, the string `pattern` that defines the structure data in the column, and a `schema` that defines how the parsed text should be structured in the output Tableframe.

read\_access\_logs.py

```
1from tabsdatak.api import publisher, TableFrameSpec, TableFramesSpec2from tabsdatak.conn.localfile import LocalFileSrc, SrcFileFormat3from tabsdatak.tableframe.grok import ColumnDefinition4from tabsdatak.tableframe.datatypes import String, Int32, Int645 6PATTERN = (7  r"%{IPV4:client_ip} "8  r"%{USER:ident} "9  r"%{USER:auth} "10  r"\[%{HTTPDATE:timestamp}\] "11  r'"%{WORD:method} '12  r'%{URIPATHPARAM:request} '13  r'HTTP/%{NUMBER:http_version}" '14  r"%{INT:response_code} %{INT:bytes}"15)16 17SCHEMA = {18  "client_ip": ColumnDefinition("ip_address", String),19  "method": ColumnDefinition("http_method", String),20  "response_code": ColumnDefinition("status_code", Int32),21  "bytes": ColumnDefinition("response_bytes", Int64),22  "timestamp": ColumnDefinition("request_time", String),23}24 25 26@publisher(27  source=LocalFileSrc(1      paths=["access.log"],29      format=SrcFileFormat.CSV,30      format_cfg={31          SrcFileFormat.CSV: {"has_header": False, "separator": "\\x00"},32      },33  ),2  output_tables=["access_logs"],35)3def read_access_logs(lines):37  if lines is None:38      return (None,)4  return (lines[0].grok("column_0", PATTERN, SCHEMA),)
```

-   Local file path to read. Its single element maps to the function argument on line 36.
    
-   Tabsdata table the parsed rows are written to, matching the value returned on line 39.
    
-   Raw log lines read from the file, represented as a Python function argument.
    
-   Grok parses the text column into typed columns using PATTERN and SCHEMA, and the result is returned as the output table.
    

lines

| column\_0 |
| --- |
| 203.0.113.10 - - \[10/Oct/2026:13:55:01 +0000\] "GET /index.html HTTP/1.1" 200 512 |

1 row

access\_logs

| ip\_addressstr | http\_methodstr | status\_codei32 | response\_bytesi64 | request\_timestr |
| --- | --- | --- | --- | --- |
| 203.0.113.10 | GET | 200 | 512 | 10/Oct/2026:13:55:01 +0000 |

1 row

Step 4Register the publisher into the collection

```bash
tdk fn register --coll log_src --path read_access_logs.py::read_access_logs
```

## Trigger the publisher function

Step 5Trigger the publisher

```bash
tdk fn trigger --coll log_src --name read_access_logs
```

Step 6Inspect the resulting table

```bash
tdk table list --coll log_src
tdk table data --coll log_src --name access_logs
```

access\_logs

Tabsdata›Collections›log\_src›access\_logs

### Schema

Table schema defines the structure of a table by listing its columns and their data types.

| Object | Type |
| --- | --- |
| ip\_address | str |
| http\_method | str |
| status\_code | i32 |
| response\_bytes | i64 |
| request\_time | str |
