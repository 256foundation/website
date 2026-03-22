import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Contact form is not configured' }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    const contactEmail = process.env.CONTACT_EMAIL ?? 'hello@256foundation.org'
    const fromEmail = process.env.EMAIL_FROM ?? 'noreply@256foundation.org'

    await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'We received your message — 256 Foundation',
      text: `Hi ${name},\n\nThank you for reaching out to the 256 Foundation. We've received your message and will get back to you soon.\n\n256 Foundation\nhttps://256foundation.org`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
