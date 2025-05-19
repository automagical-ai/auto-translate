import type { AutoTranslateConfig } from "../types"

export async function checkTranslations({
    request,
    config
}: {
    request: Request
    config: AutoTranslateConfig
}) {
    const { searchParams } = new URL(request.url)

    return new Response("Hello, world!")
}
