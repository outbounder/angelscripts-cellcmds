module.exports = function(angel){
  angel.on("cell :cmd :mode", angel.series([
    angel.loadCellData,
    function(angel, next){
      if(!angel.cmdData[angel.cmdData.cmd]) return next()
      var commands = "cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; {"+angel.cmdData.cmd+"}"
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