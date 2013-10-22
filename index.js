var _ = require("underscore")
module.exports = function(plasma, config) {
  var organelles = ["cell", "install", "remove", "restart", "start", "status", "stop", "upgrade"]
  if(config && config.exclude)
    organelles = _.without(organelles, config.exclude)
  organelles.forEach(function(name){
    var reaction = require("./default/"+name)
    plasma.on(name, reaction)
  })
}
