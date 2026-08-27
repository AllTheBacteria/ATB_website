// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { docsPages } from './src/data/docs-nav.js';

// https://astro.build/config
export default defineConfig({
	site: 'https://allthebacteria.org',
	integrations: [
		starlight({
			title: 'AllTheBacteria',
			logo: { src: './src/assets/logo.svg' },
			favicon: '/favicon.svg',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/AllTheBacteria/AllTheBacteria',
				},
			],
			components: {
				Header: './src/components/Header.astro',
				MobileMenuToggle: './src/components/MobileMenuToggle.astro',
				PageTitle: './src/components/PageTitle.astro',
				// Light-only for now; see ThemeProvider.astro.
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			customCss: ['./src/styles/custom.css'],
			expressiveCode: {
				themes: ['github-dark', 'github-light'],
				// Copy-oriented shell docs: soft-wrap commands (the clipboard
				// still gets the exact original line) instead of hiding their
				// tails behind horizontal scroll on mobile. Output listings and
				// terminal sessions keep scrolling — wrapping garbles tabular
				// output.
				defaultProps: {
					wrap: true,
					// Indent wrapped continuation lines so they read as part of
					// the command above, not as a new command.
					hangingIndent: 2,
					overridesByLang: {
						'text,console': { wrap: false },
					},
				},
				// Quiet documentation panels: near-page background, soft hairline
				// (the h2-rule family — a solid border around a darker fill would
				// read as a sunken well), no shadow, chip-matched corners. Holds
				// everything EC can express natively; the CSS-only parts live in
				// custom.css — search "Code blocks, CSS-only half".
				styleOverrides: {
					borderRadius: '0.375rem',
					borderColor: 'rgb(156 163 175 / 0.4)',
					codeBackground: 'var(--sl-color-gray-7, var(--sl-color-gray-6))',
					// Documentation-panel density: code steps down a size from
					// prose and sits in a compact panel, so blocks read as part
					// of the document rather than as embedded app widgets.
					codeFontSize: 'var(--sl-text-code-sm)',
					codeLineHeight: '1.5',
					codePaddingBlock: '0.75rem',
					codePaddingInline: '1rem',
					frames: {
						frameBoxShadowCssValue: 'none',
						// Frames repoint the code background at per-frame-type
						// values, so codeBackground alone is not enough.
						terminalBackground: 'var(--sl-color-gray-7, var(--sl-color-gray-6))',
						editorBackground: 'var(--sl-color-gray-7, var(--sl-color-gray-6))',
					},
				},
			},
			// Docs-internal navigation only; site sections live in the navbar
			// (src/components/Header.astro). Order mirrors the Hugo `weight`
			// frontmatter values from content/docs/.
			sidebar: [
				// Site sections, shown only in the mobile drawer (the desktop
				// sidebar stays docs-only; these live in the navbar there).
				{ label: 'Home', link: '/', attrs: { class: 'md:sl-hidden' } },
			{ label: 'Browse data', link: '/browse/', attrs: { class: 'md:sl-hidden' } },
				{ label: 'Resources', slug: 'resources', attrs: { class: 'md:sl-hidden' } },
				// Docs pages in order, shared with the /docs/ index page.
				...docsPages.map((slug) => ({ slug: `docs/${slug}` })),
			],
		}),
	],
});
