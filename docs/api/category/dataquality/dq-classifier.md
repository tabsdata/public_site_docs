# Classifiers

Source: https://docs.tabsdata.com/api/category/dataquality/dq-classifier/

|  |  |
| --- | --- |
| [`BetweenClassifier`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/betweenclassifier) | A boolean classifier that checks if a value is within a specified range. |
| [`BoolClassifier`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/boolclassifier) | Abstract base class for classifiers with a boolean verdict. |
| [`Categorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/categorizer) | Abstract base class for classifiers that assign each value to a bin. |
| [`Classifier`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/classifier) | Abstract base class for all data quality classifiers. |
| [`DoesNotMatch`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/doesnotmatch) | A boolean classifier that checks whether a value does not match a regular expression. |
| [`ExponentialScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/exponentialscale) | A scale whose bin edges are spaced exponentially over `[min_val, max_val]` (used with `ScaleCategorizer`). |
| [`HasLength`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/haslength) | A boolean classifier that checks whether a value's length is within a range. |
| [`IdentityScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/identityscale) | A scale with one bin per integer step over `[min_val, max_val]` (used with `ScaleCategorizer`). |
| [`InClassifier`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/inclassifier) | A boolean classifier that checks if a value is in a specified set of values. |
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
| [`LinearScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/linearscale) | A scale that splits `[min_val, max_val]` into equal-width bins (used with `ScaleCategorizer`). |
| [`LogarithmicScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/logarithmicscale) | A scale whose bin edges are spaced logarithmically over `[min_val, max_val]` (used with `ScaleCategorizer`). |
| [`MatchClassifier`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/matchclassifier) | A boolean classifier that checks if a value matches a regex pattern. |
| [`Matches`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/matches) | A boolean classifier that checks whether a value matches a regular expression. |
| [`MonomialScale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/monomialscale) | A power-law scale over `[min_val, max_val]` whose bin widths grow as a power of the value (used with `ScaleCategorizer`). |
| [`Scale`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scale) | Abstract base class for the scales used by `ScaleCategorizer`. |
| [`ScaleCategorizer`](https://docs.tabsdata.com/api/category/dataquality/dq-classifier/scalecategorizer) | A classifier that assigns each value to a bin defined by a `Scale`. |
