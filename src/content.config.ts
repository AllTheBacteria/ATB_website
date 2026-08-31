import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	// Starlight's own docsLoader hardcodes src/content/docs/; this glob
	// loader reproduces it (same id generation) with the base pointed at
	// the Hugo-era content/ directory instead, so the migration consumed
	// the existing pages IN PLACE — the Hugo→Starlight PR shows content
	// edits on content/docs/*.md rather than wholesale file adds.
	docs: defineCollection({
		loader: glob({ base: './content', pattern: '**/*.{md,mdx}' }),
		schema: docsSchema(),
	}),
};
