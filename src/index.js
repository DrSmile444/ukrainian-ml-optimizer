/**
 * @type {string[]}
 * */
const stopWords = require('ukrainian-stopwords/stopwords_ua_list.json');

/**
 * Removes all stop words from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeStopWords(text) {
  let resultText = text;

  stopWords.forEach((word) => {
    resultText = resultText.replace(new RegExp(word, 'gi'), '');
  });

  return resultText;
}

/**
 * Removes all special symbols and lefts only latin and cyrillic ones.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeSpecialSymbolsAndSpaces(text) {
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
 * @description
 * This function removes all special symbols, extra spaces, stop-words, and optimizes the text with stemming.
 * Main function that does all optimizations.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 */
function optimizeText(text) {
  const newText = text.toLowerCase();

  return [newText].map(removeStopWords).map(removeSpecialSymbolsAndSpaces).map(removeExtraSpaces)[0];
}

module.exports = {
  optimizeText,
  removeStopWords,
  removeSpecialSymbolsAndSpaces,
  removeExtraSpaces,
};
