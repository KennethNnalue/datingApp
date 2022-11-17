import { AccountService } from './../../services/account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Output() cancelRegister = new EventEmitter();
  constructor(private accountservice: AccountService) {}

  ngOnInit(): void {}

  register() {
    this.accountservice.register(this.model).subscribe({
      next: (res) => console.log(res),
      error: (err) => this.accountservice.openSnackBar(err.error.title),
    });
    this.cancel();
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
