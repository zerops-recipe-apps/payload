# payload

Payload CMS 3 on Zerops (`nodejs@24`, PostgreSQL). Optional storefront: [payload-next-frontend](https://github.com/zerops-recipe-apps/payload-next-frontend).

- Setups: **`dev`**, **`prod`** only.
- Admin: `/admin` — REST: `/api/*` on port **3000**.
- Vault: `PAYLOAD_SECRET`, `API_URL`, `APP_URL` (+ `DEV_*` on Agent/Remote).
- Prod: Next **`output: 'standalone'`**, `payload migrate` at build, `node .next/standalone/server.js`.

Recipes: [`payload`](https://github.com/zeropsio/recipes/tree/main/payload) (CMS), [`payload-next`](https://github.com/zeropsio/recipes/tree/main/payload-next) (CMS + Next storefront).
