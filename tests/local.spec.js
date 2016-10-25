describe("cellcmds", function(){
  jasmine.getEnv().defaultTimeoutInterval = 25000;

  var Angel = require("organic-angel")
  var instance
  var __cwd

  beforeEach(function(next){
    instance = new Angel()
    instance.scripts.loadScript(__dirname+'/../index.js', next)
  })
  beforeEach(function (next) {
    __cwd = process.cwd()
    process.chdir(__dirname)
    next()
  })
  afterEach(function (next) {
    process.chdir(__cwd)
    next()
  })

  describe("local cells", function(){
    it("command with path to json", function(next){
      instance.do("cell echo ./dna/cell_local.json", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })
    it("command with path in dna", function(next){
      instance.do("cell echo cell_local", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })
    it("command array", function(next){
      instance.do("cell echo-many ./dna/cell_local.json", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })
  })
})
