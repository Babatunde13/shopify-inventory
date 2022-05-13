/**
 * Resolves a promise and returns the resolved value.
 */
export const __ = async (promise: Promise<any>) => {
    try {
        const result = await promise;
        return {
            data: result
        }
    } catch (error) {
        return {
            error: new Error((error as Error).message)
        }
    }
}
