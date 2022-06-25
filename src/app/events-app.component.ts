import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'events-app',
  template: `
    <nav-bar></nav-bar>
    <router-outlet></router-outlet>
    <!-- <events-list></events-list> -->
    <!-- <h2>Hello World</h2>
    <img src="/assets/images/basic-shield.png" /> -->
  `,
})
export class EventsAppComponent {
  constructor(private auth:AuthService){

  }
  ngOnInit(){
    this.auth.checkAuthenticationStatus();
  }
}
