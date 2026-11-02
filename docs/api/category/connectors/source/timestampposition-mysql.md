# TimestampPosition

> CDC start position given as a wall-clock timestamp.

Source: https://docs.tabsdata.com/api/category/connectors/source/timestampposition-mysql

class

```python
class TimestampPosition(ts: datetime)
```

**Categories:** source

CDC start position given as a wall-clock timestamp.

A `start_from` value resolved to the first binlog event at or after `ts`.

## Parameters

parameter

`ts`[datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime)

Wall-clock cut-off. Tz-aware datetimes are honoured; naive datetimes are interpreted in the MySQL server's timezone.
