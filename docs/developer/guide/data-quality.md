# Data Quality

Source: https://docs.tabsdata.com/developer/guide/data-quality

**Data quality** checks validate the rows of a Table as a Function writes it. A check is a `DataQuality` object passed to a Publisher or Transformer through the `on_tables` argument of its decorator. After the Function succeeds, Tabsdata runs the check against the named output Table, where it can label rows, remove or copy rows that fail, write a summary, or fail the Transaction.

Data quality checks are available on `@publisher`, `@stream_publisher`, and `@transformer`. `@subscriber` does not take `on_tables`.

```python
from tabsdatak.api import transformer, TableFrameSpec
from tabsdatak.dataquality import (
    AnyFailed,
    DataQuality,
    Filter,
    IsBetween,
    IsIn,
    IsNotNull,
    Summary,
)


# transformer that dedupes the raw orders, with a data quality check that moves
# rows failing any rule to orders_rejected and writes a summary of the verdicts
@transformer(
    input_tables=["raw_orders"],
    output_tables=["orders"],
    on_tables=[
        DataQuality(
            table="orders",
            classifiers=[
                IsNotNull(["order_id"]),
                IsBetween(["amount"], min_val=0, max_val=10000),
                IsIn(["status"], values={"open", "shipped", "cancelled"}),
            ],
            operators=[
                Filter(AnyFailed(), to_table="orders_rejected", include_quality_columns="criteria"),
                Summary(),
            ],
        ),
    ],
)
def clean_orders(raw_orders: TableFrameSpec) -> TableFrameSpec:
    return raw_orders.unique()
```

A `DataQuality` check has three parts:

-   **table**: the output Table the check runs on
-   **classifiers**: the rules that label each row, at least one
-   **operators**: what to do with the labels, at least one

## Classifiers

A classifier evaluates one or more columns and writes a verdict for each row into a new verdict column. Classifiers fall into two kinds: **boolean classifiers** decide whether each value passes a rule, and **categorizers** assign each value to a bin.

### Boolean classifiers

| Checks | Classifiers |
| --- | --- |
| Null and NaN | `IsNull`, `IsNotNull`, `IsNan`, `IsNotNan`, `IsNullOrNan`, `IsNotNullNorNan` |
| Sign of a number | `IsPositive`, `IsNegative`, `IsZero`, `IsNotZero`, `IsPositiveOrZero`, `IsNegativeOrZero` |
| Booleans | `IsTrue`, `IsFalse` |
| Ranges | `IsBetween`, `IsNotBetween` |
| Sets of values | `IsIn`, `IsNotIn` |
| Text | `Matches`, `DoesNotMatch`, `HasLength` |

```python
from tabsdatak.dataquality import HasLength, IsBetween, IsIn, IsNotNull, Matches

IsNotNull(["order_id", "customer_id"])
IsBetween(["amount"], min_val=0, max_val=10000, closed_on="both")
IsIn(["status"], values={"open", "shipped", "cancelled"})
Matches(["email"], pattern=r"^[^@]+@[^@]+$")
HasLength(["country_code"], min_len=2, max_len=2)
```

Classifiers share these settings:

-   **column\_names**: the columns to classify. Each entry is a column name, or a `(column, verdict_column)` tuple that names the verdict column. When omitted, the classifier applies to every user column.
-   **on\_missing\_column**: `"ignore"` (the default) skips a named column that is not in the Table, and `"fail"` fails the check.
-   **on\_wrong\_type**: `"ignore"` (the default) skips a column whose data type the classifier does not support, and `"fail"` fails the check.
-   **on\_wrong\_value**: `"ignore"` (the default) gives a null verdict for a value that cannot be evaluated, and `"fail"` fails the check.
-   **tags**: labels that scope operators to this classifier.
-   **prefix**: text added to the start of every verdict column name. Defaults to `@td.dq.`, and `""` adds no prefix.

### Categorizers

