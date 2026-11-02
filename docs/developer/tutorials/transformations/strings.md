# Transform Strings

Source: https://docs.tabsdata.com/developer/tutorials/transformations/strings

The `.str` namespace provides comprehensive string manipulation functions.

## Case Transformations

Upper-case every character.

to\_uppercase.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["persons"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("name").str.to_uppercase()
    return tf.with_columns(expr)
```

persons

| name | age |
| --- | --- |
| ada Lovelace | 36 |
| Grace HOPPER | 45 |

2 rows

result

| name | age |
| --- | --- |
| ADA LOVELACE | 36 |
| GRACE HOPPER | 45 |

2 rows

Lower-case every character.

to\_lowercase.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["persons"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("name").str.to_lowercase()
    return tf.with_columns(expr)
```

persons

| name | age |
| --- | --- |
| ada Lovelace | 36 |
| Grace HOPPER | 45 |

2 rows

result

| name | age |
| --- | --- |
| ada lovelace | 36 |
| grace hopper | 45 |

2 rows

Upper-case the first letter of each word and lower-case the rest.

to\_titlecase.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["persons"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("name").str.to_titlecase()
    return tf.with_columns(expr)
```

persons

| name | age |
| --- | --- |
| ada Lovelace | 36 |
| Grace HOPPER | 45 |

2 rows

result

| name | age |
| --- | --- |
| Ada Lovelace | 36 |
| Grace Hopper | 45 |

2 rows

## Pattern Matching

Check if string starts/ends with pattern

ends\_with.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["contacts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("email").str.ends_with("@example.com")
    return tf.with_columns(expr)
```

contacts

| email |
| --- |
| ada@example.com |
| bo@other.org |

2 rows

result

| email |
| --- |
| True |
| False |

2 rows

True where the string begins with that prefix.

starts\_with.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["contacts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("phone").str.starts_with("+1")
    return tf.with_columns(expr)
```

contacts

| phone |
| --- |
| +15550101 |
| +445550101 |

2 rows

result

| phone |
| --- |
| True |
| False |

2 rows

Contains substring

contains.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["tickets"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("description").str.contains("urgent")
    return tf.with_columns(expr)
```

tickets

| description |
| --- |
| urgent disk failure |
| routine check |

2 rows

result

| description |
| --- |
| True |
| False |

2 rows

Contains any of multiple patterns

contains\_any.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["lines"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("text").str.contains_any(["error", "warning", "critical"])
    return tf.with_columns(expr)
```

lines

| text |
| --- |
| disk error on sda |
| all clear |

2 rows

result

| text |
| --- |
| True |
| False |

2 rows

Regex matching

contains.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["parts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("code").str.contains(r"^[A-Z]{3}-\d{4}$")
    return tf.with_columns(expr)
```

parts

| code |
| --- |
| ABC-1234 |
| abc-12 |

2 rows

result

| code |
| --- |
| True |
| False |

2 rows

## String Extraction and Replacement

Extract using regex groups

extract.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["contacts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("email").str.extract(r"@(\w+)\.", group_index=1)
    return tf.with_columns(expr)
```

contacts

| email |
| --- |
| ada@example.com |
| bo@other.org |

2 rows

result

| email |
| --- |
| example |
| other |

2 rows

Replace patterns

replace.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["notes"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("text").str.replace("old", "new")
    return tf.with_columns(expr)
```

notes

| text |
| --- |
| old habits die hard |
| no change here |

2 rows

result

| text |
| --- |
| new habits die hard |
| no change here |

2 rows

Replace all whitespace

replace\_all.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["notes"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("text").str.replace_all(r"\s+", " ")  # Replace all whitespace
    return tf.with_columns(expr)
```

notes

| text |
| --- |
| old habits die hard |
| no change here |

2 rows

result

| text |
| --- |
| old habits die hard |
| no change here |

2 rows

Replace multiple patterns

replace\_many.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["notes"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("text").str.replace_many(["a", "b", "c"], ["x", "y", "z"])
    return tf.with_columns(expr)
```

notes

| text |
| --- |
| abc cab |
| no match |

2 rows

result

| text |
| --- |
| xyz zxy |
| no mxtzh |

2 rows

## String Manipulation

Both sides

strip\_chars.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["people"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("name").str.strip_chars()  # Both sides
    return tf.with_columns(expr)
```

people

| name |
| --- |
| Ada |
| Grace |

2 rows

result

| name |
| --- |
| Ada |
| Grace |

2 rows

Left side

strip\_chars\_start.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["people"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("name").str.strip_chars_start()  # Left side
    return tf.with_columns(expr)
```

people

| name |
| --- |
| Ada |
| Grace |

2 rows

result

| name |
| --- |
| Ada |
| Grace |

2 rows

Right side

strip\_chars\_end.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["people"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("name").str.strip_chars_end()  # Right side
    return tf.with_columns(expr)
```

people

| name |
| --- |
| Ada |
| Grace |

2 rows

result

| name |
| --- |
| Ada |
| Grace |

2 rows

Remove the prefix when it is there, and leave the value alone when it is not.

strip\_prefix.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["routes"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("path").str.strip_prefix("/api/")
    return tf.with_columns(expr)
```

routes

| path |
| --- |
| /api/users |
| /health |

2 rows

result

| path |
| --- |
| users |
| /health |

2 rows

Remove the suffix when it is there, and leave the value alone when it is not.

strip\_suffix.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["files"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("filename").str.strip_suffix(".txt")
    return tf.with_columns(expr)
```

files

| filename |
| --- |
| notes.txt |
| image.png |

2 rows

result

| filename |
| --- |
| notes |
| image.png |

2 rows

Left pad with zeros

pad\_start.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["orders"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("id").str.pad_start(10, "0")  # Left pad with zeros
    return tf.with_columns(expr)
```

orders

| id |
| --- |
| 42 |
| 1337 |

2 rows

result

| id |
| --- |
| 0000000042 |
| 0000001337 |

2 rows

Right pad with spaces

pad\_end.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["parts"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("code").str.pad_end(20, " ")  # Right pad with spaces
    return tf.with_columns(expr)
```

parts

| code |
| --- |
| ABC |
| DEFGH |

2 rows

result

| code |
| --- |
| ABC |
| DEFGH |

2 rows

Zero-fill to length

zfill.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["invoices"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("number").str.zfill(5)  # Zero-fill to length
    return tf.with_columns(expr)
```

invoices

| number |
| --- |
| 42 |
| 1337 |

2 rows

result

| number |
| --- |
| 00042 |
| 01337 |

2 rows

First 10 characters

head.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["notes"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("text").str.head(10)  # First 10 characters
    return tf.with_columns(expr)
```

notes

| text |
| --- |
| abcdefghijklmnop |
| short |

2 rows

result

| text |
| --- |
| abcdefghij |
| short |

2 rows

Last 5 characters

tail.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["notes"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("text").str.tail(5)  # Last 5 characters
    return tf.with_columns(expr)
```

notes

| text |
| --- |
| abcdefghijklmnop |
| short |

2 rows

result

| text |
| --- |
| lmnop |
| short |

2 rows

Substring

slice.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["notes"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("text").str.slice(offset=5, length=10)  # Substring
    return tf.with_columns(expr)
```

notes

| text |
| --- |
| abcdefghijklmnop |
| short |

2 rows

result

| text |
| --- |
| fghijklmno |
|  |

2 rows

Reverse

reverse.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["notes"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("text").str.reverse()
    return tf.with_columns(expr)
```

notes

| text |
| --- |
| abcdefghijklmnop |
| short |

2 rows

result

| text |
| --- |
| ponmlkjihgfedcba |
| trohs |

2 rows

## String Length and Position

Character count

len\_chars.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["tickets"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("description").str.len_chars()  # Character count
    return tf.with_columns(expr)
```

tickets

| description |
| --- |
| disk failure |
| ok |

2 rows

result

| description |
| --- |
| 12 |
| 2 |

2 rows

Byte count

len\_bytes.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["payloads"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("data").str.len_bytes()  # Byte count
    return tf.with_columns(expr)
```

payloads

| data |
| --- |
| café |
| ok |

2 rows

result

| data |
| --- |
| 5 |
| 2 |

2 rows

First occurrence index

find.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["lines"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("text").str.find("@")  # First occurrence index
    return tf.with_columns(expr)
```

lines

| text |
| --- |
| ada@example.com |
| no at sign |

2 rows

result

| text |
| --- |
| 3 |
| None |

2 rows

Count pattern matches

count\_matches.py

```python
from tabsdatak.api import TableFrameSpec, transformer
from tabsdatak.tableframe.functions import col

@transformer(
    input_tables=["lines"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    expr = col("log").str.count_matches(r"\berror\b")  # Count pattern matches
    return tf.with_columns(expr)
```

lines

| log |
| --- |
| error then error again |
| all clear |

2 rows

result

| log |
| --- |
| 2 |
| 0 |

2 rows

## Grok Parsing

Parse semi-structured text using Grok patterns:

Parse Apache log format

grok.py

```python
from tabsdatak.api import TableFrameSpec, transformer

@transformer(
    input_tables=["access"],
    output_tables=["result"],
)
def transform(tf: TableFrameSpec) -> TableFrameSpec:
    result = tf.grok(
        "log_line",
        r"%{IP:client_ip} - - \[%{HTTPDATE:timestamp}\] \"%{WORD:method} %{URIPATHPARAM:path}\""
    )
    return result
```

access

| log\_line |
| --- |
| 10.0.0.1 - - \[12/Mar/2024:09:15:00 +0000\] "GET /users" |

1 row

result

| log\_line | client\_ip | timestamp | method | path |
| --- | --- | --- | --- | --- |
| 10.0.0.1 - - \[12/Mar/2024:09:15:00 +0000\] "GET /users" | 10.0.0.1 | 12/Mar/2024:09:15:00 +0000 | GET | /users |

1 row

See [TableFrame API Guide](https://docs.tabsdata.com/developer/guide/tables) for the whole API in one place.
