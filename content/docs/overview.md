---
title: Overview
weight: 10
toc: true
---

## Current status

Date updated: 2026-04-09.

### Bacteria

The latest release is incremental release 2025-05

| Release             | Assemblies | Grand total |
|---------------------|------------|-------------|
| r0.2 <sup>1</sup>   | 1,932,812  | 1,932,812   |
| Incremental 2024-08 | 507,565    | 2,440,377   |
| Incremental 2025-05 | 322,920    | 2,763,297   |

\[1\]: 661,384 in the original 661k Blackwell dataset, plus 1,271,428
new assemblies

Post-assembly analysis status

| Analysis                                  | r0.2 | 2024-08 | 2025-05 |
|-------------------------------------------|------|---------|---------|
| assembly-stats                            | ✓    | ✓       | ✓       |
| checkm2                                   | ✓    | ✓       | ✓       |
| [Lexicmap index](/docs/lexicmap/) <sup>1</sup> | ✓    | ✓       | ✗       |
| [sketchlib index ](/docs/sketchlib/) <sup>1</sup>              | ✓    | ✓       | ✓       |
| [Annotation](/docs/annotation/)                | ✓    | ✓       | ✗       |
| [Antimicrobial resistance](/docs/amr/)         | ✓    | ✓       | ✗       |
| [Species-specific typing](/docs/typing/)       | ✓    | ✓       | ✗       |
| [Biosynthetic gene clusters](/docs/bgcs/)      | ✓    | ✓       | ✗       |
| [Defense systems](/docs/defense/)              | ✓    | ✓       | ✗       |

\[1\]: The indexes are for r0.2 plus 2024-08 (and 20205-05)  combined, not two separate
indexes.

### Archaea

The only release is 2024-07, and has 815 assemblies.

## Where are the docs/data/methods?

There are three places to go, depending on what you want:

1.  Documentation: how to download and use the data/analysis files is
    described in this documentation you are currently reading
2.  Files: the data are all hosted on OSF: <https://osf.io/xv7q9/>,
    which includes assembly and analysis files. For bulk downloads,
    please read [Bulk Downloads](/docs/osf_downloads/).
3.  [Assemblies](/docs/assemblies/) are available from OSF, AWS, and the ENA.
4.  Methods/code: in-depth methods details and files for reproducibility
    are stored in this github repository:
    <https://github.com/AllTheBacteria/AllTheBacteria>. If you are just
    using the data, you shouldn't need to look there.

If you only want to use the data without caring about the methods then
we suggest you read this documentation, which has the relevant links to
OSF, as opposed to going directly to OSF.

## A brief history of AllTheBacteria

The bacterial sequence data publicly available at the global DNA
archives is a vast source of information on the evolution of bacteria
and their mobile elements. However, most of it is either unassembled or
inconsistently assembled and quality-controlled. This makes it
unsuitable for large-scale analyses, and inaccessible for most
researchers to use. In 2021 Blackwell et al therefore released a
uniformly assembled set of 661,405 genomes, consisting of all publicly
available whole genome sequenced bacterial isolate data as of November
2018, along with various search indexes
(<https://doi.org/10.1371/journal.pbio.3001421>). AllTheBacteria extends
that project, covering all data up to at least 2024, and is ongoing. We
also expand the scope, as we begin a global collaborative project to
generate annotations for different species as desired by different
research communities.

## Release Notes

The first batch of data is available as release 0.2. From then onwards
we make "incremental" releases, which contain new samples that are not
included in older releases. This means that if you want the complete
results for a particular analysis, you will need release 0.2 results
plus all later incremental releases. When it makes sense to do so, we
will make aggregated files of all the releases (ie 0.2 plus all
incremental releases), so that you do not need to combine results
yourself.

### Releases 0.1 and 0.2

In March 2024 we released version 0.1 of AllTheBacteria, which added
1,271,428 new assemblies to the 661k dataset, taking the total to
1,932,812 assemblies. It included all data up to May 2023. This is
described in the bioRxiv preprint:
<https://doi.org/10.1101/2024.03.08.584059>. The files were put on the
EBI ftp site (<https://ftp.ebi.ac.uk/pub/databases/AllTheBacteria/>).

We found 11,887 assemblies containing some contigs had matched the human
genome. We removed these contigs, calling the resulting assemblies
release 0.2. The original 0.1 release was deleted from the EBI ftp site,
so that now only release 0.2 is available. Releases 0.1 and 0.2 contain
the same samples, the only difference is 11,887 assemblies had one or
more contigs removed.

### Species names and migration from EBI ftp to OSF

The assembly files are compressed using miniphy, which (approximately)
batches files by species names. These species names are used in the
output files. However, species calling will never be perfect, and so we
wanted to remove species names from the assembly files.

We decided to host the data at OSF from release 0.2 onwards. All files
on the EBI ftp site are left as an archive. Those files do have species
names in them. The files were renamed before uploading to OSF, as
described in detail in the [migration to OSF page](/docs/ebi2osf/). The
assemblies are identical in release 0.2 on from EBI and OSF, but the
filenames are different.

### Incremental Release 2024-08

After release 0.2, we processed all new data up to August 2024, and
released these new 507,566 assemblies with the name "incremental release
2024-08". It is called "incremental" because it only contains the new
assemblies.

### Incremental Release 2025-05

**Breaking change:** [species calls](/docs/species_id/) from sylph results
were made more stringent compared to previous releases. This means there
are samples that had a species call pre-2025-05, but now fail the new
checks and do not have a species call.

New samples/runs were processed after incremental release 2024-08,
making incremental release 2025-05. This means that the complete
AllTheBacteria dataset is release 0.2 plus incremental releases 2024-08
and 2025-05.
