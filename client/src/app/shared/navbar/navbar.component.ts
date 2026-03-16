import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {
    role: string | null = null;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.role = localStorage.getItem('role');
    }

    goToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }
}