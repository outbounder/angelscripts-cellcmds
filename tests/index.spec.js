describe("index", function(){
  var Plasma = require("organic").Plasma
  var Index = require("../index")
  it("loads all default commands attached to plasma", function(){
    var plasma = new Plasma()
    Index(plasma)
    var organelles = ["cell", "install", "remove", "restart", "start", "status", "stop", "upgrade"]
    organelles.forEach(function(name){
      expect(plasma._listeners.has(name)).toBe(true)  
    })
  })

  it("loads only not excluded commands", function(){
    var plasma = new Plasma()
    Index(plasma, {
      exclude: ["cell", "install", "remove", "restart", "start", "status", "stop", "upgrade"]
    })
    var organelles = ["cell", "install", "remove", "restart", "start", "status", "stop", "upgrade"]
    organelles.forEach(function(name){
      expect(plasma._listeners.has(name)).toBe(false)
    })
  })
})