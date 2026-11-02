# Inspect a TableFrame

> Inspect a TableFrame's schema, dtypes, column checks, emptiness, and query plan with tf.dtypes, has_cols, assert_has_cols, has_same_schema, is_empty, empty, clear, explain, and show_graph.

Source: https://docs.tabsdata.com/tutorials/transformations/inspect-a-tableframe

Access metadata about your TableFrame.

## Schema Information

transform.py

```python
# Get column data types
dtypes = tf.dtypes

# Check if columns exist
tf.has_cols("column_name")
tf.has_cols(["col1", "col2"])

# Assert columns exist (raises error if not)
tf.assert_has_cols(["required_col1", "required_col2"])

# Compare schemas
tf.has_same_schema(other_tf)
```

## Empty Checks

transform.py

```python
# Check if TableFrame is empty
tf.is_empty()

# Create an empty TableFrame with same schema
empty_tf = tf.empty()

# Clear all rows
cleared_tf = tf.clear()
```

## Query Explanation

For debugging and optimization:

transform.py

```python
# Get query plan explanation
plan = tf.explain()
print(plan)

# Visualize query graph
tf.show_graph()
```

See [TableFrame API Guide](https://docs.tabsdata.com/guide/tables) for the whole API in one place.
