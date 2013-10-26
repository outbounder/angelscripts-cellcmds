var DNA = require("organic").DNA;
var path = require("path")

var angel_tissue = function(cell, action) {
  return "node node_modules/organic-angel/bin/angel.js Tissue"
    +" -action "+action
    +" -target "+cell.main
    +(cell.native?" -native true":"")
}

module.exports = function(c, next){
  var dna = new DNA();
  var cwd = c.cwd || path.join(process.cwd(),"dna")
  dna.loadDir(cwd, function(){
    var name = c.value.shift()
    c.cell = dna.cell
    if(c.cell[name]) {
      c.cell = c.cell[name]
      if(c.cell.commandsWrapper)
        c.commandsWrapper = c.cell.commandsWrapper
      c.cell.restartCmd = c.cell.restartCmd || angel_tissue(c.cell, "restart")
      c.cell.startCmd = c.cell.startCmd || angel_tissue(c.cell, "start")
      c.cell.stopCmd = c.cell.stopCmd || angel_tissue(c.cell, "stop")
      c.cell.statusCmd = c.cell.stopCmd || angel_tissue(c.cell, "status")
      next && next(c)
    } else
      next && next(new Error(name+" cell not found in dna/cell"))
  });
}
