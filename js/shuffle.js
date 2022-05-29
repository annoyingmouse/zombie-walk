import {PoissonDiskSampler} from './PoissonDisk.js'
import {Zombie} from './Zombie.js'

(() => {
  const zombies = []
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext('2d');
  const sampler = new PoissonDiskSampler(canvas.width, canvas.height, 30, 30 );
  const zombiesNum = sampler.sampleUntilSolution();
  const timeout = 200

  const zombieMetaData = []
  let list = []
  const zombieManifests = [
    "../images/zombie_02/manifest.json",
    "../images/zombie_03/manifest.json",
    "../images/zombie_04/manifest.json",
    "../images/zombie_05/manifest.json",
    "../images/zombie_06/manifest.json"
  ]

  zombieManifests.forEach(url => list.push(
        fetch(url)
            .then(response => response.json())
            .then(json => zombieMetaData.push((json))))
  )
  Promise
      .all(list)
      .then(() => {
        retrieveImages()
        list = []
      });

  function processAsync(src, root, number) {
    return new Promise(function(resolve, reject) {
      const img = new Image()
      img.dataset.number = number
      img.dataset.root = root
      img.onload = () => resolve(img)
      img.onerror = img.onabort = () => reject(src)
      img.src = src
    });
  }

  const retrieveImages = () => {
    zombieMetaData.forEach(zombie => {
      zombie.srcs = Array.from({length: zombie.imageNumber}, (_, i) => i + 1).map(n => `${zombie.location}frame_${(n).toString().padStart(2, '0')}.png`)
      zombie.root = zombie.location.split('/')[2]
      zombie.imgs = []
    })
    Promise.all(zombieMetaData.map(function(entity, index){
      return Promise.all(entity.srcs.map(function(item){
        const bits = item.split('/')
        const root = bits[2]
        const frameNumber = parseInt(bits.pop().split('.')[0].split('_')[1], 10)
        return processAsync(item, root, frameNumber);
      }))
    })).then(function(data) {
      data.forEach(imgArr => {
        imgArr.forEach(img => {
          const target = zombieMetaData.find(obj => obj.root === img.dataset.root)
          target.imgs[Number(img.dataset.number) -1] = img
        })
      })
      for(const prop in zombiesNum){
        if (zombiesNum.hasOwnProperty(prop)) {
          const position = zombiesNum[prop]
          const zombie = zombieMetaData[Math.floor(Math.random() * zombieMetaData.length)]
          zombies.push(new Zombie(zombie.imgs, position.x - (canvas.width + 50), position.y - 30, zombie.steps, zombie.lurch))
        }
      }
      zombies.sort((a, b) => a.y - b.y)
      const shuffle = setInterval(function(){
        context.fillStyle = 'white';
        context.fillRect(0,0,canvas.width,canvas.height);
        zombies.forEach((zombie, index) => {
          zombie.draw(context)
          if(zombie.x > (canvas.width + 20)){
            zombies.splice(index, 1)
          }
        })
        if(zombies.length === 0){
          clearInterval(shuffle)
          context.fillStyle = 'white';
          context.fillRect(0,0,canvas.width,canvas.height);
          console.info('All done!')
        }
      }, timeout)
    }).catch(() => {})
  }
})()