# Manual Triggers

> Covers triggering a Tabsdata Function by hand with `tdk fn trigger` from the CLI or the UI, the default for Publishers without `trigger_by`, and how the resulting Execution Plan runs downstream Functions.

Source: https://docs.tabsdata.com/guide/triggers/manual

A manual trigger runs a Function on demand, from the CLI or the UI. Nothing about the Function's definition needs to change to allow it: every Function can be triggered by hand, including one that already has a cron or Table trigger configured.

_Video: A Function triggered from the Tabsdata CLI_

## From the CLI

```bash
tdk fn trigger --coll <collection_name> --name <function_name>
```

`<function_name>` is the name the Function was registered under, not the name of its file.

## The default for Publishers

A Publisher reads no Tabsdata Tables, so there is nothing upstream that could fire it. With no `trigger_by` on the decorator, a Publisher runs only when triggered manually.

Transformers and Subscribers behave differently, because they do have input Tables. Left unconfigured, they run on a commit to any of them. See [Table Commit Triggers](https://docs.tabsdata.com/guide/triggers/table-commit).

## What a manual trigger actually starts

Triggering one Function does not run only that Function. Tabsdata builds an [Execution Plan](https://docs.tabsdata.com/guide/execution/execution-plans) covering every downstream Function that has to run as a result, and nothing commits unless all of them succeed.

For the UI walkthrough and the full `trigger_by` reference, see [Working with Triggers](https://docs.tabsdata.com/guide/triggers).
