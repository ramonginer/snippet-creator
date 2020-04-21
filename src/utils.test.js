const { expect } = require('chai');
const { sanitizeDollarSigns } = require('./utils');

describe('utils', () => {
  describe('sanitizeDollarSigns', () => {
    it('Hello $world $house', () => {
      expect(sanitizeDollarSigns('Hello $world $house')).to.equal(
        'Hello \\$world \\$house'
      );
    });

    it('Hello $world $1 $house ${1:foo} ${2}', () => {
      expect(
        sanitizeDollarSigns('Hello $world $1 $house ${1:foo} ${2}')
      ).to.equal('Hello \\$world $1 \\$house ${1:foo} ${2}');
    });

    it('$_', () => {
      expect(sanitizeDollarSigns('$_')).to.equal('\\$_');
    });

    it('$?', () => {
      expect(sanitizeDollarSigns('$?')).to.equal('\\$?');
    });

    it('$$', () => {
      expect(sanitizeDollarSigns('$$')).to.equal('\\$\\$');
    });

    it('$(get-date "01/01/2020")', () => {
      expect(sanitizeDollarSigns('$(get-date "01/01/2020")')).to.equal(
        '\\$(get-date "01/01/2020")'
      );
    });

    it('$($x = 1; $y =2; $x + $y).tostring()', () => {
      expect(
        sanitizeDollarSigns('$($x = 1; $y =2; $x + $y).tostring()')
      ).to.equal('\\$(\\$x = 1; \\$y =2; \\$x + \\$y).tostring()');
    });

    it('${1:foobar}', () => {
      expect(sanitizeDollarSigns('${1:foobar}')).to.equal('${1:foobar}');
    });

    it('$2', () => {
      expect(sanitizeDollarSigns('$2')).to.equal('$2');
    });

    it('$variable = "hello"', () => {
      expect(sanitizeDollarSigns('$variable = "hello"')).to.equal('\\$variable = "hello"');
    });
  });
});
