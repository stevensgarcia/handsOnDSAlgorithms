export class Stack {
  private wmKey = {};
  private items = new WeakMap();

  constructor() {
    this.items.set(this.wmKey, []);
  }

  push(element) : void {
    let stack = this.items.get(this.wmKey);
    stack.push(element);
  }

  pop() : any {
    let stack = this.items.get(this.wmKey);
    return stack.pop();
  }

  peek() : any {
    let stack = this.items.get(this.wmKey);
    return stack[stack.length - 1];
  }

  clear() : void {
    this.items.set(this.wmKey, []);
  }

  size() : number {
    return this.items.get(this.wmKey).length;
  }

}
