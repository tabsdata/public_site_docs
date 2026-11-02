# Register a Function

Source: https://docs.tabsdata.com/developer/tutorials/managing-functions/register

Before you begin

[Create a Collection](https://docs.tabsdata.com/developer/tutorials/managing-collections/create)

A function is a Python file and the function inside it, registered into a collection. The kind of function a collection accepts follows from the group it was created in: a source collection takes publishers, a destination collection takes subscribers, and a data product collection takes transformers.

Step 1Register the function

```bash
tdk fn register \
  --coll reporting \
  --path summarize.py::summarize \
  --description "Rolls orders up by region"
```

`--path` names the file and the function inside it as `file.py::function_name`. Re-register after every code change — `tdk fn register` creates a new function version each time.

Step 2Confirm it exists

```bash
tdk fn get --coll reporting --name summarize
```

`--show-history` on `tdk fn get` lists every version the function has gone through, newest first.

## Registering an existing function again

`tdk fn register` rejects a name that already exists in the collection unless you pass `--update`, which registers the new code as the next version of the same function instead of erroring.

```bash
tdk fn register \
  --coll reporting \
  --path summarize.py::summarize \
  --update
```

## Reusing existing tables

`--reuse-tables` tells the registration to keep any of the function's output tables that already exist in the collection, rather than erroring because they are already there.

## Enabling and disabling

A function registers enabled by default. `--enabled false` at registration time, or `tdk fn disable --coll <collection> --name <function>` afterward, stops it from running without deleting it. `tdk fn enable` turns it back on.

## What to do next

[Trigger the function](https://docs.tabsdata.com/developer/guide/functions/) or wait for whatever trigger it was given to fire it on its own. See [`tdk fn register`](https://docs.tabsdata.com/cli/tdk/fn/register) for the full option list.
