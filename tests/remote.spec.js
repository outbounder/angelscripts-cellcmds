describe("cellcmds", function(){
  jasmine.getEnv().defaultTimeoutInterval = 25000;

  var Angel = require("organic-angel")
  var instance

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

  describe("remote cells", function(){
    it("command with path to json", function(next){
      instance.do("cell echo ./dna/cell_remote.json", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })
    it("command with path in dna", function(next){
      instance.do("cell echo cell_remote", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })
  })
})
