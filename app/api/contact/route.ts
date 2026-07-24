import { NextRequest, NextResponse } from 'next/server'
import Mailjet from 'node-mailjet'
import { FormField, FormFieldBlok } from '@/lib/types'
import { isEmailEnabled, isTurnstileVerificationRequired } from '@/lib/env'
import { verifyTurnstileToken } from '@/lib/turnstile'

// Initialize Mailjet only if API keys are provided
const mailjet =
  process.env.MAILJET_API_KEY && process.env.MAILJET_SECRET_KEY
    ? Mailjet.apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)
    : null

interface FormSubmissionData {
  formData: Record<string, any>
  turnstileToken?: string
  formConfig: {
    title: string
    email_subject: string
    email_body_description?: string
    recipient_email: string
    sender_email?: string
    sender_name?: string
    fields?: FormField[] | FormFieldBlok[] // Support both legacy and new format
  }
}

// Generate email HTML content from form data
function generateEmailContent(
  formData: Record<string, any>,
  formConfig: FormSubmissionData['formConfig']
): string {
  let html = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          ${formConfig.title}
        </h2>
  `

  if (formConfig.email_body_description) {
    html += `<p style="margin-bottom: 20px; font-size: 16px;">${formConfig.email_body_description}</p>`
  }

  html += `<div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">`

  // Add form fields data (support both legacy and new format)
  if (formConfig.fields && formConfig.fields.length > 0) {
    formConfig.fields.forEach((field) => {
      // Handle both FormField (legacy) and FormFieldBlok (new) formats
      const fieldId = 'field_id' in field ? field.field_id : field.id
      const fieldLabel = field.label
      const value = formData[fieldId]

      if (value !== undefined && value !== null && value !== '') {
        let displayValue = value

        // Handle array values (for checkboxes)
        if (Array.isArray(value)) {
          displayValue = value.join(', ')
        }

        // Handle boolean values (for single checkboxes)
        if (typeof value === 'boolean') {
          displayValue = value ? 'Yes' : 'No'
        }

        html += `
          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568; display: block; margin-bottom: 5px;">
              ${fieldLabel}:
            </strong>
            <span style="color: #2d3748; background-color: #fff; padding: 8px; border-radius: 4px; display: block;">
              ${displayValue}
            </span>
          </div>
        `
      }
    })
  }

  html += `
        </div>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
        <p style="font-size: 14px; color: #718096;">
          This email was sent from the contact form on your website.
        </p>
      </body>
    </html>
  `

  return html
}

// Generate plain text content from form data
function generateTextContent(
  formData: Record<string, any>,
  formConfig: FormSubmissionData['formConfig']
): string {
  let text = `${formConfig.title}\n\n`

  if (formConfig.email_body_description) {
    text += `${formConfig.email_body_description}\n\n`
  }

  text += 'Form Submission Details:\n'
  text += '='.repeat(30) + '\n\n'

  // Add form fields data (support both legacy and new format)
  if (formConfig.fields && formConfig.fields.length > 0) {
    formConfig.fields.forEach((field) => {
      // Handle both FormField (legacy) and FormFieldBlok (new) formats
      const fieldId = 'field_id' in field ? field.field_id : field.id
      const fieldLabel = field.label
      const value = formData[fieldId]

      if (value !== undefined && value !== null && value !== '') {
        let displayValue = value

        // Handle array values (for checkboxes)
        if (Array.isArray(value)) {
          displayValue = value.join(', ')
        }

        // Handle boolean values (for single checkboxes)
        if (typeof value === 'boolean') {
          displayValue = value ? 'Yes' : 'No'
        }

        text += `${fieldLabel}: ${displayValue}\n`
      }
    })
  }

  text += '\n' + '-'.repeat(30) + '\n'
  text += 'This email was sent from the contact form on your website.'

  return text
}

export async function POST(request: NextRequest) {
  try {
    // Validate email service configuration
    if (!isEmailEnabled()) {
      console.error('Mailjet API credentials not configured')
      return NextResponse.json({ message: 'Email service not available' }, { status: 503 })
    }

    const body: FormSubmissionData = await request.json()
    const { formData, formConfig, turnstileToken } = body

    // Validate required fields
    if (!formData || !formConfig) {
      return NextResponse.json({ message: 'Invalid form data' }, { status: 400 })
    }

    if (!formConfig.recipient_email) {
      return NextResponse.json({ message: 'Recipient email not configured' }, { status: 400 })
    }

    if (isTurnstileVerificationRequired()) {
      const token = turnstileToken?.trim()
      if (!token) {
        return NextResponse.json({ message: 'Captcha verification required' }, { status: 400 })
      }

      const remoteIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      const verification = await verifyTurnstileToken(token, remoteIp)

      if (!verification.success) {
        return NextResponse.json({ message: 'Captcha verification failed' }, { status: 403 })
      }
    }

    // Set default sender information
    const senderEmail =
      formConfig.sender_email || process.env.MAILJET_FROM_EMAIL || 'noreply@example.com'
    const senderName = formConfig.sender_name || process.env.MAILJET_FROM_NAME || 'Contact Form'

    // Generate email content
    const htmlContent = generateEmailContent(formData, formConfig)
    const textContent = generateTextContent(formData, formConfig)

    // Prepare email data for Mailjet
    const emailData = {
      Messages: [
        {
          From: {
            Email: senderEmail,
            Name: senderName,
          },
          To: [
            {
              Email: formConfig.recipient_email,
            },
          ],
          Subject: formConfig.email_subject,
          TextPart: textContent,
          HTMLPart: htmlContent,
        },
      ],
    }

    // Send email via Mailjet
    const result = await mailjet!.post('send', { version: 'v3.1' }).request(emailData)

    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error processing form submission:', error)

    // Handle specific Mailjet errors
    if (error instanceof Error && 'statusCode' in error) {
      const mailjetError = error as any
      console.error('Mailjet error details:', mailjetError.response?.body || mailjetError.message)

      if (mailjetError.statusCode === 401) {
        return NextResponse.json(
          { message: 'Email service authentication failed' },
          { status: 500 }
        )
      }

      if (mailjetError.statusCode === 400) {
        return NextResponse.json({ message: 'Invalid email configuration' }, { status: 500 })
      }
    }

    return NextResponse.json(
      { message: 'An error occurred while submitting the form' },
      { status: 500 }
    )
  }
}
