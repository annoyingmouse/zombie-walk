import {PoissonDiskSampler} from './PoissonDisk.js'
import {Zombie} from './Zombie.js'

(async () => {
  const zombies = []

  const canvas = document.getElementById("canvas");
  const context = canvas.getContext('2d');

  const sampler = new PoissonDiskSampler(canvas.width, canvas.height, 30, 30 );
  const zombiesNum = sampler.sampleUntilSolution();

  const timeout = 200

  const zombieManifests = [
    "../images/zombie_02/manifest.json",
    "../images/zombie_03/manifest.json",
    "../images/zombie_04/manifest.json",
    "../images/zombie_05/manifest.json",
    "../images/zombie_06/manifest.json"
  ]

  const shuffle = setInterval(function(){
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width,canvas.height);
    zombies.forEach((zombie, index) => {
      zombie.draw(context)
      if(zombie.x > (canvas.width + 50)){
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
  
  const processMyArray = async (manifestArray) => {
    const result = [];
    for(const manifest of manifestArray){
      const json = await fetch(manifest)
        .then(response => response.json())
        .then(async function(json) {
          json.images = await processImages(Array.from({length: json.imageNumber}, (_, i) => i + 1).map(n => `${json.location}frame_${(n).toString().padStart(2, '0')}.png`))
          delete json.imageNumber
          delete json.location
          return json
        })
      result.push(json);
    }
    return result;
  }
  
  const processImages = async (imageArray) => {
    const result = [];
    for(let i = 0; i < imageArray.length; i++){
      const img = new Image()
      img.onload = () => result[i] = img
      img.src = imageArray[i]
    }
    return result;
  }
  const zombieObjectArray = await processMyArray(zombieManifests)
  console.log(zombieObjectArray)

  for(const prop in zombiesNum){
    if (zombiesNum.hasOwnProperty(prop)) {
      const position = zombiesNum[prop]
      const zombie = zombieObjectArray[Math.floor(Math.random() * zombieObjectArray.length)]
      zombies.push(new Zombie(zombie.images, position.x - (canvas.width + 50), position.y - 30, zombie.steps, zombie.lurch, Math.floor(Math.random() * zombie.images.length)))
    }
  }

  zombies.sort((a, b) => a.y - b.y)
})()