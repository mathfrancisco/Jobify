// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  tipoUsuario: 'candidato' | 'recrutador' = 'candidato';

  constructor(private router: Router) { }

  login() {
    if (this.tipoUsuario === 'candidato') {
      this.router.navigate(['/procura-trabalho']);
    } else {
      this.router.navigate(['/procura-candidatos']);
    }
  }
}
