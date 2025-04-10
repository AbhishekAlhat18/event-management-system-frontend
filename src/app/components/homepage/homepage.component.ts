import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-homepage',
  standalone: false,
  
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  slides = [
    {
      imageUrl: 'assets/images/drama.jpg',
      title: 'Find Your Next Amazing Event',
      description: 'Discover and book tickets for concerts, workshops, conferences and more.'
    },
    {
      imageUrl: 'assets/images/dance.jpg',
      title: 'Create Memorable Experiences',
      description: 'Join thousands of people creating unforgettable moments every day.'
    },
    {
      imageUrl: 'assets/images/art-exhibition.jpg',
      title: 'Host Your Own Events',
      description: 'Start planning, promoting and managing your events with our powerful tools.'
    },

    {
      imageUrl: 'assets/images/singing.jpg',
      title: 'Host Your Own Events',
      description: 'Start planning, promoting and managing your events with our powerful tools.'
    },

    {
      imageUrl: 'assets/images/sports.jpg',
      title: 'Host Your Own Events',
      description: 'Start planning, promoting and managing your events with our powerful tools.'
    },

    {
      imageUrl: 'assets/images/concert.jpg',
      title: 'Host Your Own Events',
      description: 'Start planning, promoting and managing your events with our powerful tools.'
    }
  ];

  currentSlide = 0;
  slideInterval: any;
  
  ngOnInit() {
    // Start the automatic slideshow
    this.startSlideshow();
  }

  ngOnDestroy() {
    // Clear the interval when component is destroyed
    this.stopSlideshow();
  }

  startSlideshow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopSlideshow() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  setCurrentSlide(index: number) {
    this.currentSlide = index;
    // Reset the timer when manually changing slides
    this.stopSlideshow();
    this.startSlideshow();
  }

}
