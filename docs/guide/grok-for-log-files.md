# Grok for Log Files

> Grok method of TableFrame parses string columns into typed columns using Grok patterns and a ColumnDefinition schema, with predefined patterns, repeated captures, and null handling for non-matching rows.

Source: https://docs.tabsdata.com/guide/grok-for-log-files

**Grok** parses lines of text, such as the lines of a log file, into typed columns. The `grok` method of a TableFrame matches a Grok pattern against a string column and appends one column for each capture listed in a schema.

Grok is usually applied in the Publisher that reads the log file, so the Table it writes is already structured. Because `grok` is a TableFrame method, it can also be used in a Transformer on a Table that holds raw text.

For a full walkthrough that reads a log file and publishes the parsed rows, see [Publish data from log files with Grok](https://docs.tabsdata.com/tutorials/publishers/grok-for-log-files).

## Parsing a column

`grok` takes three arguments:

-   The name of the string column to parse, or an expression that resolves to one
-   A Grok pattern whose named captures become the new columns
-   A schema that maps each capture name to a `ColumnDefinition`

```python
from tabsdatak.tableframe.grok import ColumnDefinition
from tabsdatak.tableframe.datatypes import String, Int32, Int64

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
    "client_ip": ColumnDefinition("ip_address", String),
    "method": ColumnDefinition("http_method", String),
    "response_code": ColumnDefinition("status_code", Int32),
    "bytes": ColumnDefinition("response_bytes", Int64),
    "timestamp": ColumnDefinition("request_time", String),
}

parsed = lines.grok("column_1", PATTERN, SCHEMA)
```

lines

| column\_1 |
| --- |
| 203.0.113.10 - - \[10/Oct/2026:13:55:01 +0000\] "GET /index.html HTTP/1.1" 200 512 |
| not a log line |

2 rows

parsed

| column\_1str | ip\_addressstr | http\_methodstr | status\_codei32 | response\_bytesi64 | request\_timestr |
| --- | --- | --- | --- | --- | --- |
| 203.0.113.10 - - \[10/Oct/2026:13:55:01 +0000\] "GET /index.html HTTP/1.1" 200 512 | 203.0.113.10 | GET | 200 | 512 | 10/Oct/2026:13:55:01 +0000 |
| not a log line | null | null | null | null | null |

2 rows

The result keeps every existing column and follows these rules:

-   One column is added for each entry in the schema, in schema order.
-   Captures that are not in the schema are not added. The pattern above captures `ident`, `auth`, `request`, and `http_version`, but none of them become columns.
-   The captured text is cast to the `dtype` in the capture's `ColumnDefinition`.
-   A row whose text does not match the pattern gets `null` in every new column, so a malformed line never fails the Function.

## Patterns

A capture is written as `%{PATTERN:capture}`, where `PATTERN` is a predefined pattern name and `capture` is the name the schema refers to. Text between captures must match literally, so characters that have a meaning in regular expressions, such as `[` and `]`, are escaped with a backslash.

The full capture syntax is `%{name:alias:extract:definition}`:

-   **name**: a predefined pattern name, such as `IPV4`, `WORD`, or `INT`
-   **alias**: the capture name
-   **extract**: reserved for future use
-   **definition**: a regular expression, required when no predefined `name` is given

Tabsdata includes 320 predefined patterns from the Elasticsearch Grok pattern library. Commonly used patterns for log files include:

| Pattern | Matches |
| --- | --- |
| `IPV4` | An IPv4 address |
| `WORD` | A single word |
| `INT` | An integer |
| `NUMBER` | An integer or decimal number |
| `TIMESTAMP_ISO8601` | An ISO 8601 timestamp |
| `HTTPDATE` | A timestamp in web server access log format |
| `LOGLEVEL` | A log level, such as `INFO` or `ERROR` |
| `UUID` | A UUID |
| `URI` | A URI |
| `DATA` | Any text, matching as little as possible |
| `GREEDYDATA` | Any text, matching as much as possible |
| `COMBINEDAPACHELOG` | A full Apache combined log line |
| `SYSLOGBASE` | The header of a syslog line |

## Schema

The schema is a dictionary keyed by capture name. Each value is a `ColumnDefinition` from `tabsdatak.tableframe.grok` with two fields:

-   **name**: the name of the new column. `None` keeps the capture name, and any other value renames the column.
-   **dtype**: the data type the captured text is cast to, from `tabsdatak.tableframe.datatypes`. Defaults to `String`.

```python
from tabsdatak.tableframe.grok import ColumnDefinition
from tabsdatak.tableframe.datatypes import String

PATTERN = r"%{TIMESTAMP_ISO8601:ts} %{LOGLEVEL:level} %{WORD:service}: %{GREEDYDATA:message}"

SCHEMA = {
    "ts": ColumnDefinition(None, String),
    "level": ColumnDefinition("level", String),
    "service": ColumnDefinition("service", String),
    "message": ColumnDefinition("message", String),
}
```

## Repeated captures

When a pattern uses the same capture name more than once, each repeat is numbered: the first keeps the name, and later ones get a `[1]`, `[2]`, … suffix. The schema refers to repeats by those numbered names.

```python
from tabsdatak.tableframe.grok import ColumnDefinition
from tabsdatak.tableframe.datatypes import String, Int64

PATTERN = r"%{WORD:city}-%{INT:year} to %{WORD:city}-%{INT:year}"

SCHEMA = {
    "city": ColumnDefinition("from_city", String),
    "city[1]": ColumnDefinition("to_city", String),
    "year[1]": ColumnDefinition("to_year", Int64),
}
```

The `grok_fields` helper lists the capture names a pattern produces, which is useful for building the schema of a long pattern:

```python
from tabsdata.expansions.tableframe.features.grok.engine import grok_fields

grok_fields(r"%{WORD:city}-%{INT:year} to %{WORD:city}-%{INT:year}")
# ['city', 'city[1]', 'year', 'year[1]']
```
