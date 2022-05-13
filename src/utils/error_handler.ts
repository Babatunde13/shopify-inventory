export const serverErrorHandler = (
    error: NodeJS.ErrnoException,
): void => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            console.log(`port requires elevated privileges.`)
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.log(`port is already in use.`)
            process.exit(1)
            break
        default:
            console.log(error.code)
            process.exit(1)
    }
}

export default function isError(e: { error: Error } | any): e is { error: Error } {
    if (!e) {
        return true
    }

    return e.error instanceof Error
}
