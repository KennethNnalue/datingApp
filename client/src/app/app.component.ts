import { AccountService } from './services/account.service';
import { User } from './interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users: User[] | undefined;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.accountService.setCurrentUser(user);
    }
  }
}
