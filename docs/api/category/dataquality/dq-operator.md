# Operations

Source: https://docs.tabsdata.com/api/category/dataquality/dq-operator/

|  |  |
| --- | --- |
| [`AllOk`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/allok) | A boolean criteria that selects rows where every boolean classifier passes (`True`). |
| [`AnyFailed`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/anyfailed) | A boolean criteria that selects rows where at least one boolean classifier fails (`False`). |
| [`BoolCriteria`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/boolcriteria) | Abstract base for criteria over boolean classifier verdicts. |
| [`CategoryCriteria`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/categorycriteria) | Abstract base for criteria over a categorizer's bin assignments. |
| [`Criteria`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteria) | Selects rows for a `Filter`, `Select` or `Fail` operator. |
| [`CriteriaOperator`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/criteriaoperator) | An operator that uses a criteria to select records. |
| [`Enrich`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/enrich) | An operator that appends each classifier's verdict column to the target table. |
| [`Fail`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/fail) | An operator that fails (aborts) the current transaction when the rows selected by `criteria` reach `threshold`. |
| [`Filter`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/filter) | An operator that removes the rows selected by `criteria` from the target table. |
| [`InBins`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/inbins) | A category criteria that selects rows whose bin is one of the given bins. |
| [`NotInBins`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/notinbins) | A category criteria that selects rows whose bin is not among the given bins. |
| [`Operator`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/operator) | Abstract base class for all data quality operators. |
| [`PercentThreshold`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/percentthreshold) | A `Fail` threshold expressed as a percentage of the table's rows. |
| [`RowCountThreshold`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/rowcountthreshold) | A `Fail` threshold expressed as an absolute number of rows. |
| [`Select`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/select) | An operator that copies the rows selected by `criteria` to another table, leaving the target table unchanged. |
| [`Summary`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/summary) | An operator that writes a data quality summary (one row per classifier: verdict tallies, or bin counts for a categorizer) to a table. |
| [`TagOperator`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/tagoperator) | An operator that is scoped to classifiers by tag. |
| [`Threshold`](https://docs.tabsdata.com/api/category/dataquality/dq-operator/threshold) | Abstract base class for the thresholds used by the `Fail` operator. |
