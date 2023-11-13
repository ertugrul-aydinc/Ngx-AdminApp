import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../contracts/users/user';
import { ListResponseModel } from '../../../contracts/listResponseModel';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';

declare var $:any;

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList:ListResponseModel<User>;
  dataList:User[];

  constructor(private userService:UserService,
              private toastrService:CustomToastrService,
              private element:ElementRef,
              ){}


  async ngOnInit(): Promise<any> {
    this.userList = await this.userService.getUsers();
    this.dataList = this.userList.data;
    console.log(this.userList);
  }

  async getUsers(){
    console.log(this.userList)
  }

  async deleteUser(row:ElementRef,userId:string){
    this.userService.deleteUser(userId, () => {
      this.toastrService.message("Kullanıcı başarıyla silindi", "İşlem Başarılı",{
        messageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })
    },errorMessage => {
      this.toastrService.message("Kullanıcı silinirken bir hatayla karşılaşıldı", "Kullanıcı Silme Hatası!",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      })
    }).then(data => {
      $(row).animate({
        opacity:0,
        left:"+=50",
        height:"toogle"
      }, 700);
    });
    
  }

}
