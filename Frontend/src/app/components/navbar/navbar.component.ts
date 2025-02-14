import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'navbar-component',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router : Router){}

  isAdmin()
  {
    return this.authService.isAdmin();
  }

  isloggedIn()
  {
    return this.authService.isLoggedIn();
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate([""])
  }
}
