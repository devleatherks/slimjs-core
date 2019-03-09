let Slim = require('../index');

/**
 * Class Manager Server
 * 
 * @param {Slim_App} Slim_App - object Slim_App
 */
let Slim_Server = function()
{

    let slim_server;

    let httpRequsetManager = function(slim_server)
    {
        
        this.slim_server = slim_server;
    
    }

    httpRequsetManager.prototype.get = function(path, contollers)
    {

        this.slim_server.get(path, (req, res) => {

            // res.send({ok: 1});
            let handler = Slim.controllers(contollers, req, res);

            handler(req, res);
    
        });

        // handler();

    }

    this.service = {
        name: "Server NodeJS",
        version: "1.0.1",
        description: "", 
        status: false
    }

    this.start = function(resolve, reject){

        slim_server = Slim.modules('express')();

        slim_server.listen(process.env.SERVER_PORT, () => {
            this.service.status = true; 
            this.service.description = "NodeJS Server. http://localhost:" + process.env.SERVER_PORT + "/";
            Slim.debug(this.service.description, 's');
            resolve(new httpRequsetManager(slim_server));
        });
      
    }

    this.restart = function(){

        

    }

    this.stop = function(){



    }

}

module.exports = Slim_Server;