`ScaleCategorizer` assigns each numeric value to a bin of a scale. The verdict column holds the bin number, or a reserved value for a null, a NaN, or a value below or above the scale.

| Scale | Bin edges |
| --- | --- |
| `LinearScale` | Equal-width bins |
| `LogarithmicScale` | Spaced logarithmically |
| `ExponentialScale` | Spaced exponentially |
| `MonomialScale` | Bin widths that grow as a power law |
| `IdentityScale` | One bin per integer |

```python
from tabsdatak.dataquality import InBins, LinearScale, ScaleCategorizer, Select

# splits amount into five equal-width bins between 0 and 10000
ScaleCategorizer([("amount", "amount_bin")], scale=LinearScale(0.0, 10000.0, bins=5), prefix="")

# copies orders in the top bin, or above the scale, to large_orders
Select(InBins(column_name="amount_bin", bins={5, "overflow"}), to_table="large_orders")
```

Bins are numbered from 1. A scale created with `use_bin_zero=True` gives its minimum value a bin 0 of its own.

## Criteria

Criteria select the rows that the `Filter`, `Select`, and `Fail` operators act on.

| Criteria | Selects rows where |
| --- | --- |
| `AllOk()` | Every boolean classifier passes |
| `AnyFailed()` | At least one boolean classifier fails |
| `InBins(column_name, bins)` | A categorizer's bin is one of `bins` |
| `NotInBins(column_name, bins)` | A categorizer's bin is not one of `bins` |

`AllOk` and `AnyFailed` treat a null or NaN verdict as a failure, unless `none_is_ok=True` or `nan_is_ok=True` is set. `InBins` and `NotInBins` accept bin numbers from 0 to 100 and the special bins `"none"`, `"nan"`, `"underflow"`, and `"overflow"`.

## Operators

| Operator | Effect |
| --- | --- |
| `Enrich()` | Adds each classifier's verdict column to the Table, or to `to_table`. No rows are removed. |
| `Summary()` | Writes a summary with one row per classifier, holding its verdict counts or bin counts, to a Table named `<table>_dq_summary`, or to `table`. |
| `Filter(criteria)` | Removes the selected rows. They are discarded, or written to `to_table`. |
| `Select(criteria, to_table)` | Copies the selected rows to `to_table`, leaving the Table unchanged. |
| `Fail(criteria, threshold)` | Fails the Transaction when the number of selected rows reaches the threshold. |

`Filter` and `Select` take `include_quality_columns` to choose which verdict columns are carried into `to_table`: `"none"` (the default), `"criteria"`, or `"all"`. The checked Table never carries them.

### Failing a Transaction

`Fail` takes a threshold of rows, as a count or as a percentage of the Table:

```python
from tabsdatak.dataquality import AnyFailed, Fail, PercentThreshold, RowCountThreshold

# fails as soon as one row fails a rule
Fail(criteria=AnyFailed(), threshold=RowCountThreshold(1))

# fails when a twentieth of the table fails a rule
Fail(criteria=AnyFailed(), threshold=PercentThreshold(5))
```

A failed Transaction commits none of its Tables.

## Tags

Tags scope an operator to some of a check's classifiers. An operator with tags applies only to the classifiers that carry a matching tag, and an operator without tags applies to all of them.

```python
from tabsdatak.dataquality import (
    AnyFailed,
    DataQuality,
    Fail,
    Filter,
    IsNotNull,
    Matches,
    RowCountThreshold,
)

DataQuality(
    table="customers",
    classifiers=[
        IsNotNull(["customer_id"], tags=["critical"]),
        Matches(["email"], pattern=r"^[^@]+@[^@]+$", tags=["cleanup"]),
    ],
    operators=[
        # fails the transaction on a missing key
        Fail(criteria=AnyFailed(tags=["critical"]), threshold=RowCountThreshold(1)),
        # moves rows with a malformed email aside without failing
        Filter(AnyFailed(tags=["cleanup"]), to_table="customers_bad_email"),
    ],
)
```
