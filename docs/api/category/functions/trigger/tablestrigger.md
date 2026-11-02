# TablesTrigger

> Fire when one of a named set of upstream tables produces a new batch.

Source: https://docs.tabsdata.com/api/category/functions/trigger/tablestrigger

class

```python
class TablesTrigger(tables: CollTableNamesSpec)
```

Bases: [Trigger](https://docs.tabsdata.com/api/category/functions/trigger/trigger)

**Categories:** trigger

Fire when one of a named set of upstream tables produces a new batch.

## Parameters

parameter

`tables`[CollTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.CollTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

`collection/table` references to watch.
