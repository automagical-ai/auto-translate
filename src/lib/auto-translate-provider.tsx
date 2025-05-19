"use client"

import { type ReactNode, createContext, useContext } from "react"

interface AutoTranslateContextType {
    defaultLocale: string
}

const AutoTranslateContext = createContext<AutoTranslateContextType | undefined>(undefined)

interface AutoTranslateProviderProps {
    children: ReactNode
    defaultLocale: string
}

export function AutoTranslateProvider({ children, defaultLocale }: AutoTranslateProviderProps) {
    return (
        <AutoTranslateContext.Provider value={{ defaultLocale }}>
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
