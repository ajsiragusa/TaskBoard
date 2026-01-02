import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenTransport } from '../../interfaces/token-transport';

@Injectable({
  providedIn: 'root',
})
export class JwtStorage {
  private TOKEN_KEY = 'TASK_MANAGER_TOKEN';

  private currToken : BehaviorSubject<TokenTransport>;

  constructor(){
    this.currToken = new BehaviorSubject<TokenTransport>({"token": this.getToken() as string});
  }

  setToken(jwt: string){

    localStorage.setItem(this.TOKEN_KEY, jwt);
    this.currToken.next({"token": jwt});
  }

  getToken(){
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(){
    this.currToken.next({ "token": "" });
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getTokenSubject(){
    return this.currToken;
  }
}
