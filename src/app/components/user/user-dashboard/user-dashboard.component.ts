import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Event } from '../../../models/event';
import { UserDashboardService } from '../../../services/user-dashboard.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  username!: string;

  constructor(private userDashboardService: UserDashboardService) { }
  ngOnInit(): void {
    this.userDashboardService.getUsername().subscribe((data:string) => {
      this.username = data;
    });

  }
  isMenuOpen = false;
  
  menuItems = [
    { icon: 'calendar_today', label: 'My Bookings', route: '/bookings' },
    { icon: 'settings', label: 'Settings and Privacy', route: '/settings' },
    { icon: 'store', label: 'Become an Organizer', route: '/become-organizer' },
    { icon: 'dashboard', label: 'Organizer Dashboard', route: '/organizer' }
  ];

  events: Event[] = [
    {
      id: 1,
      name: 'Tech Conference 2025',
      location: 'California',
      price: 149.99,
      date: 'May 15, 2025',
      image: 'assets/images/tech-conf.jpg'
    },
    {
      id: 2,
      name: 'Summer Music Festival',
      location: 'New York',
      price: 89.99,
      date: 'June 10, 2025',
      image: 'assets/images/music-fest.jpg'
    },
    {
      id: 3,
      name: 'Business Leadership Summit',
      location: 'Texas',
      price: 199.99,
      date: 'July 22, 2025',
      image: 'assets/images/business-summit.jpg'
    }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  bookEvent(eventId: number) {
    console.log(`Event ${eventId} booked!`);
    // Here you would implement your booking logic
    alert(`You've booked event #${eventId}!`);
  }

}
