# Run Your First Data Integration

> Quickstart that has an LLM agent via Tabsdata MCP build and run a workflow: CSV publisher, age-dropping transformer adding full_name, and JSONL subscriber to local files.

Source: https://docs.tabsdata.com/guide/run-your-first-data-integration

Before you start

Finish [Install Tabsdata](https://docs.tabsdata.com/guide/install) and [Connect to MCP](https://docs.tabsdata.com/guide/connect-agent) first, and make sure the server is running.

This quickstart uses the Tabsdata MCP integration. To deploy and run Tabsdata without an LLM, switch to the developer doc mirror.

We will be building a Tabsdata Workflow that:

1.  ingests a local `persons.csv` into a Tabsdata table called `persons`
2.  builds a second table called `people` that drops the `age` column and adds a `full_name` column
3.  writes `people` back to your file system as `people.jsonl`

Click any node for what it does

Local File

Local File

Publisher

qs\_pub

Pending

Table

persons

Pending

Transformer

qs\_tfr

Pending

Table

people

Pending

Subscriber

qs\_sub

Pending

Local File

Local File

Not written yet

Step 1Get the example project

```bash
tdk examples extract --name quickstart-ai --dir qs-example
```

persons.csv

conn-input.yaml

conn-output.yaml

README.txt

Creates `qs-example/`, which contains the source data `persons.csv` and two connection files.

Step 2Login to Tabsdata and start your LLM

Log in, then start your agent from the same terminal:

-   Claude Code
-   Codex

```bash
tdk login --server localhost --user admin --password tabsdata
claude
```

```bash
tdk login --server localhost --user admin --password tabsdata
codex
```

Step 3Prompt your LLM to build a Tabsdata workflow

Give the following prompt to your LLM:

```bash
Build a tabsdata workflow that
1. ingests `qs-example/input-data/persons.csv`
2. creates a new column for the full name and drops the age column,
3. writes the result as a .jsonl to the `output-data` folder

More info can be found under `qs-example/README.md`
```

AI agent session

❯Build a tabsdata workflow that 1. ingests `qs-example/input-data/persons.csv` 2. creates a new column for the full name and drops the age column, 3. writes the result as a .jsonl to the `output-data` folder More info can be found under `qs-example/README.md`

Read 1 file, listed 1 directory (ctrl+o to expand)

⏺

persons.csv has first\_name, last\_name and age. Three functions cover this: a publisher for the CSV, a transformer for the column changes, and a subscriber for the .jsonl. Getting the connection and publisher guides.

Called tabsdata 3 times (ctrl+o to expand)

⏺

Writing , then a source collection pointed at input-data.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Registering the publisher that produces **persons**.

```python
@publisher(
  source=LocalFileSrc(paths=["persons.csv"], format=SrcFileFormat.CSV),
  output_tables=["persons"],
)
def ingest_persons(rows: TableFramesSpec) -> TableFrameSpec:
  return rows[0] if rows else None
```

Called tabsdata 2 times (ctrl+o to expand)

⏺

Registered and committed. Now the transformer — full\_name from first\_name and last\_name, age dropped.

```python
@transformer(
  input_tables=["persons"],
  output_tables=["people"],
)
def build_people(persons: TableFrameSpec) -> TableFrameSpec:
  return persons.with_columns(
      (col("first_name") + " " + col("last_name")).alias("full_name"),
  ).drop("first_name", "last_name", "age")
```

Called tabsdata 2 times (ctrl+o to expand)

⏺

Registered and committed. Last, the subscriber writing people out as .jsonl. Getting the connection and subscriber guides.

Called tabsdata 3 times (ctrl+o to expand)

⏺

Writing , then a destination collection pointed at output-data.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Registering the subscriber.

```python
@subscriber(
  tables=["people"],
  destination=LocalFileDst(path="people.jsonl", format=DstFileFormat.NDJSON),
)
def export_people(people: TableFrameSpec) -> None:
  pass
```

Called tabsdata 3 times (ctrl+o to expand)

⏺

Registered. The publisher's commit triggered the transformer, which triggered the subscriber, all in one execution plan — committed, 0 failures.

⏺

**people.jsonl** is live in `qs-example/output-data/`:

```
┌──────────────┐
│  full_name   │
├──────────────┤
│ Ada Lovelace │
├──────────────┤
│ Grace Hopper │
└──────────────┘
```

Step 4Check Workflow Execution

persons.csv

people.jsonl

conn-input.yaml

conn-output.yaml

README.txt

After your LLM finishes processing your request, you should have a new `people.jsonl` file in the `qs-example/output-data/` folder.

Step 5Open the UI

Go to [http://localhost:2457](http://localhost:2457) and log in with `admin` / `tabsdata`. You'll see your project, its collections, and the tables the flow just produced.
