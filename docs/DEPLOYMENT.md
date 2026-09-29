# Deploy VYRN

VYRN uses React, Vinext/Vite, Cloudflare Workers and D1. The complete application includes server endpoints for cart, newsletter, contact, checkout and order lookup. A static host such as GitHub Pages cannot run these endpoints. This export targets Cloudflare Workers; it is not configured as a standard Next.js/Vercel deployment.

## Install and develop

Use Node.js 22.13 or later and the pinned pnpm version, 11.25.0.

```sh
git clone https://github.com/gireeshkumarreddy/VYRN.git
cd VYRN
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install --frozen-lockfile
cp .env.example .env
pnpm build
pnpm exec wrangler d1 execute DB --local --config dist/server/wrangler.json --file drizzle/0000_cloudy_ultimates.sql
pnpm dev
```

The development server defaults to port 5173. Apply the local schema to a fresh local database once. `pnpm start` serves the compiled Worker locally. Local databases and build outputs are ignored by Git.

## Deploy to Cloudflare Workers

1. Sign in to your Cloudflare account and create a database:

   ```sh
   pnpm exec wrangler login
   pnpm exec wrangler d1 create vyrn-db
   ```

2. In `wrangler.deploy.jsonc`, replace the all-zero example `database_id` with the ID returned by the create command. Keep the binding name `DB`. You can also change the Worker name `vyrn` to an available name in your account.

3. Build, apply database migrations, and deploy:

   ```sh
   pnpm build
   pnpm exec wrangler d1 migrations apply DB --remote --config wrangler.deploy.jsonc
   pnpm exec wrangler deploy --config wrangler.deploy.jsonc
   ```

Wrangler returns the deployed URL. The deployment uploads both the compiled Worker and `dist/client` assets. A custom domain can then be attached through Cloudflare. Keep using the explicit `--config wrangler.deploy.jsonc` for external deployments: `dist/server/wrangler.json` is generated for local preview and contains a placeholder database ID.

For a Cloudflare Git build, use `pnpm install --frozen-lockfile && pnpm build` as the build command and `pnpm exec wrangler deploy --config wrangler.deploy.jsonc` as the deploy command after configuring the database ID and applying the migrations. Store any required account credentials in the hosting provider's secret settings.

## Payments and configuration

The supplied configuration keeps payments disabled. The storefront, cart, newsletter and contact forms can run with the D1 binding, but paid checkout requires merchant configuration and the launch work listed in the root README.

After that work is complete, add the Stripe secret directly to Cloudflare:

```sh
pnpm exec wrangler secret put STRIPE_SECRET_KEY --config wrangler.deploy.jsonc
```

Then change `COMMERCE_ENABLED` to `"true"` in `wrangler.deploy.jsonc` and redeploy. Do not commit Stripe keys, Cloudflare credentials, `.env`, or `.dev.vars`. `.env.example` contains safe placeholder settings only.

## Included files

- `app/`, `components/`, `lib/`: every storefront page, animation and server endpoint.
- `public/assets/`: all website images, including full-resolution HD WebP images and responsive variants.
- `source-assets/hd/`: all 22 original HD PNG photographs for future editing.
- `db/`, `drizzle/`: schema and SQL migrations.
- `build/`, `scripts/`, `vite.config.ts`, `pnpm-lock.yaml`: complete build tooling and pinned dependencies.
- `docs/`: image prompts, dimensions and prior validation notes.

The original Sites configuration is retained for traceability. A clean clone automatically uses the portable execution profile. External deployment uses the explicit Cloudflare config above and does not require access to the original Sites account.
