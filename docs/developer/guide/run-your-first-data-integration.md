# Run Your First Data Integration

Source: https://docs.tabsdata.com/developer/guide/run-your-first-data-integration

Before you start

Finish [Install Tabsdata](https://docs.tabsdata.com/developer/guide/install) first, and make sure the server is running.

This quickstart deploys and runs Tabsdata with the CLI, no LLM required. To build the same workflow with an AI agent instead, switch to the agentic doc mirror.

We will be building a Tabsdata Workflow that:

1.  ingests a `persons.csv` file on your local file system into a Tabsdata table called `persons`
2.  builds a second table called `people` that drops the `age` column and adds a `full_name` column
3.  writes the `people` table back to your file system as `people.jsonl`

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

Step 1Download the Example Folder

```bash
tdk examples extract --name quickstart-dev --dir qs-example
```

persons.csv

input.py

transform.py

output.py

conn-input.yaml

conn-output.yaml

README.txt

This creates a `qs-example/` folder with three functions:

1.  `input.py` (publisher `qs_pub`),
2.  `transform.py` (transformer `qs_tfr`)
3.  `output.py` (subscriber `qs_sub`).

It also includes two connection files,

1.  `conn-input.yaml`
2.  `conn-output.yaml`

Step 2Create the Tabsdata Project

This creates a project in your Instance and pins it so we don't have to explicitly specify the project name in future steps.

```bash
tdk project create --name quickstart-dev
tdk set --proj quickstart-dev
```

Step 3Create the Tabsdata Collections

We need to create a collection for each of our three Tabsdata Functions.

Since the Publisher and Subscriber functions interface with your local file system, their collections require `.yaml` connection files to be passed as a flag in the command.

```bash
tdk collection create --name input    --group sources      --conn-file qs-example/conn-input.yaml
tdk collection create --name dataprod --group default
tdk collection create --name output   --group destinations --conn-file qs-example/conn-output.yaml
```

Step 4Register the functions

The publisher is registered to the `input` collection, the transformer is registered to the `dataprod` collection, and the subscriber is registered to the `output` collection

```bash
tdk fn register --coll input    --path qs-example/input.py::qs_pub
tdk fn register --coll dataprod --path qs-example/transform.py::qs_tfr
tdk fn register --coll output   --path qs-example/output.py::qs_sub
```

Step 5Trigger the workflow

Triggering the publisher function `qs_pub` automatically triggers the transformer `qs_tfr` and subscriber `qs_sub`.

```bash
tdk fn trigger --coll input --name qs_pub
```

persons.csv

people.jsonl

input.py

transform.py

output.py

conn-input.yaml

conn-output.yaml

README.txt

Triggering the publisher executes the ingestion of data from `persons.csv` into the `persons` Tabsdata table. The transformer and subscriber detect new data in the table and also execute.

The workflow is finished when transformed data is written into `people.jsonl` within `qs-example/output-data/`.

Step 6Open the UI

Go to [http://localhost:2457](http://localhost:2457) and log in with `admin` / `tabsdata`. You'll see your project, its collections, and the tables the flow just produced.
