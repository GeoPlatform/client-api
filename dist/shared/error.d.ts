declare class GPError extends Error {
    error: string | null;
    status: number;
    statusCode: number;
    constructor(message: string);
    setError(value: string): void;
    setStatus(value: number): void;
}
export default GPError;
