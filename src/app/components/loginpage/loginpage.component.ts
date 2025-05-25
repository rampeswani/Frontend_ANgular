import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,Validators, FormGroup } from '@angular/forms';
import { LoginServiceService } from 'src/app/login-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  constructor(
    private service : LoginServiceService,
    private fb : FormBuilder,
    private router  : Router
  ) { }

  loginForm! : FormGroup
  hidePassword: boolean = true;
  ngOnInit(): void {
    localStorage.removeItem("token")
    this.bind_form()
  }

  bind_form()
  {
    this.loginForm = this.fb.group({
      user_name :['',[Validators.required]],
      password : ['',[Validators.required]]
    })
  }

   togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  onLogin() {
    if (this.loginForm.valid) {
      console.log('Logging in with:', this.loginForm.value);
      const username = this.loginForm.controls['user_name'].value ;
      const password  = this.loginForm.controls['password'].value;

      this.service.login(username,password).subscribe(
        (result)=>{
          console.log("printing the result",result)
          if(result.access)
          {
            localStorage.setItem("token",result.access)
            this.router.navigate(['dashboard'])

          }
        },
        (err)=>{
          console.log("error in login api ",err)
        }
      )
    }
  }

}
