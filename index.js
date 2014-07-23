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
        console.info("exec", commandValue)
      }
      
      var child = exec(commandValue)
      var outputBuffer = [];
      if(!angel.cmdData.silent) {
        child.stdout.on("data", function(chunk){
          process.stdout.write(target+" "+chunk.toString())
        })
        child.stderr.on("data", function(chunk){
          process.stderr.write(target+" "+chunk.toString())
        })
      }
      if(next) {
        child.stdout.on("data", function(chunk){
          outputBuffer.push(chunk.toString())
        })
      }
      child.on("close", function(code){
        if(code != 0) {
          console.error("failed", commandValue)
          return next && next(new Error(code+" : "+commandValue))
        } else
          next && next(null, outputBuffer)
      })
    })
  })
  .example([
    "$ angel cell {cmd} ./file.json",
  ].join("\n"))
  .description("Executes command defined in file.json")
}