# tabsdatak.dataquality

> tabsdatak.dataquality API reference.

Source: https://docs.tabsdata.com/api/module/tabsdatak-dataquality

|  |  |
| --- | --- |
| [`AllOk`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/allok) | A boolean criteria that selects rows where every boolean classifier passes (`True`). |
| [`AnyFailed`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/anyfailed) | A boolean criteria that selects rows where at least one boolean classifier fails (`False`). |
| [`BetweenClassifier`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/betweenclassifier) | A boolean classifier that checks if a value is within a specified range. |
| [`BinCountSpec`](#tabsdatak.dataquality.BinCountSpec) | A type alias for the number of bins a Scale will have, between 1 and MAX\_BINS. |
| [`BinIdxSpec`](#tabsdatak.dataquality.BinIdxSpec) | A type alias for a zero-based bin index, constrained by MAX\_BINS. |
| [`BinsCriteriaSpec`](#tabsdatak.dataquality.BinsCriteriaSpec) | A non-empty set of bins used in criteria. |
| [`BinSpec`](#tabsdatak.dataquality.BinSpec) | A type alias for the bin, either an index \[0..100\] or a special one \[none, nan, underflow, overflow\] |
| [`BoolClassifier`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/boolclassifier) | Abstract base class for classifiers with a boolean verdict. |
| [`BoolCriteria`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/boolcriteria) | Abstract base for criteria over boolean classifier verdicts. |
| [`Categorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/categorizer) | Abstract base class for classifiers that assign each value to a bin. |
| [`CategoryCriteria`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/categorycriteria) | Abstract base for criteria over a categorizer's bin assignments. |
| [`Classifier`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/classifier) | Abstract base class for all data quality classifiers. |
| [`ClassifiersSpec`](#tabsdatak.dataquality.ClassifiersSpec) | A non-empty list of `Classifier` instances. |
| [`ColumnNameSpec`](#tabsdatak.dataquality.ColumnNameSpec) | A type alias for a single column name, represented as a string. |
| [`ColumnNamesWithAltSpec`](#tabsdatak.dataquality.ColumnNamesWithAltSpec) | A list of column references. |
| [`ColumnNameWithAltSpec`](#tabsdatak.dataquality.ColumnNameWithAltSpec) | A single column reference: either the source column name, or a `(source, destination)` tuple naming the column to store the result in (`destination` may be `None` to auto-generate it). |
| [`Criteria`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteria) | Selects rows for a `Filter`, `Select` or `Fail` operator. |
| [`CriteriaOperator`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteriaoperator) | An operator that uses a criteria to select records. |
| [`DataQuality`](https://docs.tabsdata.com/api/category/dataquality/dataquality) | A data quality check applied to one of a function's output tables. |
| [`DoesNotMatch`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/doesnotmatch) | A boolean classifier that checks whether a value does not match a regular expression. |
| [`Enrich`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/enrich) | An operator that appends each classifier's verdict column to the target table. |
| [`ExponentialScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/exponentialscale) | A scale whose bin edges are spaced exponentially over `[min_val, max_val]` (used with `ScaleCategorizer`). |
| [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail) | An operator that fails (aborts) the current transaction when the rows selected by `criteria` reach `threshold`. |
| [`Filter`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/filter) | An operator that removes the rows selected by `criteria` from the target table. |
| [`HasLength`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/haslength) | A boolean classifier that checks whether a value's length is within a range. |
| [`IdentityScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/identityscale) | A scale with one bin per integer step over `[min_val, max_val]` (used with `ScaleCategorizer`). |
| [`InBins`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/inbins) | A category criteria that selects rows whose bin is one of the given bins. |
| [`InClassifier`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/inclassifier) | A boolean classifier that checks if a value is in a specified set of values. |
| [`IncludeQualityColumnsSpec`](#tabsdatak.dataquality.IncludeQualityColumnsSpec) | A type alias for quality columns to included in the Select or Filter target table. |
| [`IsBetween`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isbetween) | A boolean classifier that checks whether a value is inside a range. |
| [`IsFalse`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isfalse) | A boolean classifier that checks whether a value is `False`. |
| [`IsIn`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isin) | A boolean classifier that checks whether a value is in a set of values. |
| [`IsNan`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isnan) | A boolean classifier that checks whether a value is `NaN` (not a number). |
| [`IsNegative`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isnegative) | A boolean classifier that checks whether a numeric value is negative. |
| [`IsNegativeOrZero`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isnegativeorzero) | A boolean classifier that checks whether a numeric value is negative or zero. |
| [`IsNotBetween`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isnotbetween) | A boolean classifier that checks whether a value is outside a range. |
| [`IsNotIn`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isnotin) | A boolean classifier that checks whether a value is not in a set of values. |
| [`IsNotNan`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isnotnan) | A boolean classifier that checks whether a value is not `NaN`. |
| [`IsNotNull`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isnotnull) | A boolean classifier that checks whether a value is not null. |
| [`IsNotNullNorNan`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isnotnullnornan) | A boolean classifier that checks whether a value is neither null nor `NaN`. |
| [`IsNotZero`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isnotzero) | A boolean classifier that checks whether a numeric value is not zero. |
| [`IsNull`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isnull) | A boolean classifier that checks whether a value is null. |
| [`IsNullOrNan`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/isnullornan) | A boolean classifier that checks whether a value is null or `NaN`. |
| [`IsPositive`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/ispositive) | A boolean classifier that checks whether a numeric value is positive. |
| [`IsPositiveOrZero`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/ispositiveorzero) | A boolean classifier that checks whether a numeric value is positive or zero. |
| [`IsTrue`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/istrue) | A boolean classifier that checks whether a value is `True`. |
| [`IsZero`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/iszero) | A boolean classifier that checks whether a numeric value is zero. |
| [`LenSpec`](#tabsdatak.dataquality.LenSpec) | A type alias for a non-negative integer, typically used for specifying length. |
| [`LinearScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/linearscale) | A scale that splits `[min_val, max_val]` into equal-width bins (used with `ScaleCategorizer`). |
| [`LogarithmicScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/logarithmicscale) | A scale whose bin edges are spaced logarithmically over `[min_val, max_val]` (used with `ScaleCategorizer`). |
| [`MatchClassifier`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/matchclassifier) | A boolean classifier that checks if a value matches a regex pattern. |
| [`Matches`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/matches) | A boolean classifier that checks whether a value matches a regular expression. |
| [`MAX_BINS`](#tabsdatak.dataquality.MAX_BINS) | The maximum number of bins allowed in a bucketing operation. |
| [`MonomialScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/monomialscale) | A power-law scale over `[min_val, max_val]` whose bin widths grow as a power of the value (used with `ScaleCategorizer`). |
| [`NotInBins`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/notinbins) | A category criteria that selects rows whose bin is not among the given bins. |
| [`OnInvalidColumnSpec`](#tabsdatak.dataquality.OnInvalidColumnSpec) | A type alias that specifies what to do if a column is invalid for the classifier. |
| [`OnInvalidValueSpec`](#tabsdatak.dataquality.OnInvalidValueSpec) | A type alias that specifies what to do if a classifier value is invalid for column. |
| [`Operator`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/operator) | Abstract base class for all data quality operators. |
| [`OperatorsSpec`](#tabsdatak.dataquality.OperatorsSpec) | A non-empty list of `Operator` instances. |
| [`PercentSpec`](#tabsdatak.dataquality.PercentSpec) | A type alias for a percentage value, which can be an integer or a float between 0 and 100. |
| [`PercentThreshold`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/percentthreshold) | A `Fail` threshold expressed as a percentage of the table's rows. |
| [`PythonDataTypeSpec`](#tabsdatak.dataquality.PythonDataTypeSpec) | A type alias for a union of common Python data types used in data quality checks. |
| [`RangeClosedOnSpec`](#tabsdatak.dataquality.RangeClosedOnSpec) | A type alias that specifies which side of a range is closed (inclusive). |
| [`RangeValueSpec`](#tabsdatak.dataquality.RangeValueSpec) | A type alias for a value used in defining a range, based on Python data types. |
| [`RowCountSpec`](#tabsdatak.dataquality.RowCountSpec) | A type alias for a non-negative row count. |
| [`RowCountThreshold`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/rowcountthreshold) | A `Fail` threshold expressed as an absolute number of rows. |
| [`Scale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scale) | Abstract base class for the scales used by `ScaleCategorizer`. |
| [`ScaleBaseSpec`](#tabsdatak.dataquality.ScaleBaseSpec) | A type alias for the base of a scale, which must be a float greater than 0. |
| [`ScaleCategorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer) | A classifier that assigns each value to a bin defined by a `Scale`. |
| [`ScaleIdentityLimitSpec`](#tabsdatak.dataquality.ScaleIdentityLimitSpec) | A type alias for a limit in a scale identity, ranging from 0 to 100. |
| [`ScaleLimitSpec`](#tabsdatak.dataquality.ScaleLimitSpec) | A type alias for a generic limit in a scale, which can be an integer or a float. |
| [`ScalePowerSpec`](#tabsdatak.dataquality.ScalePowerSpec) | A type alias for the power of a scale, which must be a float greater than 0. |
| [`Select`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/select) | An operator that copies the rows selected by `criteria` to another table, leaving the target table unchanged. |
| [`SpecialBinSpec`](#tabsdatak.dataquality.SpecialBinSpec) | A type alias for the bins for None, NaN, underflow and overflow values. |
| [`Summary`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/summary) | An operator that writes a data quality summary (one row per classifier: verdict tallies, or bin counts for a categorizer) to a table. |
| [`TagOperator`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/tagoperator) | An operator that is scoped to classifiers by tag. |
| [`TagSpec`](#tabsdatak.dataquality.TagSpec) | A type alias for a single tag, represented as a string. |
| [`TagsSpec`](#tabsdatak.dataquality.TagsSpec) | A list of tags. |
| [`Threshold`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/threshold) | Abstract base class for the thresholds used by the `Fail` operator. |
| [`ValuesSpec`](#tabsdatak.dataquality.ValuesSpec) | A non-empty set of values to check membership against (`None` is allowed, to test for null membership). |

* * *

## BinCountSpec

type\_alias

```python
BinCountSpec: StrictInt
```

A type alias for the number of bins a Scale will have, between 1 and MAX\_BINS.

* * *

## BinIdxSpec

type\_alias

```python
BinIdxSpec: StrictInt
```

A type alias for a zero-based bin index, constrained by MAX\_BINS.

* * *

## BinsCriteriaSpec

type\_alias

```python
BinsCriteriaSpec: Set[BinSpec]
```

**Resolved type:**

```python
Set[StrictInt | Literal['none', 'nan', 'underflow', 'overflow']]
```

A non-empty set of bins used in criteria.

* * *

## BinSpec

type\_alias

```python
BinSpec: Union[BinIdxSpec, SpecialBinSpec]
```

**Resolved type:**

```python
StrictInt | Literal['none', 'nan', 'underflow', 'overflow']
```

A type alias for the bin, either an index \[0..100\] or a special one \[none, nan, underflow, overflow\]

* * *

## ClassifiersSpec

type\_alias

```python
ClassifiersSpec: list[Classifier]
```

A non-empty list of [`Classifier`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/classifier) instances.

* * *

## ColumnNameSpec

type\_alias

```python
ColumnNameSpec: str
```

A type alias for a single column name, represented as a string.

* * *

## ColumnNamesWithAltSpec

type\_alias

```python
ColumnNamesWithAltSpec: list[ColumnNameWithAltSpec]
```

**Resolved type:**

```python
list[str | tuple[str, str | None]]
```

A list of column references. Each element is a source column name or a `(source, destination)` tuple; the two forms may be mixed.

* * *

## ColumnNameWithAltSpec

type\_alias

```python
ColumnNameWithAltSpec: Union[ColumnNameSpec, tuple[ColumnNameSpec, Union[ColumnNameSpec, None]]]
```

**Resolved type:**

```python
str | tuple[str, str | None]
```

A single column reference: either the source column name, or a `(source, destination)` tuple naming the column to store the result in (`destination` may be `None` to auto-generate it).

* * *

## IncludeQualityColumnsSpec

type\_alias

```python
IncludeQualityColumnsSpec: Literal['none', 'criteria', 'all']
```

A type alias for quality columns to included in the Select or Filter target table.

* * *

## LenSpec

type\_alias

```python
LenSpec: StrictInt
```

A type alias for a non-negative integer, typically used for specifying length.

* * *

## MAX\_BINS

constant

```python
MAX_BINS = 100
```

The maximum number of bins allowed in a bucketing operation.

* * *

## OnInvalidColumnSpec

type\_alias

```python
OnInvalidColumnSpec: Literal['ignore', 'fail']
```

A type alias that specifies what to do if a column is invalid for the classifier.

* * *

## OnInvalidValueSpec

type\_alias

```python
OnInvalidValueSpec: Literal['ignore', 'fail']
```

A type alias that specifies what to do if a classifier value is invalid for column.

* * *

## OperatorsSpec

type\_alias

```python
OperatorsSpec: list[Operator]
```

A non-empty list of [`Operator`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/operator) instances.

* * *

## PercentSpec

type\_alias

```python
PercentSpec: Union[StrictInt, StrictFloat]
```

**Resolved type:**

```python
StrictInt | StrictFloat
```

A type alias for a percentage value, which can be an integer or a float between 0 and 100.

* * *

## PythonDataTypeSpec

type\_alias

```python
PythonDataTypeSpec: Union[int, float, bool, str, date, time, datetime, timedelta, bytes, Decimal]
```

**Resolved type:**

```python
int | float | bool | str | date | time | datetime | timedelta | bytes | Decimal
```

A type alias for a union of common Python data types used in data quality checks.

* * *

## RangeClosedOnSpec

type\_alias

```python
RangeClosedOnSpec: Literal['none', 'lower', 'upper', 'both']
```

A type alias that specifies which side of a range is closed (inclusive).

-   'none': The range is open on both sides.
-   'lower': The range is closed on the lower bound.
-   'upper': The range is closed on the upper bound.
-   'both': The range is closed on both sides.

* * *

## RangeValueSpec

type\_alias

```python
RangeValueSpec: PythonDataTypeSpec
```

**Resolved type:**

```python
int | float | bool | str | date | time | datetime | timedelta | bytes | Decimal
```

A type alias for a value used in defining a range, based on Python data types.

* * *

## RowCountSpec

type\_alias

```python
RowCountSpec: StrictInt
```

A type alias for a non-negative row count.

* * *

## ScaleBaseSpec

type\_alias

```python
ScaleBaseSpec: StrictFloat
```

A type alias for the base of a scale, which must be a float greater than 0.

* * *

## ScaleIdentityLimitSpec

type\_alias

```python
ScaleIdentityLimitSpec: StrictInt
```

A type alias for a limit in a scale identity, ranging from 0 to 100.

* * *

## ScaleLimitSpec

type\_alias

```python
ScaleLimitSpec: Union[StrictInt, StrictFloat]
```

**Resolved type:**

```python
StrictInt | StrictFloat
```

A type alias for a generic limit in a scale, which can be an integer or a float.

* * *

## ScalePowerSpec

type\_alias

```python
ScalePowerSpec: StrictFloat
```

A type alias for the power of a scale, which must be a float greater than 0.

* * *

## SpecialBinSpec

type\_alias

```python
SpecialBinSpec: Literal['none', 'nan', 'underflow', 'overflow']
```

A type alias for the bins for None, NaN, underflow and overflow values.

* * *

## TagSpec

type\_alias

```python
TagSpec: str
```

A type alias for a single tag, represented as a string.

* * *

## TagsSpec

type\_alias

```python
TagsSpec: list[TagSpec]
```

**Resolved type:**

```python
list[str]
```

A list of tags.

* * *

## ValuesSpec

type\_alias

```python
ValuesSpec: frozenset[Union[PythonDataTypeSpec, None]]
```

**Resolved type:**

```python
frozenset[int | float | bool | str | date | time | datetime | timedelta | bytes | Decimal | None]
```

A non-empty set of values to check membership against (`None` is allowed, to test for null membership). A list passed to the constructor is coerced to a `frozenset` (deduplicated) by pydantic.
