import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  private langService = inject(LanguageService);
  private authService = inject(AuthService);

  availableLangs = this.langService.supportedLangs;
  currentLang = this.langService.currentLang;

  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly username = this.authService.username;

  changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement | null;
    if (selectElement) {
      const lang = selectElement.value;
      this.langService.use(lang);
      this.currentLang = lang;
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
