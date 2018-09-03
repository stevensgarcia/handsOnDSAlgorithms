var Queue = (() => {
  let qKey = {};
  let queue = new WeakMap();

  class Queue {

    constructor() {
      queue.set(qKey, []);
    }

    add(item) {
      queue.get(qKey).push(item);
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

  }

  return Queue;

})();

let urgencyQ = new Queue();

urgencyQ.add('Fulanito');
urgencyQ.add('Peranito');
urgencyQ.add('Fuckencio');
urgencyQ.add('Nepomuceno');

console.log('Queue comienza con: ', urgencyQ.size());
console.log(urgencyQ.front());
console.log(urgencyQ.peek());
console.log('Atentiendo: ', urgencyQ.remove());
console.log('Queue: ', urgencyQ.size());



