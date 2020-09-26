import globals from './globals';

export default {

    logStart: `${globals.package.name}/${globals.package.version}: `,

    log: function() {
        arguments[0] = typeof arguments[0] == "string" ? this.logStart + arguments[0] : arguments[0] 
        console.log(...arguments)
    },

    error: function() {
        arguments[0] = typeof arguments[0] == "string" ? this.logStart + arguments[0] : arguments[0] 
        console.error(...arguments)
    }

}
