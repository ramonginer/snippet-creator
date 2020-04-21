function sanitizeDollarSigns(code) {
  const replaceKey = 'THISWILLBEREPLACED';
  return (
    code
      // $$
      .replace('$$', replaceKey + replaceKey)
      // variables
      .replace(/\$([a-zA-Z])/g, replaceKey + '$1')
      // $ followed by anything except { (for ${1}) or a digit (for $2 or $1)
      .replace(/\$([^{\d])/g, replaceKey + '$1')
      // replace all things ready for an escaped $
      .replace(/THISWILLBEREPLACED/g, '\\$')
  );
}

function createBody(code, languageId) {
  return sanitizeDollarSigns(code.replace(/\t/g, '\\t')).split('\n');
}

module.exports = {
  createBody,
  sanitizeDollarSigns
};
