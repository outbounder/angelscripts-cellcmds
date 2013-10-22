module.exports = function(c, next){
  c.commands = c.commands.concat([
    "rm -rf "+c.cell.cwd
  ])
  next && next()
}
