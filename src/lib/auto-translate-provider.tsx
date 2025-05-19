"use client"

import { type ReactNode, createContext, useContext, useEffect } from "react"

interface AutoTranslateContextType {
    defaultLocale: string
    locales: string[]
}

const AutoTranslateContext = createContext<AutoTranslateContextType | undefined>(undefined)

interface AutoTranslateProviderProps {
    children: ReactNode
    defaultLocale: string
    locales: string[]
}

export function AutoTranslateProvider({
    children,
    defaultLocale,
    locales
}: AutoTranslateProviderProps) {
    if (process.env.NODE_ENV !== "development") return children

    // Check translations whenever the locales array changes (or on initial mount)
    // biome-ignore lint/correctness/useExhaustiveDependencies:
    useEffect(() => {
        console.log("checkTranslations")

        const checkTranslations = async () => {
            try {
                await fetch("/api/auto-translate/check-translations")
                console.log("Translations checked successfully")
            } catch (error) {
                console.error("Error checking translations:", error)
            }
        }

        checkTranslations()
    }, [locales])

    return (
        <AutoTranslateContext.Provider value={{ defaultLocale, locales }}>
            {children}
        </AutoTranslateContext.Provider>
    )
}

export function useDefaultLocale() {
    const context = useContext(AutoTranslateContext)

    if (context === undefined) {
        throw new Error("useDefaultLocale must be used within an AutoTranslateProvider")
    }

    return context.defaultLocale
}

export function useLocales() {
    const context = useContext(AutoTranslateContext)

    if (context === undefined) {
        throw new Error("useLocales must be used within an AutoTranslateProvider")
    }

    return context.locales
}
