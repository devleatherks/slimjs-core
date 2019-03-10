let Slim_Fn = function () {



}
/**
 * Here’s what our current JavaScript equivalent to PHP's rtrim looks like.
 * 
 * @description http://locutus.io/php/rtrim/
 */
Slim_Fn.prototype.rtrim = function (str, charlist) {

    charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
        .replace(/([[\]().?/*{}+$^:])/g, '\\$1');

    var re = new RegExp('[' + charlist + ']+$', 'g');

    return (str + '').replace(re, '');

}

/**
 * Here’s what our current JavaScript equivalent to PHP's strlen looks like.
 * 
 * @description http://locutus.io/php/strlen/
 */
Slim_Fn.prototype.strlen = function (string) {

    var str = string + ''

    var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('unicode.semantics') : undefined) || 'off'
    if (iniVal === 'off') {
        return str.length
    }

    var i = 0
    var lgth = 0

    var getWholeChar = function (str, i) {
        var code = str.charCodeAt(i)
        var next = ''
        var prev = ''
        if (code >= 0xD800 && code <= 0xDBFF) {
            // High surrogate (could change last hex to 0xDB7F to
            // treat high private surrogates as single characters)
            if (str.length <= (i + 1)) {
                throw new Error('High surrogate without following low surrogate')
            }
            next = str.charCodeAt(i + 1)
            if (next < 0xDC00 || next > 0xDFFF) {
                throw new Error('High surrogate without following low surrogate')
            }
            return str.charAt(i) + str.charAt(i + 1)
        } else if (code >= 0xDC00 && code <= 0xDFFF) {
            // Low surrogate
            if (i === 0) {
                throw new Error('Low surrogate without preceding high surrogate')
            }
            prev = str.charCodeAt(i - 1)
            if (prev < 0xD800 || prev > 0xDBFF) {
                // (could change last hex to 0xDB7F to treat high private surrogates
                // as single characters)
                throw new Error('Low surrogate without preceding high surrogate')
            }
            // We can pass over low surrogates now as the second
            // component in a pair which we have already processed
            return false
        }
        return str.charAt(i)
    }

    for (i = 0, lgth = 0; i < str.length; i++) {
        if ((getWholeChar(str, i)) === false) {
            continue
        }
        // Adapt this line at the top of any loop, passing in the whole string and
        // the current iteration and returning a variable to represent the individual character;
        // purpose is to treat the first part of a surrogate pair as the whole character and then
        // ignore the second part
        lgth++
    }

    return lgth
}
/**
 * Here’s what our current JavaScript equivalent to PHP's preg_match looks like.
 * 
 * @deprecated @description http://locutus.io/php/preg_match/
 */
Slim_Fn.prototype.preg_match = function (regex, str) {

    return (new RegExp(regex).test(str))

}