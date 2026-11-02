# Transform Dates and Times

> Extracts date and time components, shifts dates, truncates timestamps, converts durations to totals, handles time zones, and formats dates with dt accessors in Tabsdata.

Source: https://docs.tabsdata.com/tutorials/transformations/dates-and-times

## Pull a component out

AI agent session

❯make a new table that takes the events table and extracts the year from the date column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.year()` returns the year as an integer. Every component accessor lives under `dt`.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_year"],
)
def get_year(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.year()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_year is live — the year as an integer:

```
┌──────┐
│ date │
├──────┤
│ 2024 │
├──────┤
│ 2024 │
└──────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_year

| date |
| --- |
| 2024 |
| 2024 |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the month number from the date column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.month()` returns 1 to 12, not a month name.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_month"],
)
def get_month(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.month()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_month is live — the month number:

```
┌──────┐
│ date │
├──────┤
│ 3    │
├──────┤
│ 11   │
└──────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_month

| date |
| --- |
| 3 |
| 11 |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the day of the month from the date column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.day()` returns the day within the month, 1 to 31.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_day"],
)
def get_day(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.day()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_day is live — the day of the month:

```
┌──────┐
│ date │
├──────┤
│ 15   │
├──────┤
│ 1    │
└──────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_day

| date |
| --- |
| 15 |
| 1 |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the calendar quarter from the date column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.quarter()` returns 1 to 4 on calendar quarters, not on a fiscal year.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_quarter"],
)
def get_quarter(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.quarter()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_quarter is live — the calendar quarter:

```
┌──────┐
│ date │
├──────┤
│ 1    │
├──────┤
│ 4    │
└──────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_quarter

| date |
| --- |
| 1 |
| 4 |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the ISO week number from the date column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.week()` is the ISO week number, which is why early January can land in week 52 of the previous year.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_week"],
)
def get_week(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.week()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_week is live — the ISO week number:

```
┌──────┐
│ date │
├──────┤
│ 11   │
├──────┤
│ 44   │
└──────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_week

| date |
| --- |
| 11 |
| 44 |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the weekday from the date column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.weekday()` is 0-based from Monday, so Monday is 0 and Sunday is 6.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_weekday"],
)
def get_weekday(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.weekday()  # 0 = Monday
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_weekday is live — the weekday, Monday being 0:

```
┌──────┐
│ date │
├──────┤
│ 4    │
├──────┤
│ 4    │
└──────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_weekday

| date |
| --- |
| 4 |
| 4 |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the day of the year from the date column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.ordinal_day()` counts 1 to 366 from the start of the year.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_day_of_year"],
)
def get_ordinal_day(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.ordinal_day()  # Day of year (1-366)
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_day\_of\_year is live — the day of the year:

```
┌──────┐
│ date │
├──────┤
│ 75   │
├──────┤
│ 306  │
└──────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_day\_of\_year

| date |
| --- |
| 75 |
| 306 |

2 rows

AI agent session

❯make a new table that takes the events table and flags whether the date column falls in a leap year

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.is_leap_year()` returns a Boolean rather than a number.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_leap"],
)
def flag_leap_year(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.is_leap_year()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_leap is live — true where the year is a leap year:

```
┌──────┐
│ date │
├──────┤
│ true │
├──────┤
│ true │
└──────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_leap

| date |
| --- |
| true |
| true |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the hour from the timestamp column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.hour()` on a Datetime, returning 0 to 23. A Date column has no hour to give.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_hour"],
)
def get_hour(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.hour()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_hour is live — the hour, 0 to 23:

```
┌───────────┐
│ timestamp │
├───────────┤
│ 9         │
├───────────┤
│ 23        │
└───────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

events\_hour

| timestamp |
| --- |
| 9 |
| 23 |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the minute from the timestamp column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.minute()`, 0 to 59.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_minute"],
)
def get_minute(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.minute()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_minute is live — the minute:

```
┌───────────┐
│ timestamp │
├───────────┤
│ 42        │
├───────────┤
│ 5         │
└───────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

events\_minute

| timestamp |
| --- |
| 42 |
| 5 |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the second from the timestamp column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.second()`, 0 to 59, with no fractional part.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_second"],
)
def get_second(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.second()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_second is live — the whole second:

```
┌───────────┐
│ timestamp │
├───────────┤
│ 17        │
├───────────┤
│ 0         │
└───────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

events\_second

