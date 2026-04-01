---
title: Metadata and QC
weight: 2
toc: true
---

Metadata files are all stored on OSF in the AllTheBacteria [Metadata
component](https://osf.io/h7wzy/).

These files all relate to INSDC metadata, tracking which samples have
been processed, and then results of running the assembly (and related
tools) pipeline. They include:

- ENA metadata (this is a snapshot at the time AllTheBacteria was
  updated to add more samples)
- Sample status at a high level: included in AllTheBacteria, or rejected
  for some reason when running the assembly pipeline
- Sylph results on the reads, and species calls made from the Sylph
  results
- Assembly statistics and checkm2 output
- Nucmer contig matches of aligning to the human genome
- "High quality" samples (defined below)

## Metadata availability

The metadata are available in two forms:

1.  Flat files. These are described below. This is how all of the data
    was released when we first uploaded everything to OSF in 2024.
2.  In an [SQLite database](/docs/metadata_sqlite/), available for releases
    2024-08 and 2025-05. It gathers together all of the ENA metadata,
    assembly metadata, plus slpyh, checkm2 and assembly stats output.
    The 2024-08 database contains more stringent checks on the metadata,
    and so more samples are flagged as possibly unreliable than in the
    flat files. From 2025-05 onwards, the database has the same
    information as the flat files.

This page describes the flat files. It is simpler than the database. The
details of the metadata and the SQLite database are complicated, and are
described in a separate page: [SQLite metadata](/docs/metadata_sqlite/)

## Metadata files

The latest complete set of data is release 0.2 plus incremental releases
2024-08 and 2025-05. The latest metadata files for this set are in the
`Aggregated/Latest_2025-05/` folder of the [Metadata
component](https://osf.io/h7wzy/).

### Status file

The latest status of all processed samples is in the file
[status.202505.tsv.gz](https://osf.io/h7wzy/files/6hw7t). It tracks the
result of trying to download the reads, run sylph, assemble, and then
human decontamination. The columns are:

- `Sample`: the sample accession (SAM...)
- `Status`: status of the sample. This is either "PASS", meaning that
  the pipeline finished successfully and we have an assembly, or
  "FAIL:..." if it failed and for what reason
- `Dataset`: the dataset the sample belongs to
- `HQ_filter`: "PASS" means this sample is in the "high quality" dataset
- `Assembly_on_OSF`: `1` or `0` to indicate if the assembly is available
  from OSF (and AWS). The complete set of AllTheBacteria assemblies is
  the samples with `1` in this column.

Note, the older status file for 2024-08 did not have the `HQ_filter`,
`Assemby_on_OSF` columns, and had an extra column `Comments`.

### Sample lists

The file `sample_list.txt.gz` lists all samples that have an assembly.
For aggregated data, it is the samples that have "PASS" in the "Status"
column of the status file (described above).

All of the samples in `sample_list.txt.gz` will be in the files
described later (sylph, checkm2 etc). Those files will contain more
samples because not every sample results in an assembly. For example,
the reads for a given sample could be downloaded and sylph run
successfully, and then the assembly fails. That sample would have sylph
results, but no assembly, and so does not appear in
`sample_list.txt.gz`.

### ENA metadata

When processing new samples, the first thing we do is download all
metadata from the ENA for all bacteria. The results are in
`ena_metadata.YYYYMMDD.tsv.gz` (where YYYYMMDD is the download date from
the ENA) providing a snapshot at the time of download. These files are
only included with each individual release. We do not make an aggregated
file across releases, since it does not really make sense to do so.

### Sylph

After downloading the reads, sylph is run on them to get species
abundances. The results are in the file `sylph.tsv.gz`, which is the
original sylph output, except for these differences:

- The `Sample_file` column is replaced with the INSDC accession columns
  `Sample` and `Run`.
- An extra column `Species` is added, which is a species call from the
  `Genome_file` column, using GTDB species names.

Some samples have no matches and there is no output - these samples are
listed in the file `sylph.no_matches.tsv.gz`.

We also try to make a species call from the sylph output, which can be
found in `species_calls.tsv.gz`. The method used to make these calls has
changed over time. Please see [species calls](/docs/species_id/) for more
information.

- r0.2 and incremental release 2024-08 used a naive method of requiring
  a sylph match with more than 99% abundance
- Incremental release 2025-05 used a more stringent method. The
  aggregated file `species_calls.tsv.gz` for everything up to and
  including release 2025-05 has the old calls in the column
  `sylph_species_pre_202505` and the old "high quality" call in
  `in_hq_pre_202505`. The updated species and high quality calls are in
  the columns `sylph_species`, `HQ`.

### Decontamination

After assembly, we use nucmer to align the contigs to the human genome
(plus HLA sequences). Matching contigs are removed from the assembly.
The complete nucmer output is given in `human_nucmer.gz`. We do not
provide an aggregated nucmer file of the latest data because it is
relatively large.

### Assembly statistics

The results of running `assembly-stats` (from
<https://github.com/sanger-pathogens/assembly-stats>) are provided in
`assembly-stats.tsv.gz`.

### Checkm2

The results of running `checkm2` are provided in `checkm2.tsv.gz`. The
columns in the output file are the original output from checkm2 but with
the first "Name" column replaced with "Sample", and then the values are
the INSDC sample accession IDs.

### High quality dataset

We define a high quality dataset for each release. For releases up to
and including 2024-08, the requirements were:

- Have a sylph call with at least 99 percent minimum abundance. If a
  sample has more than one call (eg where it has more than one run),
  then require all species calls to be the same
- Minimum checkm2 completeness of 90%
- Maximum checkm2 contamination of 5%
- Total assembly length between 100kbp and 15Mbp
- Maximum number of contigs 2,000
- Minimum N50 2,000

From 2025-05 onwards, the sylph parsing was made stricter, as described
[here](/docs/species_id/). All other rules remained the same.

The high quality samples are listed in `hq_set.samples_list.txt.gz`. The
rejected samples are listed in `hq_set.removed_samples.tsv.gz`.
