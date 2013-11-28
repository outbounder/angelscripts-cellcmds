module.exports = function(angel, next) {
  angel.loadScripts(__dirname, "src", next)
}