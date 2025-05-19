import type { AutoTranslateConfig } from "../types"

export async function translateMessage({
    request,
    config
}: {
    request: Request
    config: AutoTranslateConfig
}) {
    const { searchParams } = new URL(request.url)

    const key = searchParams.get("key")
    const message = searchParams.get("message")

    if (!key || !message) {
        return Response.json({ error: "Key and message are required" }, { status: 400 })
    }

    return new Response("Hello, world!")
}
