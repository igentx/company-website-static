'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { FloatingContactButtonBlok } from '@/lib/types'

interface FloatingContactButtonProps {
    blok?: FloatingContactButtonBlok
}

export default function FloatingContactButton({ blok }: FloatingContactButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { isRTL } = useLanguage()

    // Don't render if disabled or no blok provided
    if (!blok || blok.enabled === false) {
        return null
    }

    const hasContactOptions =
        blok.phone ||
        blok.email ||
        blok.whatsapp_number ||
        blok.address ||
        (blok.social_links && blok.social_links.length > 0)

    if (!hasContactOptions) {
        return null
    }

    // Get color classes based on button_color
    const getColorClasses = () => {
        switch (blok.button_color) {
            case 'green':
                return 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:ring-green-300'
            case 'purple':
                return 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:ring-purple-300'
            case 'orange':
                return 'from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 focus:ring-orange-300'
            default: // blue
                return 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-blue-300'
        }
    }

    // Determine button position
    const positionClass = blok.button_position === 'bottom-left'
        ? (isRTL ? 'right-6' : 'left-6')
        : (isRTL ? 'left-6' : 'right-6')

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 ${positionClass} z-50 bg-gradient-to-r ${getColorClasses()} text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4`}
                aria-label={blok.button_label || 'Contact options'}
                title={blok.button_label || 'Contact us'}
            >
                {isOpen ? (
                    // Close icon
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    // Chat icon
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                )}

                {/* Notification badge */}
                {blok.show_notification_badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        !
                    </span>
                )}
            </button>

            {/* Contact Options Modal */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <div
                        className={`fixed bottom-24 ${positionClass} z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-80 max-w-[calc(100vw-3rem)] transform transition-all duration-300 animate-slide-up`}
                    >
                        {/* Header */}
                        <div className={`bg-gradient-to-r ${getColorClasses().split('hover')[0]} text-white p-4 rounded-t-2xl`}>
                            <h3 className="font-bold text-lg font-primary">
                                {blok.modal_title || (isRTL ? 'تواصل معنا' : 'Contact Us')}
                            </h3>
                            <p className="text-sm opacity-90 mt-1">
                                {blok.modal_subtitle || (isRTL ? 'اختر طريقة التواصل المفضلة' : 'Choose your preferred method')}
                            </p>
                        </div>

                        {/* Contact Options */}
                        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
                            {/* WhatsApp - Featured & Priority */}
                            {blok.whatsapp_number && (
                                <a
                                    href={`https://wa.me/${blok.whatsapp_number.replace(/\D/g, '')}${blok.whatsapp_message
                                        ? `?text=${encodeURIComponent(blok.whatsapp_message)}`
                                        : ''
                                        }`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                                >
                                    {/* Animated background effect */}
                                    <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                                    {/* Icon */}
                                    <div className="relative bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </div>

                                    {/* Content */}
                                    <div className="relative flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-bold text-base text-white">
                                                {blok.whatsapp_label || (isRTL ? 'واتساب' : 'WhatsApp')}
                                            </p>
                                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-white/30 backdrop-blur-sm rounded-full uppercase tracking-wide">
                                                {isRTL ? 'الأسرع' : 'Fastest'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-white/80 mt-0.5">
                                            {isRTL ? 'رد فوري - متاح الآن' : 'Instant reply - Available now'}
                                        </p>
                                    </div>

                                    {/* Arrow icon */}
                                    <svg
                                        className="relative w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </a>
                            )}

                            {/* Phone */}
                            {blok.phone && (
                                <a
                                    href={`tel:${blok.phone.replace(/\s/g, '')}`}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 transition-colors group"
                                >
                                    <div className="bg-blue-500 text-white p-2 rounded-lg group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                                            {blok.phone_label || (isRTL ? 'هاتف' : 'Phone')}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                            {blok.phone}
                                        </p>
                                    </div>
                                    <svg
                                        className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </a>
                            )}

                            {/* Email */}
                            {blok.email && (
                                <a
                                    href={`mailto:${blok.email}`}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 transition-colors group"
                                >
                                    <div className="bg-purple-500 text-white p-2 rounded-lg group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                                            {blok.email_label || (isRTL ? 'بريد إلكتروني' : 'Email')}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                            {blok.email}
                                        </p>
                                    </div>
                                    <svg
                                        className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </a>
                            )}

                            {/* Address */}
                            {blok.address && (
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30">
                                    <div className="bg-orange-500 text-white p-2 rounded-lg">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                                            {blok.address_label || (isRTL ? 'العنوان' : 'Address')}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {blok.address}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Social Links */}
                            {blok.social_links && blok.social_links.length > 0 && (
                                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 px-1">
                                        {blok.social_links_title || (isRTL ? 'تابعنا على' : 'Follow us on')}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {blok.social_links.map((social) => (
                                            <a
                                                key={social._uid}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors group"
                                                aria-label={social.platform}
                                                title={social.platform}
                                            >
                                                {social.icon?.filename ? (
                                                    <img
                                                        src={social.icon.filename}
                                                        alt={social.icon.alt || social.platform}
                                                        className="w-5 h-5 object-contain"
                                                    />
                                                ) : (
                                                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                        {getSocialIcon(social.platform)}
                                                    </span>
                                                )}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-b-2xl border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                                {blok.modal_footer_text || (isRTL
                                    ? 'نحن هنا للمساعدة! اختر أي طريقة للتواصل'
                                    : "We're here to help! Choose any method to reach us")}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

// Helper function to render social icons
function getSocialIcon(platform: string) {
    const iconClass = 'w-5 h-5'

    switch (platform.toLowerCase()) {
        case 'facebook':
            return (
                <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            )
        case 'twitter':
        case 'x':
            return (
                <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            )
        case 'instagram':
            return (
                <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
            )
        case 'linkedin':
            return (
                <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            )
        case 'youtube':
            return (
                <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            )
        case 'tiktok':
            return (
                <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
            )
        case 'snapchat':
            return (
                <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.024.503 0 .114.004.228.01.342.01.168.027.337.056.504.066.384.23.809.56 1.043.101.071.305.143.607.174.395.04.913.027 1.468-.114.236-.059.493-.11.765-.11.254 0 .524.039.765.146.413.187.678.549.678.963 0 .382-.219.682-.582.88-.418.23-1.018.414-1.75.527-.283.043-.527.098-.739.164-.438.138-.77.336-.985.57-.104.117-.184.249-.235.392-.107.299-.149.666-.133 1.081.013.334.04.684.08 1.046.037.331.081.669.135 1.006.082.506.188 1.022.36 1.539.18.55.516 1.099 1.053 1.491.519.378 1.045.538 1.466.542.264.007.422-.033.537-.098a1.064 1.064 0 00.26-.273c.062-.104.117-.236.155-.39.041-.169.071-.37.071-.59a1.68 1.68 0 01.08-.477c.052-.143.137-.292.268-.413.179-.166.419-.272.69-.324a2.51 2.51 0 01.644-.047c.484.026.947.15 1.332.313.385.162.722.354.983.533.247.17.442.338.568.485a1.026 1.026 0 01.144.298c.043.125.063.264.053.41-.01.153-.058.321-.179.504a3.33 3.33 0 01-.612.64c-.402.339-.896.57-1.406.697-.534.132-1.112.155-1.69.034-.56-.119-1.116-.37-1.625-.732a6.05 6.05 0 00-1.108-.685 6.035 6.035 0 00-1.206-.383c-.403-.082-.826-.116-1.25-.105-.417.012-.835.067-1.245.162a8.334 8.334 0 00-1.198.34c-.395.137-.78.3-1.146.483a9.12 9.12 0 01-1.108.515c-.405.159-.821.286-1.236.38a5.95 5.95 0 01-1.23.148c-.417.001-.834-.034-1.236-.107-.822-.148-1.595-.428-2.236-.837a3.925 3.925 0 01-1.051-.909c-.268-.356-.43-.757-.456-1.174-.03-.47.12-.928.418-1.316.297-.39.736-.71 1.266-.934.53-.223 1.15-.345 1.784-.312.636.032 1.286.212 1.877.512.591.3 1.128.73 1.544 1.237.166.201.309.416.428.646.118.229.214.476.274.736.06.26.086.532.071.805-.015.273-.075.548-.186.808-.112.261-.28.508-.503.718-.223.21-.508.383-.842.493a2.802 2.802 0 01-1.073.084c-.362-.027-.718-.109-1.043-.232-.324-.123-.622-.285-.882-.483a3.19 3.19 0 01-.668-.672c-.178-.257-.31-.544-.379-.853a2.48 2.48 0 01-.028-.956c.036-.318.133-.632.288-.928.155-.295.37-.571.638-.808.267-.237.592-.435.965-.575a4.31 4.31 0 011.245-.278c.422-.033.847-.002 1.256.09.41.091.805.235 1.158.419.353.184.669.41.935.668.265.258.478.545.627.85.15.305.235.629.251.96.016.33-.029.66-.133.973a2.63 2.63 0 01-.484.86c-.214.257-.486.475-.799.635a2.47 2.47 0 01-1.014.276c-.175.01-.351.001-.525-.027a2.03 2.03 0 01-.499-.13c-.162-.064-.314-.154-.451-.268-.137-.113-.258-.25-.359-.406a1.762 1.762 0 01-.214-.54 1.78 1.78 0 01.002-.56c.033-.186.098-.368.194-.535.096-.167.223-.318.373-.443a1.82 1.82 0 01.532-.299c.195-.064.402-.09.609-.074.207.017.411.074.598.165.186.092.354.217.491.37.137.152.243.333.31.532.067.198.094.413.076.627a1.183 1.183 0 01-.167.535 1.17 1.17 0 01-.407.41c-.169.1-.369.149-.576.133-.207-.016-.409-.092-.58-.215a.998.998 0 01-.331-.465.988.988 0 01-.023-.572c.032-.186.107-.364.221-.517.113-.153.264-.28.442-.37a1.39 1.39 0 01.605-.148c.209-.004.417.032.607.104.19.073.364.183.509.323.145.14.261.308.341.495.08.187.123.392.12.598-.002.206-.051.41-.143.593a1.18 1.18 0 01-.415.463c-.181.118-.396.19-.623.204a1.38 1.38 0 01-.657-.111 1.36 1.36 0 01-.531-.381c-.146-.163-.254-.362-.313-.58a1.302 1.302 0 01.006-.656c.051-.216.152-.42.294-.593.143-.173.325-.314.532-.412.207-.098.436-.152.672-.155.236-.003.472.043.684.135.212.091.403.226.556.394.153.168.267.368.333.586.066.218.084.45.05.677a1.45 1.45 0 01-.233.633c-.134.195-.314.36-.525.475a1.77 1.77 0 01-.728.21c-.262.02-.527-.009-.778-.084a1.85 1.85 0 01-.683-.363 1.827 1.827 0 01-.456-.604c-.104-.228-.151-.48-.134-.733.016-.252.093-.5.223-.714.13-.214.312-.395.527-.522.215-.126.462-.199.718-.208.255-.008.51.048.738.163.228.115.425.284.573.492.147.208.242.453.273.712.031.259.002.522-.084.766a1.583 1.583 0 01-.399.62c-.19.176-.422.303-.674.37-.253.065-.52.069-.78.008a1.729 1.729 0 01-.718-.369 1.7 1.7 0 01-.473-.646 1.683 1.683 0 01-.111-.787c.024-.268.116-.527.267-.75.15-.222.358-.405.603-.528.244-.122.518-.181.795-.17.277.013.549.091.787.225.238.134.44.322.587.545a1.36 1.36 0 01.182.748c-.011.261-.09.516-.228.73-.138.214-.334.383-.569.486a1.43 1.43 0 01-.776.09z" />
                </svg>
            )
        default:
            return <span className="text-lg">{platform[0].toUpperCase()}</span>
    }
}
