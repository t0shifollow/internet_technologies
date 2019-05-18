function yolo(mama, foo) {
 return function recurection(n) {
  if (mama[n] === undefined) {
   mama[n] = foo(recuretion, n);
  }
  return mama[n];
 }
}