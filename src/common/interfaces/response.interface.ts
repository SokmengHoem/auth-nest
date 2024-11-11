

export interface GlobalResponse<T> {
    statusCode: number;
    message: string;
    data: T;
}