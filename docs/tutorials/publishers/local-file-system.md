# Publish data from local files

> Shows how to publish a local CSV file as a Tabsdata table by defining a LocalFileSrcConn connection with base_path, a publisher with LocalFileSrc source, and output_tables, and verifying the result.

Source: https://docs.tabsdata.com/tutorials/publishers/local-file-system

AI agent session

❯Can you make a table 'persons' that ingests ~/data/people/people.csv

Listed 1 directory, called tabsdata (ctrl+o to expand)

⏺

CSV has 3 columns (first\_name, last\_name, age) and 2 data rows. In Tabsdata a table is the output of a publisher function, so I need to register one. Getting the publisher types.

Called tabsdata (ctrl+o to expand)

⏺

Needs a LocalFile connection first. `LocalFileSrc` paths are relative to a connection's `base_path`. Getting both guides.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Writing the connection to , then creating a source collection from it, pointed at the data directory.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Registering the publisher that produces **persons**.

```python
@publisher(
  source=LocalFileSrc(paths=["people.csv"], format=SrcFileFormat.CSV),
  output_tables=["persons"],
)
def ingest_persons(rows: TableFramesSpec) -> TableFrameSpec:
  return rows[0] if rows else None
```

Called tabsdata 2 times (ctrl+o to expand)

⏺

Registered and committed. Verifying the rows landed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

**persons** is live with both rows:

```
┌────────────┬───────────┬─────┐
│ first_name │ last_name │ age │
├────────────┼───────────┼─────┤
│ Ada        │ Lovelace  │ 36  │
├────────────┼───────────┼─────┤
│ Grace      │ Hopper    │ 45  │
└────────────┴───────────┴─────┘
```

⏺

What got built, in order:

1.  Source collection `local_files` in group `sources`, carrying a `LocalFileSrcConn` with `base_path` set to the data directory. Connection check passed.
2.  Publisher `ingest_persons`, output table `persons`.
3.  One execution, committed, 0 failures.

⏺

Two things worth knowing:

-   A table cannot exist on its own in Tabsdata, it is the output of a function. So `persons` came with a publisher attached, not as a standalone object.
-   `persons` landed in `local_files` rather than in a collection you already had, because a connection-backed publisher is registered in its own source collection. Getting the data into another collection is a transformer reading `local_files/persons`.
