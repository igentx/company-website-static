'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormBlok, FormFieldBlok } from '@/lib/types'
import FormField from './FormField'

interface GenericFormProps {
    blok: FormBlok
    variant?: 'default' | 'embedded'
}

// Create dynamic validation schema from form_field blocks
const createValidationSchemaFromBloks = (fields: FormFieldBlok[]) => {
    const schemaFields: Record<string, z.ZodTypeAny> = {}

    fields.forEach((field) => {
        let fieldSchema: z.ZodTypeAny

        // Base schema based on field type
        switch (field.field_type) {
            case 'email':
                fieldSchema = z.string().email(field.validation_message || 'Please enter a valid email address')
                break
            case 'url':
                fieldSchema = z.string().url(field.validation_message || 'Please enter a valid URL')
                break
            case 'number':
                let numberSchema = z.coerce.number()
                if (field.min_value !== undefined) {
                    numberSchema = numberSchema.min(field.min_value, `Minimum value is ${field.min_value}`)
                }
                if (field.max_value !== undefined) {
                    numberSchema = numberSchema.max(field.max_value, `Maximum value is ${field.max_value}`)
                }
                fieldSchema = numberSchema
                break
            default:
                fieldSchema = z.string()
        }

        // Apply required validation
        if (field.required) {
            if (fieldSchema instanceof z.ZodString) {
                fieldSchema = (fieldSchema as z.ZodString).min(1, field.validation_message || `${field.label} is required`)
            }
        }

        // Apply length validations for string fields
        if (fieldSchema instanceof z.ZodString) {
            let stringSchema = fieldSchema as z.ZodString
            if (field.min_length) {
                stringSchema = stringSchema.min(field.min_length, `Minimum ${field.min_length} characters required`)
            }
            if (field.max_length) {
                stringSchema = stringSchema.max(field.max_length, `Maximum ${field.max_length} characters allowed`)
            }

            // Apply custom regex validation
            if (field.validation_regex) {
                try {
                    const regex = new RegExp(field.validation_regex)
                    stringSchema = stringSchema.regex(regex, field.validation_message || 'Invalid format')
                } catch (error) {
                    console.error('Invalid regex pattern:', field.validation_regex)
                }
            }
            fieldSchema = stringSchema
        }

        // Handle optional fields
        if (!field.required) {
            schemaFields[field.field_id] = fieldSchema.optional().or(z.literal(''))
        } else {
            schemaFields[field.field_id] = fieldSchema
        }
    })

    return z.object(schemaFields)
}

export default function GenericForm({ blok, variant = 'default' }: GenericFormProps) {
    const isEmbedded = variant === 'embedded'
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
    const [submitMessage, setSubmitMessage] = useState('')

    // Use new form_fields if available, otherwise fall back to legacy fields
    const formFields = blok.form_fields || []
    const validationSchema = createValidationSchemaFromBloks(formFields)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (data: any) => {
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData: data,
                    formConfig: {
                        title: blok.title,
                        email_subject: blok.email_subject,
                        email_body_description: blok.email_body_description,
                        recipient_email: blok.recipient_email,
                        sender_email: blok.sender_email,
                        sender_name: blok.sender_name,
                        fields: formFields,
                    },
                }),
            })

            if (response.ok) {
                setSubmitStatus('success')
                setSubmitMessage(blok.success_message)
                reset()
            } else {
                const errorData = await response.json()
                setSubmitStatus('error')
                setSubmitMessage(errorData.message || blok.error_message)
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
        <div className="w-full">
            {!isEmbedded && blok.title && (
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{blok.title}</h2>
            )}

            {!isEmbedded && blok.description && (
                <p className="text-gray-600 mb-8">{blok.description}</p>
            )}

            {submitStatus && (
                <div
                    className={`mb-6 p-4 rounded-xl ${submitStatus === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                    role={submitStatus === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                >
                    {submitMessage}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.map((field) => (
                        <FormField
                            key={field._uid}
                            blok={field}
                            register={register}
                            errors={errors}
                        />
                    ))}
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white ${isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#030a23] hover:bg-[#111d43] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/40'
                            } transition duration-150 ease-in-out`}
                    >
                        {isSubmitting ? 'Submitting...' : blok.submit_button_text}
                    </button>
                </div>
            </form>
        </div>
    )
}

