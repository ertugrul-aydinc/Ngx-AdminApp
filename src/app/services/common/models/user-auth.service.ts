import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { UserLogin } from '../../../contracts/users/userLogin';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from '../../../contracts/token/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService:HttpClientService) { }

  async login(userLogin:UserLogin, callBackFunction?:() => void):Promise<any>{
    
    const observable:Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller:"users",
      action:"login"
    }, userLogin);

    const tokenResponse:TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.data.access_Token);
      localStorage.setItem("refreshToken", tokenResponse.data.refresh_Token);
      localStorage.setItem("userId", tokenResponse.data.userId);
    }

    callBackFunction();
  }
}
