class Zombie {
  constructor(images, x, y, steps){
    this.images = images
    this.step = this.getRandomInt(0, images.length)
    this.x = this.getRandomInt(x[0], x[1])
    this.y = this.getRandomInt(y[0], y[1])
    this.steps = steps
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
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
  const zombies = []
  const zombiesNum = 120

  const populateImageArray = (src, num) => Array.from({length: num}, (_, i) => i + 1)
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

  // preloadImages(populateImageArray('../images/zombie_01', 8)).then(function(imgArr) {
  //   images = imgArr
  //   for(let i = 0; i < zombiesNum; i++){
  //     zombies.push(new Zombie(images, [-1000, -100], [-100, 100], [2, 2, 3, 7, 6, 1, 1, 1]))
  //   }
  //   zombies.sort((a, b) => a.y - b.y)
  //   const shuffle = setInterval(function(){
  //     context.fillStyle = 'white';
  //     context.fillRect(0,0,canvas.width,canvas.height);
  //     zombies.forEach((zombie, index) => {
  //       const frame = zombie.getFrame()
  //       context.drawImage(frame.image, frame.x, frame.y)
  //       if(frame.x > 600){
  //         zombies.splice(index, 1)
  //       }
  //
  //     })
  //     if(zombies.length === 0){
  //       clearInterval(shuffle)
  //     }
  //   }, 100)
  // }, error => {
  //   console.warn('Error:', error)
  // })

  preloadImages(populateImageArray('../images/zombie_02', 4)).then(function(imgArr) {
    images = imgArr
    for(let i = 4; i < zombiesNum; i++){
      zombies.push(new Zombie(images, [10, 10], [0, 0], [1, 1, 1, 1]))
    }
    zombies.sort((a, b) => a.y - b.y)
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