class Directory {
    constructor(name) {
      this.name = name;
      this.children = {};
    }
  }
  
  class FileSystem {
    constructor() {
      this.root = new Directory("");
    }
  
    create(path) {
      const parts = path.split('/').slice(1);
      this._create(parts, this.root);
    }
  
    _create(parts, node) {
      if (!parts.length) return;
      if (!node.children[parts[0]]) {
        node.children[parts[0]] = new Directory(parts[0]);
        console.log("CREATE", parts.join('/'));
      }
      this._create(parts.slice(1), node.children[parts[0]]);
    }
  
    move(source, destination) {
      const srcParts = source.split('/').slice(1);
      const destParts = destination.split('/').slice(1);
      const srcNode = this._delete(srcParts, this.root, true);
      if (srcNode) {
        console.log("MOVE", source, destination);
        this._create(destParts.concat(srcParts.slice(-1)), this.root);
        const destNode = this._find(destParts, this.root);
        destNode.children[srcParts.slice(-1)[0]] = srcNode;
      }
    }
  
    _delete(parts, node, returnNode = false) {
      if (!parts.length) return null;
      if (node.children[parts[0]]) {
        if (parts.length === 1) {
          if (returnNode) {
            return node.children[parts[0]];
          } else {
            console.log("DELETE", parts.join('/'));
            delete node.children[parts[0]];
          }
        } else {
          return this._delete(parts.slice(1), node.children[parts[0]], returnNode);
        }
      } else {
        console.log(`Cannot delete ${parts.join('/')} - ${parts[0]} does not exist`);
        return null;
      }
    }
  
    list(node = this.root, indent = "") {
      if (node === this.root) {
        console.log("root");
      }
      Object.keys(node.children).sort().forEach(childName => {
        console.log(`${indent}${childName}`);
        this.list(node.children[childName], indent + "  ");
      });
    }
  
    _find(parts, node) {
      for (const part of parts) {
        node = node.children[part];
        if (!node) return null;
      }
      return node;
    }
  }
  
  // Example usage:
  const fs = new FileSystem();
  fs.create('/fruits');
  fs.create('/vegetables');
  fs.create('/fruits/apples');
  fs.list();


  