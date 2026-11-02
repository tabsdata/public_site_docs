# Errors

Source: https://docs.tabsdata.com/api/category/errors/error/

|  |  |
| --- | --- |
| [`ApiErrorCode`](https://docs.tabsdata.com/api/category/errors/error/apierrorcode) | Error codes for the framework API (`tabsdatak.api` / `tabsdatak.spi`). |
| [`ApiException`](https://docs.tabsdata.com/api/category/errors/error/apiexception) | Top-level exception for the framework API. |
| [`ApiInitException`](https://docs.tabsdata.com/api/category/errors/error/apiinitexception) | An API object could not be created (attribute type/value issue). |
| [`ApiInternalException`](https://docs.tabsdata.com/api/category/errors/error/apiinternalexception) | An internal API error -- a bug. |
| [`ApiRuntimeException`](https://docs.tabsdata.com/api/category/errors/error/apiruntimeexception) | An API object is invalid due to runtime conditions (e.g. |
| [`ConstraintError`](https://docs.tabsdata.com/api/category/errors/error/constrainterror) | A field-value rule failure, carrying the `ErrorCode` describing it. |
| [`ErrorCode`](https://docs.tabsdata.com/api/category/errors/error/errorcode) | Abstract base for connector error-code enums. |
| [`ErrorDef`](https://docs.tabsdata.com/api/category/errors/error/errordef) | Static description of one error site: the exception class to raise plus a `str.format_map` message template. |
| [`TabsdataException`](https://docs.tabsdata.com/api/category/errors/error/tabsdataexception) | Base class for every framework error. |
