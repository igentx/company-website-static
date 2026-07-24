'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormBlok, FormField, ValidationRule } from '@/lib/types'
import TurnstileField, {
  getTurnstileToken,
  resetTurnstileWidget,
} from './TurnstileField'
import { isTurnstileEnabled } from '@/lib/env'

interface FormProps {
  blok: FormBlok
  variant?: 'default' | 'embedded'
}

// Create dynamic validation schema based on form fields
const createValidationSchema = (fields: FormField[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {}

  fields.forEach((field) => {
    let fieldSchema: z.ZodString = z.string()

    // Apply validation rules
    field.validation?.forEach((rule: ValidationRule) => {
      switch (rule.type) {
        case 'required':
          if (field.required) {
            fieldSchema = fieldSchema.min(1, rule.message)
          }
          break
        case 'email':
          fieldSchema = fieldSchema.email(rule.message)
          break
        case 'minLength':
          if (typeof rule.value === 'number') {
            fieldSchema = fieldSchema.min(rule.value, rule.message)
          }
          break
        case 'maxLength':
          if (typeof rule.value === 'number') {
            fieldSchema = fieldSchema.max(rule.value, rule.message)
          }
          break
        case 'pattern':
          if (typeof rule.value === 'string') {
            fieldSchema = fieldSchema.regex(new RegExp(rule.value), rule.message)
          }
          break
      }
    })

    // Handle optional fields
    if (!field.required) {
      schemaFields[field.id] = fieldSchema.optional()
    } else {
      schemaFields[field.id] = fieldSchema
    }
  })

  return z.object(schemaFields)
}

const renderField = (field: FormField, register: any, errors: any) => {
  const baseClasses =
    'w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [color-scheme:light]'
  const errorClasses = errors[field.id]
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
    : ''
  const fieldClasses = `${baseClasses} ${errorClasses}`
  const hasError = !!errors[field.id]
  const errorId = hasError ? `${field.id}-error` : undefined

  switch (field.type) {
    case 'text':
    case 'email':
      return (
        <input
          type={field.type}
          id={field.id}
          placeholder={field.placeholder}
          className={fieldClasses}
          aria-describedby={errorId}
          aria-invalid={hasError}
          aria-required={field.required}
          {...register(field.id)}
        />
      )

    case 'textarea':
      return (
        <textarea
          id={field.id}
          placeholder={field.placeholder}
          rows={4}
          className={fieldClasses}
          aria-describedby={errorId}
          aria-invalid={hasError}
          aria-required={field.required}
          {...register(field.id)}
        />
      )

    case 'select':
      return (
        <select
          id={field.id}
          className={fieldClasses}
          aria-describedby={errorId}
          aria-invalid={hasError}
          aria-required={field.required}
          {...register(field.id)}
        >
          <option value="">Select an option</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )

    case 'checkbox':
      return (
        <fieldset className="space-y-2" aria-describedby={errorId}>
          <legend className="sr-only">{field.label}</legend>
          {field.options?.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                value={option.value}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-offset-2"
                aria-invalid={hasError}
                {...register(field.id)}
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </fieldset>
      )

    case 'radio':
      return (
        <fieldset className="space-y-2" aria-describedby={errorId}>
          <legend className="sr-only">{field.label}</legend>
          {field.options?.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                value={option.value}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 focus:ring-2 focus:ring-offset-2"
                {...register(field.id)}
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </fieldset>
      )

    default:
      return null
  }
}

export default function Form({ blok, variant = 'default' }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [submitMessage, setSubmitMessage] = useState('')

  // Handle new form_fields structure (redirect to GenericForm)
  if (blok.form_fields && blok.form_fields.length > 0) {
    // Import GenericForm dynamically
    const GenericForm = require('@/components/blocks/contact/GenericForm').default
    return <GenericForm blok={blok} variant={variant} />
  }

  // Check if legacy fields exist
  if (!blok.fields || blok.fields.length === 0) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">
          ⚠️ No form fields configured. Please add fields in Storyblok.
        </p>
      </div>
    )
  }

  // Create validation schema from form fields (legacy)
  const validationSchema = createValidationSchema(blok.fields)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(validationSchema),
  })

  const onSubmit = async (data: any, event?: React.BaseSyntheticEvent) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    const formEl = event?.target as HTMLFormElement | undefined
    const turnstileToken = isTurnstileEnabled() && formEl
      ? getTurnstileToken(formEl)
      : undefined

    if (isTurnstileEnabled() && !turnstileToken) {
      setSubmitStatus('error')
      setSubmitMessage('Please complete the captcha verification.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: data,
          turnstileToken,
          formConfig: {
            title: blok.title,
            email_subject: blok.email_subject,
            email_body_description: blok.email_body_description,
            recipient_email: blok.recipient_email,
            sender_email: blok.sender_email,
            sender_name: blok.sender_name,
            fields: blok.fields,
          },
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage(blok.success_message)
        reset()
        resetTurnstileWidget()
      } else {
        const errorData = await response.json()
        setSubmitStatus('error')
        setSubmitMessage(errorData.message || blok.error_message)
        if (response.status === 403) {
          resetTurnstileWidget()
        }
      }
    } catch (err) {
      console.error('Form submission error:', err)
      setSubmitStatus('error')
      setSubmitMessage(blok.error_message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{blok.title}</h2>

        {blok.description && <p className="text-gray-600 mb-8">{blok.description}</p>}

        {submitStatus && (
          <div
            className={`mb-6 p-4 rounded-md ${submitStatus === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            role={submitStatus === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            {submitMessage}
          </div>
        )}

        <form id="igentx-contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {blok.fields.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {renderField(field, register, errors)}

              {errors[field.id] && (
                <p
                  id={`${field.id}-error`}
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                  aria-live="polite"
                >
                  {errors[field.id]?.message as string}
                </p>
              )}
            </div>
          ))}

          <TurnstileField />

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                } transition duration-150 ease-in-out`}
            >
              {isSubmitting ? 'Submitting...' : blok.submit_button_text}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
