const stemmer = require('ukrstemmer');

/**
 * @type {string[]}
 * */
const stopWords = require('ukrainian-stopwords/stopwords_ua_list.json');

const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;

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
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function stemText(text) {
  return text.split(' ').map(stemmer).join(' ');
}

/**
 * Remove mentions from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeMention(text) {
  return text.replace(/@.+ /g, ' ');
}

/**
 * Remove mentions from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeUrl(text) {
  return text.replace(urlRegexp, '');
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

  return [newText].map(removeStopWords).map(removeSpecialSymbols).map(removeExtraSpaces).map(stemText)[0];
}

module.exports = {
  urlRegexp,
  stemText,
  removeMention,
  removeUrl,
  optimizeText,
  removeStopWords,
  removeSpecialSymbols,
  removeExtraSpaces,
};
