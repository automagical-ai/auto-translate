"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"
import { TranslationToast } from "../components/translation-toast"

interface AutoTranslateContextType {
    defaultLocale: string
    locales: string[]
    isCheckingTranslations: boolean
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

    const [isCheckingTranslations, setIsCheckingTranslations] = useState(false)

    // Check translations whenever the locales array changes (or on initial mount)
    // biome-ignore lint/correctness/useExhaustiveDependencies: Check translations on initial mount and when locales change
    useEffect(() => {
        const checkTranslations = async () => {
            setIsCheckingTranslations(true)

            try {
                await fetch("/api/auto-translate/check-translations")
            } catch (error) {
                console.error("Error checking translations:", error)
            }

            setIsCheckingTranslations(false)
        }

        checkTranslations()
    }, [locales])

    return (
        <AutoTranslateContext.Provider value={{ defaultLocale, locales, isCheckingTranslations }}>
            {children}
            <TranslationToast isLoading={isCheckingTranslations} />
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

export function useTranslationStatus() {
    const context = useContext(AutoTranslateContext)

    if (context === undefined) {
        throw new Error("useTranslationStatus must be used within an AutoTranslateProvider")
    }

    return {
        isCheckingTranslations: context.isCheckingTranslations
    }
}
