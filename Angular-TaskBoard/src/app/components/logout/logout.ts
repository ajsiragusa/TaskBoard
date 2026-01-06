import { Component } from '@angular/core';
import { JwtStorage } from '../../services/jwt/jwt-storage';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-logout',
  imports: [RouterLink],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {

  constructor(private tokenStorage : JwtStorage){}

  logout(){this.tokenStorage.clearToken()}
}
