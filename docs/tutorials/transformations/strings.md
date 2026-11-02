# Transform Strings

> Covers Tabsdata string transformations via the str accessor: changing case, matching and extracting with contains, starts_with, ends_with and regex, replacing, trimming, padding, slicing, measuring lengths and finding positions, and parsing log lines with grok.

Source: https://docs.tabsdata.com/tutorials/transformations/strings

## Change case

AI agent session

❯make a new table that takes the persons table and uppercases the name column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.to_uppercase()` on the column. Aliasing it back to name replaces the column instead of adding one.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["persons"],
  output_tables=["persons_upper"],
)
def upper_name(persons: TableFrameSpec) -> TableFrameSpec:
  expr = col("name").str.to_uppercase()
  return persons.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/persons\_upper is live — name uppercased in place:

```
┌──────────────┬─────┐
│     name     │ age │
├──────────────┼─────┤
│ ADA LOVELACE │ 36  │
├──────────────┼─────┤
│ GRACE HOPPER │ 45  │
└──────────────┴─────┘
```

Transformed tables

persons

| name | age |
| --- | --- |
| ada Lovelace | 36 |
| Grace HOPPER | 45 |

2 rows

persons\_upper

| name | age |
| --- | --- |
| ADA LOVELACE | 36 |
| GRACE HOPPER | 45 |

2 rows

AI agent session

❯make a new table that takes the persons table and lowercases the name column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.to_lowercase()`, which is the usual first step before comparing strings that users typed.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["persons"],
  output_tables=["persons_lower"],
)
def lower_name(persons: TableFrameSpec) -> TableFrameSpec:
  expr = col("name").str.to_lowercase()
  return persons.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/persons\_lower is live — name lowercased in place:

```
┌──────────────┬─────┐
│     name     │ age │
├──────────────┼─────┤
│ ada lovelace │ 36  │
├──────────────┼─────┤
│ grace hopper │ 45  │
└──────────────┴─────┘
```

Transformed tables

persons

| name | age |
| --- | --- |
| ada Lovelace | 36 |
| Grace HOPPER | 45 |

2 rows

persons\_lower

| name | age |
| --- | --- |
| ada lovelace | 36 |
| grace hopper | 45 |

2 rows

AI agent session

❯make a new table that takes the persons table and puts the name column in title case

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.to_titlecase()` capitalises the first letter of each word and lowercases the rest.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["persons"],
  output_tables=["persons_titled"],
)
def title_name(persons: TableFrameSpec) -> TableFrameSpec:
  expr = col("name").str.to_titlecase()
  return persons.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/persons\_titled is live — name in title case:

```
┌──────────────┬─────┐
│     name     │ age │
├──────────────┼─────┤
│ Ada Lovelace │ 36  │
├──────────────┼─────┤
│ Grace Hopper │ 45  │
└──────────────┴─────┘
```

Transformed tables

persons

| name | age |
| --- | --- |
| ada Lovelace | 36 |
| Grace HOPPER | 45 |

2 rows

persons\_titled

| name | age |
| --- | --- |
| Ada Lovelace | 36 |
| Grace Hopper | 45 |

2 rows

## Test a string against a pattern

AI agent session

❯make a new table that takes the contacts table and flags the rows whose email column ends in @example.com

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.ends_with()` returns a Boolean per row, so this adds a flag column rather than filtering. Use it inside `filter()` if you want the rows dropped.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["contacts"],
  output_tables=["contacts_flagged"],
)
def flag_internal(contacts: TableFrameSpec) -> TableFrameSpec:
  expr = col("email").str.ends_with("@example.com")
  return contacts.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/contacts\_flagged is live — a Boolean column, true where the suffix matched:

```
┌───────┐
│ email │
├───────┤
│ True  │
├───────┤
│ False │
└───────┘
```

Transformed tables

contacts

| email |
| --- |
| ada@example.com |
| bo@other.org |

2 rows

contacts\_flagged

| email |
| --- |
| True |
| False |

2 rows

AI agent session

