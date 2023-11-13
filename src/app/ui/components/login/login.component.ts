import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserLogin } from '../../../contracts/users/userLogin';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { AuthService } from '../../../services/common/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  frm:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private userAuthService:UserAuthService,
              private authService:AuthService,
              private router:Router
              ){
    this.frm = formBuilder.group({
      username:[""],
      password:[""]
    })
  }


  async login(userLogin:UserLogin){
    
    await this.userAuthService.login(userLogin, () => {
      this.authService.identityCheck();

      if(this.authService.isAuthenticated){
        this.router.navigate(['pages/dashboard'])
      }
      else{
        console.log("Giriş başarısız");
      }

    })
  }

}
