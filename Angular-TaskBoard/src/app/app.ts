import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtStorage } from './services/jwt/jwt-storage';
import { TokenTransport } from './interfaces/token-transport';
import { Logout } from './components/logout/logout';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Logout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular-TaskBoard');

  protected token : WritableSignal<TokenTransport | null> = signal(null);

  private tokenSub : Subscription;

  constructor(private jwtToken : JwtStorage){
    this.tokenSub = jwtToken.getTokenSubject().subscribe(currToken => {this.token.set(currToken)});
  }
}
