import { useTranslations } from "next-intl"
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
    // await doTranslate()
    // const t = useTranslations()
    // return t.has(translationKey) ? t(translationKey) : message

    await new Promise((resolve) => setTimeout(resolve, 2000))

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

    if (process.env.NODE_ENV !== "development") {
        return t.has(translationKey) ? t(translationKey) : message
    }

    console.log({ translationKey })

    return (
        <Suspense fallback={<LoadingText>{message}</LoadingText>}>
            <TranslateMessage translationKey={translationKey}>{message}</TranslateMessage>
        </Suspense>
    )
}