❯make a new table that takes the contacts table and flags the rows whose phone column starts with +1

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.starts_with()`, the prefix counterpart.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["contacts"],
  output_tables=["contacts_flagged"],
)
def flag_us(contacts: TableFrameSpec) -> TableFrameSpec:
  expr = col("phone").str.starts_with("+1")
  return contacts.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/contacts\_flagged is live — true where the prefix matched:

```
┌───────┐
│ phone │
├───────┤
│ True  │
├───────┤
│ False │
└───────┘
```

Transformed tables

contacts

| phone |
| --- |
| +15550101 |
| +445550101 |

2 rows

contacts\_flagged

| phone |
| --- |
| True |
| False |

2 rows

AI agent session

❯make a new table that takes the tickets table and flags the rows whose description column mentions urgent

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.contains()` with a plain string, which matches the substring anywhere in the value.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["tickets"],
  output_tables=["tickets_flagged"],
)
def flag_urgent(tickets: TableFrameSpec) -> TableFrameSpec:
  expr = col("description").str.contains("urgent")
  return tickets.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/tickets\_flagged is live — true where the substring appears:

```
┌─────────────┐
│ description │
├─────────────┤
│ True        │
├─────────────┤
│ False       │
└─────────────┘
```

Transformed tables

tickets

| description |
| --- |
| urgent disk failure |
| routine check |

2 rows

tickets\_flagged

| description |
| --- |
| True |
| False |

2 rows

AI agent session

❯make a new table that takes the lines table and flags the rows whose text column mentions error, warning or critical

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.contains_any()` takes the list and matches if any one of them appears, which beats three contains calls joined by |.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["lines"],
  output_tables=["lines_flagged"],
)
def flag_severity(lines: TableFrameSpec) -> TableFrameSpec:
  expr = col("text").str.contains_any(["error", "warning", "critical"])
  return lines.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/lines\_flagged is live — true where any of the three words appears:

```
┌───────┐
│ text  │
├───────┤
│ True  │
├───────┤
│ False │
└───────┘
```

Transformed tables

lines

| text |
| --- |
| disk error on sda |
| all clear |

2 rows

lines\_flagged

| text |
| --- |
| True |
| False |

2 rows

AI agent session

❯make a new table that takes the parts table and flags the rows whose code column is three letters, a dash and four digits

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.contains()` also takes a regex, so an anchored pattern checks the whole shape rather than looking for a substring.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["parts"],
  output_tables=["parts_flagged"],
)
def flag_code_shape(parts: TableFrameSpec) -> TableFrameSpec:
  expr = col("code").str.contains(r"^[A-Z]{3}-\d{4}$")
  return parts.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/parts\_flagged is live — true only where the whole value matches the pattern:

```
┌───────┐
│ code  │
├───────┤
│ True  │
├───────┤
│ False │
└───────┘
```

Transformed tables

parts

| code |
| --- |
| ABC-1234 |
| abc-12 |

2 rows

parts\_flagged

| code |
| --- |
| True |
| False |

2 rows

## Extract and replace

AI agent session

❯make a new table that takes the contacts table and pulls the mail domain out of the email column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.extract()` with a capture group, and `group_index=1` picks that group rather than the whole match.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["contacts"],
  output_tables=["contacts_domain"],
)
def extract_domain(contacts: TableFrameSpec) -> TableFrameSpec:
  expr = col("email").str.extract(r"@(\w+)\.", group_index=1)
  return contacts.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/contacts\_domain is live — the captured group, not the whole match:

```
┌─────────┐
│  email  │
├─────────┤
│ example │
├─────────┤
│ other   │
└─────────┘
```

Transformed tables

contacts

| email |
| --- |
| ada@example.com |
| bo@other.org |

2 rows

contacts\_domain

| email |
| --- |
| example |
| other |

2 rows

AI agent session

❯make a new table that takes the notes table and replaces the first "old" in the text column with "new"

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.replace()` changes the first occurrence only. `replace_all` is the one that changes every occurrence.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["notes"],
  output_tables=["notes_replaced"],
)
def replace_first(notes: TableFrameSpec) -> TableFrameSpec:
  expr = col("text").str.replace("old", "new")
  return notes.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/notes\_replaced is live — only the first occurrence in each value changed:

