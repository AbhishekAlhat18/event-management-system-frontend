export interface ToastData {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    duration?: number;
  }