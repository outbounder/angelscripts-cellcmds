module.exports = function(c, next){
  c.commands = c.commands.concat([
    "cd "+c.cell.cwd,
    "git checkout "+c.cell.branch,
    "git pull origin "+c.cell.branch,
    c.cell.useNode || "",
    "npm install --production",
    c.cell.restartCmd
  ])
  next && next(c)
}
