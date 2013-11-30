module.exports = function(angel){
  angel.on("cell install :mode", angel.series([
    angel.loadCellData,
    function(angel, next){
      var commands = [
        "mkdir -p {cwd}",
        "cd {cwd}",
        "git clone {source} ./",
        "git checkout {branch}",
        "cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; npm install --production"
      ]
      if(angel.cmdData.remote)
        angel.ssh("remote", commands, next)
      else
        angel.exec(commands, next)
    }
  ]))

  angel.on("cell uninstall :mode", angel.series([
    angel.loadCellData,
    function(angel, next){
      var commands = "rm -rf {cwd}"
      if(angel.cmdData.remote)
        angel.ssh("remote", commands, next)
      else
        angel.exec(commands, next)
    }
  ]))
}