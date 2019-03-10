let Slim = require('slimjs-core');

Slim.set_components('service', new (require('./Components/Slim_Service')));

Slim.service.add('fn',      new (require('./Services/Slim_Fn')), true);
Slim.service.add('route',   new (require('./Services/Slim_Routes')), true);
Slim.service.add('server',  new (require('./Services/Slim_Server')), true);