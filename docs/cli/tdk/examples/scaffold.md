# tdk examples scaffold

> Write the skeleton of a publisher, transformer or subscriber.

Source: https://docs.tabsdata.com/cli/tdk/examples/scaffold

Write the skeleton of a publisher, transformer or subscriber.

The source or destination is built from the installed connector, with '<value>' placeholders for the values it needs; the function never names a connection, since the collection's connection is used on the server. Needs no server

```bash
tdk examples scaffold \
  --format table \
  --browse \
  --wrap \
  --max-width max_width-example \
  --kind kind-example \
  --connector connector-example \
  --name quickstart \
  --input input-example \
  --output output-example \
  --file data.csv \
  --list-connectors \
  --profile production
```

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `-o, --format` | table \| json \| yaml | Optional | Output format. 'json' and 'yaml' give a listing as an array and table data as one object per row. |
| `--browse, --print` | flag | Optional | Open the table in a viewer that scrolls both ways, or print it and return. |
| `--wrap` | flag | Optional | Show every value whole, wrapping long and multi-line values inside their column instead of cutting them. |
| `--max-width` | string | Optional | Maximum width of each column, in characters; longer values are cut and end in '…'. Use 0 for no limit. Defaults to the width each table sets. |
| `--kind` | string | Optional | Kind of function. Defaults to the kind the '--connector' binds. |
| `--connector` | string | Optional | Connector type the publisher reads or the subscriber writes, e.g. 'mysql-sql-in'. List them with '--list-connectors'. |
| `--name, -n` | string | Optional | Name of the Python function. |
| `--input` | string | Optional | Input table ('collection/table', or 'table' in its own collection); repeatable. Transformers and subscribers only. |
| `--output` | string | Optional | Output table; repeatable. Publishers and transformers only. |
| `--file, -f` | string | Optional | Path to write the module to; it must not exist. Printed if not given. |
| `--list-connectors` | flag | Optional | List the connector types a function can bind to, and exit. |
| `--profile` | string | Optional | Profile whose login and pinned project and collection this command uses; with no NAME, the default profile. Default: the profile set with 'tdk set --profile', else the default profile. |
