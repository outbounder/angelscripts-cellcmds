module.exports = function(angel){
  angel.on("cell upgrade :mode", angel.series([
    angel.loadCellData,
    function(angel, next){
      var commands = [
        "cd {cwd}",
        "git fetch",
        "git checkout {branch}",
        "git pull {origin} {branch}",
        "cd {cwd}; . {nvmPath}; nvm use {nodeVersion}; npm install --production"
      ]
      angel.series([
        angel.cmdData.remote? angel.ssh("remote", commands) : angel.exec(commands),
        function(angel, next){
          if(angel.cmdData.build)
            angel.series([
              angel.do("cell build "+angel.cmdData.mode),
              angel.do("cell restart "+angel.cmdData.mode)    
            ], next)
          else
            angel.do("cell restart "+angel.cmdData.mode, next)
        }
      ], next)
    }
  ]))
  .example("$ angel cell upgrade ./file.json")
  .description("upgrades via git clone to local or remote location and restarts on success")
}