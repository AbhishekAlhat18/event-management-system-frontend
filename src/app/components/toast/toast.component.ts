import { Component,Inject} from '@angular/core';

import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  standalone:false,
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
  
}