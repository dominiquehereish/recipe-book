import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly supportedLangs = ['en', 'fr'];
  private readonly STORAGE_KEY = 'selectedLang';
  private readonly isBrowser: boolean;

  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);

  readonly currentLang = signal<string>('en');

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    const savedLang = this.isBrowser ? localStorage.getItem(this.STORAGE_KEY) : null;

    const initialLang = this.supportedLangs.includes(savedLang || '') ? savedLang! : 'en';

    this.translate.addLangs(this.supportedLangs);
    this.translate.setFallbackLang('en');
    this.translate.use(initialLang);

    this.currentLang.set(initialLang);

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang.set(event.lang);
    });
  }

  use(lang: string) {
    if (this.supportedLangs.includes(lang)) {
      this.translate.use(lang);
      if (this.isBrowser) {
        localStorage.setItem(this.STORAGE_KEY, lang);
      }
      this.currentLang.set(lang);
    }
  }
}
