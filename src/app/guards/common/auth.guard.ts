import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper:JwtHelperService,
    private router:Router,
    private toastrService : CustomToastrService,
    private authService:AuthService
              ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(_isAuthenticated);

      if(!this.authService.identityCheck()){
        this.router.navigate(["auth/login"],{
          queryParams:{
            returnUrl : state.url
          }
        });
        this.toastrService.message("Oturum açmanız gerekiyor!","Yetkisiz Erişim !", {
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.TopRight
        })
      }


    return true;
  }
  
}
