export interface ApiResponse<T> {
  accessToken: string; 
  message: string;
  status: string;         // Assuming HttpStatus is a string like "OK", "BAD_REQUEST", etc.
  statusCode: number;     // The numeric status code like 200, 400, etc.
  timestamp: string;      // Timestamp as a string, e.g., ISO format "2025-03-09T12:34:56.789Z"
  data: T;      
  }
  