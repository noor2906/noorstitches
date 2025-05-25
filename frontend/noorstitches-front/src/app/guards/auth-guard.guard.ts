import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const idUser = localStorage.getItem('idUser');

  if (idUser){
    return true;
  } else {
    router.navigate(['']); 
    return false;
  }
};
