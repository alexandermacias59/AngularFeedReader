import { effect, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthService);
  const router = inject(Router);

  return new Promise((resolve, _) => {
    // if (!authServ) {
    //   reject(false);
    // }
        onAuthStateChanged(authServ.auth, (user) => {
          if (user) {
            resolve(true)
          } else {
            router.navigate(['/login']);
            resolve(false)
          }
        });
  })
};
