import { describe, it, expect } from 'vitest'
import { contactSchema } from '@/lib/contactSchema'

describe('contactSchema', () => {
  it('accepts valid input', () => {
    const result = contactSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello!',
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing name', () => {
    const result = contactSchema.safeParse({ email: 'a@b.com', message: 'hi' })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.name).toBeDefined()
  })

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({ name: 'Jane', email: 'not-an-email', message: 'hi' })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.email).toBeDefined()
  })

  it('rejects empty message', () => {
    const result = contactSchema.safeParse({ name: 'Jane', email: 'a@b.com', message: '' })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.message).toBeDefined()
  })

  it('rejects empty name', () => {
    const result = contactSchema.safeParse({ name: '', email: 'a@b.com', message: 'hi' })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.name).toBeDefined()
  })
})
