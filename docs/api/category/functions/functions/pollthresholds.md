# PollThresholds

> How a stream publisher polls its source: `max_secs` is the budget of one ingestion iteration, `idle_secs` the wait before the next one when the iteration read nothing.

Source: https://docs.tabsdata.com/api/category/functions/functions/pollthresholds

class

```python
class PollThresholds(max_secs: BatchSecondsSpec, idle_secs: BatchSecondsSpec)
```

**Categories:** functions

How a stream publisher polls its source: `max_secs` is the budget of one ingestion iteration, `idle_secs` the wait before the next one when the iteration read nothing.

## Parameters

parameter

`max_secs`[BatchSecondsSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BatchSecondsSpec) ([int](https://docs.python.org/3/library/functions.html#int))

parameter

`idle_secs`[BatchSecondsSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.BatchSecondsSpec) ([int](https://docs.python.org/3/library/functions.html#int))
