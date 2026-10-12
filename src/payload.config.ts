import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sharpTransformer } from '@payloadcms/transformer-sharp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function trustedOrigins(): string[] {
  const keys = ['APP_URL', 'DEV_APP_URL', 'FRONTEND_URL', 'DEV_FRONTEND_URL', 'SERVER_URL'] as const
  const origins = new Set<string>()
  for (const key of keys) {
    const value = process.env[key]?.trim() ?? ''
    if (value.startsWith('http') && !value.includes('${')) {
      origins.add(value.replace(/\/$/, ''))
    }
  }
  const host = process.env.zeropsSubdomainHost?.trim()
  if (host) {
    for (const prefix of ['frontend', 'frontendstage', 'frontenddev']) {
      origins.add(`https://${prefix}-${host}.prg1.zerops.app`)
    }
  }
  origins.add('http://localhost:3000')
  origins.add('http://localhost:3001')
  return [...origins]
}

export default buildConfig({
  serverURL: process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL,
  csrf: trustedOrigins(),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  plugins: [],
  upload: {
    transformers: [sharpTransformer()],
  },
})
