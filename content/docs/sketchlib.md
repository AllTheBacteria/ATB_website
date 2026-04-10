---
title: Sequence distances with sketchlib
weight: 145
toc: true
---

Sketchlib is a tool for rapid sketching and distance estimation, which is
available from https://github.com/bacpop/sketchlib.rust.

Sketchlib indexes are available from OSF here: https://osf.io/rceq5/overview.

The latest index, which is all assemblies up to and including
incremental release 202505 (ie it is release 0.2 plus incremental releases
202408 and 202505), is in the files
`Aggregated/atb_sketchlib.aggregated.202505.skd` and
`Aggregated/atb_sketchlib.aggregated.202505.skm`.
Older index files are also available.

The distributed indexes have sketch size `1024` with `k=17`.

To calculate distances of a subset of the data, use a command such as:
```
sketchlib dist -v -k 17 --subset Haemophilus_influenzae.txt --ani atb_sketchlib.aggregated.202505 --threads 4 > dists.txt
```
Where the `--subset` file contains the list of samples you want to include.
Removing `--ani` will calculate Jaccard distances.

To query new samples against the index, first sketch it:
```
sketchlib sketch -v -o query -k 17 -f queries.tsv -s 1024
```
(where `queries.tsv` contains query samples with name and file location, tab separated)

Then query it
```
sketchlib dist -v -k 17 atb_sketchlib.aggregated.202505 query
```

