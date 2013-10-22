module.exports = function(c, next){
  c.commands = c.commands.concat([
    "cd "+c.cell.cwd,
    c.cell.nvmSource || ". ~/.nvm/nvm.sh",
    c.cell.nodeVersion || "nvm use "+process.version,
    "git checkout "+c.cell.branch,
    "git pull origin "+c.cell.branch,
    "npm install --production",
    "node node_modules/organic-angel/bin/angel.js Tissue -action restart -target "+c.cell.target+
      (c.cell.native?"-native true":"")
  ])
  next && next()
}
