// replaceCharAt
export default (function (str, index, replacement) {
  str = str.split('');
  str[index] = replacement;
  return str.join('');
});