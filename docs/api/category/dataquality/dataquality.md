# DataQuality

> A data quality check applied to one of a function's output tables.

Source: https://docs.tabsdata.com/api/category/dataquality/dataquality

class

```python
class DataQuality(
    table: TableNameSpec,
    classifiers: ClassifiersSpec,
    operators: OperatorsSpec,
)
```

Bases: [OnTablesAction](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.OnTablesAction)

**Categories:** dq-action

A data quality check applied to one of a function's output tables.

Bundles classifiers (which label each row) with operators (which act on those labels). Pass it to a `@publisher` / `@transformer` / `@subscriber` via `on_tables=[DataQuality(...)]`; the runtime runs the check against the named output table after the function succeeds.

## Examples

```python
DataQuality(
    table="checked",
    classifiers=[IsNull(["value"])],
    operators=[Enrich(), Summary()],
)
```

## Parameters

parameter

`table`[TableNameSpec](https://docs.tabsdata.com/api/module/tabsdatak-api#tabsdatak.api.TableNameSpec) ([str](https://docs.python.org/3/library/stdtypes.html#str))

Output table the check runs on; a valid table name (alphanumerics and underscores, starting with a letter).

parameter

`classifiers`[ClassifiersSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.ClassifiersSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[Classifier](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/classifier)\])

Classifiers that label the table's columns; a non-empty list (at least one).

parameter

`operators`[OperatorsSpec](https://docs.tabsdata.com/api/module/tabsdatak-dataquality#tabsdatak.dataquality.OperatorsSpec) ([list](https://docs.python.org/3/library/stdtypes.html#list)\[[Operator](https://docs.tabsdata.com/api/category/dataquality/dq-operator/operator)\])

Operators applied to the labels -- [`Enrich`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/enrich), [`Summary`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/summary), [`Filter`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/filter), [`Select`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/select) or [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail); a non-empty list (at least one).

## Methods

method

`validate_verdict_columns`

```python
def validate_verdict_columns() -> DataQuality
```
