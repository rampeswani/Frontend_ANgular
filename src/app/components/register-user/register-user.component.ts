import { Component, OnInit } from '@angular/core';

import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/login-service.service';



@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {



  constructor(
    private fb : FormBuilder,
    private service : LoginServiceService
  ) { }

  model = {
    username : String ,
    //name : String,
    password : String,
    email : String ,
    role : String 

  }

  register_form! : FormGroup

  ngOnInit(): void {
    this.bind_form()
  }


  
  bind_form()
  {
    this.register_form = this.fb.group({
      name : ['',[Validators.required ,Validators.pattern(/^[A-Za-z\s]+$/) ,Validators.minLength(3) ]],
      user_name : ['',[Validators.required]],
      password : ['',[Validators.required]],
      confirm_password : ['',[Validators.required]],
      role : ['',[Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)] ],
      email : ['',[Validators.required,Validators.email]]
    },
    { 
      validators: this.match_password('password', 'confirm_password') 
    } 
  
  )
  }
  bind_model()
  {
    this.model.email = this.register_form.controls['email'].value ;
    this.model.username = this.register_form.controls['user_name'].value ;
    this.model.password = this.register_form.controls['password'].value ;
    this.model.role = this.register_form.controls['role'].value ;
    //this.model.name = this.register_form.controls['name'].value
  }

  onSubmit()
  {

    if(this.register_form.valid)
    {
      this.bind_model()
      this.save()
      
    }

  }

  save()
  {
  this.service.post_register_data(this.model).subscribe(
    (result)=>{
      console.log("printing the resilt",result)
    },
    (err)=>{
      console.log('printing the error',err)
    }
  );
  }
  match_password(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error
        return;
      }
  
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}
