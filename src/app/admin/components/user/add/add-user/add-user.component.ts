import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddUser } from '../../../../../contracts/users/addUser';
import { UserService } from '../../../../../services/common/models/user.service';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  frm:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private userService:UserService){}
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      userName:[""],
      email:[""],
      firstName:[""],
      lastName:[""]
    })
  }


  addUser(addUser:AddUser){
    const res = this.userService.addUser(addUser);

    console.log(res);
  }


}
