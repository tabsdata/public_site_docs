# SalesforceTokenCredentials

> Salesforce username / password / security-token credentials.

Source: https://docs.tabsdata.com/api/category/connectors/credentials/salesforcetokencredentials

class

```python
class SalesforceTokenCredentials(
    username: Secret,
    password: Secret,
    security_token: Secret,
)
```

Bases: [SalesforceCredentials](https://docs.tabsdata.com/api/category/connectors/credentials/salesforcecredentials)

**Categories:** credentials

Salesforce username / password / security-token credentials.

The standard SOAP / REST credential triple. Each field accepts a plain string or a [`Secret`](https://docs.tabsdata.com/api/category/connectors/credentials/secret); the plugin combines `password` and `security_token` in Salesforce's concatenated-secret format at login.

## Parameters

parameter

`username`[Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret)

Salesforce login username, e.g. `"user@example.com"`.

parameter

`password`[Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret)

Salesforce login password.

parameter

`security_token`[Secret](https://docs.tabsdata.com/api/category/connectors/credentials/secret)

User-specific security token (reset from Salesforce setup > Reset My Security Token).
