"use client"

import { useLocale, useTranslations } from "next-intl"
import { Suspense, useEffect } from "react"
import { LoadingText } from "../components/loading-text"
import type { AutoTranslateProps } from "./auto-translate"

export function AutoTranslateClient({
    children: message,
    namespace,
    tKey
}: AutoTranslateProps & { tKey: string }) {
    const locale = useLocale()
    const [, slug] = window.location.pathname.replace(`/${locale}`, "").split("/")
    const resolvedNamespace = namespace || slug || "index"

    const t = useTranslations()
    const translationKey = resolvedNamespace ? `${resolvedNamespace}.${tKey}` : tKey

    useEffect(() => {
        console.log({ translationKey })
    }, [translationKey])

    const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "en"

    const needsTranslation =
        !t.has(translationKey) || (locale === defaultLocale && t(translationKey) !== message)

    if (process.env.NODE_ENV !== "development" || !needsTranslation) {
        return t.has(translationKey) ? t(translationKey) : message
    }

    return (
        <Suspense>
            {needsTranslation ? (
                <LoadingText>{t.has(translationKey) ? t(translationKey) : message}</LoadingText>
            ) : t.has(translationKey) ? (
                t(translationKey)
            ) : (
                message
            )}
        </Suspense>
    )
}
