import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private http : HttpClient
  ) { }

  api_url = "http://localhost:8000/t/"
  api_url_2 = "http://localhost:8000/media/"

  post_register_data(model : any)
  {
      return    this.http.post<any>(
  this.api_url + "register" , model , { headers: { 'Content-Type': 'application/json' }}
      
    );

  }

  login(username : any , password :any)
  {
    const body = {
      username : username ,
      password : password
    }

    return this.http.post<any>( this.api_url + "login" , body );

  }

  get_current_user_data()
  {
    return this.http.get<any>(this.api_url + "get-user")
  }

  upload_file(data :any)
  {
    return this.http.post<any>(
      this.api_url_2 + "file-upload/" , data
    )
  }
}
