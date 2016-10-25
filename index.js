var fs = require('fs')
var exec = require("child_process").exec
var loadDna = require('organic-dna-loader')
var _ = require('lodash')

module.exports = function(angel) {
  angel.on("cell :cmd :cellDataPath", function(angel, next) {
    // load cell data
    loadDna(function(err, dna){
      if(err) return next(err)
      var cellDataBranchPath
      if (angel.cmdData.cellDataPath.indexOf('.json') !== -1) {
        cellDataBranchPath = angel.cmdData.cellDataPath.replace('./dna/', '').replace('.json', '').replace('/', '.')
      } else {
        cellDataBranchPath = angel.cmdData.cellDataPath
      }
      try {
        data = _.get(dna, cellDataBranchPath)
      } catch(err){
        console.error(err)
        return next && next(err)
      }

      if (!data) return next(new Error('cellData not found at ' + cellDataBranchPath))

      var commandValue = data[angel.cmdData.cmd]
      if(!commandValue) {
        console.error(angel.cmdData.cmd, "not found in", angel.cmdData.cellDataPath, "as command")
        return next(new Error(angel.cmdData.cmd+" not found"))
      }

      if (Array.isArray(commandValue)) {
        commandValue = commandValue.join(' && ')
      }

      var target = "localhost"
      if(data.remote) {
        target = data.remote
        commandValue = data.remote+" '"+commandValue+"'"
      }
      if(!data.silent) {
        console.info("EXEC", target, "->", commandValue, '\n')
      }

      var child = exec(commandValue)
      if(!data.silent) {
        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stderr)
      }
      child.on("exit", function(code){
        process.stdin.unpipe(child.stdin)
        process.stdin.end()
        if(code != 0) {
          console.error("FAIL", target)
          return next && next(new Error(code+" : "+commandValue))
        } else {
          console.info("SUCCESS", target)
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
