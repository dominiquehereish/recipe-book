import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  private langService = inject(LanguageService);

  availableLangs = this.langService.supportedLangs;
  currentLang = this.langService.currentLang;

  changeLang(event: Event) {
    const selectElement = event.target as HTMLSelectElement | null;
    if (selectElement) {
      const lang = selectElement.value;
      this.langService.use(lang);
      this.currentLang = lang;
    }
  }
}
