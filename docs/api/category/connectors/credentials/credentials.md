# Credentials

> Abstract base for every credential type.

Source: https://docs.tabsdata.com/api/category/connectors/credentials/credentials

class

```python
class Credentials
```

Bases: [ABC](https://docs.python.org/3/library/abc.html#abc.ABC), `DescriptorBase`

**Categories:** credentials

Abstract base for every credential type.

Concrete credentials are set on a connection's `credentials` field. Each field is a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret); a bare string is auto-wrapped as `Secret(...)` at validation time.
