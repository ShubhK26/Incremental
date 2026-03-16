import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-logout',
    template: `
    <div class="logout-container">
      <button (click)="logout()" class="logout-btn">Logout</button>
    </div>
  `,
    styleUrls: ['./logout.component.scss']
})

export class LogoutComponent {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}