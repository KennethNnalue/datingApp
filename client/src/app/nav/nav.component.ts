import { AccountService } from './../services/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};
  username: string | undefined;

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user: any) => {
      if (user) this.username = user.username;
    });
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/members');
      },
      // error: (err) => this.accountService.openSnackBar(err.error),
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
