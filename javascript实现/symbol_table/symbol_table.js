function BinaryTree() {
  this.root = null;
}

function Node (options) {
  this.key = options.key;
  this.value = options.value;
  this.parent = options.parent;
  this.left = null;
  this.right = null;
}

BinaryTree.prototype = {
  set (key, value) {
    if (!this.root) {
      this.root = new Node({
        key: key,
        value: value,
        parent: null
      })
      return;
    }

    let node = this.root;
    while (node) {
      if (key === node.key) {
        node.value = value;
        return;
      } 
      if (key > node.key) {
        if (node.right) {
          node = node.right;
        } else {
          node.right = new Node({
            key: key,
            value: value,
            parent: node
          })
          return;
        }
      } else {
        if (node.left) {
          node = node.left;
        } else {
          node.left = new Node({
            key: key,
            value: value,
            parent: node
          })
        }
      }
    }
  },

  get (key) {
    let node = this.root;
    while (node) {
      if (node.key === key) {
        return node.value;
      }
      node = key > node.key ? node.right : node.left;
    }
    return null;
  },

  min (node) {
    while (node) {
      node = node.left;
    }
    return node.key;
  },

  deleMin (node) {
    while (node.left) {
      node = node.left;
    }
    if (node.parent) {
      node.parent.left = null;
    }
    return node;
  },

  dele (key) {
    let node = this.root;
    while (node) {
      if (node.key === key) {
        if (!node.right) {
          let min = node.left;
        } else {
          let min = this.deleMin(node.right);
          if (min) {
            min.left = node.left;
            min.right = node.right;
          }
        }
        if (node.parent) {
          if (node.key > node.parent.key) {
            node.parent.right = min;
          } else {
            node.parent.left = min;
          }
        } else {
          this.root = null;
        }
      }
      node = key > node.key ? node.right : node.left;
    }
  }
}