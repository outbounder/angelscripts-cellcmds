var fs = require('fs')
var _ = require("underscore")
var exec = require("child_process").exec

module.exports = function(angel) {
  require("angelabilities/src/format")(angel)

  angel.on("cell :cmd :mode", function(angel, next) {
    // load cell data
    fs.readFile(angel.cmdData.mode, function(err, data){
      
      if(err) return next(err)
      try {
        data = JSON.parse(data.toString())
        _.extend(angel.cmdData, data)
      } catch(err){
        console.error(err)
        return next && next(err)
      }
      
      var commandValue = angel.cmdData[angel.cmdData.cmd]
      if(!commandValue) {
        console.error(angel.cmdData.cmd, "not found in", angel.cmdData.mode, "as command")
        return next(new Error(angel.cmdData.cmd+" not found"))
      }
      while(commandValue.indexOf("{") !== -1) {
        commandValue = angel.format(commandValue)
      }
      var target = "localhost"
      if(angel.cmdData.remote) {
        target = angel.cmdData.remote
        commandValue = angel.cmdData.remote+" '"+commandValue+"'"
      }
      if(!angel.cmdData.silent) {
        console.info("[", target, "| EXEC ]", commandValue)
      }
      
      var child = exec(commandValue)
      var outputBuffer = [];
      if(!angel.cmdData.silent) {
        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stderr)
      }
      if(next) {
        child.stdout.on("data", function(chunk){
          outputBuffer.push(chunk.toString())
        })
      }
      child.on("close", function(code){
        if(code != 0) {
          if(!angel.cmdData.silent)
            console.error("[", target, "| FAILED ]", angel.cmdData.cmd)
          return next && next(new Error(code+" : "+commandValue))
        } else {
          if(!angel.cmdData.silent)
            console.info("[", target, "| SUCCESS ]", angel.cmdData.cmd)
          next && next(null, outputBuffer)
        }
      })
    })
  })
  .example([
    "$ angel cell {cmd} ./file.json",
  ].join("\n"))
  .description("Executes command defined in file.json")
}