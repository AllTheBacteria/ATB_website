---
title: Online data browser
weight: 12
toc: true
---

AllTheBacteria provides an [online data browser](/browse) for user-friendly exploration of the dataset. The data browser features the metadata and AMR modules of the AllTheBacteria dataset, based on the 2025-05 incremental release.

## Available data

The metadata shown is a subset of the columns described in [Metadata and QC](/docs/sample_metadata/), with the addition of two derived columns:

- The **species column** is derived from the Sylph species call by removing GTDB placeholder suffixes from the genus and species. For example, _Escherichia coli_E_ is collapsed to _Escherichia coli_, and _Campylobacter_D jejuni_ to _Campylobacter jejuni_.
- The **country column** is derived from ENA country metadata by collapsing alternative country names and sub-country regions. For example, "UK", "England" and "Scotland" are collapsed into "United Kingdom".

AMR gene data is based on `AMRFinderPlus v4.2.5` with database `2025-12.03.1` (see [AMR docs](/docs/amr/) for details). Only AMR hits are available through the data browser; virulence and stress response genes are available via the CLI or OSF files. AMR genes can be viewed in either a gene list or a gene matrix format.

A broader range of data items is available via the [command line interface](/docs/cli/) and [OSF file access](/docs/osf_links/).

## Using the online data browser

### Filters and summary charts

You can filter the AllTheBacteria dataset either by using the search bar or by interacting with the charts. The filters and charts are kept in sync — interacting with the charts will automatically update the search bar, and vice versa.

Each chart and filter shows sample counts with respect to all other filters, but not that column's own filter. For example, if you have added filters for the species _Staphylococcus aureus_ and the _mecA_ gene, the species chart will show the number of samples carrying the _mecA_ gene per species, with _S. aureus_ highlighted.

### Data table

Samples passing the selected filters are listed in a data table. Use the column selector located right above the table to select which data columns to show.

The AMR genes column provides two alternative presentation formats: gene list and gene matrix. You can select between these formats using the toggle in the AMR genes column header.

Column names are displayed in a human-friendly format derived from the underlying data columns. For example, the column `sylph_species_pre_202505` is displayed as "Sylph species call (pre-2025-05)".

### Data export

Table data can be exported as TSV for further downstream analysis via the Export button right above the table. The exported dataset mirrors the visible data table in terms of filters, column selection, and AMR presentation format. Exports are currently truncated to 10,000 rows.

Exporting the summary charts is currently not supported.

## Privacy policy

The AllTheBacteria data browser collects limited user data for the purpose of improving the website and ensuring its correct functionality. User privacy is a high priority in the collection of such data.

The data browser uses Sentry tracing to collect data on site errors and performance. Sentry is configured to use the privacy-preserving `sendDefaultPii=false` mode. The collected data includes the user agent string (browser version and operating system), country-level geolocation, and query parameters such as filter and column selection. Sentry data is hosted within the EU and has a 30-day data retention period.

IP addresses are not sent to Sentry, but may appear in the server logs of the data processing platforms listed below.

List of data processing platforms used:

- Google Cloud Platform (backend hosting)
- Render (frontend hosting)
- Netlify (frontend reverse proxy)
- Sentry (error and performance monitoring)

Access to the collected data is managed by Timo Saratto.

This privacy policy was last updated 2026-08-23.
