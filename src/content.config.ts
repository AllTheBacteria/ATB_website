import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	// Starlight's own docsLoader hardcodes src/content/docs/; this glob
	// loader reproduces it (same pattern, same id generation) with the base
	// pointed at the Hugo-era content/ directory instead, so the migration
	// consumes the existing pages IN PLACE — the Hugo→Starlight PR shows
	// content edits on content/docs/*.md rather than wholesale file adds.
	// Hugo's _index.md section files are excluded by the [^_] pattern and
	// remain as inert scaffolding; Starlight's index pages live alongside
	// them as index.mdx.
	docs: defineCollection({
		loader: glob({ base: './content', pattern: '**/[^_]*.{md,mdx}' }),
		schema: docsSchema(),
	}),
};
