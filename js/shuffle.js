import {PoissonDiskSampler} from './PoissonDisk.js'
import {Zombie} from './Zombie.js'
import {chunkArray, populateImageArray, preloadImages, getRandomInt} from './helpers.js'

(() => {
  const zombies = []
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext('2d');
  const sampler = new PoissonDiskSampler(canvas.width, canvas.height, 20, 30 );
  const zombiesNum = sampler.sampleUntilSolution();
  const zombieStepsAndLurch = [
    {
      imageSrc: '../images/zombie_02',
      imageNumber: 4,
      steps: [5, 3, 6, 5],
      lurch: [0, -1, 1, 0]
    },
    {
      imageSrc: '../images/zombie_03',
      imageNumber: 4,
      steps: [5, 3, 6, 5],
      lurch: [0, -1, 1, 0]
    },
    {
      imageSrc: '../images/zombie_04',
      imageNumber: 4,
      steps: [2, 6, 8, 3],
      lurch: [0, -1, 1, 0]
    },
    {
      imageSrc: '../images/zombie_05',
      imageNumber: 4,
      steps: [2, 6, 8, 3],
      lurch: [0, -1, 1, 0]
    },
  ]

  const sources = [].concat(
      populateImageArray('../images/zombie_02', 4),
      populateImageArray('../images/zombie_03', 4),
      populateImageArray('../images/zombie_04', 4),
      populateImageArray('../images/zombie_05', 4)
  )

  preloadImages(sources).then(function(images) {
    const zombieObjs = chunkArray(images, 4).map((imgs, i) => ({
        steps: zombieStepsAndLurch[i].steps,
        lurch: zombieStepsAndLurch[i].lurch,
        images: imgs
      })
    )
    for(const prop in zombiesNum){
      if (zombiesNum.hasOwnProperty(prop)) {
        const position = zombiesNum[prop]
        const zom = zombieObjs[getRandomInt(0, zombieObjs.length)]
        zombies.push(new Zombie(zom.images, position.x - (canvas.width + 50), position.y - 30, zom.steps, zom.lurch))
      }
    }
    zombies.sort((a, b) => a.y - b.y)
    const shuffle = setInterval(function(){
      context.fillStyle = 'white';
      context.fillRect(0,0,canvas.width,canvas.height);
      zombies.forEach((zombie, index) => {
        zombie.draw(context)
        if(zombie.x > canvas.width){
          zombies.splice(index, 1)
        }
      })
      if(zombies.length === 0){
        clearInterval(shuffle)
        context.fillStyle = 'white';
        context.fillRect(0,0,canvas.width,canvas.height);
        console.info('All done!')
      }
    }, 100)
  }, error => {
    console.warn('Error:', error)
  })
})()