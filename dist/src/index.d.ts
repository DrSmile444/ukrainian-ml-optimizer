export declare const numberRegexp: RegExp;
export declare const mentionRegexp: RegExp;
export declare const urlRegexp: RegExp;
export declare const emailRegexp: RegExp;
/**
 * Removes all stop words from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
export declare function removeStopWords(text: string): string;
/**
 * Removes all special symbols and lefts only latin and cyrillic ones.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
export declare function removeSpecialSymbols(text: string): string;
/**
 * Trims the message and removes two or more spaces in row.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
export declare function removeExtraSpaces(text: string): string;
/**
 * Remove ukrainian redundant word endings for ML.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
export declare function stemText(text: string): string;
/**
 * Remove emails from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
export declare function removeEmail(text: string): string;
/**
 * Remove mentions from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
export declare function removeMention(text: string): string;
/**
 * Remove URLs from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
export declare function removeUrl(text: string): string;
/**
 * Remove numbers from the text.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
export declare function removeNumber(text: string): string;
/**
 * Replace latin symbols with cyrillic
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
export declare function replaceLatinWithCyrillic(text: string): string;
/**
 * Remove latin letters if text is cyrillic
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 * */
export declare function removeLatinPartialLetters(text: string): string;
/**
 * @description
 * This function removes all special symbols, extra spaces, stop-words, and optimizes the text with stemming.
 * Main function that does all optimizations.
 *
 * @param {string} text - text or message.
 * @returns {string} - processed and optimized text.
 */
export declare function optimizeText(text: string): string;
