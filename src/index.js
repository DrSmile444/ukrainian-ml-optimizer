/**
 * @type {string[]}
 * */
const stopWords = require('ukrainian-stopwords/stopwords_ua_list.json');

const stemmerUkrainianPatterns = {
  // http://uk.wikipedia.org/wiki/Голосний_звук */
  VOWEL: /[аеиоуюяіїє]g/,
  INFINITIVE: /(ти|учи|ячи|вши|ши|ати|яти|ючи)$/g,
  PERFECTIVEGROUND: /((ив|ивши|ившись))$/g,

  //  static $PERFECTIVEGROUND = '/((ив|ивши|ившись|ыв|ывши|ывшись((?<=[ая])(в|вши|вшись)))$/u',
  //  http://uk.wikipedia.org/wiki/Рефлексивне_дієслово
  REFLEXIVE: /(с[яьи])$/g,

  // http://uk.wikipedia.org/wiki/Прикметник + http://wapedia.mobi/uk/Прикметник
  ADJECTIVE: /(ими|ій|ий|а|е|ова|ове|ів|є|їй|єє|еє|я|ім|ем|им|ім|их|іх|ою|йми|іми|у|ю|ого|ому|ої)$/g,

  // http://uk.wikipedia.org/wiki/Дієприкметник
  PARTICIPLE: /(ий|ого|ому|им|ім|а|ій|у|ою|ій|і|их|йми|их)$/g,

  // http://uk.wikipedia.org/wiki/Дієслово
  VERB: /(сь|ся|ив|ать|ять|у|ю|ав|али|учи|ячи|вши|ши|е|ме|ати|яти|є)$/g,

  // http://uk.wikipedia.org/wiki/Іменник
  NOUN: /(а|ев|ов|е|ями|ами|еи|и|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я|і|ові|ї|ею|єю|ою|є|еві|ем|єм|ів|їв|'ю)$/g,
  RVRE: /^(.*?[аеиоуюяіїє])(.*)$/g,
  DERIVATIONAL: /[^аеиоуюяіїє][аеиоуюяіїє]+[^аеиоуюяіїє]+[аеиоуюяіїє].*сть?$/g,
};

/**
 * Removes all stop words from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeStopWords(text) {
  return text
    .toLowerCase()
    .split(' ')
    .filter((word) => !stopWords.includes(word))
    .join(' ');
}

/**
 * Removes all special symbols and lefts only latin and cyrillic ones.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeSpecialSymbols(text) {
  return text.replace(/[^a-z\u0400-\u04FF\d]/gi, ' ');
}

/**
 * Trims the message and removes two or more spaces in row.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeExtraSpaces(text) {
  return text.replace(/\s\s+/g, ' ').trim();
}

/**
 * Remove ukrainian redundant word endings for ML.
 *
 * @param {string} word - text or message.
 * @returns {string} - processed and optimized word.
 * */
function stemWord(word) {
  /**
   * If it's infinitive, skip the word
   * */
  if (stemmerUkrainianPatterns.INFINITIVE.test(word)) {
    return word;
  }

  const rvreGroup = stemmerUkrainianPatterns.RVRE.exec(word);

  /**
   * If it doesn't have RVRE, skip the word
   * */
  if (!rvreGroup) {
    return word;
  }

  const start = rvreGroup[1];
  let end = rvreGroup[2];

  /**
   * Step 1
   * */
  let optimizedEnd = end.replace(stemmerUkrainianPatterns.PERFECTIVEGROUND, '');

  if (optimizedEnd === end) {
    end = end.replace(stemmerUkrainianPatterns.REFLEXIVE, '');
    optimizedEnd = end.replace(stemmerUkrainianPatterns.ADJECTIVE, '');

    if (optimizedEnd === end) {
      end = end.replace(stemmerUkrainianPatterns.PARTICIPLE, '');
    } else {
      end = optimizedEnd;
      optimizedEnd = end.replace(stemmerUkrainianPatterns.VERB, '');

      if (optimizedEnd === end) {
        end = end.replace(stemmerUkrainianPatterns.NOUN, '');
      } else {
        end = optimizedEnd;
      }
    }
  } else {
    end = optimizedEnd;
  }

  /**
   * Step 2
   * */
  const lastSymbol = end[end.length - 1];
  if (lastSymbol === 'і') {
    end = end.slice(0, -1);
  }

  /**
   * Step 3
   * */
  if (stemmerUkrainianPatterns.DERIVATIONAL.test(end)) {
    end = end.replace(/їсть$/, '');
  }

  /**
   * Step 4
   * */
  optimizedEnd = end.replace(/ь?$/, '');
  if (optimizedEnd === end) {
    end = end.replace(/ейше?/, '');
    end = end.replace(/нн$/, '');
  } else {
    end = optimizedEnd;
  }

  return start + end;
}

/**
 * Remove ukrainian redundant word endings for ML.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function stemText(text) {
  return text.split(' ').map(stemWord).join('');
}

/**
 * @description
 * This function removes all special symbols, extra spaces, stop-words, and optimizes the text with stemming.
 * Main function that does all optimizations.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 */
function optimizeText(text) {
  const newText = text.toLowerCase();

  return [newText].map(removeStopWords).map(removeSpecialSymbols).map(removeExtraSpaces)[0];
}

module.exports = {
  stemmerUkrainianPatterns,
  stemWord,
  stemText,
  optimizeText,
  removeStopWords,
  removeSpecialSymbols,
  removeExtraSpaces,
};
