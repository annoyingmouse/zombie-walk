preloadImages(populateImageArray('../images/zombie_01', 8)).then(function(imgArr) {
  images = imgArr
  for(let i = 0; i < zombiesNum; i++){
    zombies.push(new Zombie(images, [-1000, -100], [-100, 100], [2, 2, 3, 7, 6, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0]))
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