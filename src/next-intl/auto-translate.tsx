"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { LoadingText } from "../components/loading-text"
import { createMessageKey } from "../lib/create-message-key"

export interface AutoTranslateProps {
    children: string
    namespace?: string
    tKey?: string
    inferNamespace?: boolean
}

export function AutoTranslate({
    children: message,
    namespace,
    tKey,
    inferNamespace = true
}: AutoTranslateProps) {
    const resolvedTKey = tKey ?? createMessageKey(message)
    const [prevMessage, setPrevMessage] = useState(message)

    const locale = useLocale()
    const pathname = usePathname()
    const [, slug] = pathname.replace(`/${locale}`, "").split("/")
    const resolvedNamespace = namespace || (inferNamespace && (slug || "index"))

    const t = useTranslations()
    const translationKey = resolvedNamespace ? `${resolvedNamespace}.${resolvedTKey}` : resolvedTKey

    if (process.env.NODE_ENV !== "development") {
        return t.has(translationKey) ? t(translationKey) : message
    }

    const needsTranslation = useMemo(() => {
        const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "en"

        return (
            !t.has(translationKey) ||
            (locale === defaultLocale && t(translationKey) !== message) ||
            message !== prevMessage
        )
    }, [message, prevMessage, locale, t, translationKey])

    const isTranslatingRef = useRef(false)
    const [isTranslating, setIsTranslating] = useState(false)

    useEffect(() => {
        setPrevMessage(message)
    }, [message])

    useEffect(() => {
        if (!needsTranslation) return
        if (isTranslatingRef.current) return

        translateMessage()
    }, [needsTranslation])

    const translateMessage = async () => {
        isTranslatingRef.current = true
        setIsTranslating(true)

        fetch(`/api/auto-translate/translate-message?key=${resolvedTKey}&message=${message}`)

        isTranslatingRef.current = false
        setIsTranslating(false)
    }

    if (isTranslating) {
        return <LoadingText>{t.has(translationKey) ? t(translationKey) : message}</LoadingText>
    }

    return t.has(translationKey) ? t(translationKey) : message
}
