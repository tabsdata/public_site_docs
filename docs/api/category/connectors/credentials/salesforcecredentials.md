# SalesforceCredentials

> Abstract base for Salesforce credential shapes.

Source: https://docs.tabsdata.com/api/category/connectors/credentials/salesforcecredentials

class

```python
class SalesforceCredentials
```

Bases: [Credentials](https://docs.tabsdata.com/api/category/connectors/credentials/credentials), [ABC](https://docs.python.org/3/library/abc.html#abc.ABC)

**Categories:** credentials

Abstract base for Salesforce credential shapes.

Today only [`SalesforceTokenCredentials`](https://docs.tabsdata.com/api/category/connectors/credentials/salesforcetokencredentials) (username + password + security token) is supported; sibling subclasses can add OAuth / JWT auth without changing the connector surface.
