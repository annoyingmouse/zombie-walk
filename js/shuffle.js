class Zombie {
  constructor(images, step, x, y){
    this.images = images
    this.step = step
    this.x = x
    this.y = y
    this.steps = [2, 2, 3, 7, 6, 1, 1, 1]
  }
  getFrame() {
    const frame = {
      image: this.images[this.step % this.images.length],
      x: this.x,
      y: this.y
    }
    this.step += 1
    this.x += this.steps[(this.step % this.images.length)]
    return frame
  }
}

(() => {
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
  const zombies = []
  const zombiesNum = 120
  const xs = []
  const ys = []
  while(xs.length < zombiesNum){
    const x = getRandomInt(-1000, -100);
    if(xs.indexOf(x) === -1) xs.push(x);
    ys.push(getRandomInt(-15, 15));
  }
  ys.sort()


  const populateImageArray = src => Array.from({length: 8}, (_, i) => i + 1)
      .map(n => `${src}/frame_${(n).toString().padStart(2, '0')}.png`)
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext('2d');
  let images

  const preloadImages = srcs => {
    const loadImage = src => new Promise(function(resolve, reject) {
      const img = new Image();
      img.onload = () => resolve(img)
      img.onerror = img.onabort = () => reject(src)
      img.src = src
    })
    const promises = [];
    for (let i = 0; i < srcs.length; i++) {
      promises.push(loadImage(srcs[i]));
    }
    return Promise.all(promises);
  }

  preloadImages(populateImageArray('../images/zombie_01')).then(function(imgArr) {
    images = imgArr
    xs.forEach((x, i) => {
      zombies.push(new Zombie(images, getRandomInt(0, 7), x, ys[i]))
    })
    const shuffle = setInterval(function(){
      context.fillStyle = 'white';
      context.fillRect(0,0,canvas.width,canvas.height);
      zombies.forEach((zombie, index) => {
        const frame = zombie.getFrame()
        context.drawImage(frame.image, frame.x, frame.y)
        if(frame.x > 600){
          zombies.splice(index, 1)
        }

      })
      if(zombies.length === 0){
        clearInterval(shuffle)
      }
    }, 100)
  }, error => {
    console.warn('Error:', error)
  })

})()