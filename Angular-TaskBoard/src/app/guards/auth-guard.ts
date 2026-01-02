import { CanActivateFn, Router } from '@angular/router';
import { JwtStorage } from '../services/jwt/jwt-storage';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtStorage = inject(JwtStorage);
  const router = inject(Router);

  if(!jwtStorage.getToken()){
    router.navigate(["/"]);
    return false;
  }

  return true;
};
