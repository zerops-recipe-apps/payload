# Payload CMS (Zerops recipe app)

Payload 3 + PostgreSQL for the [payload](https://github.com/zeropsio/recipes/tree/main/payload) and [payload-next](https://github.com/zeropsio/recipes/tree/main/payload-next) recipes.

- **Admin:** `/admin`
- **API:** `/api/*` (REST)
- **Env:** `DATABASE_URL`, `PAYLOAD_SECRET`, `SERVER_URL` (runtime public URL)

## Local dev

```bash
cp .env.example .env   # set DATABASE_URL + PAYLOAD_SECRET
npm install
npm run dev            # :3000
```

Deploy via Zerops with `zeropsSetup: prod` or `dev` from the recipe import YAML.
