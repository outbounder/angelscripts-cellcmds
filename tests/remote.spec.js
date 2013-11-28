describe("cellcmds", function(){
  jasmine.getEnv().defaultTimeoutInterval = 25000;

  var Angel = require("organic-angel")
  var instance

  beforeEach(function(next){
    instance = new Angel({
      scripts: [__dirname+"/../index"]
    })
    instance.plasma.on("ready", function(){next()})
    process.chdir(__dirname+"/data")
  })

  describe("remote cells", function(){
    it("installs", function(next){
      instance.do("cell ./cell_remote.json install", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })

    it("starts", function(next){
      instance.do("cell ./cell_remote.json start", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })

    it("status as running", function(next){
      instance.do("cell ./cell_remote.json status", function(err, result){
        expect(err).toBeFalsy()
        expect(result).toContain("running")
        next()
      })
    })

    it("restarts", function(next){
      instance.do("cell ./cell_remote.json restart", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })

    it("stops", function(next){
      instance.do("cell ./cell_remote.json stop", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })

    it("uninstalls", function(next){
      instance.do("cell ./cell_remote.json uninstall", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })
  })
})