import { useTranslations } from "next-intl"
import { createMessageKey } from "../../lib/create-message-key"
import { AutoTranslate as AutoTranslateClient, type AutoTranslateProps } from "../auto-translate"
import { getCachedNamespace } from "./namespace-cache"

export function AutoTranslate({ children: message, namespace, tKey }: AutoTranslateProps) {
    const resolvedTKey = tKey ?? createMessageKey(message)
    const resolvedNamespace = namespace ?? getCachedNamespace()

    const t = useTranslations()
    const translationKey = resolvedNamespace ? `${resolvedNamespace}.${resolvedTKey}` : resolvedTKey

    if (process.env.NODE_ENV !== "development") {
        return t.has(translationKey) ? t(translationKey) : message
    }

    return (
        <AutoTranslateClient
            namespace={resolvedNamespace}
            tKey={resolvedTKey}
            inferNamespace={false}
        >
            {message}
        </AutoTranslateClient>
    )
}
