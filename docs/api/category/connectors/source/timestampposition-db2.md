# TimestampPosition

> CDC start position given as a wall-clock timestamp.

Source: https://docs.tabsdata.com/api/category/connectors/source/timestampposition-db2

class

```python
class TimestampPosition(ts: datetime)
```

**Categories:** source

CDC start position given as a wall-clock timestamp.

A `start_from` value resolved once to the earliest commit sequence whose `IBMSNAP_LOGMARKER` is at or after `ts` (a lookup in `ASN.IBMSNAP_UOW`); per-table marks then advance independently.

## Parameters

parameter

`ts`[datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime)

Wall-clock cut-off. Tz-aware datetimes are honoured; naive datetimes are interpreted in the Db2 server's timezone.