| timestamp |
| --- |
| 17 |
| 0 |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the millisecond from the timestamp column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.millisecond()`, the sub-second part in thousandths.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_millisecond"],
)
def get_millisecond(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.millisecond()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_millisecond is live — the millisecond component:

```
┌───────────┐
│ timestamp │
├───────────┤
│ 123       │
├───────────┤
│ 0         │
└───────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17.123456 |
| 2024-11-01 23:05:00.000900 |

2 rows

events\_millisecond

| timestamp |
| --- |
| 123 |
| 0 |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the microsecond from the timestamp column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.microsecond()`, the sub-second part in millionths.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_microsecond"],
)
def get_microsecond(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.microsecond()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_microsecond is live — the microsecond component:

```
┌───────────┐
│ timestamp │
├───────────┤
│ 123456    │
├───────────┤
│ 900       │
└───────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17.123456 |
| 2024-11-01 23:05:00.000900 |

2 rows

events\_microsecond

| timestamp |
| --- |
| 123456 |
| 900 |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the nanosecond from the timestamp column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.nanosecond()`, the finest component available.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_nanosecond"],
)
def get_nanosecond(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.nanosecond()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_nanosecond is live — the nanosecond component:

```
┌───────────┐
│ timestamp │
├───────────┤
│ 123456000 │
├───────────┤
│ 900000    │
└───────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17.123456 |
| 2024-11-01 23:05:00.000900 |

2 rows

events\_nanosecond

| timestamp |
| --- |
| 123456000 |
| 900000 |

2 rows

AI agent session

❯make a new table that takes the events table and extracts the ISO year from the date column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.iso_year()` pairs with `dt.week()`, and it differs from the calendar year for a few days at each year boundary.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_iso_year"],
)
def get_iso_year(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.iso_year()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_iso\_year is live — the ISO year, which can differ from the calendar year:

```
┌──────┐
│ date │
├──────┤
│ 2024 │
├──────┤
│ 2024 │
└──────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_iso\_year

| date |
| --- |
| 2024 |
| 2024 |

2 rows

## Shift a date

AI agent session

❯make a new table that takes the events table and moves the date column a week later

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.offset_by("1w")` takes a duration string rather than a number, so the unit is explicit in the code.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_plus_week"],
)
def shift_week(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.offset_by("1w")  # Add 1 week
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_plus\_week is live — every date a week later:

```
┌────────────┐
│    date    │
├────────────┤
│ 2024-03-22 │
├────────────┤
│ 2024-11-08 │
└────────────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_plus\_week

| date |
| --- |
| 2024-03-22 |
| 2024-11-08 |

2 rows

AI agent session

