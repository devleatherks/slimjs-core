/**
 * Process control object
 * 
 * @author devleatherks <devleatherks@gmail.com>
 */
let Slim_Service = function()
{
    /**
     * @var {object} app_services - All registered services are stored.
     */
    let app_services = {};

    /**
     * @var {object} app_services_status - Stored running services and their objects
     */
    let app_services_status = {};

    /**
     * Register a new service
     * 
     * @param {string} name - Process name
     * @param {object} name - Process object
     * @param {boolean} autostart - Process object
     */
    this.add = function(name, service, autostart = false)
    {

        app_services[name] = {
            service: service,
            autostart: autostart
        };

    }

    /**
     * The kernel integrates core processes with services.
     * start/restart/stop
     */
    this.core = {

        /**
         * Initializes the process
         * 
         * @param {string} service_name 
         * @param {*} service 
         * 
         * @return {Promise} - process object
         */
        start: async function(service_name, service)
        {

            return new Promise(function (resolve, reject) {
                service.start((answer) => {
                    app_services_status[service_name] = {
                        code: true,
                        answer: answer
                    }
                    return resolve(answer);
                },
                (answer) => {
                    app_services_status[service_name] = {
                        code: false,
                        answer: answer
                    }
                    return reject(answer);
                });

            });

        }

    }

    /**
     * Starts all processes with autostart flag - true
     * @return {self} - Slim_Service
     */
    this.run = async function()
    {

        for (service in app_services) {

            if (app_services[service].autostart) {
                await this.core.start(service, app_services[service].service);
            }
            
        }

        return this;

    };

    /**
     * Access to any process by name
     * 
     * @param {string} - Process Name
     * 
     * @return {object} - Process Object
     */
    this.api = function(name_service)
    {
        return app_services_status[name_service].answer;
    }

    /**
     * Displays all processes and their status.
     * @return {void}
     */
    this.status = function()
    {

        console.log('::Run Service Info -------------------------------');

        for (service in app_services) {
            
            console.log('| Name:           | ' + app_services[service].service.service.name);
            console.log('| ---------------------------------------------');
            console.log('| Description:    | ' + app_services[service].service.service.description);
            console.log('| ---------------------------------------------');
            console.log('| System status:  | ' + app_services[service].service.service.status);
            console.log('| ---------------------------------------------');
            console.log('| Service status: | ' + app_services_status[service].code);
            console.log('| ---------------------------------------------');
            console.log('| Version:        | ' + app_services[service].service.service.version);
            console.log('//--------------------------------------------');

        }

    };

}

module.exports = Slim_Service;