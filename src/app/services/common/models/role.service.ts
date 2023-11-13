import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { UserClientRoleResponse } from '../../../contracts/roles/userClientRoleResponse';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService:HttpClientService) { }

  async getClientRoles():Promise<any | UserClientRoleResponse[]>{
    const observable:Observable<any | UserClientRoleResponse[]> = this.httpClientService.get({
      controller:"roles",
      action:"getRoles/getClientRoles",
    });

    const promiseData = firstValueFrom(observable);

    return await promiseData;
  }
}
