// navbar.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import {
  faArrowRight,
  faBars,
  faXmark
} from '@fortawesome/free-solid-svg-icons'; // Importe os ícones necessários
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    FaIconComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faArrowRight = faArrowRight;
  faBars = faBars; // Adicione o ícone de menu hamburger
  faXmark = faXmark; // Adicione o ícone de fechar (X)
  isMenuOpen = false;


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
