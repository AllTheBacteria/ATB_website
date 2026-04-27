---
title: Antimicrobial resistance
weight: 80
toc: true
---

## AMRFinderPlus

The results of running AMRFinderPlus for AllTheBacteria are available on
OSF in the [AMRFinderPlus component](https://osf.io/7nwrx/). 

The `latest` subfolder contains the most recent aggregated
results of running on all samples in the AllTheBacteria dataset and can
be found here: [AMRFP_results.tsv.gz](https://osf.io/ck7st).

The results are organized into folders based on the version of `amrfinder` that was
used, and sub-folders within these based on the `amrfinder database`
version used. 

The current version of the AMRFinderPlus results were run using a Nextflow pipeline [found here](https://github.com/jhawkey/atb-amrfp-nf/tree/main) using **AMRFinderPlus version v.2.5 with database 2025-12.03.1**.

Genomes were matched to the organism available in AMRFinderPlus where possible; a table linking each ATB species to its corresponding AMRFinderPlus species [can be found here](https://github.com/jhawkey/atb-amrfp-nf/blob/main/unique_ATB_spp.txt).

Each table of results has a matched status file. The status file
indicates which samples we have run `amrfinder` on in the `sample`
column, whether the run completed successfully (`PASS`), failed
(`FAIL`), or is yet to be run (`NOT DONE`) in the `status` column. There
is an additional column for any comments, such as indicating if the
output of `amrfinder` was empty if no AMR determinants were identified (`no AMRFinderPlus hits detected`).
We also include a copy of the `amrfinder` database we used in each
`database` sub-folder.

## Updates to AMR calls
The dataset will be updated at least yearly with newer version of AMRFinderPlus and its database; therefore, the results are organized into folders based on the version of `amrfinder` that was used, and sub-folders within these based on the `amrfinder database` version used. 

## Previous AMRFinderPlus results

### AMRFinderPlus v3.12.8
This workflow was run on the original v0.2 and 2024-08 sets of genomes. It used AMRFinderPlus v3.12.8, and details are below:

A Snakemake workflow to rerun this analysis can be found on the
AllTheBacteria GitHub page
[here](https://github.com/AllTheBacteria/AllTheBacteria/tree/main/reproducibility/All-samples/AMR/AMRFinderPlus)
and modified fairly easily to use newer software or database versions.

We have included sub-folders of the results broken down by the AllTheBacteria
release, useful if you just want the results for a new incremental
release.

If you want to do this and have any questions or need some help, please
contact [Daniel Anderson](mailto:dander@ebi.ac.uk).
