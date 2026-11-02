# Connections

> How Connections provide Publisher and Subscriber Functions with access to external systems.

Source: https://docs.tabsdata.com/guide/connections

A **Connection** is a resource that stores the credentials required to access an external system.

Publisher and Subscriber Functions need credentials to connect to external systems to read and write data, but they do not store these sensitive credentials directly in their code.

Instead, that configuration is defined in a Connection. Connections are `.yaml` files that contain relevant credentials and are attached to Collections, allowing all functions within that collection to access the required credentials during execution.

## Connection Structure

Connections are defined using `.yaml` files. The fields in a Connection depend on the external system and Connection type.

For example, an S3 Connection stores the bucket, region, and credentials needed to access files in an S3 bucket.

conn-s3.yaml

```yaml
kind: connectionDef
apiVersion: '1.0'
type: tabsdatak.conn.s3:S3SrcConn
spec:
  bucket: 'acme-ingest'
  region: 'us-east-1'
  credentials:
    kind: awsAccessSecretKeyCredentials
    apiVersion: '1.0'
    type: tabsdatak.conn.common.types:AwsAccessSecretKey
    spec:
      access_key_id: '$secret:AWS_ACCESS_KEY_ID'
      secret_access_key: '$secret:AWS_SECRET_ACCESS_KEY'
```

-   required
    
-   required
    
-   required
    
-   optional
    

## Connections and Collections

Connections are bound to Publisher and Subscriber Collections.

A **Publisher Collection** binds a Publisher to an input Connection. The Publisher defines what data to read from the external system and what Tables to create in Tabsdata, while the Connection provides the configuration and credentials needed to access that system during the Publisher's execution.

A **Subscriber Collection** binds a Subscriber to an output Connection. The Subscriber defines which Tabsdata Tables to read and what data to write, while the Connection provides the configuration and credentials needed to access the destination system during the Subscriber's execution.

## Credential Security

When configuring a connection , a credential can be passed directly as `secret:<value>`, or as a reference to an environment variable, written as `$secret:<VARIABLE NAME>`.

Regardless of the method used, when the connection file is registered into Tabsdata, Tabsdata **dehydrates** the document by extracting any secrets into a separate secret store and storing a reference to the secret in the file.

note

For security, once credentials are stored in Tabsdata, they can only be accessed by a Tabsdata Function at runtime.
