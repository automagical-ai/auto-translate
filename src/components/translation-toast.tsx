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
        <>
            <style>{`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
            <div
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 2147483647,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "18px",
                    border: "2px solid #222222",
                    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.1)",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.25s ease-in-out"
                }}
            >
                <span
                    style={{
                        fontSize: "16px",
                        color: "#ffffff",
                        animation: "spin 1.75s linear infinite",
                        display: "inline-block"
                    }}
                >
                    ☆
                </span>
            </div>
        </>
    )
}
