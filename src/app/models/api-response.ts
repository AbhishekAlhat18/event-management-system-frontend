// src/app/models/api-response.ts
export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
  }
  