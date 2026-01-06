import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtStorage } from '../jwt/jwt-storage';
import { TokenTransport } from '../../interfaces/token-transport';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  API_URL : string = "http://localhost:8080/users";

  constructor(private httpClient : HttpClient, private jwtStorage : JwtStorage, private router : Router){}

  attemptRegistration(name : string, email : string,
    password : string, role : string){
      const body = {
        "name": name,
        "email": email.toLowerCase(),
        "password": password,
        "role": role.toUpperCase()
      }

      this.httpClient.post<TokenTransport>(this.API_URL + '/register', body)
      .subscribe({
        next: responseData =>{
          this.jwtStorage.setToken(responseData.token);
          this.router.navigate(["/dashboard"]);
        },
        error: err =>{
          console.error(err);
        }
      })
    }

}
