# tabsdatak.conn.dev

> tabsdatak.conn.dev API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-dev

|  |  |
| --- | --- |
| [`Data`](https://docs.tabsdata.com/api/category/connectors/source/data) | One dataframe emitted by `DataGenSrc`, optionally chunked. |
| [`DataGenSrc`](https://docs.tabsdata.com/api/category/connectors/source/datagensrc) | Source emitting in-line dataframes for `@publisher` -- one slot per `Data`. |
| [`DataGenSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/datagensrcconn) | Connection for `DataGenSrc` -- no configuration. |
| [`TrashDest`](https://docs.tabsdata.com/api/category/connectors/destination/trashdest) | Destination that discards the frame for `@subscriber` -- a sink to nowhere. |
| [`TrashDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/trashdestconn) | Connection for `TrashDest` -- no configuration. |
