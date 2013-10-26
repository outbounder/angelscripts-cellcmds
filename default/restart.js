module.exports = function(plasma, config){
  plasma.on("restart", function(c, next){
    c.commands = c.commands.concat([
      "cd "+c.cell.cwd,
      c.cell.useNode || "",
      c.cell.restartCmd
    ])
    next && next(c)
  })
}
