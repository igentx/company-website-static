'use client'

import React from 'react'
import { FormFieldBlok } from '@/lib/types'

interface FormFieldProps {
    blok: FormFieldBlok
    register: any
    errors: any
}

export default function FormField({ blok, register, errors }: FormFieldProps) {
    const parseOptions = (optionsString?: string): { label: string; value: string }[] => {
        if (!optionsString) return []

        // Split by newline or comma
        const items = optionsString.includes('\n')
            ? optionsString.split('\n')
            : optionsString.split(',')

        return items
            .map(item => item.trim())
            .filter(item => item.length > 0)
            .map(item => ({
                label: item,
                value: item.toLowerCase().replace(/\s+/g, '-')
            }))
    }

    const options = parseOptions(blok.options)
    const fieldId = blok.field_id
    const hasError = !!errors[fieldId]
    const errorId = hasError ? `${fieldId}-error` : undefined

    const baseClasses = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400'
    const errorClasses = hasError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
    const fieldClasses = `${baseClasses} ${errorClasses}`

    const getGridColumnClass = () => {
        switch (blok.field_width) {
            case 'half':
                return 'col-span-1' // Takes 1 column in 2-column grid
            case 'third':
                return 'col-span-1' // Takes 1 column (Note: will need 3-column grid)
            case 'two-thirds':
                return 'md:col-span-2' // Takes 2 columns (Note: will need 3-column grid)
            case 'full':
            default:
                return 'md:col-span-2' // Spans both columns in 2-column grid
        }
    }

    const renderField = () => {
        switch (blok.field_type) {
            case 'text':
            case 'email':
            case 'tel':
            case 'url':
            case 'date':
                return (
                    <input
                        type={blok.field_type}
                        id={fieldId}
                        placeholder={blok.placeholder}
                        defaultValue={blok.default_value}
                        className={fieldClasses}
                        aria-describedby={errorId}
                        aria-invalid={hasError}
                        aria-required={blok.required}
                        autoComplete={blok.autocomplete}
                        {...register(fieldId)}
                    />
                )

            case 'number':
                return (
                    <input
                        type="number"
                        id={fieldId}
                        placeholder={blok.placeholder}
                        defaultValue={blok.default_value}
                        min={blok.min_value}
                        max={blok.max_value}
                        className={fieldClasses}
                        aria-describedby={errorId}
                        aria-invalid={hasError}
                        aria-required={blok.required}
                        {...register(fieldId)}
                    />
                )

            case 'textarea':
                return (
                    <textarea
                        id={fieldId}
                        placeholder={blok.placeholder}
                        defaultValue={blok.default_value}
                        rows={4}
                        className={fieldClasses}
                        aria-describedby={errorId}
                        aria-invalid={hasError}
                        aria-required={blok.required}
                        {...register(fieldId)}
                    />
                )

            case 'select':
                return (
                    <select
                        id={fieldId}
                        className={fieldClasses}
                        aria-describedby={errorId}
                        aria-invalid={hasError}
                        aria-required={blok.required}
                        multiple={blok.multiple}
                        defaultValue={blok.default_value}
                        {...register(fieldId)}
                    >
                        <option value="">Select an option</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )

            case 'checkbox':
                return (
                    <fieldset className="space-y-2" aria-describedby={errorId}>
                        <legend className="sr-only">{blok.label}</legend>
                        {options.map((option) => (
                            <label key={option.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={option.value}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-offset-2"
                                    aria-invalid={hasError}
                                    {...register(fieldId)}
                                />
                                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </fieldset>
                )

            case 'radio':
                return (
                    <fieldset className="space-y-2" aria-describedby={errorId}>
                        <legend className="sr-only">{blok.label}</legend>
                        {options.map((option) => (
                            <label key={option.value} className="flex items-center">
                                <input
                                    type="radio"
                                    value={option.value}
                                    defaultChecked={blok.default_value === option.value}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 focus:ring-2 focus:ring-offset-2"
                                    {...register(fieldId)}
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

    return (
        <div className={getGridColumnClass()}>
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-2">
                {blok.label}
                {blok.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {renderField()}

            {blok.help_text && !hasError && (
                <p className="mt-1 text-sm text-gray-500">
                    {blok.help_text}
                </p>
            )}

            {hasError && (
                <p
                    id={errorId}
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                    aria-live="polite"
                >
                    {errors[fieldId]?.message as string}
                </p>
            )}
        </div>
    )
}

