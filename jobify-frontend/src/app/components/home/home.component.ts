// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  faSearch,
  faArrowRight,
  faMagnifyingGlass,
  faLocationDot,
  faBriefcase,
  faBuilding,
  faChartLine


} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

interface TrustedCompany {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FaIconComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Font Awesome Icons
  faSearch = faSearch;
  faArrowRight = faArrowRight;
  faMagnifyingGlass = faMagnifyingGlass;
  faLocationDot = faLocationDot;
  faBriefcase = faBriefcase;
  faBuilding = faBuilding;
  faTrendingUp = faChartLine;

  trendingSearches: string[] = [
    'Remote Developer',
    'UI/UX Designer',
    'Data Scientist',
    'Product Manager',
    'DevOps Engineer',
    'Full Stack',
    'Machine Learning'
  ];

  trustedCompanies: TrustedCompany[] = [
    { name: 'Microsoft', logo: 'assets/logos/microsoft.png' },
    { name: 'Google', logo: 'assets/logos/google.png' },
    { name: 'Amazon', logo: 'assets/logos/amazon.png' },
    { name: 'Apple', logo: 'assets/logos/apple.png' },
    { name: 'Meta', logo: 'assets/logos/meta.png' },
    { name: 'Netflix', logo: 'assets/logos/netflix.png' }
  ];

  getRandomJobCount(): string {
    return `${Math.floor(Math.random() * 500 + 100)}+`;
  }
}
