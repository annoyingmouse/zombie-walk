



(() => {

  const populateImageArray = src => Array.from({length: 8}, (_, i) => i + 1).map(n => `${src}/frame_${(n).toString().padStart(2, '0')}.png`)
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
    setInterval(shuffle, 150);
  }, error => {
    console.log('Error:', error)
  })

  let index = 0
  let x = -27
  const steps = [2,2,3,7,6,1,1,1]

  function shuffle() {
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width,canvas.height);
    context.drawImage(images[index % images.length], x, 0)
    index += 1
    x += steps[(index % images.length)]
    if(x === 580){
      clearInterval(shuffle)
    }
  }


})()