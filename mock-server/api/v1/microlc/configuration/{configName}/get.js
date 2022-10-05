const {join, resolve} = require("path")


module.exports = (request, response) => {
    try {
      const specificConfig = require(`./${request.params.configName}`);

      response
      .delay(1000)
      .send(specificConfig)  
    } catch {
      const configuration = require(`./microlc-element-composer.json`);

      response
      .delay(1000)
      .send(configuration)  
    } 
    
}
