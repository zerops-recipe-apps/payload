import type { Payload } from 'payload'

const DEMO_POSTS = [
  {
    title: 'Deploy Payload on Zerops in minutes',
    slug: 'deploy-strapi-on-zerops',
    coverUrl: '/seed-covers/deploy-strapi-on-zerops.svg',
    excerpt:
      'Import the payload-next recipe to get PostgreSQL, Payload on nodejs@24, and a Next.js storefront with vault URLs wired for you.',
    body: `The payload-next recipe is designed for a realistic small-production stack without a long checklist. You import one YAML bundle, Zerops creates the database and services, and Git-connected builds keep Payload and the Next app in sync.

On the CMS side, production builds use Next standalone output, compile the admin panel, and deploy the runtime bundle. PostgreSQL is provisioned as a managed service; connection strings arrive through Zerops env isolation so you never hard-code credentials in the repo.

The Next storefront is a separate service. It bakes NEXT_PUBLIC_PAYLOAD_URL at build time from the project vault, which points at your Payload subdomain. After deploy, editors use Payload admin on the API host while visitors hit the frontend hostname.`,
  },
  {
    title: 'Headless CMS meets a Next.js storefront',
    slug: 'headless-cms-react-spa',
    coverUrl: '/seed-covers/headless-cms-react-spa.svg',
    excerpt:
      'Split the CMS and the UI: Payload owns structured content; Next.js fetches public JSON and renders Zerops-style article pages.',
    body: `A headless architecture separates concerns that traditionally lived in one monolith. Payload becomes the system of record for content models, editorial workflow, media library, and API tokens. The Next.js app becomes a replaceable presentation layer that can be redeployed independently whenever design or frontend code changes.

This demo wires Site Info and blog posts into the storefront. Public REST endpoints power the home page and slug-based detail routes. Cross-origin requests are explicit when the SPA and CMS run on different subdomains; the recipe documents vault keys APP_URL and API_URL so both sides agree on hostnames in dev and prod.`,
  },
  {
    title: 'From draft to published post',
    slug: 'draft-to-published',
    coverUrl: '/seed-covers/draft-to-published.svg',
    excerpt:
      'Publish blog entries from Payload admin; the Next storefront picks them up via REST without redeploying the CMS.',
    body: `Collection types in Payload support an editorial workflow. Saving entries in admin updates what consumers read through the REST API.

The Next home page calls GET /api/blog-posts sorted by published date. Opening a post uses a slug filter to load one entry for the detail view. Authors fill title, slug, excerpt, and body; optional coverUrl points at static demo art under /seed-covers on the CMS host.`,
  },
] as const

export async function seedDemoContent(payload: Payload) {
  try {
    let hasSite = false
    try {
      const existingSite = await payload.findGlobal({ slug: 'site-info' })
      hasSite = Boolean(existingSite?.title)
    } catch {
      hasSite = false
    }
    if (!hasSite) {
      await payload.updateGlobal({
        slug: 'site-info',
        data: {
          title: 'Payload + Next.js on Zerops',
          description:
            'Headless CMS demo — sample articles below are seeded in Payload. Edit them in the admin panel (/admin) and refresh the Next storefront.',
        },
      })
    }

    const { totalDocs } = await payload.count({ collection: 'blog-posts' })
    if (totalDocs > 0) {
      return
    }

    const now = new Date().toISOString()
    for (const post of DEMO_POSTS) {
      await payload.create({
        collection: 'blog-posts',
        data: {
          ...post,
          publishedAt: now,
        },
      })
    }
  } catch (err) {
    payload.logger.warn({ err }, 'Demo content seed skipped')
  }
}
