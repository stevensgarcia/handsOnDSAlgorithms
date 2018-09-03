var Queue = (() => {
  let qKey = {};
  let queue = new WeakMap();

  class Queue {

    constructor() {
      queue.set(qKey, []);
    }

    add(item) {
      let q = queue.get(qKey);
      let newItemPosition = q.length;

      // There is no one in the queue
      if(!q.length) {
        q.push(item);
        return;
      }

      // There are items in queue already
      for (let [i,v] of q.entries()) {
        if(item.priority > v.priority) {
          // Find item's position based on priority
          newItemPosition = i;
          break;
        }
      }

      // Insert new item in queue
      q.splice(newItemPosition, 0, item);
    }

    remove() {
      return queue.get(qKey).shift();
    }

    peek() {
      let q = queue.get(qKey);
      return q[q.length - 1];
    }

    front() {
      let q = queue.get(qKey);
      return q[0];
    }

    clear() {
      queue.set(qKey, []);
    }

    size() {
      return queue.get(qKey).length;
    }

    print() {
      queue.get(qKey).forEach((value) => {
        console.log(value);
      });
    }

  }

  return Queue;

})();

let urgencyQ = new Queue();

urgencyQ.add({ el: 1, priority: 1});
urgencyQ.add({ el: 2, priority: 2});
urgencyQ.add({ el: 3, priority: 3});
urgencyQ.add({ el: 4, priority: 3});
urgencyQ.add({ el: 5, priority: 2});
urgencyQ.add({ el: 6, priority: 1});
urgencyQ.print();

console.log('Queue comienza con: ', urgencyQ.size());
// console.log('Primero en fila: ', urgencyQ.front());
// console.log('Ultimo en fila: ', urgencyQ.peek());
console.log('Atentiendo: ', urgencyQ.remove());
urgencyQ.print();
console.log('Atentiendo: ', urgencyQ.remove());
console.log('Atentiendo: ', urgencyQ.remove());
urgencyQ.print();
// console.log('Queue: ', urgencyQ.size());