❯make a new table that takes the events table and moves the date column 3 days earlier

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — a negative duration string, `"-3d"`, shifts backwards.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_minus_3d"],
)
def shift_back(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.offset_by("-3d")  # Subtract 3 days
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_minus\_3d is live — every date 3 days earlier:

```
┌────────────┐
│    date    │
├────────────┤
│ 2024-03-12 │
├────────────┤
│ 2024-10-29 │
└────────────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_minus\_3d

| date |
| --- |
| 2024-03-12 |
| 2024-10-29 |

2 rows

AI agent session

❯make a new table that takes the events table and moves the date column 2 months later

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `"2mo"` for months, since `"m"` means minutes. Month arithmetic clamps rather than overflowing, so the 31st plus a month lands on the last day of the shorter month.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_plus_2mo"],
)
def shift_months(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.offset_by("2mo")  # Add 2 months
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_plus\_2mo is live — every date 2 months later:

```
┌────────────┐
│    date    │
├────────────┤
│ 2024-05-15 │
├────────────┤
│ 2025-01-01 │
└────────────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_plus\_2mo

| date |
| --- |
| 2024-05-15 |
| 2025-01-01 |

2 rows

AI agent session

❯make a new table that takes the events table and moves the date column 5 business days later

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.add_business_days(5)` skips weekends rather than adding 5 calendar days.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_plus_5bd"],
)
def shift_business(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.add_business_days(5)
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_plus\_5bd is live — 5 business days later, weekends skipped:

```
┌────────────┐
│    date    │
├────────────┤
│ 2024-03-22 │
├────────────┤
│ 2024-11-08 │
└────────────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_plus\_5bd

| date |
| --- |
| 2024-03-22 |
| 2024-11-08 |

2 rows

AI agent session

❯make a new table that takes the events table and snaps the date column to the first of its month

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.month_start()`, which is the usual key for a monthly rollup.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_month_start"],
)
def snap_month_start(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.month_start()  # First day of month
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_month\_start is live — each date snapped to the first of its month:

```
┌────────────┐
│    date    │
├────────────┤
│ 2024-03-01 │
├────────────┤
│ 2024-11-01 │
└────────────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_month\_start

| date |
| --- |
| 2024-03-01 |
| 2024-11-01 |

2 rows

AI agent session

❯make a new table that takes the events table and snaps the date column to the last day of its month

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.month_end()`, which lands on 28, 29, 30 or 31 depending on the month.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_month_end"],
)
def snap_month_end(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.month_end()  # Last day of month
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_month\_end is live — each date snapped to its month end:

```
┌────────────┐
│    date    │
├────────────┤
│ 2024-03-31 │
├────────────┤
│ 2024-11-30 │
└────────────┘
```

Transformed tables

events

| date |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_month\_end

| date |
| --- |
| 2024-03-31 |
| 2024-11-30 |

2 rows

## Round a timestamp down

AI agent session

❯make a new table that takes the events table and truncates the timestamp column to the hour

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.truncate("1h")` zeroes everything finer than the hour. It rounds down always, unlike a round.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_by_hour"],
)
def truncate_hour(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.truncate("1h")  # Truncate to hour
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_by\_hour is live — minutes and seconds zeroed:

```
┌─────────────────────┐
│      timestamp      │
├─────────────────────┤
│ 2024-03-15 09:00:00 │
├─────────────────────┤
│ 2024-11-01 23:00:00 │
└─────────────────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

events\_by\_hour

| timestamp |
| --- |
| 2024-03-15 09:00:00 |
| 2024-11-01 23:00:00 |

2 rows

AI agent session

❯make a new table that takes the events table and truncates the timestamp column to the day

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.truncate("1d")` keeps the Datetime type with a zeroed time, rather than converting to a Date.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_by_day"],
)
def truncate_day(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.truncate("1d")  # Truncate to day
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_by\_day is live — the time zeroed, the type unchanged:

```
┌─────────────────────┐
│      timestamp      │
├─────────────────────┤
│ 2024-03-15 00:00:00 │
├─────────────────────┤
│ 2024-11-01 00:00:00 │
└─────────────────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

events\_by\_day

| timestamp |
| --- |
| 2024-03-15 00:00:00 |
| 2024-11-01 00:00:00 |

2 rows

AI agent session

❯make a new table that takes the events table and truncates the timestamp column to the month

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.truncate("1mo")` snaps to the first instant of the month.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_by_month"],
)
def truncate_month(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.truncate("1mo")  # Truncate to month
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_by\_month is live — snapped to the start of the month:

```
┌─────────────────────┐
│      timestamp      │
├─────────────────────┤
│ 2024-03-01 00:00:00 │
├─────────────────────┤
│ 2024-11-01 00:00:00 │
└─────────────────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

events\_by\_month

| timestamp |
| --- |
| 2024-03-01 00:00:00 |
| 2024-11-01 00:00:00 |

2 rows

AI agent session

❯make a new table that takes the events table and truncates the timestamp column to the week

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.truncate("1w")` snaps back to the Monday of that week.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_by_week"],
)
def truncate_week(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.truncate("1w")  # Truncate to week
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_by\_week is live — snapped back to Monday:

```
┌─────────────────────┐
│      timestamp      │
├─────────────────────┤
│ 2024-03-11 00:00:00 │
├─────────────────────┤
│ 2024-10-28 00:00:00 │
└─────────────────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

events\_by\_week

| timestamp |
| --- |
| 2024-03-11 00:00:00 |
| 2024-10-28 00:00:00 |

2 rows

## Express a duration as a number

AI agent session

❯make a new table that takes the spans table and expresses the duration column in days

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.total_days()` converts the whole duration to days rather than reading a days field, so 36 hours is 1.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["spans"],
  output_tables=["spans_days"],
)
def duration_days(spans: TableFrameSpec) -> TableFrameSpec:
  expr = col("duration").dt.total_days()
  return spans.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/spans\_days is live — each duration in whole days:

```
┌──────────┐
│ duration │
├──────────┤
│ 2        │
├──────────┤
│ 0        │
└──────────┘
```

Transformed tables

spans

| duration |
| --- |
| 2d 03:00:00 |
| 0d 05:30:00 |

2 rows

spans\_days

| duration |
| --- |
| 2 |
| 0 |

2 rows

AI agent session

