module.exports = function(c, next){
  c.commands = c.commands.concat([
    "cd "+c.cell.cwd,
    c.cell.useNode || "",
    c.cell.statusCmd
  ])
  next && next(c)
}
