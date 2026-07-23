'use client'

import { useEffect, useRef } from 'react'
import { isPreview } from '@/lib/utils'

/**
 * Component that automatically clicks the element with id "ai-chat-fab"
 * after the page loads. Only used on specific pages.
 * Disabled in preview mode to prevent chat from opening/closing issues.
 */
export default function AutoClickChatFab() {
    const attemptsRef = useRef(0)
    const clickedRef = useRef(false)
    const maxAttempts = 10 // Maximum number of attempts to find the element

    useEffect(() => {
        // Skip auto-click in preview mode
        if (isPreview()) {
            return
        }

        const clickChatFab = () => {
            // Only click once
            if (clickedRef.current) {
                return true
            }

            const chatFab = document.getElementById('ai-chat-fab')
            if (chatFab) {
                // Check if chat is already open (by checking if it's visible or has certain classes/attributes)
                // If it's a toggle button, we only want to click if it's closed
                const isVisible = chatFab.offsetParent !== null
                const ariaExpanded = chatFab.getAttribute('aria-expanded')

                // Only click if chat appears to be closed
                if (ariaExpanded === 'false' || ariaExpanded === null) {
                    // Mark as clicked before actually clicking to prevent multiple clicks
                    clickedRef.current = true

                    // Use a small delay to ensure the element is ready
                    setTimeout(() => {
                        chatFab.click()
                    }, 100)
                    return true
                }
            }
            return false
        }

        // Set up retry mechanism with exponential backoff
        const tryClick = () => {
            // Don't retry if we've already clicked
            if (clickedRef.current) {
                return
            }

            attemptsRef.current += 1

            if (clickChatFab()) {
                // Successfully clicked, stop retrying
                return
            }

            if (attemptsRef.current < maxAttempts) {
                // Retry with increasing delay
                const delay = Math.min(500 * attemptsRef.current, 2000)
                setTimeout(tryClick, delay)
            }
        }

        // Wait 5 seconds before attempting to click
        const initialDelay = 5000 // 5 seconds
        const timeoutId = setTimeout(tryClick, initialDelay)

        // Also try when window loads (after 5 seconds)
        const handleLoad = () => {
            if (!clickedRef.current) {
                setTimeout(tryClick, initialDelay)
            }
        }
        window.addEventListener('load', handleLoad)

        return () => {
            clearTimeout(timeoutId)
            window.removeEventListener('load', handleLoad)
        }
    }, [])

    // This component doesn't render anything
    return null
}

