import { PERMITS } from './../constants/constants';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { inject } from '@angular/core';

export const hasPermissionGuard: CanMatchFn  = (route, state) => {
  debugger
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const user = localStorageService.getItem('userSesion');
  const permits: any  = PERMITS
  console.log(permits[user.user][state[0].path])
  if (user && permits[user.user][state[0].path]) {
    return true;
  } else {
    alert(`lo sentimos no tienes permisos para visualizar este modulo`)
    return false;
  }
};
