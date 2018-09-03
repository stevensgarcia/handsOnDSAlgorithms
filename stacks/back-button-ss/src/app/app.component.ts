import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StackService } from './stack.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor( private router: Router, private stack: StackService) {

    // Init navigation stack
    this.router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        this.stack.push(route);
      }
    });

  }

  goBack(): void {
    const current: NavigationEnd = this.stack.pop();
    const previous: NavigationEnd = this.stack.peek();

    if (previous) {
      this.router.navigateByUrl(previous.urlAfterRedirects)
        .then(() => {
          this.stack.pop();
        });
    } else {
      this.stack.push(current);
    }
  }

}
