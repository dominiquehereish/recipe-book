import { Injectable, signal, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import Keycloak from 'keycloak-js';
import { BehaviorSubject, catchError, from, interval, map, of, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'foodfinder',
    clientId: 'foodfinder-client',
  });

  readonly isAuthenticated = signal(false);
  readonly username = signal<string | null>(null);

  private initialized$ = new BehaviorSubject<boolean>(false);

  constructor() {
    if (this.isBrowser) {
      this.setupTokenRefresh();
    }
  }

  init$() {
    if (!this.isBrowser) return of(false); // Avoid crash on server

    return from(
      this.keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        pkceMethod: 'S256',
      }),
    ).pipe(
      tap((authenticated) => {
        this.isAuthenticated.set(authenticated);
        this.username.set(
          authenticated ? (this.keycloak.tokenParsed?.['preferred_username'] ?? null) : null,
        );
        this.initialized$.next(true);
      }),
      catchError((err) => {
        console.error('Keycloak init failed:', err);
        this.isAuthenticated.set(false);
        this.username.set(null);
        this.initialized$.next(false);
        return of(false);
      }),
    );
  }

  login(): void {
    if (this.isBrowser) this.keycloak.login();
  }

  logout(): void {
    if (this.isBrowser) {
      this.keycloak.logout({ redirectUri: window.location.origin });
    }
  }

  token$() {
    if (!this.isBrowser) return of(null);

    return this.initialized$.pipe(
      switchMap((initialized) => {
        if (!initialized) return of(null);
        return from(this.keycloak.updateToken(30)).pipe(
          map(() => this.keycloak.token ?? null),
          catchError(() => of(null)),
        );
      }),
    );
  }

  private setupTokenRefresh() {
    interval(60_000)
      .pipe(switchMap(() => this.token$()))
      .subscribe();
  }
}
