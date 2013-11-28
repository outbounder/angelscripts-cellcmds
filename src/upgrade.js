var ssh = require("shellreactions-exec").ssh_exec
var exec = require("shellreactions-exec").exec
var cell = require("./cell")
var series = require("reactions").make.collectSeries

module.exports = function(angel){
  angel.on("cell :mode upgrade", function(options, next){
    cell.loadFileAsJSON(options.mode, function(err, data){
      var commands = [
        "cd #{cwd}",
        "git fetch",
        "git checkout #{branch}",
        "git pull #{origin} #{branch}",
        "npm install --production"
      ]
      var run = series([
        data.remote? ssh("remote", commands) : exec(commands),
        angel.react("cell "+options.mode+" restart")
      ])
      run({cmdData: data}, next)
    })
  })
}