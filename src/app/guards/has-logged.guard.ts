import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

export const hasLoggedGuard: CanActivateFn = (route, state) => {
  
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const isActive = localStorageService.getItem('isActive');
  debugger
  if (isActive) {
    router.navigate(['/routes']);
    return true
  } else {
    router.navigate(['/']); // Redirige al login si la sesión no está activa
    return false;
  }
};
