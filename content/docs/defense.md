---
title: Defense systems
weight: 8
toc: true
---

The results of running DefenseFinder v1.3.0 on all Enterobacterales
species with \>400 samples from release 0.2 plus incremental release
2024-08 are available on OSF in the [DefenseFinder
component](https://osf.io/hpgac/overview). This includes 27 species and
1,166,956 samples.

Note that this analysis is all with DefenseFinder
[v1.3.0](https://github.com/mdmparis/defense-finder/releases/tag/v1.3.0)
using the profiles from defense-finder-models v1.3.0 and CasFinder
v3.1.0. This means that defense systems added to DefenseFinder after
July 2024 will not be present in the results. the time of writing
(February 2026) the latest release of DefenseFinder is v2.0.1

We have shared a single results file which is the concatenated output of
the `systems.tsv` file from all individual
DefenseFinder runs. The status file indicates which samples we ran the
analysis on with `PASS` if the run completed successfully. There are
n=653 samples where no defense system was detected in the assembly, so
these samples are absent from the results file but coded as `PASS` in
the status file.

**Important:** Note that this analysis is all with DefenseFinder
[v1.3.0](https://github.com/mdmparis/defense-finder/releases/tag/v1.3.0)
using the profiles from CasFinder v3.1.0 and defense-finder-models
v1.3.0, the latter of which includes 151 defense systems (and 16
anti-defense systems). This means that newer defense systems added to
DefenseFinder after July 2024 will not be present in the results. For
context, as of February 2026 the latest release of DefenseFinder is
v2.0.1 and the latest models version (v2.0.2) contains 262 defense
systems.

More details on the analysis are available on the AllTheBacteria github
[here](https://github.com/AllTheBacteria/AllTheBacteria/tree/main/reproducibility/All-samples/defense-systems).
