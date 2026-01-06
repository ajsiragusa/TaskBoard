import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register/register-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  ROLE_TYPES: string[] = ['Tester', 'Developer', 'Admin'];

  constructor(private registerService: RegisterService) {}

  name: string = '';
  email: string = '';
  password: string = '';
  userRole: string = '';

  attemptRegistration() {
    this.registerService.attemptRegistration(this.name, this.email, this.password, this.userRole);
  }
}
