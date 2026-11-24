# AWS Glue

> Reference for the Tabsdata AWS Glue connector, which writes Apache Iceberg tables registered in the AWS Glue Data Catalog.

Source: https://docs.tabsdata.com/guide/connectors/aws-glue

The AWS Glue connector lets Tabsdata write tables as [Apache Iceberg](https://iceberg.apache.org/) tables on Amazon S3, registered in the AWS Glue Data Catalog. Once a table is registered in the catalog you can query it with Amazon Athena, and with any other engine that reads the catalog, such as Amazon Redshift Spectrum, Amazon EMR, AWS Glue jobs, Spark and Trino.

AWS Glue is destination-only: there is no publisher-side connector for reading from the Glue Data Catalog.

The `AwsGlueDest` connector can be used by a subscriber function to write data from a Tabsdata table into an Iceberg table.

The subscriber is registered in a collection created with an `AwsGlueDestConn` connection. The connection, and how to create the collection, are described in [Connection](#connection), at the end of this page.

### Prerequisites

-   The Glue Data Catalog and the S3 bucket are in the same AWS region and are reachable from the Tabsdata server.
-   The Glue database the tables go in already exists. The connector creates tables, not databases.
-   The AWS credentials can read the database and create, read and update its tables in the Glue Data Catalog (`glue:GetDatabase`, `glue:GetDatabases`, `glue:GetTable`, `glue:GetTables`, `glue:CreateTable`, `glue:UpdateTable`).
-   The AWS credentials can list the bucket and read, write and delete objects under the table locations (`s3:ListBucket`, `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject`).

### Subscriber

Configure `AwsGlueDest` as the `destination` of a subscriber function to define which Iceberg tables Tabsdata writes.

write\_orders.py

```python
from tabsdatak.api import subscriber
from tabsdatak.conn.awsglue import AwsGlueDest

@subscriber(
    input_tables=["orders"],
    destination=AwsGlueDest(
        tables=[
            "sales.orders",
        ],
    ),
)
def write_orders(orders):
    return orders
```

-   required
    
-   optional
    
-   optional
    
-   optional
    

### Function Config Parameters

#### `tables`

Defines the Iceberg tables the subscriber writes to.

Each element in `tables` represents one destination slot and maps positionally to a value returned by the subscriber function. Each name is `table` or `database.table`. A bare `table` is completed from the connection's `database`. Each part is 1 to 255 characters, lowercase letters, digits and underscores, which are the names Athena reads without quoting.

A table that does not exist is created from the first batch, at `s3://<bucket><base_path>/<database>/<table>`.

#### `if_table_exists`

Controls what happens when the destination table already exists. `"append"` (the default) adds rows. `"replace"` empties the table and writes the batch; the table and its columns are kept.

There is no `"merge"`: the AWS Glue connector appends and replaces only.

#### `schema_evolution`

Decides what a write does when the returned frame has a column the table lacks, or a type wider than the column's. See [Schema evolution](#schema-evolution).

#### `dest_cfg`

Sets additional destination configuration. The only supported key is `awsglue.logging_level`.

## Write behavior

Each entry in `tables` is one destination slot and maps by position to a value returned by the subscriber function.

A write streams the batch to S3 as one Parquet file in the table's `data` folder, and then adds the file to the Iceberg table. The schema change, the emptying of the table on a replace, and the new file go in a single Iceberg commit, so a reader sees either the table as it was or the whole batch.

`if_table_exists="append"` adds rows. `"replace"` removes every row and adds the batch in the same commit. The files of the removed rows stay in S3 until the table's old snapshots are expired.

### Rerunning a write

A write is idempotent. The snapshot it commits records the id of the Tabsdata transaction it belongs to, in the `tabsdata.trx-id` property of the snapshot summary. A rerun of the same transaction finds it and writes nothing, so a retry never duplicates rows.

### Schema evolution

`schema_evolution` decides what a write does when the returned frame has a column the destination table lacks, or a type wider than the column's.

| `schema_evolution` | New column | Wider type |
| --- | --- | --- |
| `"strict"` (default) | Refused with `SQL_COMMON_10`, before anything is uploaded | Written when the values fit the column's type; the write fails when one does not |
| `"update"` | Added to the table | The column is widened: `int` to `long`, `float` to `double`, and a decimal to a higher precision |

A column the frame lacks is read as `NULL` under either setting. A change Iceberg cannot make, such as a number becoming a string, is refused under either setting. The check runs before a replace empties the table, so a refused replace leaves the table as it was.

Schema evolution is applied through Iceberg's own schema update, so there is no engine to choose in `dest_cfg`. See [Schema Evolution](https://docs.tabsdata.com/guide/connectors/schema-evolution) for how the other destinations compare.

### Data types

Columns are stored in the types Iceberg has:

| Tabsdata type | Iceberg type |
| --- | --- |
| `Int8`, `Int16`, `UInt8`, `UInt16`, `Int32` | `int` |
| `UInt32`, `UInt64`, `Int64` | `long` |
| `Float32`, `Float64` | `float`, `double` |
| `Decimal` | `decimal` |
| `Boolean`, `String`, `Binary`, `Date` | `boolean`, `string`, `binary`, `date` |
| `Datetime` | `timestamp`, in microseconds |
| `Datetime` with a time zone | `timestamptz`, in UTC |
| `Categorical`, `Enum` | `string` |
| `List`, `Array`, `Struct` | `list`, `list`, `struct` |

A `UInt64` value above the range of `long` fails the write. A `Time`, `Duration` or all-null (`Null`) column has no Iceberg type and is refused; cast it in the function.

## Query the tables with Amazon Athena

The tables are regular Iceberg tables in the Glue Data Catalog, so Athena reads them without any further setup. In the Athena query editor, select the `AwsDataCatalog` data source and query the table by its database and name:

```sql
SELECT * FROM sales.orders LIMIT 10;
```

Athena also runs the Iceberg maintenance statements on these tables, for example `OPTIMIZE sales.orders REWRITE DATA USING BIN_PACK` to compact the file each write adds, and `VACUUM sales.orders` to expire old snapshots and remove the files a replace left behind.

## Operational notes

-   A one-part table name uses the connection's database. A two-part name names its own database.
-   Only unpartitioned tables are written. A write to a partitioned table is refused.
-   The connector writes to a table another Iceberg writer created, as long as the table is stored in S3. The data file goes in that table's own location.
-   A write to several tables runs one table after another and is not atomic across tables.
-   Tabsdata does not connect to AWS when the collection is created. Credential, permission, database and bucket errors appear when the subscriber runs.

## Connection

AWS Glue subscribers use `AwsGlueDestConn` to define the catalog, the credentials and the S3 location used by the subscriber.

conn-awsglue.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.awsglue:AwsGlueDestConn
spec:
  region: 'us-east-1'
  credentials:
    kind: awsAccessSecretKeyCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:AwsAccessSecretKey
    spec:
      access_key_id: 'secret:AKIAIOSFODNN7EXAMPLE'
      secret_access_key: 'secret:wJalrXUtnFEMI0EXAMPLEKEY'
  bucket: 'acme-lake'
```

-   required
    
-   required
    
-   required
    
-   optional
    
-   optional
    
-   optional
    
-   optional
    

### Create the collection

A subscriber is registered in a destination collection, and a destination collection is created with its connection. Every function registered in the collection uses that connection.

Generate a connection template, which lists all the connection fields:

```bash
tdk connection template --type awsglue-iceberg-out --file conn-awsglue.yaml
```

Edit the template file with the AWS connection information, check it, and create the collection with it:

```bash
tdk connection validate --file conn-awsglue.yaml
```

```bash
tdk collection create --name glue_out --conn-file conn-awsglue.yaml
```

Then register the subscriber in the collection:

```bash
tdk fn register --coll glue_out --path write_orders.py::write_orders
```

-   The collection goes in the `destinations` group, because the connection is a destination connection. `--group` can be left out; if it is given, it must be `destinations`.
-   `secret:<value>` gives a secret value in the file itself. `$secret:<ENV_VAR>` reads it from an environment variable when the collection is created, so the value never appears in the file. Either way, Tabsdata stores the secret separately, and the stored connection only shows a placeholder.
-   Functions in the collection must use the connector of its connection: `AwsGlueDest` for a collection created with `AwsGlueDestConn`. Transformers go in a collection of their own.
-   To change the connection later, for example to rotate the access key, run `tdk collection update --name glue_out --conn-file conn-awsglue.yaml`. The connector cannot change; to use another one, create another collection.
-   Creating a source or destination collection requires permission to manage the project.

### Connection Config Parameters

#### `region`

The AWS region of the Glue Data Catalog and of the S3 bucket, such as `us-east-1`.

#### `credentials`

The AWS credentials used for both the Glue Data Catalog and the bucket. `AwsAccessSecretKey` requires an `access_key_id` and a `secret_access_key`.

#### `bucket`

The S3 bucket the table files are written to.

#### `base_path`

The prefix in the bucket under which new tables are created. It starts with `/` and has no trailing `/`. A table the connector creates is located at `s3://<bucket><base_path>/<database>/<table>`. Defaults to `/`.

A table that already exists keeps its own location, wherever in S3 that is.

#### `database`

The default Glue database, used by the table names that leave the database out. The database must already exist.

#### `catalog_id`

The id of the Glue Data Catalog: the 12-digit id of the AWS account that owns it. Leave it out to use the catalog of the account the credentials belong to.

#### `conn_cfg`

Optional settings for the two clients the connector uses, told apart by the prefix of the key:

-   `obstore.<option>` is forwarded to the object store client that writes the data files, for example `obstore.endpoint`. See [Object Store Options](https://docs.tabsdata.com/guide/connectors/object-store-options).
-   `pyiceberg.<property>` is forwarded to the Iceberg catalog. `glue.*` properties reach the Glue client, for example `pyiceberg.glue.endpoint` and `pyiceberg.glue.max-retries`, and `s3.*` properties reach the client that writes the Iceberg metadata files, for example `pyiceberg.s3.endpoint`.
