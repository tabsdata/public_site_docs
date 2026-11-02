# Service Tokens

> How a service token lets CI jobs, schedulers and scripts call Tabsdata as its owner without a password, and which of the owner's permissions it carries.

Source: https://docs.tabsdata.com/developer/guide/service-tokens

A **service token** is a credential owned by a user that automation such as CI jobs, schedulers and scripts uses to call Tabsdata as that user, without a password. A service token acts with a narrowed subset of its owner's permissions: project development work only.

## How a service token works

Each user account holds at most two service tokens, in slots `1` and `2`. With two slots, you can create a new token while the old one is still in use.

A token starts with `tdst_` and is displayed only once, when it is created. The server stores only a SHA-256 digest of the token and can never show it again.

Every token is created with a lifetime in days. The deployment's `service_tokens.max_days` setting is the ceiling (90 in the shipped configurations). A token that never expires (`-1`) works only where `max_days` is `-1`. If `max_days` is not set, service tokens are disabled on that deployment.

A token stops working when any of the following happens:

-   the token expires
-   the owner or an administrator revokes the token
-   the owner's account is disabled
-   the owner's account is deleted

Changing the owner's password does not affect existing tokens. A session started with a token is never renewed, and lasts until the token expires or is revoked.

Clients send the token in the `Authorization: Bearer <token>` header.

### Rotating a token

To rotate a token without downtime:

1.  Create a token in the free slot.
2.  Move your consumers to the new token.
3.  Wait until **Last used** for the old slot stops changing. **Last used** updates about every ten minutes.
4.  Revoke the old slot.

## Managing tokens in the UI

Open **Account → Service tokens**. The page shows **Slot 1** and **Slot 2**. A filled slot shows the token's prefix (`tdst_v1_<hint>…`), its comment, and when the token was created, when it expires and when it was last used.

1.  To create a token, click **Create token** in an empty slot. Choose **Expires after a number of days** (90 by default) or **Never expires**, add an optional comment of up to 200 characters, then click **Create token**.
2.  Click **Copy** in the **Token created in slot N** panel. The token is shown only on this page. After you click **Dismiss** or leave the page, you can't get the token back. If you lose it, revoke the slot and create a new token.
3.  To revoke a token, click **Revoke** in a filled slot, then **Revoke token**. Every client using that token stops working immediately.

## Managing tokens with the tdk CLI

To manage tokens, log in with your username and password first.

```bash
tdk auth service-token create --slot 1 --expires-in-days 90 --comment "nightly CI"
tdk auth service-token list
tdk auth service-token revoke --slot 1
```

-   `create` prints the token once. `--expires-in-days` has no default: pass a positive number, or `-1` for a token that never expires.
-   `create` is refused if the slot already has a token. Revoke that slot first.
-   `list` shows each slot's hint, comment, creation time, expiry and **Last used** (updated about every ten minutes).

To run commands as a token, export the token and log in. With no value, `--token` reads the `TDK_TOKEN` environment variable, so the token never appears in shell history:

```bash
export TDK_TOKEN=tdst_v1_...
tdk login --server https://tabsdata.example.com --token
```

`--token` cannot be combined with `--user` or `--password`. A token login is never renewed. When the token expires or is revoked, log in again with a new token.

See [tdk auth](https://docs.tabsdata.com/cli/tdk/auth/) for every flag of the `service-token` commands.

## Permissions a token carries

A token carries two of its owner's project permissions, `view_project` and `develop_project`, in the projects where the owner holds them. A token never has more permissions than its owner.

The server reads the owner's current grants every time the token is used. If an administrator removes a project grant from the owner, the token loses that grant immediately.

Higher roles count. If the owner has `manage_project` on a project, the token gets `develop_project` there. A system admin's token can therefore do development work in every project.

| Area | What the token can do |
| --- | --- |
| Projects | List and read the owner's projects; read their groups, metrics, snapshots and in-flight work |
| Collections | Create, update, delete and read collections; read a collection's connection |
| Functions | Register, update, patch, enable, delete and trigger functions; read history, executions and bundles |
| Tables | Read schema, samples, data versions and lineage; download data; delete tables |
| Runs | List plans, transactions and function runs; cancel and recover them; replay function runs |
| Workers | List workers and read or tail their logs |
| Identity | `GET /auth/info` (who am I) and read its own token record |

## Permissions a token does not carry

Every other operation is refused with `403 This operation cannot be performed with a service token`, even when the owner holds the permission. A leaked token therefore can't grant access, create accounts or create another token.

| Not carried | What this blocks for a token |
| --- | --- |
| `manage_access` (system) | Managing users, permission grants and other users' tokens |
| `manage_roles` (system) | Creating, editing and assigning roles |
| `create_projects` (system) | Creating projects |
| `manage_project` (project) | Updating or deleting a project; creating, changing or deleting its groups |
| Token management | Creating, listing or revoking tokens, including its own. A token can't create its own replacement |
| Account self-service | Changing the owner's password; refreshing or extending its own session |

An administrator with `manage_access` can list and revoke any user's tokens through the REST API (`/users/{user}/service-tokens`), using a password session.
