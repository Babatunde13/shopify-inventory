export const serverErrorHandler = (
    error: NodeJS.ErrnoException,
): void => {
    if (error.syscall !== "listen") {
        throw error;
    }
    switch (error.code) {
        case "EACCES":
        console.log(`port requires elevated privileges.`);
        process.exit(1);
        break;
        case "EADDRINUSE":
        console.log(`port is already in use.`);
        process.exit(1);
        break;
        default:
        throw error;
    }
};

export default function isError(e: { error: Error } | any): e is { error: Error } {
    if (!e) {
        return true
    }

    return e.error instanceof Error
}
