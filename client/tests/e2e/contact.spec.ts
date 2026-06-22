import { test, expect } from '@playwright/test'

const ADMIN_SECRET = 'cev2026admin'
const TEST_NAME = 'E2E Test User'
const TEST_EMAIL = `e2e-${Date.now()}@cev.studio`
const TEST_MESSAGE = 'Automated e2e test — contact form → Supabase → admin'

test.describe('contact form', () => {
  test('submits to Supabase and appears in admin', async ({ page }) => {
    // ── Load homepage ──
    await page.goto('/')
    await expect(page).toHaveTitle(/.+/)

    // ── Find and fill form ──
    const nameInput = page.locator('input[name="name"]').first()
    const emailInput = page.locator('input[type="email"]').first()
    const messageInput = page.locator('textarea').first()
    const submitBtn = page.locator('button[type="submit"]').first()

    await nameInput.scrollIntoViewIfNeeded()
    await nameInput.fill(TEST_NAME)
    await emailInput.fill(TEST_EMAIL)
    await messageInput.fill(TEST_MESSAGE)

    // ── Submit and assert API response ──
    const [response] = await Promise.all([
      page.waitForResponse(r => r.url().includes('/api/contact')),
      submitBtn.click(),
    ])

    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.ok).toBe(true)

    // ── Verify row appears in admin ──
    await page.goto(`/admin?secret=${ADMIN_SECRET}`)
    await expect(page.locator('main')).toContainText(TEST_EMAIL)
    await expect(page.locator('main')).toContainText(TEST_NAME)
  })

  test('rejects missing name (validation)', async ({ page }) => {
    await page.goto('/')
    const result = await page.evaluate(async () => {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'probe@test.com', message: 'no name field' }),
      })
      return { status: r.status, body: await r.json() }
    })
    expect(result.status).toBe(400)
    expect(result.body.error).toBeDefined()
  })

  test('blocks admin with wrong secret', async ({ page }) => {
    await page.goto('/admin?secret=wrongsecret')
    await expect(page.locator('main')).toContainText('401')
  })
})
