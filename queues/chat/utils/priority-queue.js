const PriorityQueue = (() => {
  let qKey = {};
  let queue = new WeakMap();

  class PriorityQueue {

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

  return PriorityQueue;

})();

module.exports = PriorityQueue;
