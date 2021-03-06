const stemmer = require('ukrstemmer');

/**
 * @type {string[]}
 * */
const stopWords = require('./stopwords_ua_list.json');

/**
 * @type {string[]}
 * */
const stemWhitelist = require('./stem-whitelist.json');

const numberRegexp = /\d+/g;
const mentionRegexp = /@\D[_]?[^ ]+/g;
const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
const emailRegexp =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;

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
  return text
    .split(' ')
    .map((word) => {
      if (stemWhitelist.includes(word)) {
        return word;
      }

      return stemmer(word);
    })
    .join(' ');
}

/**
 * Remove emails from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeEmail(text) {
  return text.replace(emailRegexp, '');
}

/**
 * Remove mentions from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeMention(text) {
  return text.replace(mentionRegexp, '');
}

/**
 * Remove URLs from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeUrl(text) {
  return text.replace(urlRegexp, '');
}

/**
 * Remove numbers from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeNumber(text) {
  return text.replace(numberRegexp, '');
}

/**
 * Replace latin symbols with cyrillic
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function replaceLatinWithCyrillic(text) {
  let enteredText = text;

  enteredText = enteredText.replace(/lj/g, '??');
  enteredText = enteredText.replace(/Lj/g, '??');
  enteredText = enteredText.replace(/LJ/g, '??');

  enteredText = enteredText.replace(/nj/g, '??');
  enteredText = enteredText.replace(/Nj/g, '??');
  enteredText = enteredText.replace(/NJ/g, '??');

  enteredText = enteredText.replace(/d??/g, '??');
  enteredText = enteredText.replace(/D??/g, '??');
  enteredText = enteredText.replace(/D??/g, '??');

  enteredText = enteredText.replace(/a/g, '??');
  enteredText = enteredText.replace(/b/g, '??');
  enteredText = enteredText.replace(/c/g, '??');
  enteredText = enteredText.replace(/??/g, '??');
  enteredText = enteredText.replace(/??/g, '??');
  enteredText = enteredText.replace(/d/g, '??');
  enteredText = enteredText.replace(/??/g, '??');
  enteredText = enteredText.replace(/e/g, '??');
  enteredText = enteredText.replace(/f/g, '??');
  enteredText = enteredText.replace(/g/g, '??');
  enteredText = enteredText.replace(/h/g, '??');
  enteredText = enteredText.replace(/i/g, '??');
  enteredText = enteredText.replace(/j/g, '??');
  enteredText = enteredText.replace(/k/g, '??');
  enteredText = enteredText.replace(/l/g, '??');
  enteredText = enteredText.replace(/m/g, '??');
  enteredText = enteredText.replace(/n/g, '??');
  enteredText = enteredText.replace(/o/g, '??');
  enteredText = enteredText.replace(/p/g, '??');
  enteredText = enteredText.replace(/r/g, '??');
  enteredText = enteredText.replace(/s/g, '??');
  enteredText = enteredText.replace(/??/g, '??');
  enteredText = enteredText.replace(/t/g, '??');
  enteredText = enteredText.replace(/u/g, '??');
  enteredText = enteredText.replace(/v/g, '??');
  enteredText = enteredText.replace(/z/g, '??');
  enteredText = enteredText.replace(/??/g, '??');
  enteredText = enteredText.replace(/y/g, '??');

  enteredText = enteredText.replace(/A/g, '??');
  enteredText = enteredText.replace(/B/g, '??');
  enteredText = enteredText.replace(/C/g, '??');
  enteredText = enteredText.replace(/??/g, '??');
  enteredText = enteredText.replace(/??/g, '??');
  enteredText = enteredText.replace(/D/g, '??');
  enteredText = enteredText.replace(/??/g, '??');
  enteredText = enteredText.replace(/E/g, '??');
  enteredText = enteredText.replace(/F/g, '??');
  enteredText = enteredText.replace(/G/g, '??');
  enteredText = enteredText.replace(/H/g, '??');
  enteredText = enteredText.replace(/I/g, '??');
  enteredText = enteredText.replace(/J/g, '??');
  enteredText = enteredText.replace(/K/g, '??');
  enteredText = enteredText.replace(/L/g, '??');
  enteredText = enteredText.replace(/M/g, '??');
  enteredText = enteredText.replace(/N/g, '??');
  enteredText = enteredText.replace(/O/g, '??');
  enteredText = enteredText.replace(/P/g, '??');
  enteredText = enteredText.replace(/R/g, '??');
  enteredText = enteredText.replace(/S/g, '??');
  enteredText = enteredText.replace(/??/g, '??');
  enteredText = enteredText.replace(/T/g, '??');
  enteredText = enteredText.replace(/U/g, '??');
  enteredText = enteredText.replace(/V/g, '??');
  enteredText = enteredText.replace(/Z/g, '??');
  enteredText = enteredText.replace(/??/g, '??');

  return enteredText;
}

/**
 * Remove latin letters if text is cyrillic
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeLatinPartialLetters(text) {
  return removeExtraSpaces(text)
    .split(' ')
    .map((word) => {
      const cyrillicLetters = word.replace(/[^\u0400-\u04FF\d]/gi, ' ').replace(/ /g, '');
      const latinLetters = word.replace(/[^a-z\d]/gi, ' ').replace(/ /g, '');

      const latinRatio = latinLetters.length / cyrillicLetters.length;

      return latinRatio <= 1 ? replaceLatinWithCyrillic(word) : word;
    })
    .join(' ');
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

  return [newText]
    .map(removeUrl)
    .map(removeEmail)
    .map(removeMention)
    .map(removeSpecialSymbols)
    .map(removeNumber)
    .map(removeExtraSpaces)
    .map(removeStopWords)
    .map(removeLatinPartialLetters)
    .map(stemText)[0];
}

module.exports = {
  emailRegexp,
  mentionRegexp,
  numberRegexp,
  urlRegexp,
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
};
