var path = require("path")

describe("cell", function(){
  var cell = require("../default/cell")
  it("loads dna and reacts with incoming chemical", function(next){
    cell({
      value: ["test"],
      cwd: path.join(__dirname, "data", "dna")
    }, function(c){
      expect(c.cell).toBeDefined()
      expect(c.cell.commandsWrapper).toBe("ssh test")
      expect(c.commandsWrapper).toBe("ssh test")
      next()
    })
  })

  it("returns Error chemical on not found cell", function(next){
    cell({
      value: ["notfound"],
      cwd: path.join(__dirname, "data", "dna")
    }, function(c){
      expect(c instanceof Error).toBe(true)
      next()
    })
  })
})