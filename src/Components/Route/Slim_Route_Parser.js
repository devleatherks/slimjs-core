let Slim = require('../../index');

class Slim_Route_Parser {

    constructor() {

        const VARIABLE_REGEX = `
            \{
                \s* ([a-zA-Z_][a-zA-Z0-9_-]*) \s*
                (?:
                    : \s* ([^{}]*(?:\{(?-1)\}[^{}]*)*)
                )?
            \}
        `;

        const DEFAULT_DISPATCH_REGEX = '[^/]+'

    }

    parse(route) {

        let routeWithoutClosingOptionals = Slim.fn.rtrim(route, ']');

        numOptionals = Slim.fn.strlen(route) - Slim.fn.strlen(routeWithoutClosingOptionals);

    }

    parsePlaceholders(route) {



    }

}