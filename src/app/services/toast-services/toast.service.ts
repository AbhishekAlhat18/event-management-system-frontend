import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ToastData } from '../../models/toast-data';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<ToastData>();
  
  constructor() {}
  
  getToasts(): Observable<ToastData> {
    return this.toastSubject.asObservable();
  }
  
  showSuccess(message: string, duration: number = 3000) {
    console.log('Toast success called with message:', message);
    this.toastSubject.next({ type: 'success', message, duration });
  }
  
  showError(message: string, duration: number = 3000) {
    console.log('Toast error called with message:', message);
    this.toastSubject.next({ type: 'error', message, duration });
  }
  
  showInfo(message: string, duration: number = 3000) {
    this.toastSubject.next({ type: 'info', message, duration });
  }
  
  showWarning(message: string, duration: number = 3000) {
    this.toastSubject.next({ type: 'warning', message, duration });
  }
}
