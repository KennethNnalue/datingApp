import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  logout() {
    this.accountService.logout();
  }
}
