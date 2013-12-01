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
        angel.do("cell restart "+angel.cmdData.mode)
      ], next)
    }
  ]))
  .example("$ angel cell upgrade ./file.json")
  .description("upgrades via git clone to local or remote location and restarts on success")
}