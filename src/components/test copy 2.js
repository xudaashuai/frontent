setTimeout(() => {
  console.log('1000');
  clearInterval(a);
}, 1000);
let a = null;
a = setInterval(() => {
  console.log(0);
}, 0);