```
┌───────────────────────┐
│         text          │
├───────────────────────┤
│ new habits  die  hard │
├───────────────────────┤
│ no change here        │
└───────────────────────┘
```

Transformed tables

notes

| text |
| --- |
| old habits die hard |
| no change here |

2 rows

notes\_replaced

| text |
| --- |
| new habits die hard |
| no change here |

2 rows

AI agent session

❯make a new table that takes the notes table and collapses every run of whitespace in the text column to a single space

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.replace_all()` with a regex, which is the normal way to normalise whitespace.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["notes"],
  output_tables=["notes_squeezed"],
)
def squeeze_spaces(notes: TableFrameSpec) -> TableFrameSpec:
  expr = col("text").str.replace_all(r"\s+", " ")  # Replace all whitespace
  return notes.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/notes\_squeezed is live — every whitespace run collapsed:

```
┌─────────────────────┐
│        text         │
├─────────────────────┤
│ old habits die hard │
├─────────────────────┤
│ no change here      │
└─────────────────────┘
```

Transformed tables

notes

| text |
| --- |
| old habits die hard |
| no change here |

2 rows

notes\_squeezed

| text |
| --- |
| old habits die hard |
| no change here |

2 rows

AI agent session

❯make a new table that takes the notes table and replaces a, b and c with x, y and z in the text column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.replace_many()` takes two lists, matched up by position, and makes one pass rather than one per pair.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["notes"],
  output_tables=["notes_replaced"],
)
def replace_many(notes: TableFrameSpec) -> TableFrameSpec:
  expr = col("text").str.replace_many(["a", "b", "c"], ["x", "y", "z"])
  return notes.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/notes\_replaced is live — all three substitutions applied in one pass:

```
┌──────────┐
│   text   │
├──────────┤
│ xyz zxy  │
├──────────┤
│ no mxtzh │
└──────────┘
```

Transformed tables

notes

| text |
| --- |
| abc cab |
| no match |

2 rows

notes\_replaced

| text |
| --- |
| xyz zxy |
| no mxtzh |

2 rows

## Trim, pad and slice

AI agent session

❯make a new table that takes the people table and trims the whitespace off both ends of the name column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.strip_chars()` with no argument trims whitespace from both ends and leaves the inside alone.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["people"],
  output_tables=["people_trimmed"],
)
def trim_name(people: TableFrameSpec) -> TableFrameSpec:
  expr = col("name").str.strip_chars()  # Both sides
  return people.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/people\_trimmed is live — padding gone from both ends:

```
┌───────┐
│ name  │
├───────┤
│ Ada   │
├───────┤
│ Grace │
└───────┘
```

Transformed tables

people

| name |
| --- |
| Ada |
| Grace |

2 rows

people\_trimmed

| name |
| --- |
| Ada |
| Grace |

2 rows

AI agent session

❯make a new table that takes the people table and trims the whitespace off the start of the name column only

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.strip_chars_start()` touches the left side only.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["people"],
  output_tables=["people_trimmed"],
)
def trim_start(people: TableFrameSpec) -> TableFrameSpec:
  expr = col("name").str.strip_chars_start()  # Left side
  return people.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/people\_trimmed is live — leading whitespace gone, trailing kept:

```
┌─────────┐
│  name   │
├─────────┤
│ Ada     │
├─────────┤
│ Grace   │
└─────────┘
```

Transformed tables

people

| name |
| --- |
| Ada |
| Grace |

2 rows

people\_trimmed

| name |
| --- |
| Ada |
| Grace |

2 rows

AI agent session

