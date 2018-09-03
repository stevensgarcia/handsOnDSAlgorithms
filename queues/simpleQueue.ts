interface UserObject {
  firstName : string;
  lastName  : string;
  age       : number;
}

class UserQueue {

  private qKey    = {};
  private weakmap = new WeakMap();

  private queue: UserObject[] = [];

  constructor() {
    // Init queue
    this.weakmap.set(this.qKey, this.queue);
  }

  /**
   * ADD: a user to the back of the queue
   * @param {UserObject} user User object
   */
  add(user: UserObject): void {
    this.weakmap.get(this.qKey).push(user);
  }

  /**
   * REMOVE: removes an user from the front of the queue
   * @return {UserObject} Removed user
   */
  remove(): UserObject {
    return this.weakmap.get(this.qKey).shift();
  }

  /**
   * PEEK: gets a user from the back in the queue
   * @return {UserObject} Retrives last user in the queue
   */
  peek(): UserObject {
    let queue : UserObject[] = this.weakmap.get(this.qKey);
    return this.weakmap.get(this.qKey)[queue.length - 1];
  }

  /**
   * FRONT: gets a user from the front in the queue
   * @return {UserObject} Retrives first user in the queue
   */
  front(): UserObject {
    let queue : UserObject[] = this.weakmap.get(this.qKey);
    return this.weakmap.get(this.qKey)[0];
  }

  /**
   * CLEAR: Empty the queue
   */
  clear(): void {
    this.queue = [];
    this.weakmap.set(this.qKey, this.queue);
  }

  /**
   * PRINT: print all users in the queue
   */
  print(): void {
    this.queue.forEach(user => console.log(user));
  }

  /**
   * SIZE: Retrives the lenght of the queue
   * @return {number} The size of the queue
   */
  size(): number {
    return this.weakmap.get(this.qKey).length;
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

let salo    : UserObject = {
  firstName : 'Salomé',
  lastName  : 'Rueda',
  age       : 18
};

let usersQueue : UserQueue = new UserQueue();

usersQueue.add(stevens);
usersQueue.add(maribel);
usersQueue.add(salo);

console.log(usersQueue.front());
console.log(usersQueue.peek());
console.log(usersQueue.size());
console.log(usersQueue.remove());
console.log(usersQueue.size());

