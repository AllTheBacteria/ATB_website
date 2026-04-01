---
title: Hypothetical protein structures
weight: 110
toc: true
---

**Note: All structures available here have been integrated into the
AlphaFold Database.**

For more detailed visual analysis and downloads, please see
<https://alphafold.ebi.ac.uk>

You cannot search the AFDB using the ATB/Bakta locus tags - see below
for more information on how to map the ATB/Bakta tags to AFDB
accessions.

## Preprocessing

Note: All `.pdb` files in this dataset use the locus_tag from Bakta,
which contains the SRA accession before the '.' delimited e.g.
`SAMEA7561354.JGMNBG_20630` comes from SRA accession SAMEA7561354.

To begin: all `275,945,762` hypothetical proteins from the Bakta
annotations were taken.

Then, only proteins belonging to genomes passing QC (i.e. PASS) from
`Aggregated/work_in_progress_2025-05/species_calls.tsv.gz`
[here](https://osf.io/h7wzy/files/osfstorage) were filtered to
prioritise highly confident genome assemblies and protein calls.

This left `224,184,215` proteins remaining for downstream consideration.

These were combined and deduplicated at 100% seqid over 100% sequence
length.

Then, this set was filtered to keep only proteins below 3000AA, due to
VRAM limitations of available GPUs for folding.

We have not released the additional longer proteins (work in progress,
contact George Bouras if interested).

Overall, this left `17,711,165` unique proteins.

## Taxonomy

We used the sylph species predictions from
`Aggregated/work_in_progress_2025-05/species_calls.tsv.gz`. These were
generated using the GTDB GTDB 214.0 release (28 April 2023 database).

We also mapped these to NCBI taxids using the `bac120_metadata_r214.tsv`
and `ar53_metadata_r214.tsv` release from GTDB 214.

The NCBI taxonomy calls are what you will see in AlphaFold Database.

## Predictions

Multiple sequence alignments were generated in chunks of 250,000
proteins using ColabFold v1.5.5 using MMseqs2 version `15.6f452` with
the `colabfold_search` command. The default parameters and databases
(`uniref30_2302` and `colabfold_envdb_202108` ) were used.

Each AlphaFold2 implemented via ColabFold v1.5.5 was then run with each
MSA as input using `colabfold_batch` with ptm model 1 only
(`--num-models 1`) for maximum throughput, using otherwise the default
parameters ( 3 recycles, no templates or relaxation ).

All predictions were conducted on AMD MI250x GPUs on Setonix at the
Pawsey Supercomputing Research Centre in Perth, Australia using the
specific container tag `rocm6_cpuTF` available at
<https://quay.io/repository/sarahbeecroft9/colabfold?tab=tags>.

## Files

### Foldseek Database

We provide a Foldseek database (created using `foldseek createdb`) via
OSF (<https://osf.io/x693m/overview>) in the `Foldseek_Databases`
component.

Note that due to the size restrictions on individual file, it was split
into 1GB parts for OSF

To remake it:
`cat foldseek_db.tar.gz_parta* > foldseek_db.tar.gz && tar -xzf foldseek_db.tar.gz`

### Foldcomp Database

We provide a Foldcomp database (created using `foldseek createdb`) via
OSF (<https://osf.io/x693m/overview>) in the `Foldcomp_Databases`
component.

Note that due to the size restrictions on individual file, it was split
into 1GB parts for OSF

To remake it:
`cat foldcomp_db.tar.gz_parta* > foldcomp_db.tar.gz && tar -xzf foldcomp_db.tar.gz`

### Predictions

If you want to full, non-lossy compressed predictions, we provide `.pdb`
format structures via OSF.

Hosting other AF2 output files (MSAs, pLDDT and PAE `.json` confidence
metrics) take many many TBs of storage and are beyond our capacity to
host on OSF. These can be accessed via <https://alphafold.ebi.ac.uk>

All `.pdb` files are batched into 142 batches `.tar.gz` files at
<https://osf.io/x693m/overview>.

Each `.tar.gz` file contains the subdirectories with the SRA accessions
of each protein in the batch. The `.pdb` files are then nested inside
the subdirectories.

These are themselves in 9 Sets. Each Set contains 16 batches other than
Set 9 which contains 14.

## FASTA

The FASTA component contains all `275,945,762` unfiltered hypothetical
proteins in FASTA format.

Note: you will also need to put it back together
`cat all_hypotheticals_under_3000AA_unfiltered.fastq.gz_part* > all_hypotheticals_under_3000AA_unfiltered.fastq.gz_part.gz`

### Metadata

To map between the ATB (i.e. Bakta with SRA accession) locus tags, the
AlphaFold Database tags and the batch tarball (above), please see
`ATB_AFDB_map_with_batches.tsv.gz`

This provides a 3 column tsv file that maps the ATB/Bakta locus tag
(column 1) to the AlphaFold database accession 16 digit code (column 2)
OSF batch (column 3).

e.g.

``` bash
head -n1 ATB_hypothetical_protein_structures_batch.tsv
SAMEA7561354.JGMNBG_20630   0000000000710001    batch001
```

- The AFDB accession will be AF-0000000000710001-v1 e.g see
  <https://alphafold.ebi.ac.uk/entry/AF-0000000000710001>

We also provide the representative protein (i.e. - what actually ended
up being folded) , sylph GTDB and mapped NCBI species calls for all
`224,184,215` member proteins before deduplication.

This provides a 5 column tsv file
`ATB_every_protein_with_species.tsv.gz` with the representative (column
1), member (column 2), sylph GTDB species name of the member (column 3),
mapped NCBI taxonomy species name (column 4) and NCBI taxid (column 5)

e.g.

``` bash
head -n1 ATB_every_protein_with_species.tsv
SAMEA7561354.JGMNBG_20625   SAMEA7561354.JGMNBG_20625   Mycobacterium tuberculosis  Mycobacterium tuberculosis H37R 83332
```

Note: you will also need to put it back together
`cat ATB_every_protein_with_species.tsv.gz_parta* > ATB_every_protein_with_species.gz`

For any questions regarding the protein structure predictions, please
contact George Bouras <george.bouras@adelaide.edu.au>