❯make a new table that takes the spans table and expresses the duration column in hours

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.total_hours()`, the whole duration in hours.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["spans"],
  output_tables=["spans_hours"],
)
def duration_hours(spans: TableFrameSpec) -> TableFrameSpec:
  expr = col("duration").dt.total_hours()
  return spans.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/spans\_hours is live — each duration in whole hours:

```
┌──────────┐
│ duration │
├──────────┤
│ 51       │
├──────────┤
│ 5        │
└──────────┘
```

Transformed tables

spans

| duration |
| --- |
| 2d 03:00:00 |
| 0d 05:30:00 |

2 rows

spans\_hours

| duration |
| --- |
| 51 |
| 5 |

2 rows

AI agent session

❯make a new table that takes the spans table and expresses the duration column in minutes

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.total_minutes()`.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["spans"],
  output_tables=["spans_minutes"],
)
def duration_minutes(spans: TableFrameSpec) -> TableFrameSpec:
  expr = col("duration").dt.total_minutes()
  return spans.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/spans\_minutes is live — each duration in whole minutes:

```
┌──────────┐
│ duration │
├──────────┤
│ 3060     │
├──────────┤
│ 330      │
└──────────┘
```

Transformed tables

spans

| duration |
| --- |
| 2d 03:00:00 |
| 0d 05:30:00 |

2 rows

spans\_minutes

| duration |
| --- |
| 3060 |
| 330 |

2 rows

AI agent session

❯make a new table that takes the spans table and expresses the duration column in seconds

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.total_seconds()`, the most common one for a rate calculation.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["spans"],
  output_tables=["spans_seconds"],
)
def duration_seconds(spans: TableFrameSpec) -> TableFrameSpec:
  expr = col("duration").dt.total_seconds()
  return spans.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/spans\_seconds is live — each duration in whole seconds:

```
┌──────────┐
│ duration │
├──────────┤
│ 183600   │
├──────────┤
│ 19800    │
└──────────┘
```

Transformed tables

spans

| duration |
| --- |
| 2d 03:00:00 |
| 0d 05:30:00 |

2 rows

spans\_seconds

| duration |
| --- |
| 183600 |
| 19800 |

2 rows

AI agent session

❯make a new table that takes the spans table and expresses the duration column in milliseconds

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.total_milliseconds()`.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["spans"],
  output_tables=["spans_milliseconds"],
)
def duration_ms(spans: TableFrameSpec) -> TableFrameSpec:
  expr = col("duration").dt.total_milliseconds()
  return spans.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/spans\_milliseconds is live — each duration in milliseconds:

```
┌───────────┐
│ duration  │
├───────────┤
│ 183600000 │
├───────────┤
│ 19800000  │
└───────────┘
```

Transformed tables

spans

| duration |
| --- |
| 2d 03:00:00 |
| 0d 05:30:00 |

2 rows

spans\_milliseconds

| duration |
| --- |
| 183600000 |
| 19800000 |

2 rows

AI agent session

