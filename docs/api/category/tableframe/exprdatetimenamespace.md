# ExprDateTimeNameSpace

> Date and time methods, accessed via `Expr.dt`.

Source: https://docs.tabsdata.com/api/category/tableframe/exprdatetimenamespace

class

```python
class ExprDateTimeNameSpace
```

**Categories:** date

Date and time methods, accessed via `Expr.dt`.

## Examples

```python
tf.with_columns(col("ts").dt.year().alias("year"))
```

## Methods

method

`add_business_days`

```python
def add_business_days(
    n: int | IntoExpr,
    *,
    week_mask: Iterable[bool] = (True, True, True, True, True, False, False),
    holidays: Iterable[Any] | Expr = (),
    roll: Roll = 'raise',
) -> Expr
```

Shift a date or datetime by `n` business days.

**Parameters:**

parameter

`n`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExpr ([int](https://docs.python.org/3/library/functions.html#int) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None)

Number of business days to add; negative subtracts.

parameter

`week_mask`[Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[[bool](https://docs.python.org/3/builtins/functions.html#bool)\]

Seven booleans, Monday to Sunday, marking which weekdays count as business days.

parameter

`holidays`[Iterable](https://docs.python.org/3/library/typing.html#typing.Iterable)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Dates to skip in addition to non-business weekdays.

parameter

`roll`Roll (Literal\['raise', 'forward', 'backward'\])

How to handle a non-business start date: `raise`, `forward` or `backward`.

**Example:**

```python
tf.with_columns(col("d").dt.add_business_days(3).alias("due"))
```

A start date that is not a business day raises unless `roll` says which way to move it first:

```python
tf.with_columns(col("d").dt.add_business_days(3, roll="forward"))
```

method

`truncate`

```python
def truncate(every: str | Expr) -> Expr
```

Truncate each datetime down to a multiple of an interval.

**Parameters:**

parameter

`every`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Interval to truncate to, e.g. `1mo`, `1w`, `1d`, `1h` or `15m`.

**Example:**

```python
col("ts").dt.truncate("1mo")  # -> first day of the month
```

method

`replace`

```python
def replace(
    *,
    year: int | IntoExpr | None = None,
    month: int | IntoExpr | None = None,
    day: int | IntoExpr | None = None,
    hour: int | IntoExpr | None = None,
    minute: int | IntoExpr | None = None,
    second: int | IntoExpr | None = None,
    microsecond: int | IntoExpr | None = None,
    ambiguous: Ambiguous | Expr = 'raise',
) -> Expr
```

Replace individual date or time components with new values.

Each component left as `None` is kept unchanged.

**Parameters:**

parameter

`year`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExpr | None ([int](https://docs.python.org/3/library/functions.html#int) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | None)

New year value.

parameter

`month`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExpr | None ([int](https://docs.python.org/3/library/functions.html#int) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | None)

New month value (1 to 12).

parameter

`day`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExpr | None ([int](https://docs.python.org/3/library/functions.html#int) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | None)

New day of month (1 to 31).

parameter

`hour`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExpr | None ([int](https://docs.python.org/3/library/functions.html#int) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | None)

New hour (0 to 23).

parameter

`minute`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExpr | None ([int](https://docs.python.org/3/library/functions.html#int) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | None)

New minute (0 to 59).

parameter

`second`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExpr | None ([int](https://docs.python.org/3/library/functions.html#int) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | None)

New second (0 to 59).

parameter

`microsecond`[int](https://docs.python.org/3/builtins/functions.html#int) | IntoExpr | None ([int](https://docs.python.org/3/library/functions.html#int) | [int](https://docs.python.org/3/library/functions.html#int) | [float](https://docs.python.org/3/library/functions.html#float) | [Decimal](https://docs.tabsdata.com/api/module/tabsdatak-tableframe-datatypes#tabsdatak.tableframe.datatypes.Decimal) | [date](https://docs.python.org/3/library/datetime.html#datetime.date) | [time](https://docs.python.org/3/library/datetime.html#datetime.time) | [datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) | [timedelta](https://docs.python.org/3/library/datetime.html#datetime.timedelta) | [str](https://docs.python.org/3/library/stdtypes.html#str) | [bool](https://docs.python.org/3/library/functions.html#bool) | [bytes](https://docs.python.org/3/library/stdtypes.html#bytes) | [list](https://docs.python.org/3/library/stdtypes.html#list)\[[Any](https://docs.python.org/3/library/typing.html#typing.Any)\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) | [str](https://docs.python.org/3/library/stdtypes.html#str) | None | None)

New microsecond.

parameter

`ambiguous`Ambiguous | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) (Literal\['earliest', 'latest', 'raise', 'null'\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr))

Policy for ambiguous local times: `earliest`, `latest`, `raise` or `null`.

**Example:**

```python
tf.select(col("ts").dt.replace(day=1).alias("first_of_month"))
```

method

`combine`

```python
def combine(time: Expr, time_unit: TimeUnit = 'us') -> Expr
```

Combine the date part with a time into a datetime.

**Parameters:**

parameter

`time`[Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Time or expression to attach to each date.

parameter

`time_unit`TimeUnit (Literal\['ns', 'us', 'ms'\])

Resolution of the result: `ns`, `us` or `ms`.

**Example:**

```python
tf.select(col("ts").dt.combine(time(9, 0)).alias("opening"))
```

method

`to_string`

```python
def to_string(format: str | None = None) -> Expr
```

Format each temporal value as a string.

**Parameters:**

parameter

`format`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

chrono-style format string (e.g. `%Y-%m-%d`); defaults to ISO 8601 when omitted.

**Example:**

```python
tf.select(col("ts").dt.to_string("%Y-%m-%d").alias("day"))
```

method

`strftime`

```python
def strftime(format: str) -> Expr
```

Format each temporal value as a string using `format`.

**Parameters:**

parameter

`format`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

chrono-style format string, e.g. `%Y-%m-%d %H:%M:%S`.

**Example:**

```python
tf.select(col("ts").dt.strftime("%H:%M").alias("clock"))
```

method

`millennium`

```python
def millennium() -> Expr
```

Extract the millennium of each date.

**Example:**

```python
tf.select(col("d").dt.millennium().alias("millennium"))
```

method

`century`

```python
def century() -> Expr
```

Extract the century of each date.

**Example:**

```python
tf.select(col("d").dt.century().alias("century"))
```

method

`year`

```python
def year() -> Expr
```

Extract the year of each date.

**Example:**

```python
tf.group_by(col("d").dt.year().alias("year")).len()
```

method

`is_leap_year`

```python
def is_leap_year() -> Expr
```

Return whether each year is a leap year.

**Example:**

```python
tf.filter(col("d").dt.is_leap_year())
```

method

`iso_year`

```python
def iso_year() -> Expr
```

Extract the ISO 8601 year of each date.

**Example:**

```python
tf.select(col("d").dt.iso_year().alias("iso_year"))
```

method

`quarter`

```python
def quarter() -> Expr
```

Extract the quarter of each date (1 to 4).

**Example:**

```python
tf.group_by(col("d").dt.quarter().alias("quarter")).len()
```

method

`month`

```python
def month() -> Expr
```

Extract the month of each date (1 to 12).

**Example:**

```python
tf.select(col("d").dt.month().alias("month"))
```

method

`week`

```python
def week() -> Expr
```

Extract the ISO 8601 week number of each date (1 to 53).

**Example:**

```python
tf.select(col("d").dt.week().alias("week"))
```

method

`weekday`

```python
def weekday() -> Expr
```

Extract the ISO weekday (1 for Monday to 7 for Sunday).

**Example:**

```python
tf.filter(col("d").dt.weekday() <= 5)  # weekdays only
```

method

`day`

```python
def day() -> Expr
```

Extract the day of the month (1 to 31).

**Example:**

```python
tf.select(col("d").dt.day().alias("day"))
```

method

`ordinal_day`

```python
def ordinal_day() -> Expr
```

Extract the day of the year (1 to 366).

**Example:**

```python
tf.select(col("d").dt.ordinal_day().alias("day_of_year"))
```

method

`time`

```python
def time() -> Expr
```

Extract the time component of each datetime.

**Example:**

```python
tf.select(col("ts").dt.time().alias("time"))
```

method

`date`

```python
def date() -> Expr
```

Extract the date component of each datetime.

**Example:**

```python
tf.select(col("ts").dt.date().alias("date"))
```

method

`hour`

```python
def hour() -> Expr
```

Extract the hour of each datetime (0 to 23).

**Example:**

```python
tf.filter(col("ts").dt.hour() >= 12)  # afternoon rows
```

method

`minute`

```python
def minute() -> Expr
```

Extract the minute of each datetime (0 to 59).

**Example:**

```python
tf.select(col("ts").dt.minute().alias("minute"))
```

method

`second`

```python
def second(*, fractional: bool = False) -> Expr
```

Extract the second of each datetime (0 to 59).

**Parameters:**

parameter

`fractional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, include the sub-second fraction.

**Example:**

```python
tf.select(col("ts").dt.second().alias("second"))
```

`fractional=True` folds the sub-second part into the result:

```python
tf.select(col("ts").dt.second(fractional=True).alias("second"))
```

method

`millisecond`

```python
def millisecond() -> Expr
```

Extract the millisecond of each datetime.

**Example:**

```python
tf.select(col("ts").dt.millisecond().alias("ms"))
```

method

`microsecond`

```python
def microsecond() -> Expr
```

Extract the microsecond of each datetime.

**Example:**

```python
tf.select(col("ts").dt.microsecond().alias("us"))
```

method

`nanosecond`

```python
def nanosecond() -> Expr
```

Extract the nanosecond of each datetime.

**Example:**

```python
tf.select(col("ts").dt.nanosecond().alias("ns"))
```

method

`epoch`

```python
def epoch(time_unit: EpochTimeUnit = 'us') -> Expr
```

Return time since the Unix epoch in the given unit.

**Parameters:**

parameter

`time_unit`EpochTimeUnit (Literal\['ns', 'us', 'ms', 's', 'd'\])

Output unit: `ns`, `us`, `ms`, `s` or `d`.

**Example:**

```python
tf.select(col("ts").dt.epoch("s").alias("unix_seconds"))
```

method

`timestamp`

```python
def timestamp(time_unit: TimeUnit = 'us') -> Expr
```

Return the timestamp of each datetime in the given unit.

**Parameters:**

parameter

`time_unit`TimeUnit (Literal\['ns', 'us', 'ms'\])

Output unit: `ns`, `us` or `ms`.

**Example:**

```python
tf.select(col("ts").dt.timestamp("ms").alias("stamp"))
```

method

`cast_time_unit`

```python
def cast_time_unit(time_unit: TimeUnit) -> Expr
```

Cast to a different time unit, converting the values.

**Parameters:**

parameter

`time_unit`TimeUnit (Literal\['ns', 'us', 'ms'\])

Target unit: `ns`, `us` or `ms`.

**Example:**

```python
tf.select(col("ts").dt.cast_time_unit("ms"))
```

method

`convert_time_zone`

```python
def convert_time_zone(time_zone: str) -> Expr
```

Convert to another time zone, keeping the same instant.

**Parameters:**

parameter

`time_zone`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Target IANA time zone, e.g. `America/New_York`.

**Example:**

```python
tf.select(
    col("ts")
    .dt.replace_time_zone("UTC")
    .dt.convert_time_zone("Europe/Madrid")
)
```

method

`replace_time_zone`

```python
def replace_time_zone(
    time_zone: str | None,
    *,
    ambiguous: Ambiguous | Expr = 'raise',
    non_existent: NonExistent = 'raise',
) -> Expr
```

Set the time zone without shifting the instant.

**Parameters:**

parameter

`time_zone`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | None

Target IANA time zone, or `None` to make the value time-zone-naive.

parameter

`ambiguous`Ambiguous | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr) (Literal\['earliest', 'latest', 'raise', 'null'\] | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr))

Policy for ambiguous local times: `earliest`, `latest`, `raise` or `null`.

parameter

`non_existent`NonExistent (Literal\['raise', 'null'\])

Policy for non-existent local times: `raise` or `null`.

**Example:**

```python
tf.with_columns(col("ts").dt.replace_time_zone("UTC"))
```

method

`total_days`

```python
def total_days(*, fractional: bool = False) -> Expr
```

Total number of days in each duration.

**Parameters:**

parameter

`fractional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, include the fractional remainder.

**Example:**

```python
tf.select(col("dur").dt.total_days().alias("days"))
```

method

`total_hours`

```python
def total_hours(*, fractional: bool = False) -> Expr
```

Total number of hours in each duration.

**Parameters:**

parameter

`fractional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, include the fractional remainder.

**Example:**

```python
tf.select(col("dur").dt.total_hours().alias("hours"))
```

method

`total_minutes`

```python
def total_minutes(*, fractional: bool = False) -> Expr
```

Total number of minutes in each duration.

**Parameters:**

parameter

`fractional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, include the fractional remainder.

**Example:**

```python
tf.select(col("dur").dt.total_minutes().alias("minutes"))
```

method

`total_seconds`

```python
def total_seconds(*, fractional: bool = False) -> Expr
```

Total number of seconds in each duration.

**Parameters:**

parameter

`fractional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, include the fractional remainder.

**Example:**

```python
tf.select(col("dur").dt.total_seconds().alias("seconds"))
```

`fractional=True` keeps the remainder instead of truncating:

```python
tf.select(col("dur").dt.total_seconds(fractional=True))
```

method

`total_milliseconds`

```python
def total_milliseconds(*, fractional: bool = False) -> Expr
```

Total number of milliseconds in each duration.

**Parameters:**

parameter

`fractional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, include the fractional remainder.

**Example:**

```python
tf.select(col("dur").dt.total_milliseconds().alias("ms"))
```

method

`total_microseconds`

```python
def total_microseconds(*, fractional: bool = False) -> Expr
```

Total number of microseconds in each duration.

**Parameters:**

parameter

`fractional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, include the fractional remainder.

**Example:**

```python
tf.select(col("dur").dt.total_microseconds().alias("us"))
```

method

`total_nanoseconds`

```python
def total_nanoseconds(*, fractional: bool = False) -> Expr
```

Total number of nanoseconds in each duration.

**Parameters:**

parameter

`fractional`[bool](https://docs.python.org/3/builtins/functions.html#bool)

If `True`, include the fractional remainder.

**Example:**

```python
tf.select(col("dur").dt.total_nanoseconds().alias("ns"))
```

method

`offset_by`

```python
def offset_by(by: str | Expr) -> Expr
```

Shift each datetime by a duration offset.

**Parameters:**

parameter

`by`[str](https://docs.python.org/3/builtins/stdtypes.html#str) | [Expr](https://docs.tabsdata.com/api/category/tableframe/tableframe/expr)

Offset duration, e.g. `1mo`, `1d` or `-2h`; a negative value shifts backwards.

**Example:**

```python
col("ts").dt.offset_by("1d")  # add one day
```

method

`month_start`

```python
def month_start() -> Expr
```

Return the first day of the month for each date.

**Example:**

```python
tf.select(col("d").dt.month_start().alias("first_day"))
```

method

`month_end`

```python
def month_end() -> Expr
```

Return the last day of the month for each date.

**Example:**

```python
tf.select(col("d").dt.month_end().alias("last_day"))
```

method

`base_utc_offset`

```python
def base_utc_offset() -> Expr
```

Return the base UTC offset, excluding daylight saving.

**Example:**

```python
tf.select(
    col("ts")
    .dt.replace_time_zone("Europe/Madrid")
    .dt.base_utc_offset()
)
```

method

`dst_offset`

```python
def dst_offset() -> Expr
```

Return the additional daylight-saving offset.

**Example:**

```python
tf.select(
    col("ts")
    .dt.replace_time_zone("Europe/Madrid")
    .dt.dst_offset()
)
```
