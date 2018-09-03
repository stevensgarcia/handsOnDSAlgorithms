import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { routes, navigatableComponents } from './app.routing';
import { Stack } from './utils/stack';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    // Routing
    RouterModule.forRoot(routes),

    // Animations
    BrowserAnimationsModule,

    // Material module
    MatButtonModule
  ],
  providers: [ Stack ],
  bootstrap: [AppComponent]
})
export class AppModule { }
