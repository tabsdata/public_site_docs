# StrOrSecretSpec

> A connector field that accepts either a plain string or a `Secret`.

Source: https://docs.tabsdata.com/api/category/connectors/credentials/strorsecretspec

type\_alias

```python
StrOrSecretSpec: Union[str, Secret]
```

**Resolved type:**

```python
str | Secret
```

**Categories:** credentials

A connector field that accepts either a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret).

Annotate a connection/source/destination field with it directly.

Each value carries a marker so the two shapes are unambiguous on the wire:

-   `"str:<value>"` -- a plain string (`<value>` may be empty);
-   `"secret:<value>"` -- a secret carrying `<value>`;
-   `":secret:"` -- a secret with no value yet (resolved at run time).

An unmarked string is rejected. After validation a plain arm is a `str` and a secret arm a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret), so read the value with a normal `str` or with `Secret.value()` respectively. Connector code that must resolve either arm to a concrete value uses the connector-common `_convert` helper.

## Examples

```python
class MyConn(Conn):
    bucket: StrOrSecretSpec
```
