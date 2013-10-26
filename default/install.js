module.exports = function(c, next){
  c.commands = c.commands.concat([
    "mkdir -p "+c.cell.cwd,
    "git clone "+c.cell.source+" "+c.cell.cwd,
    "cd "+c.cell.cwd,
    "git checkout "+c.cell.branch,
    c.cell.useNode || "",
    "npm install --production"
  ])
  next && next(c)
}
