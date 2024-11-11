
export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;// Field to sort by
    sortOrder?: 'ASC' | 'DESC'; // Sort order: ascending or descending
    filters?: Record<string, any>; // Key-value pairs for filtering
    min?: Record<string, number>; // Minimum values for fields (e.g., prices or dates)
    max?: Record<string, number>; // Maximum values for fields
  }
  
export interface PaginationMeta {
    totalItems: number;
    page: number;
    limit:number;
    totalPages:number;
}

export interface PaginatedResponse<T> {
    statusCode: number;
    message:  string;
    data: T[];
    meta: PaginationMeta;
}