import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

export const authGuard = (requiredRoles: string[] = []): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      router.navigate(['/']);
      return false;
    }

    if (requiredRoles.length === 0) return true;

    const hasAnyRole = requiredRoles.some((role) => authService.hasRole(role));
    if (!hasAnyRole) {
      router.navigate(['/']); // or redirect to a 403 page
      return false;
    }

    return true;
  };
};
