const {
  optimizeText,
  removeEmail,
  removeExtraSpaces,
  removeLatinPartialLetters,
  removeMention,
  removeNumber,
  removeSpecialSymbols,
  removeStopWords,
  removeUrl,
  stemText,
} = require('./index');

describe('Module Test', () => {
  describe('removeExtraSpaces', () => {
    it('should remove extra spaces', () => {
      expect(removeExtraSpaces(' test  test test ')).toEqual('test test test');
    });

    it('should leave as it is if no extra spaces', () => {
      expect(removeExtraSpaces('123 123 123')).toEqual('123 123 123');
    });
  });

  describe('removeSpecialSymbols', () => {
    it('should remove special symbols', () => {
      expect(removeSpecialSymbols('123 asd фів @!?#$%^&*()_-=+\\/[]{}.,`\'"§±~')).toEqual('123 asd фів                              ');
    });

    it('should leave as it is if no special symbols', () => {
      expect(removeSpecialSymbols('regular тест строка і ')).toEqual('regular тест строка і ');
    });
  });

  describe('removeStopWords', () => {
    it('should remove stop words', () => {
      expect(removeStopWords('аби я побачив це, я би здивувався')).toEqual('аби я побачив це, я здивувався');
    });

    it('should leave as it is if no stop words', () => {
      expect(removeStopWords('побачив це, здивувався')).toEqual('побачив це, здивувався');
    });
  });

  describe('stemText', () => {
    it('it should stem the word', () => {
      expect(stemText('ти')).toEqual('ти');
      expect(stemText('весна')).toEqual('весн');
      expect(stemText('міський')).toEqual('міськ');
      expect(stemText('пiдводна')).toEqual('пiдводн');
      expect(stemText('пiдводний')).toEqual('пiдводн');
      expect(stemText('здивувався')).toEqual('здивував');
      // Expected result but this stemmer works more aggressive.
      // expect(stemText('виявляється')).toEqual('виявляєтьс');
      expect(stemText('виявляється')).toEqual('виявляєт');
    });
  });

  describe('removeEmail', () => {
    it('should remove email', () => {
      expect(removeEmail('test@test.com 123')).toEqual(' 123');
      expect(removeEmail('123 @mention 123')).toEqual('123 @mention 123');
    });
  });

  describe('removeMention', () => {
    it('should remove the mention', () => {
      expect(removeMention('test @mention 123')).toEqual('test  123');
      expect(removeMention('test @mention_BY @mention_BY')).toEqual('test  ');
      expect(removeMention('test 123')).toEqual('test 123');
      expect(removeMention('test @mention')).toEqual('test ');
      expect(removeMention('test test@gmail.com')).toEqual('test test');
      expect(removeMention('test test@gmail.com ')).toEqual('test test ');
    });
  });

  describe('removeUrl', () => {
    it('should remove url from text', () => {
      expect(removeUrl('https://test.com/go-here please visit my site')).toEqual(' please visit my site');
      expect(removeUrl('please visit my site https://test.com/go-here')).toEqual('please visit my site ');
      expect(removeUrl('please visit my site https://test.com/go-here please')).toEqual('please visit my site  please');
      expect(removeUrl('please visit my site')).toEqual('please visit my site');
    });
  });

  describe('removeNumber', () => {
    it('should remove numbers', () => {
      expect(removeNumber('123 asd')).toEqual(' asd');
      expect(removeNumber('asd @mention')).toEqual('asd @mention');
    });
  });

  describe('removeLatinPartialLetters', () => {
    it('should remove letters', () => {
      expect(removeLatinPartialLetters('teст тест')).toEqual('тест тест');
      expect(removeLatinPartialLetters('test test')).toEqual('test test');
      expect(removeLatinPartialLetters('тест текст іїґ test')).toEqual('тест текст іїґ тест');
    });
  });

  describe('optimizeText', () => {
    it('should optimize text', () => {
      expect(optimizeText('аби я побачив це, я би здивувався!!!  12  3 test@ 😝')).toEqual('аб я побач це я здивував test');
      expect(optimizeText('аби я @mention email@test.com спеціальний символ 😝')).toEqual('аб я спеціальн символ');
      expect(optimizeText('це наші?')).toEqual('це наш');
      expect(optimizeText('щось не знайшов наші?')).toEqual('щось не знайшов наш');
    });
  });
});
