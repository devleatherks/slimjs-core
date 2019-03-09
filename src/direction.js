let Slim = require('slimjs-core');

Slim.set_components('service', new (require('./Components/Slim_Service')));

Slim.service.add('server', new (require('./Services/Slim_Server')), true);