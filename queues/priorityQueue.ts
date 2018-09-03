interface UserObject {
  firstName : string;
  lastName  : string;
  age       : number;
  priority  : number;
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

    const queue = this.weakmap.get(this.qKey);
    let currentPosition: number = queue.length;

    // First to arrive to the queue
    if (!currentPosition) {
      queue.push(user);
    } else {

      // There are already users in queue
      for (let qUser in Object.keys(queue)) {
        if (user.priority > queue[qUser].priority) {
          currentPosition = 0;
          break;
        }
      }

      // Insert new user based on its priority
      queue.splice(currentPosition, 0, user);
    }

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
    const queue : UserObject[] = this.weakmap.get(this.qKey);
    return this.weakmap.get(this.qKey)[queue.length - 1];
  }

  /**
   * FRONT: gets a user from the front in the queue
   * @return {UserObject} Retrives first user in the queue
   */
  front(): UserObject {
    const queue : UserObject[] = this.weakmap.get(this.qKey);
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
  print(): void | boolean {
    this.queue.forEach((user, i) => {
      console.log(`User in queue position: ${i}, with priority ${user.priority} is ${user.firstName} ${user.lastName}`);
    });
    return true;
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
  age       : 29,
  priority  : 3
};

let maribel : UserObject = {
  firstName : 'Maribel',
  lastName  : 'Rueda',
  age       : 18,
  priority  : 4
};

let salo    : UserObject = {
  firstName : 'Salomé',
  lastName  : 'Rueda',
  age       : 18,
  priority  : 2
};

let katy : UserObject = {
  firstName : 'Katy',
  lastName  : 'Gil',
  age       : 29,
  priority  : 4
};

let usersQueue : UserQueue = new UserQueue();

usersQueue.add(stevens); // 3
usersQueue.add(maribel); // 4
usersQueue.add(salo);    // 2
usersQueue.add(katy);    // 4

console.log(usersQueue.print());
console.log(usersQueue.size());

