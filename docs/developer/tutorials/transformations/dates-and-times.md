# Transform Dates and Times

Source: https://docs.tabsdata.com/developer/tutorials/transformations/dates-and-times

The `.dt` namespace provides datetime manipulation functions.

## Extracting Components

Date components

year.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.year()
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 2024 |
| 2024 |

2 rows

Month of the year, 1 to 12.

month.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.month()
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 3 |
| 11 |

2 rows

Day of the month, 1 to 31.

day.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.day()
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 15 |
| 1 |

2 rows

Quarter of the year, 1 to 4.

quarter.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.quarter()
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 1 |
| 4 |

2 rows

ISO week number.

week.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.week()
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 11 |
| 44 |

2 rows

0 = Monday

weekday.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.weekday()  # 0 = Monday
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 4 |
| 4 |

2 rows

Day of year (1-366)

ordinal\_day.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.ordinal_day()  # Day of year (1-366)
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 75 |
| 306 |

2 rows

True when the date falls in a leap year.

is\_leap\_year.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.is_leap_year()
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| true |
| true |

2 rows

Time components

hour.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.hour()
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

result

| timestamp |
| --- |
| 9 |
| 23 |

2 rows

Minute past the hour, 0 to 59.

minute.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.minute()
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

result

| timestamp |
| --- |
| 42 |
| 5 |

2 rows

Second past the minute, 0 to 59.

second.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.second()
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

result

| timestamp |
| --- |
| 17 |
| 0 |

2 rows

Milliseconds past the second.

millisecond.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.millisecond()
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17.123456 |
| 2024-11-01 23:05:00.000900 |

2 rows

result

| timestamp |
| --- |
| 123 |
| 0 |

2 rows

Microseconds past the second.

microsecond.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.microsecond()
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17.123456 |
| 2024-11-01 23:05:00.000900 |

2 rows

result

| timestamp |
| --- |
| 123456 |
| 900 |

2 rows

Nanoseconds past the second.

nanosecond.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.nanosecond()
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17.123456 |
| 2024-11-01 23:05:00.000900 |

2 rows

result

| timestamp |
| --- |
| 123456000 |
| 900000 |

2 rows

ISO calendar

iso\_year.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.iso_year()
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 2024 |
| 2024 |

2 rows

## Date Arithmetic

Add 1 week

offset\_by.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.offset_by("1w")  # Add 1 week
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 2024-03-22 |
| 2024-11-08 |

2 rows

Subtract 3 days

offset\_by.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.offset_by("-3d")  # Subtract 3 days
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 2024-03-12 |
| 2024-10-29 |

2 rows

Add 2 months

offset\_by.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.offset_by("2mo")  # Add 2 months
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 2024-05-15 |
| 2025-01-01 |

2 rows

Business days

add\_business\_days.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.add_business_days(5)
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 2024-03-22 |
| 2024-11-08 |

2 rows

First day of month

month\_start.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.month_start()  # First day of month
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 2024-03-01 |
| 2024-11-01 |

2 rows

Last day of month

month\_end.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.month_end()  # Last day of month
    return tf.with_columns(expr)
```

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| date |
| --- |
| 2024-03-31 |
| 2024-11-30 |

2 rows

## Truncation

Truncate to hour

truncate.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.truncate("1h")  # Truncate to hour
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

result

| timestamp |
| --- |
| 2024-03-15 09:00:00 |
| 2024-11-01 23:00:00 |

2 rows

Truncate to day

truncate.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.truncate("1d")  # Truncate to day
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

result

| timestamp |
| --- |
| 2024-03-15 00:00:00 |
| 2024-11-01 00:00:00 |

2 rows

Truncate to month

truncate.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.truncate("1mo")  # Truncate to month
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

result

| timestamp |
| --- |
| 2024-03-01 00:00:00 |
| 2024-11-01 00:00:00 |

2 rows

Truncate to week

truncate.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.truncate("1w")  # Truncate to week
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

result

| timestamp |
| --- |
| 2024-03-11 00:00:00 |
| 2024-10-28 00:00:00 |

2 rows

## Total Durations

Convert duration to total units

total\_days.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["spans"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("duration").dt.total_days()
    return tf.with_columns(expr)
```

