---
title: Phylogeny
weight: 100
toc: true
---

## Phylogeny

The tree of 2,399,238 samples from the 2024-08 release can be downloaded from [OSF](link), or browsed interactively on [taxonium](https://www.taxonium.org/atb).

Note this includes all samples, not just high-quality samples.

## Construction

### Marker gene alignment

Broadly followed this approach: https://pubmed.ncbi.nlm.nih.gov/16513982/.

The alignment was constructed using 120 bacterial marker genes from [GTDB](https://www.nature.com/articles/nbt.4229). Each sample was annotated with [pyrodigal](https://pyrodigal.readthedocs.io/en/stable/), then [pyhmmer](https://pyhmmer.readthedocs.io/en/stable) was used to align the predicted genes with the profile HMMs for each marker gene. These alignments were concatenated to create a global alignment for all samples.

### Tree

The tree was built by a divide-and-conquer approach. Representatives were picked using [gemsparcl](https://www.biorxiv.org/content/10.64898/2025.12.30.695181v2), resulting in 21593 top-level clusters. These were used to build a backbone tree. For each cluster with at least three samples, a tree was built within the cluster, including its nearest neighbour in the backbone tree as an outgroup. These subtrees were then grafted to the backbone tree using the same root between the outgroup as in the subtree and backbone tree. All trees were built with [VeryFastTree](https://doi.org/10.1093/bioinformatics/btaa582).

Each cluster was assigned to a species using [GTDB-tk](https://academic.oup.com/bioinformatics/article/36/6/1925/5626182). The full taxonomic designation was filled out using [TaxonKit](https://bioinf.shenwei.me/taxonkit/tutorial/). These are copied across all members of each cluster.

## Subsetting

An example of some R code to subset the tree to an order (e.g. `Mycobacteriales`):

```r
library(ape)
atb_tree <- read.tree("ATB_tree_batch2_cleaned.nwk")
ATB_tax <- read.csv("ATB_tree_taxonomic_assignments_GTDB.csv")

# subset
myco <- ATB_tax[ATB_tax$Order == "Mycobacteriales", 1]
myco_tree <- keep.tip(atb_tree, myco)

# write
write.tree(myco_tree, "ATB_myco_order.nwk")
write.table(ATB_tax[ATB_tax$Order == "Mycobacteriales", ], file = "ATB_myco_meta.csv", quote = F, row.names = F, col.names = T, sep = ",")
```
