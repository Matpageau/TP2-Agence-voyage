export default function createError(message: string, status: number, code: string) {
    const err = new Error(message) as any
    err.status = status
    err.code = code
    return err
}