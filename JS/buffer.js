function createBufferSpace() {
 var buffer = '';
 var b = function (str) {
  if (arguments.length > 0) {
   buffer += str;
  } else {
   return buffer;
  }
 };
 return b;
}