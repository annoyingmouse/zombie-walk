export class Zombie {
  constructor(images, x, y, steps, lurch, step) {
    this.images = images
    this.step = step == null ? this.getRandomInt(0, images.length): step
    this.x = Array.isArray(x) ? this.getRandomInt(x[0], x[1]) : x
    this.y = Array.isArray(y) ? this.getRandomInt(y[0], y[1]) : y
    this.lurch = lurch
    this.steps = steps
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }
  getFrame() {
    const frame = {
      image: this.images[this.step % this.images.length],
      x: this.x,
      y: this.y += this.lurch[this.step % this.images.length]
    }
    this.x += this.steps[this.step % this.images.length]
    this.step += 1
    return frame
  }
  draw(context) {
    const frame = this.getFrame()
    context.drawImage(frame.image, frame.x, frame.y)
  }
}