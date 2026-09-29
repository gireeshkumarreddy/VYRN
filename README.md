# VYRN

Editorial fashion storefront built from the supplied corrected visual and animation blueprint.

## Development

Use Node 22.13+ and pnpm 11.25.0. Run `pnpm install --frozen-lockfile`, then `pnpm dev`. Production builds use `pnpm build` and emit a Cloudflare Worker. The DB binding is D1; schema migrations are in `drizzle/`.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for local database setup and Cloudflare deployment commands. This is a Vinext/Cloudflare application; deploying the full storefront requires a Worker and a D1 database. GitHub Pages cannot run its server endpoints.

## Reference fidelity

The homepage follows the supplied sequence with the requested correction: VYRN opening and logo-to-header docking, A-COLD-WALL hero, one category section containing the model-change storyboard and final category lineup, VYRN Studio and its lower campaign, editorial statement, collection carousel, New Drop, Future Essentials.

Twenty-two independently generated HD photographs replace small screenshot crops and catalog/category sprites: 21 native 1024×1536 portraits and one 1536×1024 landscape. Five category portraits preserve transparency. Full-resolution WebP files and 512px responsive derivatives are under public/assets/hd; dimensions and prompts are in docs/hd-image-manifest.json and docs/hd-image-prompts.json. Existing hero, editorial and final campaign images remain at their native resolution. No image was enlarged and relabeled as 4K. Product photography is reconstructed from the references and requires merchant approval before live sales.

## Commerce

The cart is persisted in D1 and linked to a random HttpOnly, SameSite=Lax cookie. Prices and variants are server-validated against lib/catalog.ts. Newsletter signups and contact enquiries are saved in D1; no automatic marketing mail is sent.

Checkout is deliberately gated. Set STRIPE_SECRET_KEY and COMMERCE_ENABLED=true only after validating real inventory, merchant identity, product data, tax treatment, shipping and legal pages. Stripe Checkout sessions use server-side pricing; order confirmation verifies paid status and matches the session to the current cart cookie. Enable Stripe customer email receipts in the merchant dashboard. Shipping details must be verified in Stripe Checkout. Provider promotion codes are supported there; no invented active promotion is displayed.

Before public sales: replace sample catalog stock/size data with the authoritative product source; add atomic inventory reservations and fulfillment webhooks; configure receipt email and delivery policies; confirm tax behavior; implement abuse limits and retention on enquiry/signup endpoints; replace privacy/terms placeholders with merchant-reviewed versions. The current site is a private creative and shopping-flow preview, not an operational live merchant.

No actual GLB/glTF assets were provided. Photography is not described as 3D. The Product.model3d field is reserved for a future genuine model viewer.

## Motion

Native scrolling; a measured Web Animations logo docking sequence followed by split-panel opening; staggered hero typography, model mask and diagonal image fragments; a 5.5-second category sequence with controlled displacement and white flashes, settling into one clickable lineup; per-section image masks, collage tile entrances and line-by-line editorial text; independently masked campaign regions; automatic carousel with pointer, touch, keyboard, pause and local filter/sort controls; and diagonal white-tile product transitions.

The reveal system leaves content visible by default and animates only after intersection. Sections cannot remain hidden because a reveal class was missed. Category animation keeps a stable section height; mobile categories become a swipeable row to prevent page jumps. Reduced-motion settings bypass opening, flashes, masks, parallax and automatic collection movement. Mobile layouts are recomposed at 700px.

## Assets and editing

All required visual assets are under public/assets. Catalog, reference crop mappings, image source dimensions, and prices are in lib/catalog.ts. Store UI is under components/store; routes and server endpoints are under app.

## Complete source export

This repository contains all application routes, components, animations, styles, server endpoints, database migrations, build tooling, pinned dependencies, and website assets from the completed VYRN project. The original 22 HD PNG source photographs are preserved in `source-assets/hd/`; full-resolution and responsive website versions are in `public/assets/hd/`. Generated build outputs, installed dependencies, local databases, and credentials are excluded.
