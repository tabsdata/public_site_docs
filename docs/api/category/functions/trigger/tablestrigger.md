# TablesTrigger

> Fire on a new version of any of the named tables.

Source: https://docs.tabsdata.com/api/category/functions/trigger/tablestrigger

class

```python
class TablesTrigger(tables: CollTableNamesSpec)
```

Bases: [Trigger](https://docs.tabsdata.com/api/category/functions/trigger/trigger)

**Categories:** trigger

Fire on a new version of any of the named tables.

## Parameters

parameter

`tables`[CollTableNamesSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.CollTableNamesSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[str](https://docs.python.org/3/library/stdtypes.html#str)\])

`[collection/]table` references to watch; they need not be inputs of the function. An empty list never fires: the function runs only when run manually.
