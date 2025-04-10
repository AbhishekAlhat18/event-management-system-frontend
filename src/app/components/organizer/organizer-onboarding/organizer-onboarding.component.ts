import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/task'; // Importing the Task interface
import { Application } from '../../../models/application'; // Assuming you have an Application model defined


@Component({
  selector: 'app-organizer-onboarding',
  standalone: false,
  
  templateUrl: './organizer-onboarding.component.html',
  styleUrl: './organizer-onboarding.component.css'
})
export class OrganizerOnboardingComponent implements OnInit {
  activeTab: 'tasks' | 'applicationStats' = 'tasks';
  
  tasks: Task[] = [
    { name: 'PERSONAL INFORMATION AND  DOCUMENTS', status: 'REJECTED' },
    { name: 'ADD BANK DETAILS', status: 'APPROVED' }
  ];



  ngOnInit(): void {
    // No need to check for task completion status since we're showing data regardless
  }

  setActiveTab(tab: 'tasks' | 'applicationStats'): void {
    this.activeTab = tab;
  }

  getActionText(status: string): string {
    switch(status) {
      case 'NOT_SUBMITTED':
        return 'VIEW AND SUBMIT APPLICATION';
      case 'REJECTED':
        return 'RE-SUBMIT';
      default:
        return ''; // No button for others
    }
  }

  isActionButtonVisible(status: string): boolean {
    return status === 'NOT_SUBMITTED' || status === 'REJECTED';
  }
  

  handleAction(task: Task): void {
    console.log(`Action clicked for task: ${task.name}`);
    // Add your routing or logic here
  }
    
}