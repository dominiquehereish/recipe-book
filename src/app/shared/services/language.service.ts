import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly supportedLangs = ['en', 'fr'];

  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(this.supportedLangs);
  }

  use(lang: string) {
    this.translate.use(lang);
  }

  get currentLang() {
    return this.translate.getCurrentLang() || 'en';
  }
}
