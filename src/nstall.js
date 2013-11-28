var ssh = require("shellreactions-exec").ssh_exec
var exec = require("shellreactions-exec").exec
var cell = require("./cell")

module.exports = function(angel){
  angel.on("cell :mode install", function(options, next){
    cell.loadFileAsJSON(options.mode, function(err, data){
      if(err) return next(err)
      var commands = [
        "mkdir -p {cwd}",
        "cd {cwd}",
        "git clone {source} ./",
        "git checkout {branch}",
        "cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; npm install --production"
      ]
      if(data.remote)
        ssh("remote", commands, data, next)
      else
        exec(commands, data, next)
    })
  })

  angel.on("cell :mode uninstall", function(options, next){
    cell.loadFileAsJSON(options.mode, function(err, data){
      if(err) return next(err)
      var commands = "rm -rf {cwd}"
      if(data.remote)
        ssh("remote", commands, data, next)
      else
        exec(commands, data, next)
    })
  })
}