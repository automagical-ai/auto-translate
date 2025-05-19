import { createHash } from "crypto"

export function createMessageKey(message: string) {
    // Convert to lowercase and replace non-alphanumeric characters with hyphens
    let formatted = message
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")

    if (formatted.length > 32) {
        // Truncate the formatted string to the limit
        formatted = formatted.substring(0, 32).replace(/-+$/g, "")
    }

    // Generate a random hash to ensure uniqueness
    const hash = createHash("sha256").update(message).digest("hex").substring(0, 8)
    return `${formatted}-v:${hash}`
}
