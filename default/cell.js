var DNA = require("organic").DNA;

module.exports = function(c, next){
  var dna = new DNA();
  dna.loadDir(process.cwd()+"/dna", function(){
    var name = c.value.shift()
    c.cell = dna.cell
    if(c.cell[name]) {
      c.cell = c.cell[name]
      if(c.cell.remote)
        c.commandsWrapper = "ssh "+c.cell.remote
        next && next()
    } else
      next && next(new Error(name+" cell not found in dna/cell"))
  });
}
