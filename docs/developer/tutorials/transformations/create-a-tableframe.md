# Create a TableFrame

Source: https://docs.tabsdata.com/developer/tutorials/transformations/create-a-tableframe

While TableFrames are typically received as input in publishers and transformers, you can also create them programmatically for testing or data generation purposes.

## From a Dictionary

Use `TableFrame.from_dict()` to create a TableFrame from a Python dictionary:

transform.py

```python
from tabsdatak.tableframe import TableFrame

data = {
    "name": ["Alice", "Bob", "Charlie"],
    "age": [25, 30, 35],
    "city": ["New York", "London", "Paris"]
}

tf = TableFrame.from_dict(data)
```

## From Pandas

Convert a Pandas DataFrame to a TableFrame:

transform.py

```python
import pandas as pd
from tabsdatak.tableframe import TableFrame

df = pd.DataFrame({
    "product": ["Widget", "Gadget"],
    "price": [19.99, 29.99]
})

tf = TableFrame.from_pandas(df)
```

## From Polars

Convert from Polars LazyFrame or DataFrame:

transform.py

```python
import polars as pl
from tabsdatak.tableframe import TableFrame

# From Polars LazyFrame
lf = pl.LazyFrame({"x": [1, 2, 3], "y": [4, 5, 6]})
tf = TableFrame.from_polars(lf)

# From Polars DataFrame
pdf = pl.DataFrame({"x": [1, 2, 3], "y": [4, 5, 6]})
tf = TableFrame.from_polars(pdf)
```

## Converting TableFrames

Export TableFrames to other formats:

transform.py

```python
# To dictionary
data_dict = tf.to_dict()

# To Pandas DataFrame
pandas_df = tf.to_pandas()

# To Polars DataFrame
polars_df = tf.to_polars_df()

# To Polars LazyFrame
polars_lf = tf.to_polars_lf()
```

See [TableFrame API Guide](https://docs.tabsdata.com/developer/guide/tables) for the whole API in one place.
