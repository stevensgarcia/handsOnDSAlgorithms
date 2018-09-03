import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';

@Injectable()
export class StackService {

  private sKey    = {};
  private weakmap = new WeakMap();

  private stack: NavigationEnd[] = [];

  constructor() {
    // Init stack
    this.weakmap.set(this.sKey, this.stack);
  }

  /**
   * PUSH: an route to the top of the stack
   * @param {NavigationEnd} route User object
   */
  push(route: NavigationEnd): void {
    this.weakmap.get(this.sKey).push(route);
  }

  /**
   * POP: removes an route from the top of the stack
   * @return {NavigationEnd} Removed route
   */
  pop(): NavigationEnd {
    return this.weakmap.get(this.sKey).pop();
  }

  /**
   * PEEK: inserts a new route to the stack
   * @return {NavigationEnd} Retrives top route in the stack
   */
  peek(): NavigationEnd {
    const stack: NavigationEnd[] = this.weakmap.get(this.sKey);
    return this.weakmap.get(this.sKey)[stack.length - 1];
  }

  peekPrev(): NavigationEnd {
    const stack: NavigationEnd[] = this.weakmap.get(this.sKey);
    return this.weakmap.get(this.sKey)[stack.length - 2];
  }

  /**
   * CLEAR: Empty the stack
   */
  clear(): void {
    this.stack = [];
    this.weakmap.set(this.sKey, this.stack);
  }

  /**
   * PRINT
   */
  print(): void {
    this.stack.forEach(route => console.log(route));
  }
}

