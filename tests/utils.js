export const sleep = (wait = 0) => new Promise((resolve) => setTimeout(resolve, +wait));

export const triggerEvent = (elm, name, ...opts) => {
  let eventName;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }
  const evt = document.createEvent(eventName);

  evt.initEvent(name, ...opts);

  if (name === 'keydown' && opts[0]) {
    // trigger event with keycode
    // triggerEvent(ele, 'keydown', 'ArrowDown')
    Object.defineProperty(evt, 'code', { value: opts[0] });
  }

  if (elm.dispatchEvent) {
    elm.dispatchEvent(evt);
  } else {
    elm.fireEvent(`on${name}`, evt);
  }

  return elm;
};

export const defineGetter = (obj, prop, value, defaultValue) => {
  let oldValue = defaultValue;
  const { get, configurable } = Object.getOwnPropertyDescriptor(obj, prop) || {};

  if (typeof defaultValue === 'undefined' && typeof get === 'undefined') {
    try {
      oldValue = obj[prop];
    } catch {
      throw Error(`TypeError: Illegal invocation. Cannot read ${prop} of '${obj}', '${obj}' might be a prototype,  please specify default value instead.`);
    }
  }

  const oldGetter = get ?? (() => oldValue);
  const getter = typeof value === 'function' ? value : () => value;

  Object.defineProperty(obj, prop, {
    configurable: true,
    get: getter,
  });

  return () => {
    Object.defineProperty(obj, prop, {
      configurable,
      get: oldGetter,
    });
  };
};

export function genInputElm(wrapper) {
  const input = wrapper.find('input');
  const { vm } = wrapper;
  const inputElm = input.element;

  return { vm, input, inputElm };
}
