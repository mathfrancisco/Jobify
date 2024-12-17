// how-it-works.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  faUserPlus,
  faSearch,
  faHandshake,
  faCheck,
  faArrowRight,
  faEnvelope,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: Date;
}

@Component({
  selector: 'app-como-funciona',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './como-funciona.component.html',
  styleUrls: ['./como-funciona.component.css']
})
export class ComoFuncionaComponent {
  // Font Awesome Icons
  faUserPlus = faUserPlus;
  faSearch = faSearch;
  faHandshake = faHandshake;
  faCheck = faCheck;
  faArrowRight = faArrowRight;
  faEnvelope = faEnvelope;
  faPhone = faPhone;

  blogPosts: BlogPost[] = [
    {
      title: 'How to Prepare for Remote Interviews',
      excerpt: 'Essential tips to stand out in online interviews and land your dream job.',
      image: 'assets/blog/post1.jpg',
      category: 'Career',
      date: new Date('2024-01-15')
    },
    {
      title: 'Job Market Trends in 2024',
      excerpt: 'Key transformations and opportunities in the job market this year.',
      image: 'assets/blog/post2.jpg',
      category: 'Market',
      date: new Date('2024-01-10')
    },
    {
      title: 'Essential Soft Skills Development',
      excerpt: 'Most valued behavioral skills by recruiters today.',
      image: 'assets/blog/post3.jpg',
      category: 'Development',
      date: new Date('2024-01-05')
    }
  ];
}
