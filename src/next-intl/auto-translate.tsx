import { createMessageKey } from "../lib/create-message-key"
import { isClient } from "../lib/utils"
import { AutoTranslateClient } from "./auto-translate-client"
import { AutoTranslateServer } from "./auto-translate-server"

export interface AutoTranslateProps {
    children: string
    namespace?: string
    tKey?: string
}

export function AutoTranslate({ children: message, tKey, ...props }: AutoTranslateProps) {
    const resolvedTKey = tKey ?? createMessageKey(message)

    console.log(resolvedTKey, process.env)
    return isClient ? (
        <AutoTranslateClient tKey={resolvedTKey} {...props}>
            {message}
        </AutoTranslateClient>
    ) : (
        <AutoTranslateServer tKey={resolvedTKey} {...props}>
            {message}
        </AutoTranslateServer>
    )
}
