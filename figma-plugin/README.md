# My App — Figma Design Generator

A local Figma plugin that generates a complete design file from the current app:

- Cover, Foundations, Components, Light screens, Dark screens, Flow, Handoff pages
- Desktop (1440) and Mobile (390) frames
- Light + dark daisyUI v5 tokens
- Editable native Figma layers, color/text/effect styles, and components

## How to run

1. Open the **Figma desktop app** (development plugins do not run in the browser).
2. Create a **new blank Figma file**.
3. Go to `Plugins → Development → Import plugin from manifest…`.
4. Select `figma-plugin/manifest.json`.
5. Run `Plugins → Development → My App Design Generator`.

The plugin creates all pages and switches you to the cover page when done.

Re-running the plugin on the same file removes the pages it created
(`00 Cover`, `01 Foundations`, `02 Components`, `03 Screens — Light`,
`04 Screens — Dark`, `05 Flow`, `06 Handoff`) and the `App/` styles, then
regenerates them.

## Notes

- Fonts: tries **Geist**, falls back to **Inter**, then Roboto/Arial.
- Colors are converted from daisyUI's OKLCH tokens to sRGB so they match the app.
- Screen content mirrors the current routes and placeholder copy.
- Prototype links: each **View Details** button goes to the User Detail screen;
  dashboard sidebar items link Homepage → Home and Settings → Profile.
