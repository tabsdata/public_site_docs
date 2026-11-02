# Living Semantic Catalog

> How Tabsdata builds a catalog of what every connected source and destination holds, keeps it current as those systems change, and how agents use it.

Source: https://docs.tabsdata.com/developer/guide/living-semantic-catalog

The **living semantic catalog** is the record the Tabsdata Server keeps of what every connected source and destination holds and how that data can be used. Each source and destination collection has an entry in it: the entities its connection exposes, their fields, and an AI-generated classification of the data.

Tabsdata builds the catalog on its own. Soon after a source or destination collection is created, the server connects to the external system, fetches its metadata, and classifies what it found. The catalog is living because it follows the external systems: when their metadata changes, the connection is classified again, so nobody curates the catalog by hand and it reflects what the systems contain as of the last refresh.

Agents connected to Tabsdata read the catalog when a user asks them to publish from or subscribe to an external system, and use it to tell the user what data is there and how to use it.

_Video: A source collection named crm is created from the CLI with a PostgreSQL connection document, the server probes that connection, reads five tables into the living semantic catalog with a schema fingerprint, and the classifier labels the data as confidential finance data. The next metadata poll finds a new refunds table, the fingerprint changes, and the connection is classified again in full._

## How the Catalog Is Built

Creating a source or destination collection with its connection starts the process. Nothing else is needed from the user.

1.  Soon after the collection is created, the server runs a probe against the external system with the collection's connection. The probe first checks that the system can be reached with the credentials the connection holds.
2.  The probe then reads the system's own metadata: the entities it holds, such as tables, reports, files, objects, or topics, and the fields of each entity. Tabsdata stores the entities with their names and fields, and a fingerprint of the whole schema. Data is not copied into the catalog.
3.  The server's classifier sends the entity list and the collection's description to the configured AI model, together with a few sample rows when the server allows sampling (`catalog.maintenance_samples`). The model's answer is recorded as the connection's [classification](#classification).
4.  The entities and their classification become the connection's entry in the catalog, searchable by keyword and by meaning.

The probe repeats on a schedule, and the classification is redone whenever the metadata the probe finds has changed. See [Keeping It Current](#keeping-it-current).

## What Is Fetched From Each System

The probe reads the metadata the external system already keeps about itself, through the same connector that later moves the data. Each entity is stored with its fully qualified name, its kind, and its fields, plus details that depend on the system.

| System | Entities | Recorded for each entity |
| --- | --- | --- |
| SQL databases: Postgres, MySQL, MariaDB, SQL Server, Oracle, Db2 | tables and views, by database and schema | columns with type, primary key, and column comments |
| Databricks | tables, by Unity Catalog catalog and schema | columns with type and comments |
| Salesforce | reports, by folder, with their report id; SOQL objects | report columns; object fields and whether they are required |
| Object stores and files: Amazon S3, Azure Blob Storage, Google Cloud Storage, local files | buckets and prefixes | the file patterns found under each prefix, their format, and the columns read from them |
| MongoDB | collections, by database | collection type (collection, view, time series), indexes, and validators |
| Kafka | topics | partition count |

## Classification

To classify a connection, the server gives the configured AI model a compact description of the whole connection and asks for a structured judgement of the data. The model receives every entity with its fields, grouped the way the system groups them (database and schema, folder, bucket, namespace), the collection's description, and any sample rows the classifier read.

The result is one classification per connection:

| Field | What it says |
| --- | --- |
| Label | a short name for the data, such as "Customer data" or "Market signals" |
| Domain | the business domain: CRM, finance, marketing, engineering, operations, product, HR, supply chain, security, infrastructure, IoT, analytics, ecommerce |
| Contains | what the data holds, one item per subject |
| Use cases | what this data is typically used for |
| Sensitivity | public, internal, confidential, or restricted |
| Freshness | real-time, hourly, daily, weekly, monthly, or static |
| Typical sources | where this kind of data usually comes from |
| Search terms | the synonyms and business words people would search for it by |

Names, comments, and sample values read from the external system are passed to the model as data, never as instructions, and sample values are never copied into the classification.

Each classification records the fingerprint of the schema it was made from. Comparing that fingerprint with the current one tells Tabsdata when the classification is out of date.

## Keeping It Current

Tabsdata re-reads each connection's metadata on a schedule and whenever a user or an agent asks for a refresh. The schedule is set by `catalog.refresh_interval` in the server configuration, which is 24 hours as shipped. On every read, the probe compares the fingerprint of the metadata it found with the stored fingerprint.

If the fingerprints match, the catalog keeps its entities and its classification. If they differ, because of a new table, an altered table, a new report, or a new file pattern, the stored entities are replaced. Because the stored classification was made for the old schema, the connection is then classified again in full. Tabsdata never attempts a partial update: the model sees the whole connection every time, so the label, the subjects, and the search terms stay consistent with everything the connection now holds.

A classification can also be requested by hand, for example after a collection's description was improved, and the connection is classified again on the next sweep. An existing classification can be discarded, and the next sweep then redoes it.

## How Agents Use the Catalog

When a user asks an agent connected to Tabsdata to publish from or subscribe to an external system, the agent reads the catalog before it writes any code.

To find data, the agent searches the catalog across every connection the user can see. A question like "Where do we keep invoices?" becomes a search by keyword and by meaning over collection names and descriptions, entity names, fields, and the classification's search terms, and the agent answers from the hits instead of guessing names.

To describe one source or destination collection, the agent lists the collection's entities and their fields, and says what the classification found the data to be and how sensitive and how fresh it is.

To propose a function, the agent works from the entities in the catalog. For a source, the agent proposes a publisher over the entities that matter, with the real column names and types. For a destination, the agent proposes a subscriber for the tables to deliver, written to the entities the destination exposes.

See [MCP](https://docs.tabsdata.com/developer/guide/mcp) to connect an agent to Tabsdata.

## Working With the Catalog in tdk

The catalog is read and maintained with `tdk`. Every command takes `-P <project>` and names a source or destination collection, because each connection belongs to exactly one collection.

| Task | Command |
| --- | --- |
| Show the connection's catalog status: last check, last refresh, entity count, and whether the entity list was truncated | `tdk connection get -n <collection>` |
| List the entities and, with `--fields`, their fields | `tdk connection entities -n <collection> [--fields] [--filter fqn:lk:<glob>]` |
| Check that the external system can be reached | `tdk connection check -n <collection>` |
| Re-read the metadata now | `tdk connection refresh -n <collection>` |
| Show the classification and whether the schema changed since it was made | `tdk ai catalog show -n <collection>` |
| Classify the connection again on the next sweep | `tdk ai catalog classify -n <collection>` |
| Discard the classification so the next sweep redoes it | `tdk ai catalog unclassify -n <collection>` |
| Search every connection you can see, by keyword and by meaning | `tdk ai search connections --query "<words>"` |

Viewing a connection's catalog status and its classification requires permission to view the project. Listing its entities, checking it, refreshing it, reading sample rows, and requesting a classification require permission to develop in the project. Discarding a classification requires permission to manage the project.
