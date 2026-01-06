import { CanActivateFn, Router } from '@angular/router';
import { JwtStorage } from '../services/jwt/jwt-storage';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const jwtStorage = inject(JwtStorage);
  const router = inject(Router);

  if (jwtStorage.getToken()) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
