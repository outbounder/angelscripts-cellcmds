var fs = require('fs')
var _ = require("underscore")

module.exports = function(angel, next) {
  require("angelabilities/src/shell")(angel)
  require("angelabilities/src/reactions")(angel)
  require("angelabilities/src/format")(angel)

  angel.loadCellData = function(angel, next){
    fs.readFile(angel.cmdData.mode, function(err, data){
      if(err) return next(err)
      try {
        data = JSON.parse(data.toString())
        _.extend(angel.cmdData, data)
      } catch(err){
        return next(err)
      }
      next(null, data)
    })
  }

  angel.loadScripts(__dirname, "src", next)
}