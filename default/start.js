module.exports = function(c, next){
  c.commands = c.commands.concat([
    "cd "+c.cell.cwd,
    c.cell.useNode || "",
    c.cell.startCmd
  ])
  next && next(c)
}
