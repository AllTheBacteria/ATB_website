---
title: Archaea
weight: 130
toc: true
---

In addition to bacteria, we have processed archaea samples through the
assembly pipeline and run checkm2. Metadata was downloaded from the ENA
on 2024-07-31, getting all samples belonging to the taxon node 2157.
There were 818 samples with WGS Illumina paired sequencing (ie the same
rules we use for bacteria samples), resulting in 815 successful
assemblies. These constitute archaea release 2024-07.

The archaea files on OSF have the same format as for bacteria. The files
are here: <https://osf.io/nehtp/>. The only exception is that, because
there are relatively few samples, each release of assemblies consists of
a single tarball of FASTA files (as opposed to 100s of tarballs).

The `atb osf` commands can be used to browse and download the OSF files:

```bash
atb osf ls Archaea
atb osf download --project AllTheBacteria/Archaea --all -o ./archaea
```

For a description of the files and metadata etc, please read the
[Assemblies](/docs/assemblies/) and [OSF downloads](/docs/osf_downloads/)
pages.
