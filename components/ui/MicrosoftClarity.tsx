'use client'

import { useEffect } from 'react'
import clarity from '@microsoft/clarity'

/**
 * Microsoft Clarity Component
 *
 * Initializes Microsoft Clarity tracking using the official @microsoft/clarity package.
 * Loads automatically when NEXT_PUBLIC_CLARITY_ID is set.
 *
 * Configure:
 * - Add NEXT_PUBLIC_CLARITY_ID to your .env(.local)
 *
 * Note: Loads without user consent. Ensure compliance with your local privacy regulations.
 */
export default function MicrosoftClarity() {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

    useEffect(() => {
        // Only initialize if we have a clarity ID
        if (!clarityId) {
            return
        }

        // Check if Clarity is already initialized
        if (typeof window !== 'undefined' && (window as any).clarity) {
            return
        }

        // Initialize Clarity with the official package
        clarity.init(clarityId)

        // Optional: Set custom tags or user information
        // clarity.set("user_type", "customer");
        // clarity.identify("USER_ID", { sessionId: "SESSION_ID" });

    }, [clarityId])

    // This is a client-side only component, no render needed
    return null
}
