let Slim = require('../index');

let Slim_Routes = function(slim){

    this.currentGroupPrefix = '';

    this.run = function()
    {

        this.includeFiles();

    }

    this.includeFiles = function() 
    {
        
        let dirRoutes = Slim.setting.DIR_SRC + '/' + Slim.setting.SYSTEM_APP_DIR_ROUTES;

        Slim.__autoload(dirRoutes, '/*.routes.js');

    }

    this.get = function(route, handler) {
        
        this.addRoute('GET', route, handler);

    }

}

Slim_Routes.prototype.andler = function(url){



}; 

module.exports = Slim_Routes;