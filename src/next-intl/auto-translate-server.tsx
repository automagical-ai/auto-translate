import { useTranslations } from "next-intl"
import { getLocale } from "next-intl/server"
import { Suspense } from "react"
import { LoadingText } from "../components/loading-text"
import type { AutoTranslateProps } from "./auto-translate"
import { getCachedNamespace } from "./namespace-cache"

async function TranslateMessage({
    children: message,
    translationKey
}: {
    children: string
    translationKey: string
}) {
    const locale = await getLocale()

    console.log("Locale:", locale)
    // await doTranslate()
    // const t = useTranslations()
    // return t.has(translationKey) ? t(translationKey) : message

    console.log("Translating message:", message)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Translated!", message)
    return <>{message}</>
}

export function AutoTranslateServer({
    children: message,
    namespace,
    tKey
}: AutoTranslateProps & { tKey: string }) {
    const resolvedNamespace = namespace ?? getCachedNamespace()
    const t = useTranslations()
    const translationKey = resolvedNamespace ? `${resolvedNamespace}.${tKey}` : tKey

    // If the translation exists, or we're not in development, render string immediately
    if (t.has(translationKey) || process.env.NODE_ENV !== "development") {
        return t.has(translationKey) ? t(translationKey) : message
    }

    return (
        <Suspense fallback={<LoadingText>{message}</LoadingText>}>
            <TranslateMessage translationKey={translationKey}>{message}</TranslateMessage>
        </Suspense>
    )
}
