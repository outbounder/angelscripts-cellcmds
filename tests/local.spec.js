describe("cellcmds", function(){
  jasmine.getEnv().defaultTimeoutInterval = 25000;

  var Angel = require("organic-angel")
  var instance

  beforeEach(function(next){
    instance = new Angel()
    instance.scripts.loadScript(__dirname+'/../index.js', next)
  })

  describe("local cells", function(){
    it("installs", function(next){
      instance.do("cell install ./tests/data/cell_local.json", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })

    it("starts", function(next){
      instance.do("cell start ./tests/data/cell_local.json", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })

    it("status as running", function(next){
      instance.do("cell status ./tests/data/cell_local.json", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })

    it("restarts", function(next){
      instance.do("cell restart ./tests/data/cell_local.json", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })

    it("upgrades", function(next){
      instance.do("cell upgrade ./tests/data/cell_local.json", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })

    it("stops", function(next){
      instance.do("cell stop ./tests/data/cell_local.json", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })

    it("builds", function(next){
      instance.do("cell build ./tests/data/cell_local.json", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })

    it("uninstalls", function(next){
      instance.do("cell uninstall ./tests/data/cell_local.json", function(err, result){
        expect(err).toBeFalsy()
        next()
      })
    })
  })
})
