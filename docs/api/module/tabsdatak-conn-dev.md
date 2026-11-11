# tabsdatak.conn.dev

> tabsdatak.conn.dev API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-dev

|  |  |
| --- | --- |
| [`Data`](https://docs.tabsdata.com/api/category/connectors/source/data) | One dataframe emitted by `DataGenSrc` or `DevFrameSrc`, optionally chunked. |
| [`DataGenSrc`](https://docs.tabsdata.com/api/category/connectors/source/datagensrc) | Source emitting in-line dataframes for `@publisher` -- one slot per `Data`. |
| [`DataGenSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/datagensrcconn) | Connection for `DataGenSrc` -- no configuration. |
| [`DevFrameDest`](https://docs.tabsdata.com/api/category/connectors/destination/devframedest) | Destination reporting the `LazyFrame`\\ s a `@subscriber` hands it -- it writes no data. |
| [`DevFrameDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/devframedestconn) | Connection for `DevFrameDest` -- the folder its reports go to. |
| [`DevFrameSrc`](https://docs.tabsdata.com/api/category/connectors/source/devframesrc) | Source emitting in-line dataframes for `@publisher` as `LazyFrame`\\ s -- one slot per `Data`. |
| [`DevFrameSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/devframesrcconn) | Connection for `DevFrameSrc` -- no configuration. |
| [`TrashDest`](https://docs.tabsdata.com/api/category/connectors/destination/trashdest) | Destination that discards the frame for `@subscriber` -- a sink to nowhere. |
| [`TrashDestConn`](https://docs.tabsdata.com/api/category/connectors/destination/trashdestconn) | Connection for `TrashDest` -- no configuration. |
