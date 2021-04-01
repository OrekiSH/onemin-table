function get(obj, key) {
  return obj[key];
}

export class TreeHelper {
  constructor(options = {
    labelKey: 'label',
    valueKey: 'value',
    childrenKey: 'children',
  }) {
    this.labelKey = options.labelKey;
    this.valueKey = options.valueKey;
    this.childrenKey = options.childrenKey;
  }

  /**
   * 层序遍历, level order traverse
   */
  levelOrder(root, cb) {
    if (!root) return;
    const queue = [root];

    while (queue.length) {
      const len = queue.length; // store queue length, 存储队列长度
      for (let i = 0; i < len; i += 1) {
        const node = queue.pop();
        const children = get(node, this.childrenKey);
        if (typeof cb === 'function') cb(node);

        if (Array.isArray(children)) {
          children.forEach((child) => {
            if (child) queue.push(child);
          });
        }
      }
    }
  }

  /**
   * 层序遍历得到所有子节点的父级节点值
   * level order get all child node's parent node value.
   */
  genParentValueMap(root) {
    const result = {};
    this.levelOrder(root, (node) => {
      const children = get(node, this.childrenKey);
      if (Array.isArray(children)) {
        children.forEach((e) => {
          result[get(e, this.valueKey)] = get(node, this.valueKey);
        });
      }
    });
    return result;
  }

  /**
   * 深度优先遍历得到所有叶子节点的路径
   * depth first order get path of leaf node.
   */
  genLeafPathMap(root) {
    const result = {};

    const buildPath = (node, path) => {
      if (!node) return;

      const val = get(node, this.valueKey);
      // eslint-disable-next-line
      path += val;
      const children = get(node, this.childrenKey);
      if (!children || !children.length) {
        result[val] = path.split(',');
      } else {
        // eslint-disable-next-line
        path += ',';
        for (let i = 0; i < children.length; i += 1) {
          buildPath(children[i], path);
        }
      }
    };
    buildPath(root, '');

    return result;
  }
}

/**
 * 防抖函数
 * debounce function
 */
export function debounce(fn, wait) {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }
  let result = null;
  let timerId = null;

  function debounced(...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      result = fn.apply(this, args);
    }, +wait);

    return result;
  }

  return debounced;
}

/**
 * if can addEventListener
 * 是否是EventTarget
 */
export function isEventTarget() {
  return el instanceof Element || el instanceof HTMLDocument || el instanceof Window;
}
