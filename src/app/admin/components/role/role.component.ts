import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/common/models/role.service';
import { UserClientRoleResponse } from '../../../contracts/roles/userClientRoleResponse';
import { ListResponseModel } from '../../../contracts/listResponseModel';

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roleList:ListResponseModel<UserClientRoleResponse>;
  dataList:UserClientRoleResponse[];

  constructor(private roleService:RoleService){}
  async ngOnInit(): Promise<any> {
    this.roleList = await this.roleService.getClientRoles();
    this.dataList = this.roleList.data;
  }


}
