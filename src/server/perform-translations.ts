import type { AutoTranslateConfig } from "../types"
import { deepDelete } from "../utils/deep-delete"
import { deepGet } from "../utils/deep-get"
import { deepSet } from "../utils/deep-set"
import { loadTranslations } from "./load-translations"
import { saveTranslations } from "./save-translations"

export async function performTranslations({
    key,
    message,
    context,
    config
}: {
    key: string
    message: string
    context?: string
    config: AutoTranslateConfig
}) {
    const translations = await loadTranslations(config.defaultLocale)
    const currentValue = deepGet(translations, key) as string | undefined

    deepSet(translations, key, message)
    await saveTranslations(config.defaultLocale, translations)

    // If the message has changed, clear it from all other locales
    if (currentValue !== message) {
        for (const locale of config.locales) {
            if (locale === config.defaultLocale) continue
            const translations = await loadTranslations(locale)

            deepDelete(translations, key)
            await saveTranslations(locale, translations)
        }
    }

    for (const locale of config.locales) {
        if (locale === config.defaultLocale) continue
        let translations = await loadTranslations(locale)

        const translation = deepGet(translations, key) as string | undefined
        if (translation) continue

        const endpoint = config.translateEndpoint || "https://autotranslate.ai/api/translate"
        console.log(`Translating message: ${message} to ${locale} using endpoint: ${endpoint}`)
        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({
                message,
                context,
                from: config.defaultLocale,
                to: locale
            })
        })

        const data = await response.json()
        if (!data.result) {
            console.error(`Error translating message: ${message}`, data)
            continue
        }

        translations = await loadTranslations(locale)
        deepSet(translations, key, data.result)
        await saveTranslations(locale, translations)
    }
}
