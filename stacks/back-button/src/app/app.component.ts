import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Stack } from './utils/stack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private stack: Stack, private router: Router) {

    // subscribe to the routers event
    this.router.events.subscribe((val) => {

      // determine of router is telling us that is has ended transition
      if (val instanceof NavigationEnd)  {
        // state change done, add to stack
        this.stack.push(val);
        console.log('Stack items: ', this.stack.items);
      }
    });

  }

  goBack() {
    let current = this.stack.pop();
    let prev = this.stack.peek();

    if (prev) {
      this.stack.pop();

      // angular provides nice little method to
      // transition between the states using just the url if needed.
      this.router.navigateByUrl(prev.urlAfterRedirects);

    } else {
      this.stack.push(current);
      console.log('Stack items: ', this.stack.items);
    }
  }

}
