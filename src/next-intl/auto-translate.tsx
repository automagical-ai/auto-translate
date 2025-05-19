import { useLocale, useTranslations } from "next-intl"
import { createMessageKey } from "../lib/create-message-key"
import { isClient } from "../lib/utils"
import { getCachedNamespace } from "./namespace-cache"

export interface AutoTranslateProps {
    children: string
    namespace?: string
    tKey?: string
}

export function AutoTranslate({ children: message, namespace, tKey }: AutoTranslateProps) {
    if (isClient) {
        const locale = useLocale()
        const [, slug] = window.location.pathname.replace(`/${locale}`, "").split("/")
        namespace = namespace || slug || "index"
    } else {
        namespace = namespace ?? getCachedNamespace()
    }

    const t = useTranslations()
    tKey = tKey ?? createMessageKey(message)
    const translationKey = namespace ? `${namespace}.${tKey}` : tKey

    return <>{t.has(translationKey) ? t(translationKey) : message}</>
}
