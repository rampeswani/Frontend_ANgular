import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/login-service.service';
import { Router } from '@angular/router';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private service : LoginServiceService,
    private router : Router,
    private fb : FormBuilder

  ) { }

  form! : FormGroup

  ngOnInit(): void {
    
    this.get_current_user();
  }
  name :any 
  role :any
  get_current_user()
  {
    this.service.get_current_user_data().subscribe(
      (result)=>{
        if(result)
        {
          this.name = result.username
          this.role = result.role
        }
      },
      (err)=>{
        console.log("error in this",err)
      }
    )
  }

  logout()
  {
    debugger
    localStorage.removeItem("token")
    this.router.navigateByUrl('login')


  }

  onSubmit(event: Event)
  {
    event.preventDefault()
    const formData = new FormData()
    formData.append("file",this.selected_file)
    this.service.upload_file(formData).subscribe()

  }
  selected_file :any 

  onFileChange(event: any): void {
    //this.selectedFile = event.target.files[0];
    console.log("print the file",event.target.files[0])
    
    
    this.selected_file=event.target.files[0]
  }

  

}
