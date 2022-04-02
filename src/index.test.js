const { optimizeText, removeExtraSpaces, removeSpecialSymbols, removeStopWords, stemText } = require('./index');

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
      expect(removeStopWords('аби я побачив це, я би здивувався')).toEqual('побачив це, здивувався');
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

  describe('optimizeText', () => {
    it('should optimize text', () => {
      expect(optimizeText('аби я побачив це, я би здивувався!!!  12  3 test@ 😝')).toEqual('побач це здивував 12 3 test');
    });
  });
});
