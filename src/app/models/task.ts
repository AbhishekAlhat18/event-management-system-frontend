export interface Task {
    name: string;
    status: 'SUBMITTED' | 'NOT_SUBMITTED' | 'UNDER_REVIEW' | 'REJECTED' | 'APPROVED';
  }
  
  