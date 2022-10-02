"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeText = exports.removeLatinPartialLetters = exports.replaceLatinWithCyrillic = exports.removeNumber = exports.removeUrl = exports.removeMention = exports.removeEmail = exports.stemText = exports.removeExtraSpaces = exports.removeSpecialSymbols = exports.removeStopWords = exports.emailRegexp = exports.urlRegexp = exports.mentionRegexp = exports.numberRegexp = void 0;
var ukrstemmer_1 = __importDefault(require("ukrstemmer"));
var stopwords_ua_list_json_1 = __importDefault(require("../stopwords_ua_list.json"));
var stem_whitelist_json_1 = __importDefault(require("../stem-whitelist.json"));
exports.numberRegexp = /\d+/g;
exports.mentionRegexp = /@\D[_]?[^ ]+/g;
exports.urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
exports.emailRegexp = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;
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
        .filter(function (word) { return !stopwords_ua_list_json_1.default.includes(word); })
        .join(' ');
}
exports.removeStopWords = removeStopWords;
/**
 * Removes all special symbols and lefts only latin and cyrillic ones.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeSpecialSymbols(text) {
    return text.replace(/[^a-z\u0400-\u04FF\d]/gi, ' ');
}
exports.removeSpecialSymbols = removeSpecialSymbols;
/**
 * Trims the message and removes two or more spaces in row.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeExtraSpaces(text) {
    return text.replace(/\s\s+/g, ' ').trim();
}
exports.removeExtraSpaces = removeExtraSpaces;
/**
 * Remove ukrainian redundant word endings for ML.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function stemText(text) {
    return text
        .split(' ')
        .map(function (word) {
        if (stem_whitelist_json_1.default.includes(word)) {
            return word;
        }
        return (0, ukrstemmer_1.default)(word);
    })
        .join(' ');
}
exports.stemText = stemText;
/**
 * Remove emails from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeEmail(text) {
    return text.replace(exports.emailRegexp, '');
}
exports.removeEmail = removeEmail;
/**
 * Remove mentions from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeMention(text) {
    return text.replace(exports.mentionRegexp, '');
}
exports.removeMention = removeMention;
/**
 * Remove URLs from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeUrl(text) {
    return text.replace(exports.urlRegexp, '');
}
exports.removeUrl = removeUrl;
/**
 * Remove numbers from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeNumber(text) {
    return text.replace(exports.numberRegexp, '');
}
exports.removeNumber = removeNumber;
/**
 * Replace latin symbols with cyrillic
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function replaceLatinWithCyrillic(text) {
    var enteredText = text;
    enteredText = enteredText.replace(/lj/g, 'љ');
    enteredText = enteredText.replace(/Lj/g, 'Љ');
    enteredText = enteredText.replace(/LJ/g, 'Љ');
    enteredText = enteredText.replace(/nj/g, 'њ');
    enteredText = enteredText.replace(/Nj/g, 'Њ');
    enteredText = enteredText.replace(/NJ/g, 'Њ');
    enteredText = enteredText.replace(/dž/g, 'џ');
    enteredText = enteredText.replace(/Dž/g, 'Џ');
    enteredText = enteredText.replace(/DŽ/g, 'Џ');
    enteredText = enteredText.replace(/a/g, 'а');
    enteredText = enteredText.replace(/b/g, 'б');
    enteredText = enteredText.replace(/c/g, 'ц');
    enteredText = enteredText.replace(/č/g, 'ч');
    enteredText = enteredText.replace(/ć/g, 'ћ');
    enteredText = enteredText.replace(/d/g, 'д');
    enteredText = enteredText.replace(/đ/g, 'ђ');
    enteredText = enteredText.replace(/e/g, 'е');
    enteredText = enteredText.replace(/f/g, 'ф');
    enteredText = enteredText.replace(/g/g, 'г');
    enteredText = enteredText.replace(/h/g, 'х');
    enteredText = enteredText.replace(/i/g, 'и');
    enteredText = enteredText.replace(/j/g, 'ј');
    enteredText = enteredText.replace(/k/g, 'к');
    enteredText = enteredText.replace(/l/g, 'л');
    enteredText = enteredText.replace(/m/g, 'м');
    enteredText = enteredText.replace(/n/g, 'н');
    enteredText = enteredText.replace(/o/g, 'о');
    enteredText = enteredText.replace(/p/g, 'р');
    enteredText = enteredText.replace(/r/g, 'р');
    enteredText = enteredText.replace(/s/g, 'с');
    enteredText = enteredText.replace(/š/g, 'ш');
    enteredText = enteredText.replace(/t/g, 'т');
    enteredText = enteredText.replace(/u/g, 'у');
    enteredText = enteredText.replace(/v/g, 'в');
    enteredText = enteredText.replace(/z/g, 'з');
    enteredText = enteredText.replace(/ž/g, 'ж');
    enteredText = enteredText.replace(/y/g, 'у');
    enteredText = enteredText.replace(/A/g, 'А');
    enteredText = enteredText.replace(/B/g, 'Б');
    enteredText = enteredText.replace(/C/g, 'Ц');
    enteredText = enteredText.replace(/Č/g, 'Ч');
    enteredText = enteredText.replace(/Ć/g, 'Ћ');
    enteredText = enteredText.replace(/D/g, 'Д');
    enteredText = enteredText.replace(/Đ/g, 'Ђ');
    enteredText = enteredText.replace(/E/g, 'Е');
    enteredText = enteredText.replace(/F/g, 'Ф');
    enteredText = enteredText.replace(/G/g, 'Г');
    enteredText = enteredText.replace(/H/g, 'Х');
    enteredText = enteredText.replace(/I/g, 'И');
    enteredText = enteredText.replace(/J/g, 'Ј');
    enteredText = enteredText.replace(/K/g, 'К');
    enteredText = enteredText.replace(/L/g, 'Л');
    enteredText = enteredText.replace(/M/g, 'М');
    enteredText = enteredText.replace(/N/g, 'Н');
    enteredText = enteredText.replace(/O/g, 'О');
    enteredText = enteredText.replace(/P/g, 'П');
    enteredText = enteredText.replace(/R/g, 'Р');
    enteredText = enteredText.replace(/S/g, 'С');
    enteredText = enteredText.replace(/Š/g, 'Ш');
    enteredText = enteredText.replace(/T/g, 'Т');
    enteredText = enteredText.replace(/U/g, 'У');
    enteredText = enteredText.replace(/V/g, 'В');
    enteredText = enteredText.replace(/Z/g, 'З');
    enteredText = enteredText.replace(/Ž/g, 'Ж');
    return enteredText;
}
exports.replaceLatinWithCyrillic = replaceLatinWithCyrillic;
/**
 * Remove latin letters if text is cyrillic
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
function removeLatinPartialLetters(text) {
    return removeExtraSpaces(text)
        .split(' ')
        .map(function (word) {
        var cyrillicLetters = word.replace(/[^\u0400-\u04FF\d]/gi, ' ').replace(/ /g, '');
        var latinLetters = word.replace(/[^a-z\d]/gi, ' ').replace(/ /g, '');
        var latinRatio = latinLetters.length / cyrillicLetters.length;
        return latinRatio <= 1 ? replaceLatinWithCyrillic(word) : word;
    })
        .join(' ');
}
exports.removeLatinPartialLetters = removeLatinPartialLetters;
/**
 * @description
 * This function removes all special symbols, extra spaces, stop-words, and optimizes the text with stemming.
 * Main function that does all optimizations.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 */
function optimizeText(text) {
    var newText = text.toLowerCase();
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
exports.optimizeText = optimizeText;
