# Trigger

> Abstract base for the trigger family.

Source: https://docs.tabsdata.com/api/category/functions/trigger/trigger

class

```python
class Trigger
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC), `DescriptorBase`

**Categories:** trigger

Abstract base for the trigger family.

Concrete triggers ([`CronTrigger`](https://docs.tabsdata.com/api/category/functions/trigger/crontrigger), [`TablesTrigger`](https://docs.tabsdata.com/api/category/functions/trigger/tablestrigger), [`AllTablesTrigger`](https://docs.tabsdata.com/api/category/functions/trigger/alltablestrigger)) live on a function's `trigger_by` argument and control _when_ the runtime fires it. Any function can also be run manually, whatever its trigger.
