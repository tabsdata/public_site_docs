# ApiErrorCode

> Error codes for the framework API (`tabsdatak.api` / `tabsdatak.spi`).

Source: https://docs.tabsdata.com/api/category/errors/error/apierrorcode

class

```python
class ApiErrorCode(
    API_1 = ErrorDef(ApiInternalException, 'Cannot create Trigger'),
    API_2 = ErrorDef(ApiInitException, 'Cannot create CronTrigger'),
    API_3 = ErrorDef(ApiInitException, 'Cannot create TablesTrigger'),
    API_4 = ErrorDef(ApiInternalException, 'Cannot create AllTablesTrigger'),
    API_5 = ErrorDef(ApiInitException, 'Secret value must be a string, got {type}'),
    API_11 = ErrorDef(ApiInternalException, 'Secret {name}, missing secret resolution '),
    API_14 = ErrorDef(ApiInitException, 'Cannot create SrcDef'),
    API_15 = ErrorDef(ApiInitException, 'Cannot create streamSrcDef'),
    API_16 = ErrorDef(ApiInitException, 'Cannot create DestDef'),
    API_17 = ErrorDef(ApiInternalException, '@publisher validation failed'),
    API_18 = ErrorDef(ApiInternalException, '@stream_publisher validation failed'),
    API_19 = ErrorDef(ApiInternalException, '@transformer validation failed'),
    API_20 = ErrorDef(ApiInternalException, '@subscriber validation failed'),
    API_21 = ErrorDef(ApiInitException, 'Cannot create StageManifestEntry'),
    API_22 = ErrorDef(ApiInitException, 'Cannot create TableFileInput'),
    API_23 = ErrorDef(ApiInitException, 'Cannot create Entity'),
    API_24 = ErrorDef(ApiInitException, 'not a valid table name (1-64 chars, must start with a letter, alphanumeric and underscore only): {value!r}'),
    API_25 = ErrorDef(ApiInitException, 'not a valid collection-qualified table name (<identifier> or <identifier>/<identifier>, no whitespace): {value!r}'),
    API_26 = ErrorDef(ApiInitException, 'not a valid collection-qualified table reference ([<collection>/]<table>[@<versions>], with <versions> a single version, a <version>..<version> range, the special range NEW or a comma-separated list, and a version HEAD / INITIAL with an optional ^ or ~N offset, or a fixed id): {value!r}'),
    API_27 = ErrorDef(ApiInitException, 'not a Kubernetes CronJob schedule (5 whitespace-separated fields, or one of @yearly / @annually / @monthly / @weekly / @daily / @midnight / @hourly): {value!r}'),
    API_28 = ErrorDef(ApiInitException, 'invalid cron expression: {value!r}'),
    API_29 = ErrorDef(ApiInitException, '@stream_publisher thresholds validation failed'),
    API_30 = ErrorDef(ApiInitException, 'flush_interval_mins is deprecated and cannot be given together with the batch thresholds; set batch_max_secs instead of flush_interval_mins'),
)
```

Bases: [ErrorCode](https://docs.tabsdata.com/api/category/errors/error/errorcode)

**Categories:** error

Error codes for the framework API (`tabsdatak.api` / `tabsdatak.spi`).

One variant per validation site; each binds an `Api*Exception` and a message template. Raise via `ApiErrorCode.API_N.exception`.

## Parameters

parameter

`API_1`

parameter

`API_2`

parameter

`API_3`

parameter

`API_4`

parameter

`API_5`

parameter

`API_11`

parameter

`API_14`

parameter

`API_15`

parameter

`API_16`

parameter

`API_17`

parameter

`API_18`

parameter

`API_19`

parameter

`API_20`

parameter

`API_21`

parameter

`API_22`

parameter

`API_23`

parameter

`API_24`

parameter

`API_25`

parameter

`API_26`

parameter

`API_27`

parameter

`API_28`

parameter

`API_29`

parameter

`API_30`
