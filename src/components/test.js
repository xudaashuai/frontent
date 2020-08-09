function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var { value } = info;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    const self = this;
    const args = arguments;
    return new Promise(function (resolve, reject) {
      const gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function getRandom() {
  return new Promise(resolve => {
    setTimeout(_ => resolve((Math.random() * 10) | 0), 1000);
  });
}

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator(function* () {
    const a = 1;
    const num1 = yield getRandom();
    const num2 = yield getRandom();
    return num1 + num2 + a;
  });
  return _main.apply(this, arguments);
}

console.log(`got data: ${await main()}`);
