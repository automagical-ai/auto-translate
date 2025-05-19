"use client"

import { useLocale, useTranslations } from "next-intl"
import { Suspense } from "react"
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

    // If the translation exists, or we're not in development, render string immediately
    if (t.has(translationKey) || process.env.NODE_ENV !== "development") {
        return t.has(translationKey) ? t(translationKey) : message
    }

    console.log("client message: ", message)

    return (
        <Suspense>
            {t.has(translationKey) ? t(translationKey) : <LoadingText>{message}</LoadingText>}
        </Suspense>
    )
}
