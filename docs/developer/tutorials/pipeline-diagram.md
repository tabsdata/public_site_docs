# Tutorial Pipeline Visualization

> Interactive visualization of the Tabsdata tutorial pipeline

Source: https://docs.tabsdata.com/developer/tutorials/pipeline-diagram

This is the pipeline you build in the Getting Started tutorial. Click any node to inspect its Python code or table schema.

Tabsdata · Tutorial Pipeline · Execution View

Publisher

pub

pub

Publisher

Committed

Table

persons

persons

//tutorial

✓Data Available

Transformer

tfr

tfr

Transformer

Committed

Table

spanish

spanish

//tutorial

✓Data Available

Table

french

french

//tutorial

✓Data Available

Table

german

german

//tutorial

✓Data Available

Click any node to inspect code or schema

## How it works

The pipeline has three stages:

1.  **Publisher (`pub`)** — reads CSV files from disk, renames columns, and writes to the `persons` table.
2.  **Transformer (`tfr`)** — reads `persons`, filters rows by language, and writes three output tables.
3.  **Tables** — `spanish`, `french`, and `german` each hold the filtered rows for subscribers to consume.

The **dashed blue line** between `persons` → `tfr` represents a data-dependency edge: the transformer triggers automatically whenever `persons` is updated.
