String.prototype.erLik = function (text) {

 var mainText = this;

 function repleaceText(text) {

  text = text.replace(/[ĂŠĂ¨ĂŞ]/g, 'e');
  text = text.replace(/[ĂłĂ˛Ă´]/g, 'o');
  text = text.replace(/[ĂĽ]/g, "aa");
  text = text.replace(/[ĂŚ]/g, 'ae');
  text = text.replace(/[Ă¸]/g, 'oe');
  text = text.replace(/[Ă]/g, 'Ae');
  text = text.replace(/[Ă]/g, 'Aa');
  text = text.replace(/[Ă]/g, 'Oe');
  text = text.replace(/[ĂĂĂ]/g, 'E');
  text = text.replace(/[ĂĂĂ]/g, 'O');

  return text;
 }

 mainText = repleaceText(this);
 text = repleaceText(text);

 if (mainText.match(text)) {
  return true;
 } else {
  return false;
 }
};