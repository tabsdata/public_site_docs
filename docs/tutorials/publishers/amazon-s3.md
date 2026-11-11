# Publish data from Amazon S3

> Publish data from Amazon S3 into Tabsdata with S3Src publishers, covering bucket connection setup, glob paths like trips_*.parquet, multiple files, and the format option.

Source: https://docs.tabsdata.com/tutorials/publishers/amazon-s3

Before you begin

[Quickstart a Server](https://docs.tabsdata.com/server-admin/quickstart) or [Start a Server](https://docs.tabsdata.com/server-admin/start)

[Configure Your AI Agent](https://docs.tabsdata.com/guide/connect-agent)

## Ingest objects from a bucket

warning

There are several ways to pass secrets into Tabsdata. See [Secrets Management](https://docs.tabsdata.com/guide/secrets-management/) for more info if you are planning to have an LLM register secrets into Tabsdata's credential store.

AI agent session

❯Can you publish trips.parquet out of amazon s3

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The S3 publisher guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   bucket
-   region
-   AWS keys

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Both keys found. Reading back what is not secret: bucket my-bucket, region us-east-1, collection s3\_src.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **s3\_src** created from it in group `sources` with `base_path` `/data`. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `s3_src`:

```python
@publisher(
  source=S3Src(paths=["trips.parquet"]),
  output_tables=["trips"],
)
def read_trips(trips: TableFramesSpec) -> TableFrameSpec:
  return trips[0]
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

**s3\_src/trips** is live, holds 1,000,000 rows across 21 columns:

```
┌──────────────────┬──────────────┐
│      field       │    value     │
├──────────────────┼──────────────┤
│ collection       │ s3_src       │
├──────────────────┼──────────────┤
│ table            │ trips        │
├──────────────────┼──────────────┤
│ rows             │ 1,000,000    │
├──────────────────┼──────────────┤
│ columns          │ 21           │
├──────────────────┼──────────────┤
│ function version │ fv20260813-1 │
├──────────────────┼──────────────┤
│ execution        │ ep20260813-1 │
└──────────────────┴──────────────┘
```

AI agent session

❯Can you publish departments.csv, employees.parquet and salaries.csv out of amazon s3, each into its own table

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The S3 publisher guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   bucket
-   region
-   AWS keys

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Both keys found. Reading back what is not secret: bucket my-bucket, region us-east-1, collection s3\_src.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **s3\_src** created from it in group `sources` with `base_path` `/data`. Connection check passed.

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `s3_src`:

```python
@publisher(
  source=S3Src(paths=["departments.csv", "employees.parquet", "salaries.csv"]),
  output_tables=["departments", "employees", "salaries"],
)
def read_hr(
  departments: TableFramesSpec,
  employees: TableFramesSpec,
  salaries: TableFramesSpec,
) -> tuple[TableFrameSpec, TableFrameSpec, TableFrameSpec]:
  return (departments[0], employees[0], salaries[0])
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

Three tables are live in **s3\_src**, one per path:

```
┌─────────────┬───────────────────┬───────┬─────────┐
│    table    │       from        │ rows  │ columns │
├─────────────┼───────────────────┼───────┼─────────┤
│ departments │ departments.csv   │ 14    │ 3       │
├─────────────┼───────────────────┼───────┼─────────┤
│ employees   │ employees.parquet │ 1,204 │ 11      │
├─────────────┼───────────────────┼───────┼─────────┤
│ salaries    │ salaries.csv      │ 1,204 │ 5       │
└─────────────┴───────────────────┴───────┴─────────┘
```

AI agent session

❯Can you publish every monthly trips file out of amazon s3 into one table

Listed 1 directory, called tabsdata 3 times (ctrl+o to expand)

⏺

The S3 publisher guide and connection template are loaded. Four values left, then I generate and register. Reply with them one per line, or point me at a file that has them:

-   collection name
-   bucket
-   region
-   AWS keys

❯everything you need is in 

Read 1 file, called tabsdata 2 times (ctrl+o to expand)

⏺

Both keys found. Reading back what is not secret: bucket my-bucket, region us-east-1, collection s3\_src.

Called tabsdata 4 times (ctrl+o to expand)

⏺

Connection written to , and collection **s3\_src** created from it in group `sources` with `base_path` `/data`. Connection check passed. `trips_*.parquet` matches 3 objects under `/data`:

-   trips\_2026\_01.parquet
-   trips\_2026\_02.parquet
-   trips\_2026\_03.parquet

Called tabsdata 2 times (ctrl+o to expand)

⏺

The publisher, registered in `s3_src`:

```python
@publisher(
  source=S3Src(paths=["trips_*.parquet"]),
  output_tables=["trips"],
)
def read_trips(trips: TableFramesSpec) -> TableFrameSpec:
  return concat(trips)
```

Called tabsdata 6 times (ctrl+o to expand)

⏺

Execution committed, 0 failures.

⏺

**s3\_src/trips** is live, one table holding the 3 files the glob matched:

```
┌───────────────────────┬───────────┐
│     matched file      │   rows    │
├───────────────────────┼───────────┤
│ trips_2026_01.parquet │ 412,900   │
├───────────────────────┼───────────┤
│ trips_2026_02.parquet │ 388,140   │
├───────────────────────┼───────────┤
│ trips_2026_03.parquet │ 441,022   │
├───────────────────────┼───────────┤
│ s3_src/trips          │ 1,242,062 │
└───────────────────────┴───────────┘
```

note

Files of different formats in one `paths` list need no extra configuration. `AUTO` reads each file's extension separately, so a `.csv` and a `.parquet` in the same publisher both land correctly.

The case that does need work is objects whose extensions do not say what they are. `format` is one override for the whole source rather than one per path, so setting it reads every path as that format. Files that genuinely differ and cannot be recognised by name have to be split across publishers, one per format.
