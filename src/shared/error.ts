
class GPError extends Error {
    public error : string|null;
    public status: number = 500;
    public statusCode : number = 500;
    constructor(message : string) {
        super(message);
        this.error = null;
    }
    public setError(value:string) { this.error = value; }
    public setStatus(value:number) { this.status = this.statusCode = value; }
}

export default GPError;
