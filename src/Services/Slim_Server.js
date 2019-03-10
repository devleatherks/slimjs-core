let Slim = require('../index');

/**
 * Class Manager Server
 * 
 * @param {Slim_App} Slim_App - object Slim_App
 */
let Slim_Server = function()
{

    let activeServer = null;

    this.getModelServer = function(type, port, requestHandler)
    {

        switch (type) {
            case 'http': 
                return Slim.modules('http').createServer(requestHandler);
            break;
            case 'https': 
                return Slim.modules('https').createServer(requestHandler);
            break;
            case 'http2': 
                return Slim.modules('http2').createServer(requestHandler);
            break;
        }

        return false;

    }

    this.service = {
        name: "Server NodeJS",
        version: "1.0.1",
        description: "", 
        status: false
    }

    this.start = function(resolve, reject)
    {

        let server = this.getModelServer(process.env.SERVER_PROTOCOL, process.env.SERVER_PORT, (request, response) => {
            console.log(request.url)
            response.end('Hello Node.js Server!');
        });

        if (server === false) {
            return Slim.debug(`The requested server (${process.env.SERVER_PROTOCOL}) does not exist in the system`, 'e');
        }
    
        server.listen(8080, (err) => {
            if (err) {
                return console.log('something bad happened', err)
            }
            console.log(`server is listening on ${8080}`)
        })

        // activeServer

        // slim_server = Slim.modules('express')();

        // slim_server.listen(process.env.SERVER_PORT, () => {
        //     this.service.status = true; 
        //     this.service.description = "NodeJS Server. http://localhost:" + process.env.SERVER_PORT + "/";
        //     Slim.debug(this.service.description, 's');
        //     resolve(new httpRequsetManager(slim_server));
        // });
      
    }

    this.restart = function(){

        

    }

    this.stop = function(){



    }

}

module.exports = Slim_Server;