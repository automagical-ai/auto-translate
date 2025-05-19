import { cache } from "react"

function getCacheImpl() {
    const value: { namespace?: string } = { namespace: undefined }
    return value
}

const getCache = cache(getCacheImpl)

export function getCachedNamespace() {
    return getCache().namespace
}

export function setNamespace(namespace: string) {
    getCache().namespace = namespace
}
