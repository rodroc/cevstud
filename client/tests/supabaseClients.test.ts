import { describe, it, expect, beforeEach, vi } from 'vitest'

const VALID_URL = 'https://example.supabase.co'
const VALID_ANON = 'anon-key'
const VALID_SERVICE = 'service-role-key'

beforeEach(() => {
  vi.resetModules()
  process.env.NEXT_PUBLIC_SUPABASE_URL = VALID_URL
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = VALID_ANON
  process.env.SUPABASE_SERVICE_ROLE_KEY = VALID_SERVICE
})

describe('createServerClient', () => {
  it('returns a client when env vars are present', async () => {
    const { createServerClient } = await import('@/lib/supabaseServer')
    const client = createServerClient()
    expect(client).toBeDefined()
    expect(typeof client.from).toBe('function')
  })

  it('throws when NEXT_PUBLIC_SUPABASE_URL is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    const { createServerClient } = await import('@/lib/supabaseServer')
    expect(() => createServerClient()).toThrow(/NEXT_PUBLIC_SUPABASE_URL/)
  })

  it('throws when NEXT_PUBLIC_SUPABASE_ANON_KEY is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const { createServerClient } = await import('@/lib/supabaseServer')
    expect(() => createServerClient()).toThrow(/NEXT_PUBLIC_SUPABASE_ANON_KEY/)
  })
})

describe('createAdminClient', () => {
  it('returns a client when env vars are present', async () => {
    const { createAdminClient } = await import('@/lib/supabaseAdmin')
    const client = createAdminClient()
    expect(client).toBeDefined()
    expect(typeof client.from).toBe('function')
  })

  it('throws when NEXT_PUBLIC_SUPABASE_URL is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    const { createAdminClient } = await import('@/lib/supabaseAdmin')
    expect(() => createAdminClient()).toThrow(/NEXT_PUBLIC_SUPABASE_URL/)
  })

  it('throws when SUPABASE_SERVICE_ROLE_KEY is missing', async () => {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY
    const { createAdminClient } = await import('@/lib/supabaseAdmin')
    expect(() => createAdminClient()).toThrow(/SUPABASE_SERVICE_ROLE_KEY/)
  })
})
