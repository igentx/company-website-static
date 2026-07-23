'use client'

import { useState, useEffect } from 'react'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

interface SocialLink {
    _uid: string
    platform: string
    url: string
    icon?: {
        filename: string
        alt?: string
    }
}

interface InfoBarBlok {
    _uid: string
    component: 'info_bar'
    message?: string
    phone?: string
    phone_label?: string
    email?: string
    email_label?: string
    address?: string
    whatsapp_number?: string
    whatsapp_text?: string
    whatsapp_label?: string
    show_language_switcher?: boolean
    show_contact_text?: boolean
    social_links?: SocialLink[]
}

interface InfoBarProps {
    blok: InfoBarBlok
    isScrolled: boolean
}

export default function InfoBar({ blok, isScrolled }: InfoBarProps) {
    const { isRTL } = useLanguage()

    // Don't render if no content
    const hasContent = blok.message || blok.whatsapp_number || (blok.social_links && blok.social_links.length > 0)

    if (!hasContent && !blok.show_language_switcher) {
        return null
    }

    return (
        <div

            className={`relative z-10 transition-all duration-500 ease-in-out overflow-hidden ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
                } bg-gradient-to-r from-blue-950 to-blue-900 text-white`}
        >
            <div
                className={`container mx-auto px-4 md:px-6 lg:px-8 h-12 ${isRTL ? 'flex-row-reverse' : ''
                    }`}
            >
                {/* Mobile Layout: Contact options left, Language right */}
                <div className="lg:hidden h-12 flex items-center justify-between">
                    <div className={`flex items-center gap-3 text-sm font-secondary ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {/* Phone */}
                        {blok.phone && (
                            <a
                                href={`tel:${blok.phone.replace(/\s/g, '')}`}
                                className="hover:text-blue-200 transition-colors inline-flex items-center justify-center"
                                aria-label={`Call ${blok.phone}`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </a>
                        )}

                        {/* Email */}
                        {blok.email && (
                            <a
                                href={`mailto:${blok.email}`}
                                className="hover:text-blue-200 transition-colors inline-flex items-center justify-center"
                                aria-label={`Email ${blok.email}`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </a>
                        )}

                        {/* WhatsApp */}
                        {blok.whatsapp_number && (
                            <a
                                href={`https://wa.me/${blok.whatsapp_number.replace(/\D/g, '')}${blok.whatsapp_text ? `?text=${encodeURIComponent(blok.whatsapp_text)}` : ''
                                    }`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-200 transition-colors inline-flex items-center justify-center"
                                aria-label="Contact us on WhatsApp"
                            >
                                <svg
                                    className="w-5 h-5 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>
                        )}
                    </div>
                    {blok.show_language_switcher && (
                        <LanguageSwitcher isScrolled={false} isInfoBar={true} />
                    )}
                </div>

                {/* Desktop Layout: Grid with auto | 1fr | auto to keep center free */}
                <div className="hidden lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center h-12 gap-6">
                    {/* Left column: Contact Options - icon + optional text, single line */}
                    <div className={`flex items-center gap-4 text-sm font-secondary ${isRTL ? 'justify-end flex-row-reverse' : 'justify-start'} max-w-[40vw]`}>
                        {/* Phone */}
                        {blok.phone && (
                            <a
                                href={`tel:${blok.phone.replace(/\s/g, '')}`}
                                className="hover:text-blue-200 transition-colors flex items-center gap-1"
                                aria-label={`Call ${blok.phone}`}
                                title={blok.phone}
                            >
                                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                {blok.show_contact_text && (
                                    <span className="whitespace-nowrap truncate max-w-[160px] xl:max-w-none">{blok.phone_label || blok.phone}</span>
                                )}
                            </a>
                        )}

                        {/* Email */}
                        {blok.email && (
                            <a
                                href={`mailto:${blok.email}`}
                                className="hover:text-blue-200 transition-colors flex items-center gap-1"
                                aria-label={`Email ${blok.email}`}
                                title={blok.email}
                            >
                                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                {blok.show_contact_text && (
                                    <span className="whitespace-nowrap truncate max-w-[220px] xl:max-w-none">{blok.email_label || blok.email}</span>
                                )}
                            </a>
                        )}

                        {/* WhatsApp */}
                        {blok.whatsapp_number && (
                            <a
                                href={`https://wa.me/${blok.whatsapp_number.replace(/\D/g, '')}${blok.whatsapp_text ? `?text=${encodeURIComponent(blok.whatsapp_text)}` : ''
                                    }`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-200 transition-colors flex items-center gap-1"
                                title={blok.whatsapp_number}
                                aria-label="Contact us on WhatsApp"
                            >
                                <svg
                                    className="w-4 h-4 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                {blok.show_contact_text && (
                                    <span className="whitespace-nowrap truncate max-w-[180px] xl:max-w-none">{blok.whatsapp_label || blok.whatsapp_number}</span>
                                )}
                            </a>
                        )}

                        {/* Address */}
                        {blok.address && (
                            <span className="flex items-center gap-1.5 min-w-0" title={blok.address}>
                                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {blok.show_contact_text && (
                                    <span className="hidden xl:inline whitespace-nowrap truncate max-w-[220px]">{blok.address}</span>
                                )}
                            </span>
                        )}
                    </div>

                    {/* Center column: Message */}
                    <div className="flex justify-center items-center">
                        {blok.message && (
                            <span className="font-medium font-secondary text-sm text-center">{blok.message}</span>
                        )}
                    </div>

                    {/* Right column: Social Links and Language Switcher */}
                    <div className={`flex items-center gap-4 ${isRTL ? 'justify-start' : 'justify-end'}`}>
                        {/* Social Links */}
                        {blok.social_links && blok.social_links.length > 0 && (
                            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                {blok.social_links.map((social) => {
                                    const IconComponent = getSocialIcon(social.platform)

                                    // If there's a URL, make it a link
                                    if (social.url) {
                                        return (
                                            <a
                                                key={social._uid}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-blue-200 transition-colors inline-flex items-center justify-center"
                                                aria-label={`Visit our ${social.platform}`}
                                            >
                                                {social.icon?.filename ? (
                                                    <img
                                                        src={social.icon.filename}
                                                        alt={social.icon.alt || social.platform}
                                                        className="w-5 h-5 object-contain"
                                                    />
                                                ) : (
                                                    IconComponent
                                                )}
                                            </a>
                                        )
                                    }

                                    // If no URL, just show the icon (non-clickable)
                                    return (
                                        <span
                                            key={social._uid}
                                            className="opacity-70 cursor-default inline-flex items-center justify-center"
                                            aria-label={social.platform}
                                        >
                                            {social.icon?.filename ? (
                                                <img
                                                    src={social.icon.filename}
                                                    alt={social.icon.alt || social.platform}
                                                    className="w-5 h-5 object-contain"
                                                />
                                            ) : (
                                                IconComponent
                                            )}
                                        </span>
                                    )
                                })}
                            </div>
                        )}

                        {/* Language Switcher */}
                        {blok.show_language_switcher && (
                            <div className="border-l border-white/30 pl-4">
                                <LanguageSwitcher isScrolled={false} isInfoBar={true} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Helper function to render social icons
function getSocialIcon(platform: string) {
    const iconClass = "w-5 h-5 flex-shrink-0"

    // Default platform icons
    switch (platform.toLowerCase()) {
        case 'facebook':
            return (
                <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            )
        case 'twitter':
        case 'x':
            return (
                <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            )
        case 'instagram':
            return (
                <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
            )
        case 'linkedin':
            return (
                <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            )
        case 'youtube':
            return (
                <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            )
        default:
            return <span className="text-lg">{platform[0].toUpperCase()}</span>
    }
}
