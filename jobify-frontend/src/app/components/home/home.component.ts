// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  faSearch,
  faArrowRight,
  faMagnifyingGlass,
  faLocationDot,
  faBriefcase,
  faBuilding,
  faChartLine,
  faRocket,
  faUserGroup,
  faGlobe, faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

interface TrustedCompany {
  name: string;
  logo: string;
  link?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FaIconComponent, FormsModule],
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
  faRocket = faRocket;
  faUserGroup = faUserGroup;
  faGlobe = faGlobe;


  searchQuery: string = '';
  selectedCategory: string = '';

  constructor(private router: Router) {}
  // Função de busca
  searchJobs() {
    const params = new URLSearchParams();
    if (this.searchQuery) {
      params.set('q', this.searchQuery);
    }
    if (this.selectedCategory) {
      params.set('category', this.selectedCategory);
    }

    this.router.navigate(['/procurar-trabalho'], {
      queryParams: {
        search: this.searchQuery,
        category: this.selectedCategory
      }
    });
  }

  statistics = [
    { icon: faBriefcase, count: '2,000+', label: 'Active Jobs', color: '#86C232' },
    { icon: faUserGroup, count: '50,000+', label: 'Candidates', color: '#95D44A' },
    { icon: faBuilding, count: '500+', label: 'Companies', color: '#61892F' },
    { icon: faGlobe, count: '100+', label: 'Countries', color: '#86C232' }
  ];

  categories = [
    "Technology",
    "Design",
    "Marketing",
    "Finance",
    "Healthcare"
  ];

  trustedCompanies: TrustedCompany[] = [
    { name: 'Microsoft', logo: 'assets/logos/microsoft.png', link: 'https://www.microsoft.com' },
    { name: 'Google', logo: 'assets/logos/google.png', link: 'https://www.google.com' },
    { name: 'Amazon', logo: 'assets/logos/amazon.png',link: 'https://www.google.com' },
    { name: 'Apple', logo: 'assets/logos/apple.png',link: 'https://www.google.com' },
    { name: 'Meta', logo: 'assets/logos/meta.png',link: 'https://www.google.com'},
    { name: 'Netflix', logo: 'assets/logos/netflix.png',link: 'https://www.google.com' }
  ];

  menuItems = [
    { label: 'Find Jobs', icon: faBriefcase, link: '/procurar-trabalho' },
    { label: 'Companies', icon: faBuilding, link: '/empresas' },
    { label: 'About Us', icon: faUserGroup, link: '/sobre' },
    { label: 'Contact', icon: faGlobe, link: '/contato' }
  ];


  getRandomJobCount(): string {
    return `${Math.floor(Math.random() * 500 + 100)}+`;
  }

  protected readonly faSpinner = faSpinner;
  isLoading: any;
}
