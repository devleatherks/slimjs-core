let Slimjs_Core = require('../src/index');

it("Debug console out", function(){
     
    Slimjs_Core.debug('Test Worning', 'w');
    Slimjs_Core.debug('Test Error', 'e');
    Slimjs_Core.debug('Test Success', 's');
    Slimjs_Core.debug('Test info');
    
});