❯make a new table that takes the people table and trims the whitespace off the end of the name column only

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.strip_chars_end()` touches the right side only.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["people"],
  output_tables=["people_trimmed"],
)
def trim_end(people: TableFrameSpec) -> TableFrameSpec:
  expr = col("name").str.strip_chars_end()  # Right side
  return people.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/people\_trimmed is live — trailing whitespace gone, leading kept:

```
┌─────────┐
│  name   │
├─────────┤
│    Ada  │
├─────────┤
│   Grace │
└─────────┘
```

Transformed tables

people

| name |
| --- |
| Ada |
| Grace |

2 rows

people\_trimmed

| name |
| --- |
| Ada |
| Grace |

2 rows

AI agent session

❯make a new table that takes the routes table and removes the /api/ prefix from the path column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.strip_prefix()` removes that exact prefix and leaves a value that does not start with it untouched.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["routes"],
  output_tables=["routes_trimmed"],
)
def drop_api_prefix(routes: TableFrameSpec) -> TableFrameSpec:
  expr = col("path").str.strip_prefix("/api/")
  return routes.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/routes\_trimmed is live — the prefix removed where present:

```
┌─────────┐
│  path   │
├─────────┤
│ users   │
├─────────┤
│ /health │
└─────────┘
```

Transformed tables

routes

| path |
| --- |
| /api/users |
| /health |

2 rows

routes\_trimmed

| path |
| --- |
| users |
| /health |

2 rows

AI agent session

❯make a new table that takes the files table and removes the .txt extension from the filename column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.strip_suffix()`, the same idea at the end of the value.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["files"],
  output_tables=["files_trimmed"],
)
def drop_extension(files: TableFrameSpec) -> TableFrameSpec:
  expr = col("filename").str.strip_suffix(".txt")
  return files.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/files\_trimmed is live — the extension removed:

```
┌───────────┐
│ filename  │
├───────────┤
│ notes     │
├───────────┤
│ image.png │
└───────────┘
```

Transformed tables

files

| filename |
| --- |
| notes.txt |
| image.png |

2 rows

files\_trimmed

| filename |
| --- |
| notes |
| image.png |

2 rows

AI agent session

❯make a new table that takes the orders table and pads the id column out to 10 characters with leading zeros

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.pad_start(10, "0")` pads on the left up to that width and leaves anything already longer alone.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["orders"],
  output_tables=["orders_padded"],
)
def pad_id(orders: TableFrameSpec) -> TableFrameSpec:
  expr = col("id").str.pad_start(10, "0")  # Left pad with zeros
  return orders.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/orders\_padded is live — ids padded to width 10:

```
┌────────────┐
│     id     │
├────────────┤
│ 0000000042 │
├────────────┤
│ 0000001337 │
└────────────┘
```

Transformed tables

orders

| id |
| --- |
| 42 |
| 1337 |

2 rows

orders\_padded

| id |
| --- |
| 0000000042 |
| 0000001337 |

2 rows

AI agent session

❯make a new table that takes the parts table and pads the code column out to 20 characters with trailing spaces

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.pad_end()` pads on the right, which is what fixed-width output wants.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["parts"],
  output_tables=["parts_padded"],
)
def pad_code(parts: TableFrameSpec) -> TableFrameSpec:
  expr = col("code").str.pad_end(20, " ")  # Right pad with spaces
  return parts.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/parts\_padded is live — codes padded to width 20:

```
┌──────────────────────┐
│         code         │
├──────────────────────┤
│ ABC                  │
├──────────────────────┤
│ DEFGH                │
└──────────────────────┘
```

Transformed tables

parts

| code |
| --- |
| ABC |
| DEFGH |

2 rows

parts\_padded

| code |
| --- |
| ABC |
| DEFGH |

2 rows

AI agent session

❯make a new table that takes the invoices table and zero-fills the number column to 5 characters

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.zfill()` is pad\_start with zeros, except it keeps a leading sign in front of the padding.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["invoices"],
  output_tables=["invoices_filled"],
)
def zfill_number(invoices: TableFrameSpec) -> TableFrameSpec:
  expr = col("number").str.zfill(5)  # Zero-fill to length
  return invoices.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/invoices\_filled is live — numbers zero-filled to width 5:

