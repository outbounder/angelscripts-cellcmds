var fs = require('fs')
var _ = require("underscore")
var ssh = require("shellreactions-exec").ssh_exec
var exec = require("shellreactions-exec").exec

module.exports = function(angel){
  angel.on("cell :cmd(start|stop|restart|status) :mode", function(options, next){
    module.exports.loadFileAsJSON(options.mode, function(err, data){
      if(err) return next(err)
      var commands = "cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; {"+options.cmd+"}"
      if(data.remote)
        ssh("remote", commands, data, next)
      else
        exec(commands, data, next)
    })
  })
}

module.exports.loadFileAsJSON = function(path, next) {
  fs.readFile(path, function(err, data){
    if(err) return next(err)
    try {
      data = JSON.parse(data.toString())
    } catch(err){
      return next(err)
    }
    next(null, data)
  })
}
