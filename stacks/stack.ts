interface UserObject {
  firstName : string;
  lastName  : string;
  age       : number;
}

class UserStack {

  private sKey    = {};
  private weakmap = new WeakMap();

  private stack : UserObject[] = [];

  constructor() {
    // Init stack
    this.weakmap.set(this.sKey, this.stack);
  }

  /**
   * PUSH: an user to the top of the stack
   * @param {UserObject} user User object
   */
  push(user: UserObject) : void {
    this.weakmap.get(this.sKey).push(user);
  }

  /**
   * POP: removes an user from the top of the stack
   * @return {UserObject} Removed user
   */
  pop() : UserObject {
    return this.weakmap.get(this.sKey).pop();
  }

  /**
   * PEEK: inserts a new user to the stack
   * @return {UserObject} Retrives top user in the stack
   */
  peek() : UserObject {
    let stack : UserObject[] = this.weakmap.get(this.sKey);
    return this.weakmap.get(this.sKey)[stack.length - 1];
  }

  /**
   * CLEAR: Empty the stack
   */
  clear() : void {
    this.stack = [];
    this.weakmap.set(this.sKey, this.stack);
  }

  /**
   * PRINT
   */
  print() : void {
    this.stack.forEach(user => console.log(user));
  }

}

let stevens : UserObject = {
  firstName : 'Stevens',
  lastName  : 'García',
  age       : 29
};

let maribel : UserObject = {
  firstName : 'Maribel',
  lastName  : 'Rueda',
  age       : 18
};

let usersStack : UserStack = new UserStack();

usersStack.push(stevens);
usersStack.push(maribel);
usersStack.print();
