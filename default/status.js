module.exports = function(c, next){
  c.commands = c.commands.concat([
    "cd "+c.cell.cwd,
    c.cell.nvmSource || ". ~/.nvm/nvm.sh",
    c.cell.nodeVersion || "nvm use "+process.version,
    "node node_modules/organic-angel/bin/angel.js Tissue -action status -target "+c.cell.target+
      (c.cell.native?"-native true":"")
  ])
  next && next()
}
