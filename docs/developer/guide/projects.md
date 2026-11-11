# Projects

> How Projects organize and isolate resources within a Tabsdata Server.

Source: https://docs.tabsdata.com/developer/guide/projects

A **Project** is the top-level workspace inside a Tabsdata Server. Projects organize related workflows and their resources while isolating them from other Projects on the same Server.

This allows multiple teams to share a single Server without interfering with each other's work.

## Working in a Project

Most Tabsdata operations are performed within the context of a Project. You can set a default Project for the `tdk` CLI using:

```bash
tdk set --proj sales_analytics
```

The selected Project remains the default for subsequent commands. Commands that support the `--proj` option can target a different Project without changing the default.

## Managing Projects

Creating a Project establishes an empty workspace within an existing Server. Groups and Collections can then be created to organize the Functions and Tables that make up your workflows.

Deleting a Project removes the Project and its resources without affecting other Projects on the Server.

See [Create a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/create), [Update a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/update), and [Delete a Project](https://docs.tabsdata.com/developer/tutorials/managing-projects/delete) for step-by-step instructions.

## Project Secrets

A Project can hold secrets: named groups of keys and values, such as the credentials of an API that its Functions call. Every Function of the Project can read them while it runs.

Project secrets are for values your own function code needs. Credentials that a connector uses to read from or write to an external system stay in [Connections](https://docs.tabsdata.com/developer/guide/connections).

### Defining secrets

Write the secrets in a YAML file. Each top-level entry is a secret, and each secret maps its keys to their values:

```yaml
weather_api:
  token: abc123                     # the value itself
  account: $secret:WEATHER_ACCOUNT  # read from the WEATHER_ACCOUNT environment variable
  region:                           # no value: keep the value already stored
```

A value written as `$secret:<VARIABLE>` is read from that environment variable in the shell that runs `tdk`, so the value never has to be written in the file. A key with no value keeps the value already stored, or is empty if there is none; write `""` to store an empty value.

NOTE: Only project admins can manage project secrets.

Pass the file when you create or update the Project:

```bash
tdk project create --name sales_analytics --secrets-file secrets.yaml
tdk project update --name sales_analytics --secrets-file secrets.yaml
```

warning

Each update replaces all the secrets of the Project. A secret or key left out of the file is removed.

To see which secrets a Project holds, run:

```bash
tdk project secrets --name sales_analytics
```

It lists each secret and its keys. Values are never shown, and there is no way to read them back out of Tabsdata.

### Reading secrets in a Function

Give the Function a final `ctx: FunctionCtx` parameter and read a value by secret and key:

```python
from tabsdatak.api import FunctionCtx, TableFrame, transformer

@transformer(input_tables=["cities"], output_tables=["forecast"])
def forecast(cities: TableFrame, ctx: FunctionCtx) -> TableFrame:
    token = ctx.secret("weather_api", "token")
    # or, in one string: ctx.secret("weather_api.token")
    ...
```

Secret and key names are not case-sensitive. `ctx.secret_names` lists the secrets of the Project, and `ctx.secret_keys("weather_api")` the keys of one of them. Reading a secret or key that does not exist raises `KeyError`.

note

Only Function code receives Project secrets. Connector plugins do not, and the values are not placed in the Function's environment variables.
