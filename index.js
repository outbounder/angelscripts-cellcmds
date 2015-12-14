var fs = require('fs')
var exec = require("child_process").exec
var format = require('string-format')

module.exports = function(angel) {
  angel.on("cell :cmd :cellDataPath", function(angel, next) {
    // load cell data
    fs.readFile(angel.cmdData.cellDataPath, function(err, data){
      if(err) return next(err)
      try {
        data = JSON.parse(data.toString())
      } catch(err){
        console.error(err)
        return next && next(err)
      }

      var commandValue = data[angel.cmdData.cmd]
      if(!commandValue) {
        console.error(angel.cmdData.cmd, "not found in", angel.cmdData.cellDataPath, "as command")
        return next(new Error(angel.cmdData.cmd+" not found"))
      }
      while(commandValue.indexOf("{") !== -1) {
        commandValue = format(commandValue, data)
      }
      var target = "localhost"
      if(data.remote) {
        target = data.remote
        commandValue = data.remote+" '"+commandValue+"'"
      }
      if(!data.silent) {
        console.info("exec", target, "->", commandValue, '\n')
      }

      var child = exec(commandValue)
      var outputBuffer = [];
      if(!data.silent) {
        child.stdout.on("data", function(chunk){
          process.stdout.write(target+" "+chunk.toString())
        })
        child.stderr.on("data", function(chunk){
          process.stderr.write(target+" "+chunk.toString())
        })
      }
      child.on("exit", function(code){
        process.stdin.unpipe(child.stdin)
        process.stdin.end()
        if(code != 0) {
          console.error("failed", target)
          return next && next(new Error(code+" : "+commandValue))
        } else {
          console.info("success", target)
          next && next()
        }
      })
      process.stdin.resume()
      process.stdin.pipe(child.stdin)
    })
  })
  .example([
    "$ angel cell {cmd} ./file.json",
  ].join("\n"))
  .description("Executes command defined in file.json")
}