❯make a new table that takes the spans table and expresses the duration column in microseconds

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.total_microseconds()`, the finest of the total accessors.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["spans"],
  output_tables=["spans_microseconds"],
)
def duration_us(spans: TableFrameSpec) -> TableFrameSpec:
  expr = col("duration").dt.total_microseconds()
  return spans.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/spans\_microseconds is live — each duration in microseconds:

```
┌──────────────┐
│   duration   │
├──────────────┤
│ 183600000000 │
├──────────────┤
│ 19800000000  │
└──────────────┘
```

Transformed tables

spans

| duration |
| --- |
| 2d 03:00:00 |
| 0d 05:30:00 |

2 rows

spans\_microseconds

| duration |
| --- |
| 183600000000 |
| 19800000000 |

2 rows

## Work with time zones

AI agent session

❯make a new table that takes the events table and shows the timestamp column in America/New\_York

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.convert_time_zone()` keeps the same instant and changes how it reads, so the wall-clock digits move.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_ny"],
)
def to_new_york(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.convert_time_zone("America/New_York")
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_ny is live — the same instants read in New York time:

```
┌─────────────────────────┐
│        timestamp        │
├─────────────────────────┤
│ 2024-03-15 10:00:00 EDT │
├─────────────────────────┤
│ 2024-11-01 10:00:00 EDT │
└─────────────────────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 14:00:00 UTC |
| 2024-11-01 14:00:00 UTC |

2 rows

events\_ny

| timestamp |
| --- |
| 2024-03-15 10:00:00 EDT |
| 2024-11-01 10:00:00 EDT |

2 rows

AI agent session

❯make a new table that takes the events table and stamps the timestamp column as UTC without moving the instant

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.replace_time_zone()` is the opposite of convert: the digits stay and the instant moves. Reach for it when a column was stored without a zone and you know what it was.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_utc"],
)
def stamp_utc(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.replace_time_zone("UTC")
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_utc is live — the digits unchanged, the zone now UTC:

```
┌─────────────────────────┐
│        timestamp        │
├─────────────────────────┤
│ 2024-03-15 14:00:00 UTC │
├─────────────────────────┤
│ 2024-11-01 14:00:00 UTC │
└─────────────────────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 14:00:00 |
| 2024-11-01 14:00:00 |

2 rows

events\_utc

| timestamp |
| --- |
| 2024-03-15 14:00:00 UTC |
| 2024-11-01 14:00:00 UTC |

2 rows

AI agent session

❯make a new table that takes the events table and reads the base UTC offset of the timestamp column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.base_utc_offset()` gives the zone offset before any daylight saving is added.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_base_offset"],
)
def base_offset(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.base_utc_offset()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_base\_offset is live — the standard offset from UTC:

```
┌───────────┐
│ timestamp │
├───────────┤
│ -5h       │
├───────────┤
│ -5h       │
└───────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 10:00:00 EDT |
| 2024-01-15 10:00:00 EST |

2 rows

events\_base\_offset

| timestamp |
| --- |
| \-5h |
| \-5h |

2 rows

AI agent session

❯make a new table that takes the events table and reads the daylight saving offset of the timestamp column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.dst_offset()` gives only the daylight saving part, so it is zero outside summer time. Add it to the base offset for the total.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_dst_offset"],
)
def dst_offset(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.dst_offset()
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_dst\_offset is live — the daylight saving part alone:

```
┌───────────┐
│ timestamp │
├───────────┤
│ 1h        │
├───────────┤
│ 0h        │
└───────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 10:00:00 EDT |
| 2024-01-15 10:00:00 EST |

2 rows

events\_dst\_offset

| timestamp |
| --- |
| 1h |
| 0h |

2 rows

## Format and convert

AI agent session

❯make a new table that takes the events table and formats the date column as text in YYYY-MM-DD

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.to_string()` with a format string. This turns the column into text, so no further date operations will work on it.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_formatted"],
)
def format_date(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("date").dt.to_string("%Y-%m-%d")
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_formatted is live — the date rendered as text:

```
┌────────────┐
│    date    │
├────────────┤
│ 2024-03-15 │
├────────────┤
│ 2024-11-01 │
└────────────┘
```

Transformed tables

events

| dateDate |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

events\_formatted

| dateString |
| --- |
| 2024-03-15 |
| 2024-11-01 |

2 rows

AI agent session

❯make a new table that takes the events table and formats the timestamp column as text with the time included

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.strftime()` takes the same format codes and is the name to reach for out of habit; both produce text.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_formatted"],
)
def format_timestamp(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.strftime("%Y-%m-%d %H:%M:%S")
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_formatted is live — the timestamp rendered as text:

```
┌─────────────────────┐
│      timestamp      │
├─────────────────────┤
│ 2024-03-15 09:42:17 │
├─────────────────────┤
│ 2024-11-01 23:05:00 │
└─────────────────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

events\_formatted

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

AI agent session

❯make a new table that takes the events table and converts the timestamp column to seconds since the epoch

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.epoch(time_unit="s")` counts from 1970-01-01, and the unit is explicit so you are not guessing at the scale.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_epoch"],
)
def to_epoch(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.epoch(time_unit="s")  # Seconds since epoch
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_epoch is live — seconds since 1970-01-01:

```
┌────────────┐
│ timestamp  │
├────────────┤
│ 1710495737 │
├────────────┤
│ 1730502300 │
└────────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

events\_epoch

| timestamp |
| --- |
| 1710495737 |
| 1730502300 |

2 rows

AI agent session

❯make a new table that takes the events table and converts the timestamp column to microseconds since the epoch

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `dt.timestamp()` defaults to microseconds, which is the difference from `epoch()` where you name the unit.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["events"],
  output_tables=["events_micros"],
)
def to_micros(events: TableFrameSpec) -> TableFrameSpec:
  expr = col("timestamp").dt.timestamp()  # Microseconds since epoch
  return events.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/events\_micros is live — microseconds since 1970-01-01:

```
┌──────────────────┐
│    timestamp     │
├──────────────────┤
│ 1710495737000000 │
├──────────────────┤
│ 1730502300000000 │
└──────────────────┘
```

Transformed tables

events

| timestamp |
| --- |
| 2024-03-15 09:42:17 |
| 2024-11-01 23:05:00 |

2 rows

events\_micros

| timestamp |
| --- |
| 1710495737000000 |
| 1730502300000000 |

2 rows
