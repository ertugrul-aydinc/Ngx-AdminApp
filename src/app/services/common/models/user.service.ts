import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../contracts/users/user';
import { Observable, firstValueFrom } from 'rxjs';
import { ResponseModel } from '../../../contracts/responseModel';
import { AddUser } from '../../../contracts/users/addUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService) { }

  async getUsers():Promise<any |User[]>{
    const observable:Observable<any | User[]> = this.httpClientService.get({
      controller:"users",
      action:"get-user/getAllUsers"
    });

    return await firstValueFrom(observable);
  }

  async deleteUser(userId:string, successCallBack?:() => void, errorCallBack?:(error) => void):Promise<any | ResponseModel>{
    const observable:Observable<any | ResponseModel> = this.httpClientService.delete({
      controller:"users",
      action:"delete-user"
    }, userId);

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack)
      .catch(errorCallBack);

    return promiseData;
  }


  async addUser(addUser:AddUser): Promise<any | ResponseModel>{
    const observable:Observable<any | ResponseModel> = this.httpClientService.post({
      controller:"users",
      action:"add-user/add"
    }, addUser);

    return await firstValueFrom(observable);
  }
}
