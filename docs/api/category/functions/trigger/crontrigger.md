# CronTrigger

> Fire on a cron schedule.

Source: https://docs.tabsdata.com/api/category/functions/trigger/crontrigger

class

```python
class CronTrigger(mask: CronMaskSpec)
```

Bases: [Trigger](https://docs.tabsdata.com/api/category/functions/trigger/trigger)

**Categories:** trigger

Fire on a cron schedule.

## Parameters

parameter

`mask`[CronMaskSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.CronMaskSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str))

A Kubernetes CronJob schedule: five fields, one of `@yearly`, `@annually`, `@monthly`, `@weekly`, `@daily`, `@midnight`, `@hourly`, or `@every <duration>`. Always UTC.
