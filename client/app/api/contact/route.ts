import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contactSchema'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 },
      )
    }

    // TODO (Task 10 full): insert into Supabase via lib/supabaseServer.ts
    // const supabase = createServerClient()
    // await supabase.from('contacts').insert(parsed.data)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
