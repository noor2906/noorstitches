import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const idUser = localStorage.getItem('idUser');

  if (idUser) {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
