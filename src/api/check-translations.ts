import { join } from "path"

/**
 * Loads English translations from messages/en.json file
 * @returns Object containing the translations
 */
export async function loadEnglishTranslations() {
    if (typeof window !== "undefined") return

    try {
        const filePath = join(process.cwd(), "messages", "en.json")

        const fs = require("fs")

        // // Read the file and parse it as JSON
        const fileContents = fs.readFileSync(filePath, "utf8")
        const translations = JSON.parse(fileContents)

        console.log(translations)
    } catch (error) {
        console.error("Error loading translations:", error)
        return {}
    }
}