spans

| duration |
| --- |
| 2d 03:00:00 |
| 0d 05:30:00 |

2 rows

result

| duration |
| --- |
| 2 |
| 0 |

2 rows

The whole duration expressed in hours, not the hour part of it.

total\_hours.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["spans"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("duration").dt.total_hours()
    return tf.with_columns(expr)
```

spans

| duration |
| --- |
| 2d 03:00:00 |
| 0d 05:30:00 |

2 rows

result

| duration |
| --- |
| 51 |
| 5 |

2 rows

The whole duration expressed in minutes.

total\_minutes.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["spans"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("duration").dt.total_minutes()
    return tf.with_columns(expr)
```

spans

| duration |
| --- |
| 2d 03:00:00 |
| 0d 05:30:00 |

2 rows

result

| duration |
| --- |
| 3060 |
| 330 |

2 rows

The whole duration expressed in seconds.

total\_seconds.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["spans"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("duration").dt.total_seconds()
    return tf.with_columns(expr)
```

spans

| duration |
| --- |
| 2d 03:00:00 |
| 0d 05:30:00 |

2 rows

result

| duration |
| --- |
| 183600 |
| 19800 |

2 rows

The whole duration expressed in milliseconds.

total\_milliseconds.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["spans"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("duration").dt.total_milliseconds()
    return tf.with_columns(expr)
```

spans

| duration |
| --- |
| 2d 03:00:00 |
| 0d 05:30:00 |

2 rows

result

| duration |
| --- |
| 183600000 |
| 19800000 |

2 rows

The whole duration expressed in microseconds.

total\_microseconds.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["spans"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("duration").dt.total_microseconds()
    return tf.with_columns(expr)
```

spans

| duration |
| --- |
| 2d 03:00:00 |
| 0d 05:30:00 |

2 rows

result

| duration |
| --- |
| 183600000000 |
| 19800000000 |

2 rows

## Timezone Operations

Convert timezone

convert\_time\_zone.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.convert_time_zone("America/New_York")
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 14:00:00 UTC |
| 2024-11-01 14:00:00 UTC |

2 rows

result

| timestamp |
| --- |
| 2024-03-15 10:00:00 EDT |
| 2024-11-01 10:00:00 EDT |

2 rows

Replace timezone (without conversion)

replace\_time\_zone.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.replace_time_zone("UTC")
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 14:00:00 |
| 2024-11-01 14:00:00 |

2 rows

result

| timestamp |
| --- |
| 2024-03-15 14:00:00 UTC |
| 2024-11-01 14:00:00 UTC |

2 rows

Get timezone offsets

base\_utc\_offset.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.base_utc_offset()
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 10:00:00 EDT |
| 2024-01-15 10:00:00 EST |

2 rows

result

| timestamp |
| --- |
| \-5h |
| \-5h |

2 rows

The daylight-saving part of the offset, zero outside summer time.

dst\_offset.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.dst_offset()
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 10:00:00 EDT |
| 2024-01-15 10:00:00 EST |

2 rows

result

| timestamp |
| --- |
| 1h |
| 0h |

2 rows

## Formatting

Format as string

to\_string.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("date").dt.to_string("%Y-%m-%d")
    return tf.with_columns(expr)
```

events

| dateDate |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

result

| dateString |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

Format a timestamp as text using strftime codes.

strftime.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.strftime("%Y-%m-%d %H:%M:%S")
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

result

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

Seconds since epoch

epoch.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.epoch(time_unit="s")  # Seconds since epoch
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

result

| timestamp |
| --- |
| 1710495737 |
| 1730502300 |

2 rows

Microseconds since epoch

timestamp.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["events"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("timestamp").dt.timestamp()  # Microseconds since epoch
    return tf.with_columns(expr)
```

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

result

| timestamp |
| --- |
| 1710495737000000 |
| 1730502300000000 |

2 rows

See [TableFrame API Guide](https://docs.tabsdata.com/developer/guide/tables) for the whole API in one place.
