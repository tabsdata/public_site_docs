# tabsdatak.conn.kafka

> tabsdatak.conn.kafka API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-conn-kafka

|  |  |
| --- | --- |
| [`AwsGlueSchemaRegistry`](https://docs.tabsdata.com/api/category/connectors/source/awsglueschemaregistry) | AWS Glue schema registry attached to a `KafkaStreamSrcConn`. |
| [`AwsGlueSchemaRegistryCredentialsSpec`](#tabsdatak.conn.kafka.AwsGlueSchemaRegistryCredentialsSpec) |  |
| [`ConfluentSchemaRegistry`](https://docs.tabsdata.com/api/category/connectors/source/confluentschemaregistry) | Confluent-style schema registry attached to a `KafkaStreamSrcConn`. |
| [`ConfluentSchemaRegistryCredentialsSpec`](#tabsdatak.conn.kafka.ConfluentSchemaRegistryCredentialsSpec) |  |
| [`ConfluentSchemaRegistryUrlNameSpec`](#tabsdatak.conn.kafka.ConfluentSchemaRegistryUrlNameSpec) |  |
| [`KafkaCredentialsSpec`](#tabsdatak.conn.kafka.KafkaCredentialsSpec) |  |
| [`KafkaGroupSpec`](#tabsdatak.conn.kafka.KafkaGroupSpec) |  |
| [`KafkaMessageFormatSpec`](#tabsdatak.conn.kafka.KafkaMessageFormatSpec) |  |
| [`KafkaServersSpec`](#tabsdatak.conn.kafka.KafkaServersSpec) |  |
| [`KafkaStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/kafkastreamsrc) | Kafka streaming source for `@stream_publisher` -- one batch per due batch limit. |
| [`KafkaStreamSrcConn`](https://docs.tabsdata.com/api/category/connectors/source/kafkastreamsrcconn) | Kafka connection used by `KafkaStreamSrc`. |
| [`KafkaTopicSpec`](#tabsdatak.conn.kafka.KafkaTopicSpec) |  |
| [`Protobuf`](#tabsdatak.conn.kafka.Protobuf) | Protobuf payload marker carrying the message type name. |
| [`RegistryNameSpec`](#tabsdatak.conn.kafka.RegistryNameSpec) |  |
| [`SchemaNameSpec`](#tabsdatak.conn.kafka.SchemaNameSpec) |  |
| [`SchemaRegistrySpec`](#tabsdatak.conn.kafka.SchemaRegistrySpec) |  |
| [`SchemaSpec`](#tabsdatak.conn.kafka.SchemaSpec) |  |
| [`SrcCfgKey`](#tabsdatak.conn.kafka.SrcCfgKey) |  |
| [`SrcCfgSpec`](#tabsdatak.conn.kafka.SrcCfgSpec) |  |

* * *

## AwsGlueSchemaRegistryCredentialsSpec

type\_alias

```python
AwsGlueSchemaRegistryCredentialsSpec: AwsAccessSecretKey
```

* * *

## ConfluentSchemaRegistryCredentialsSpec

type\_alias

```python
ConfluentSchemaRegistryCredentialsSpec: UserPassword
```

* * *

## ConfluentSchemaRegistryUrlNameSpec

type\_alias

```python
ConfluentSchemaRegistryUrlNameSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## KafkaCredentialsSpec

type\_alias

```python
KafkaCredentialsSpec: UserPassword
```

* * *

## KafkaGroupSpec

type\_alias

```python
KafkaGroupSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## KafkaMessageFormatSpec

type\_alias

```python
KafkaMessageFormatSpec: Union[Literal['avro', 'json'], Protobuf]
```

**Resolved type:**

```python
Literal['avro', 'json'] | Protobuf
```

* * *

## KafkaServersSpec

type\_alias

```python
KafkaServersSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## KafkaTopicSpec

type\_alias

```python
KafkaTopicSpec: str
```

* * *

## Protobuf

class

```python
class Protobuf(message_name: str)
```

Protobuf payload marker carrying the message type name.

Used as the `data_format` of a [`KafkaStreamSrc`](https://docs.tabsdata.com/api/category/connectors/source/kafkastreamsrc) when ingesting Protobuf payloads (the `"avro"` / `"json"` string variants cover the other wire formats).

**Parameters:**

parameter

`message_name`[str](https://docs.python.org/3/builtins/stdtypes.html#str)

Fully-qualified protobuf message name (e.g. `"com.example.UserEvent"`) -- the descriptor lookup key used at deserialization time.

* * *

## RegistryNameSpec

type\_alias

```python
RegistryNameSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## SchemaNameSpec

type\_alias

```python
SchemaNameSpec: StrOrSecretSpec
```

**Resolved type:**

```python
str | Secret
```

* * *

## SchemaRegistrySpec

type\_alias

```python
SchemaRegistrySpec: Union[ConfluentSchemaRegistry, AwsGlueSchemaRegistry]
```

**Resolved type:**

```python
ConfluentSchemaRegistry | AwsGlueSchemaRegistry
```

* * *

## SchemaSpec

type\_alias

```python
SchemaSpec: str
```

* * *

## SrcCfgKey

type\_alias

```python
SrcCfgKey: Literal['tabsdata.kafka.poll.max_secs', 'tabsdata.kafka.poll.idle_secs', 'kafka.connect_timeout_secs', 'kafka.logging_level', 'tabsdata.kafka.buffer.max_rows', 'tabsdata.kafka.buffer.max_bytes', 'tabsdata.kafka.buffer.max_secs', 'tabsdata.kafka.consume.max_messages']
```

* * *

## SrcCfgSpec

type\_alias

```python
SrcCfgSpec: Mapping[SrcCfgKey, Any]
```

**Resolved type:**

```python
Mapping[Literal['tabsdata.kafka.poll.max_secs', 'tabsdata.kafka.poll.idle_secs', 'kafka.connect_timeout_secs', 'kafka.logging_level', 'tabsdata.kafka.buffer.max_rows', 'tabsdata.kafka.buffer.max_bytes', 'tabsdata.kafka.buffer.max_secs', 'tabsdata.kafka.consume.max_messages'], Any]
```
