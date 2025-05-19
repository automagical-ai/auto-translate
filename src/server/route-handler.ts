import type { AutoTranslateConfig } from "../types"
import { checkTranslations } from "./check-translations"
import { translateMessage } from "./translate-message"

export function routeHandler({
    request,
    config
}: {
    request: Request
    config: AutoTranslateConfig
}) {
    const url = new URL(request.url)
    const slug = url.pathname.split("/").pop()

    switch (slug) {
        case "check-translations":
            return checkTranslations({ request, config })
        case "translate-message":
            return translateMessage({ request, config })
        default:
            return Response.json({ error: "Not found" }, { status: 404 })
    }
}
