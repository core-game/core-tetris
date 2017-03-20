export default function (Tetris) {
  const proto = Tetris.prototype

  proto.reset = function () {
    this.matrix.reset()

    this.addBlock()
    this.resume()
  }

  proto.pause = function () {
    this._paused = true
    if (this._timeout) {
      clearTimeout(this._timeout)
      this._timeout = null
    }
  }

  proto.resume = function () {
    this._paused = false
    if (!this._timeout) {
      this._process()
    }
  }

  proto.start = proto.reset

  proto._process = function () {
    const instance = this
    const { auto, speed } = this._options
    const loop = () => {
      if (auto && speed && !instance._paused) {
        instance._timeout = setTimeout(() => {
          instance.block.down()
        }, speed)
      }
    }

    loop()
  }
}
