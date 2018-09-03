// IIFE
var Stack = (() => {

  // 2. Create a WeakMap instance
  const sKey = {};

  // Storage
  const items = new WeakMap();

  // 1 Create a constructor
  class Stack {
    constructor() {
      items.set(sKey, []);
    }

    // 3. Implement the API

    push(element) {
      let stack = items.get(sKey);
      stack.push(element);
    }

    pop() {
      let stack = items.get(sKey);
      return stack.pop();
    }

    peek() {
      let stack = items.get(sKey);
      return stack[stack.length - 1];
    }

    clear() {
      items.set(sKey, []);
    }

    size() {
      return items.get(sKey).length;
    }

  }

  return Stack;
})();

// Stack instance object
let stack = new Stack();
stack.push(10);
stack.push(20);

console.log(stack.items);
console.log('Size: ', stack.size());
console.log('Top: ', stack.peek());
console.log('Pop: ', stack.pop());
console.log('Size: ', stack.size());

stack.clear();
console.log('\n...clearing\n')
console.log('Size: ', stack.size());
