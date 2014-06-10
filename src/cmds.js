module.exports = function(angel){
  angel.on("cell :cmd :mode", angel.series([
    angel.loadCellData,
    function(angel, next){
      var commandValue = angel.cmdData[angel.cmdData.cmd]
      if(!commandValue) return next()
      var commands = angel.format("cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; "+commandValue)
      if(angel.cmdData.remote)
        angel.ssh("remote", commands, next)
      else
        angel.exec(commands, next)
    }
  ]))
  .example([
    "$ angel cell {cmd} ./file.json",
  ].join("\n"))
  .description("Executes command defined in file.json")
}