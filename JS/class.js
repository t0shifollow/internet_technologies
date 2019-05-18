function switchClassName(obj, name) {
 if (obj.className.includes(name)) {
  obj.className = obj.className.replace(' ' + name, '');
  obj.className = obj.className.replace(name + ' ', '');
 } else {
  obj.className += ' ' + name;
 }
}