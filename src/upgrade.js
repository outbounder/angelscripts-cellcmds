var ssh = require("shellreactions-exec").ssh_exec
var exec = require("shellreactions-exec").exec
var cell = require("./cell")
var series = require("reactions").make.collectSeries

module.exports = function(angel){
  angel.on("cell upgrade :mode", function(options, next){
    cell.loadFileAsJSON(options.mode, function(err, data){
      var commands = [
        "cd {cwd}",
        "git fetch",
        "git checkout {branch}",
        "git pull {origin} {branch}",
        "cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; npm install --production"
      ]
      var run = series([
        data.remote? ssh("remote", commands) : exec(commands),
        angel.react("cell restart "+options.mode)
      ])
      run({cmdData: data}, next)
    })
  })
}