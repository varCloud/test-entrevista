import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const isActive = localStorageService.getItem('isActive');

  if (isActive) {
    return true;
  } else {
    router.navigate(['']); // Redirige al login si la sesión no está activa
    return false;
  }
};
