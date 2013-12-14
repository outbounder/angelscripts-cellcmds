var _ = require("underscore")

module.exports = function(angel){
  angel.on("cell :cmd :mode", function(angel, next){
    if(_.contains(["install", "uninstall", "upgrade"], angel.cmdData.cmd))
      return next()
    angel.series([
      angel.loadCellData,
      function(angel, next){
        var commands = "cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; {"+angel.cmdData.cmd+"}"
        if(angel.cmdData.remote)
          angel.ssh("remote", commands, next)
        else
          angel.exec(commands, next)
      }
    ])(angel, next)
  })
  .example([
    "$ angel cell {cmd} ./file.json",
  ].join("\n"))
  .description("Executes command defined in file.json")
}