"use client"

import { useEffect, useState } from "react"

interface TranslationToastProps {
    isLoading: boolean
}

export function TranslationToast({ isLoading }: TranslationToastProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isLoading) {
            // Fade in when loading starts
            setIsVisible(true)
        } else if (isVisible) {
            // Fade out when loading stops
            const timer = setTimeout(() => {
                setIsVisible(false)
            }, 500) // Small delay before fading out
            return () => clearTimeout(timer)
        }
    }, [isLoading, isVisible])

    if (!isLoading && !isVisible) return null

    return (
        <div
            className="dark:invert"
            style={{
                position: "fixed",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "16px 24px",
                margin: "0 auto 16px auto",
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.25s ease-in-out"
            }}
        >
            {/* Static loading indicator */}
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: "gray" }}
                className="animate-spin"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeOpacity="0.25"
                />
                <path
                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
            </svg>
            <span
                style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#374151"
                }}
            >
                Syncing Translations...
            </span>
        </div>
    )
}
