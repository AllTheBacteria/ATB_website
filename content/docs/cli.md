---
title: Command line tool
weight: 15
toc: true
---

The `atb` command line tool is the recommended way to query
AllTheBacteria metadata, download assemblies, browse OSF files, search
AMR/MLST results, and query the sketchlib index. It uses the aggregated
data up to and including incremental release 2025-05.

The full command reference is maintained with the tool:
<https://allthebacteria.github.io/atb-cli/>.

## Install

On Linux or macOS:

```bash
curl -fsSL https://raw.githubusercontent.com/allthebacteria/atb-cli/main/install.sh | bash
```

Pre-built binaries for Linux, macOS, and Windows are available from:
<https://github.com/allthebacteria/atb-cli/releases/latest>.

## First use

Choose a data directory on a disk with enough space. The default
metadata fetch includes AMR data and builds local indexes; this can use
roughly 35 GB. Add another few GB if you fetch the sketchlib index.

```bash
atb config set general.data_dir /path/to/large/volume/atb-data
atb fetch
atb query --species "Escherichia coli" --hq-only --limit 10
```

If you do not need AMR queries, fetch only the core non-AMR tables:

```bash
atb fetch --tables assembly.parquet,assembly_stats.parquet,checkm2.parquet,sylph.parquet,run.parquet,mlst.parquet
```

## Common tasks

Query genomes and select useful columns:

```bash
atb query --species "Klebsiella pneumoniae" --hq-only \
  --columns sample_accession,sylph_species,N50,Completeness_General,aws_url \
  --limit 20
```

Download assemblies from a query:

```bash
atb query --species "Escherichia coli" --hq-only \
  --columns sample_accession,aws_url --limit 10 -o ecoli.tsv
atb download --from ecoli.tsv --output-dir ./ecoli_genomes
```

Browse and download files from OSF:

```bash
atb osf ls
atb osf ls AMR
atb osf download --verify "AMRFinderPlus.*latest"
```

Query AMRFinderPlus results:

```bash
atb amr --species "Escherichia coli" --class "BETA-LACTAM" --hq-only
atb amr --gene "blaCTX-M-15" --limit 100
```

Query MLST calls:

```bash
atb mlst --species "Escherichia coli" --st 131 --hq-only
atb mlst --scheme salmonella --limit 50
```

Find closest genomes with sketchlib:

```bash
atb sketch install
atb sketch fetch
atb sketch query my_genome.fasta --knn 50
```

The CLI installs sketchlib `v0.2.4` when you run `atb sketch install`.
The ATB sketch database used by the website documentation is the
aggregated 2025-05 sketchlib index.

## When to use manual methods

The manual OSF, AWS, ENA, and SQLite instructions in these docs are kept
for power users who need exact archive paths, direct database access,
custom pipelines, or reproducible low-level commands. For routine
querying and downloads, start with `atb`.
