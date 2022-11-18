import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent implements OnInit {
  error: any;

  constructor(private router: Router) {
    //the router state is ONLY accessible inside the constructor and not available onInit
    // We loose the navigation state once the user refreshes the page then we loose the navigation state.
    // we get the navigation state only once when the user navigates to new route
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.error;
  }

  ngOnInit(): void {}
}
