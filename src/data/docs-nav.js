// Single source of truth for docs page order. Consumed by both the
// Starlight sidebar (astro.config.mjs) and the /docs/ index page
// (src/components/DocsIndex.astro), so the two never drift.
// This list is the canonical order of the docs pages.
export const docsPages = [
	'overview',
	'data_browser',
	'cli',
	'sample_metadata',
	'osf_links',
	'metadata_sqlite',
	'assemblies',
	'species_id',
	'annotation',
	'amr',
	'defense',
	'bgcs',
	'phylogeny',
	'hypothetical_protein_structures',
	'whatsgnu_panallelome',
	'typing',
	'archaea',
	'lexicmap',
	'sketchlib',
	'contributing',
	'osf_downloads',
	'faq',
	'release_history',
	'ebi2osf',
];
