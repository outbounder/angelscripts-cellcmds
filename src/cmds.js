module.exports = function(angel){
  angel.on("cell :cmd(start|stop|restart|status) :mode", angel.series([
    angel.loadCellData,
    function(angel, next){
      var commands = "cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; {"+angel.cmdData.cmd+"}"
      if(angel.cmdData.remote)
        angel.ssh("remote", commands, next)
      else
        angel.exec(commands, next)
    }
  ]))
}