```
┌────────┐
│ number │
├────────┤
│ 00042  │
├────────┤
│ 01337  │
└────────┘
```

Transformed tables

invoices

| number |
| --- |
| 42 |
| 1337 |

2 rows

invoices\_filled

| number |
| --- |
| 00042 |
| 01337 |

2 rows

AI agent session

❯make a new table that takes the notes table and keeps only the first 10 characters of the text column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.head(10)` takes from the front and returns the whole value when it is shorter.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["notes"],
  output_tables=["notes_head"],
)
def head_text(notes: TableFrameSpec) -> TableFrameSpec:
  expr = col("text").str.head(10)  # First 10 characters
  return notes.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/notes\_head is live — first 10 characters of each value:

```
┌────────────┐
│    text    │
├────────────┤
│ abcdefghij │
├────────────┤
│ short      │
└────────────┘
```

Transformed tables

notes

| text |
| --- |
| abcdefghijklmnop |
| short |

2 rows

notes\_head

| text |
| --- |
| abcdefghij |
| short |

2 rows

AI agent session

❯make a new table that takes the notes table and keeps only the last 5 characters of the text column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.tail(5)` takes from the end.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["notes"],
  output_tables=["notes_tail"],
)
def tail_text(notes: TableFrameSpec) -> TableFrameSpec:
  expr = col("text").str.tail(5)  # Last 5 characters
  return notes.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/notes\_tail is live — last 5 characters of each value:

```
┌───────┐
│ text  │
├───────┤
│ lmnop │
├───────┤
│ short │
└───────┘
```

Transformed tables

notes

| text |
| --- |
| abcdefghijklmnop |
| short |

2 rows

notes\_tail

| text |
| --- |
| lmnop |
| short |

2 rows

AI agent session

❯make a new table that takes the notes table and takes 10 characters of the text column starting at position 5

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.slice()` takes an offset and a length, and the offset is 0-based.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["notes"],
  output_tables=["notes_sliced"],
)
def slice_text(notes: TableFrameSpec) -> TableFrameSpec:
  expr = col("text").str.slice(offset=5, length=10)  # Substring
  return notes.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/notes\_sliced is live — 10 characters from offset 5:

```
┌────────────┐
│    text    │
├────────────┤
│ fghijklmno │
├────────────┤
│            │
└────────────┘
```

Transformed tables

notes

| text |
| --- |
| abcdefghijklmnop |
| short |

2 rows

notes\_sliced

| text |
| --- |
| fghijklmno |
|  |

2 rows

AI agent session

❯make a new table that takes the notes table and reverses the text column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.reverse()` reverses by character, not by byte, so multi-byte characters survive.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["notes"],
  output_tables=["notes_reversed"],
)
def reverse_text(notes: TableFrameSpec) -> TableFrameSpec:
  expr = col("text").str.reverse()
  return notes.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/notes\_reversed is live — each value reversed:

```
┌──────────────────┐
│       text       │
├──────────────────┤
│ ponmlkjihgfedcba │
├──────────────────┤
│ trohs            │
└──────────────────┘
```

Transformed tables

notes

| text |
| --- |
| abcdefghijklmnop |
| short |

2 rows

notes\_reversed

| text |
| --- |
| ponmlkjihgfedcba |
| trohs |

2 rows

## Measure and locate

AI agent session

❯make a new table that takes the tickets table and measures the character length of the description column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.len_chars()` counts characters, which is what a person means by length.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["tickets"],
  output_tables=["tickets_lengths"],
)
def measure_chars(tickets: TableFrameSpec) -> TableFrameSpec:
  expr = col("description").str.len_chars()  # Character count
  return tickets.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/tickets\_lengths is live — the character count per row:

```
┌─────────────┐
│ description │
├─────────────┤
│ 12          │
├─────────────┤
│ 2           │
└─────────────┘
```

Transformed tables

tickets

| description |
| --- |
| disk failure |
| ok |

2 rows

tickets\_lengths

| description |
| --- |
| 12 |
| 2 |

2 rows

AI agent session

❯make a new table that takes the payloads table and measures the byte length of the data column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.len_bytes()` counts bytes, so a multi-byte character counts more than once. This is the one for storage limits.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["payloads"],
  output_tables=["payloads_lengths"],
)
def measure_bytes(payloads: TableFrameSpec) -> TableFrameSpec:
  expr = col("data").str.len_bytes()  # Byte count
  return payloads.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/payloads\_lengths is live — the byte count per row, which differs from the character count on non-ASCII values:

