import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  let router = inject(Router);
  let toastr = inject(ToastrService)
  if (localStorage.getItem('email')!=null){
    return true;
  }else{
    toastr.warning('Unauthorized access');
    router.navigateByUrl('/login')
    return false;
  }
 
};
