var debug = require('debug')('slimjs:core');

let Core = {
    module: {},
}

let controlComponents = ['module'];

class Slimjs_Core{
    
    async static build()
    {

        // let build_routing

    }

    async static build_routing()
    {



    }

    async static __autoload(dir, filter)
    {

        Slimjs_Core.modules("fs").readdirSync(dir + filter).forEach(function(file) {

            Slimjs_Core.modules(dir + file);

        });

    }

     /**
     * Module connection
     * 
     * @example
     * // return express
     * Slim_App.controllers('express')
     * @param {string} module_name - module name
     * @returns {Object} Returns a previously initialized module.
     */
    controllers(controller_name, request, response)
    {

        let controller_name_slip = controller_name.split('.');
        let dir_controller = '';
        let mathod_controller = '';

        controller_name_slip.forEach((element, i) => {
            
            if(controller_name_slip.length == (i + 1)){
                mathod_controller += '/' + element;
            }else{
                dir_controller += '/' + element;
            }
            
        });

        if(controller_name in slim_controllers){
            return slim_controllers[controller_name];
        }

        slim_controllers[controller_name] = new require(this.get_setting('path').DIR_SRC + 'App/Controllers' + dir_controller)(request, response);

        return slim_controllers[controller_name][mathod_controller];

    }

    static system_dir_direction()
    {
        return __dirname + '/direction';
    }

    /**
     * System services
     * 
     * @return {object}
     */
    static get service()
    {
        return Core.service;
    }
    /**
     * System services
     * 
     * @return {object}
     */
    static get setting()
    {
        return Core.setting;
    }

    /**
     * Returns the specified kernel component
     * 
     * @param {string} name_component - Name component
     * @return {any}
     */
    static core(name_component)
    {

        if (name_component in Core) {
            return false;
        }

        return Core[name_component];

    }

    static get_core()
    {
        return Core;
    }

    /**
     * Adds a component to the system
     * 
     * @param {string} name_core 
     * @param {any} value 
     * @param {boolean} prohibitionChange 
     */
    static set_components(name_core, value, prohibitionChange = false)
    {

        if (controlComponents.indexOf(name_core) != -1) {
            return false;
        }

        if (prohibitionChange) {
            controlComponents.push(name_core);
        }

        Core[name_core] = value;

        return true;

    }

    /**
     * Module connection
     * 
     * @example
     * // return express
     * Slim_App.modules('express')
     * @param {string} module_name - module name
     * @returns {Object} Returns a previously initialized module.
     */
    static modules(module_name)
    {

        if (module_name in Core.module) {
            return Core.module[module_name];
        }

        Core.module[module_name] = require(module_name);

        return Core.module[module_name];

    }

    /**
     * Resets all system variables.
     * 
     * @bin system-reset
     * @return {void}
     */
    static bin_system__reset(){

        let properties = Slimjs_Core.bin_system__getAllProperties();

        for(let property in properties){
            Slimjs_Core[property] = null;
        }

    }

    /**
     * Stores all system variables and their description
     * 
     * @bin system-all-properties
     * @return {object}
     */
    static bin_system__getAllProperties(){

        return {
            system: "Path to the root of the project",
            debug: 'Debug function',
            service: "System services"
        };

    }

    /**
     * Checks all system variables for the presence 
     * of all modules and displays the result in the console.
     * 
     * @bin system-check
     * @return {void}
     */
    static bin_system__checkSystem()
    {

        let properties = Slimjs_Core.bin_system__getAllProperties(),
            status, adds = '| -';

        for(let property in properties){
            
            if(Slimjs_Core[property] === null || Slimjs_Core[property] === undefined){
                status = 'e';
            }else{
                status = 's';
            }

            if (controlComponents.indexOf(name_core) != -1) {
                adds = "| +"
            }

            Slimjs_Core.debug(properties[property], status);
            
        }

    }

}

Slimjs_Core.debug = function(message, type = ""){

    switch(type){
        case "w": 
            message = "⚠️  " + message;
        break; 
        case "e": 
            message = "⛔️  " + message;
        break; 
        case "s": 
            message = "✔️  " + message;
        break; 
        default: 
            message = "🏳️  " + message;
        break; 
    }
    
    console.log(message);

}

// Slimjs_Core.debug = debug;

module.exports = Slimjs_Core;