```
┌──────┐
│ data │
├──────┤
│ 5    │
├──────┤
│ 2    │
└──────┘
```

Transformed tables

payloads

| data |
| --- |
| café |
| ok |

2 rows

payloads\_lengths

| data |
| --- |
| 5 |
| 2 |

2 rows

AI agent session

❯make a new table that takes the lines table and finds the position of the first @ in the text column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.find()` returns the index of the first occurrence, 0-based, and null when there is no match.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["lines"],
  output_tables=["lines_positions"],
)
def find_at(lines: TableFrameSpec) -> TableFrameSpec:
  expr = col("text").str.find("@")  # First occurrence index
  return lines.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/lines\_positions is live — the index of the first match, null where absent:

```
┌──────┐
│ text │
├──────┤
│ 3    │
├──────┤
│ None │
└──────┘
```

Transformed tables

lines

| text |
| --- |
| ada@example.com |
| no at sign |

2 rows

lines\_positions

| text |
| --- |
| 3 |
| None |

2 rows

AI agent session

❯make a new table that takes the lines table and counts how many times error appears in the log column

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `str.count_matches()` with a word-boundary regex, so it counts the word rather than the substring inside a longer word.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["lines"],
  output_tables=["lines_counts"],
)
def count_errors(lines: TableFrameSpec) -> TableFrameSpec:
  expr = col("log").str.count_matches(r"\berror\b")  # Count pattern matches
  return lines.with_columns(expr)
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/lines\_counts is live — the match count per row:

```
┌─────┐
│ log │
├─────┤
│ 2   │
├─────┤
│ 0   │
└─────┘
```

Transformed tables

lines

| log |
| --- |
| error then error again |
| all clear |

2 rows

lines\_counts

| log |
| --- |
| 2 |
| 0 |

2 rows

## Parse a log line

AI agent session

❯make a new table that takes the access table and parses the log\_line column into named columns

⏺

Needs a transformer. Getting its guide.

Called tabsdata 2 times (ctrl+o to expand)

⏺

Generating — `grok()` on the frame rather than an expression on one column: a grok pattern produces several columns at once, so it is a frame-level operation.

Called tabsdata 3 times (ctrl+o to expand)

⏺

The transformer, registered in subscriptions:

```python
@transformer(
  input_tables=["access"],
  output_tables=["access_parsed"],
)
def parse_access(access: TableFrameSpec) -> TableFrameSpec:
  return access.grok(
      "log_line",
      r"%{IP:client_ip} - - \[%{HTTPDATE:timestamp}\] \"%{WORD:method} %{URIPATHPARAM:path}\""
  )
```

⏺

Execution committed, 0 failures.

⏺

subscriptions/access\_parsed is live — the log line broken into the named fields:

```
┌──────────┬───────────┬───────────┬────────┬──────┐
│ log_line │ client_ip │ timestamp │ method │ path │
├──────────┼───────────┼───────────┼────────┼──────┤
│          │           │           │        │      │
└──────────┴───────────┴───────────┴────────┴──────┘
```

Transformed tables

access

| log\_line |
| --- |
| 10.0.0.1 - - \[12/Mar/2024:09:15:00 +0000\] "GET /users" |

1 row

access\_parsed

| log\_line | client\_ip | timestamp | method | path |
| --- | --- | --- | --- | --- |
| 10.0.0.1 - - \[12/Mar/2024:09:15:00 +0000\] "GET /users" | 10.0.0.1 | 12/Mar/2024:09:15:00 +0000 | GET | /users |

1 row
