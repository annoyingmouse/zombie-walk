(() => {

  // const checkIfImageExists = (url, callback) => {
  //   const img = new Image();
  //   img.src = url;
  //   if (img.complete) {
  //     callback(true);
  //   } else {
  //     img.onload = () => {
  //       callback(true);
  //     };
  //
  //     img.onerror = () => {
  //       callback(false);
  //     };
  //   }
  // }
  //
  const populateImageArray = (src) => {
    let index = 1
    let imageSrc = ''
    let success = true
    while(success){
      imageSrc = `${src}/frame_${(index).toString().padStart(2, '0')}.png`
      console.log(index, imageSrc)
      if(index > 10){
        success = false
      }else {
        index += 1
      }
    }


  //   const arr = []
  //   let index = 1
  //   let success = true
  //   let imageSrc = ''
  //   while(success){
  //     imageSrc = `${src}/frame_${(index).toString().padStart(2, '0')}.png`
  //     debugger
  //     checkIfImageExists(imageSrc, exists => {
  //       success = false
  //       if (exists) {
  //         let image = new Image();
  //         image.src = `${src}/frame_${(index).toString().padStart(2, '0')}.png`
  //         arr.push(image)
  //         index += 1
  //       } else {
  //         success = false
  //       }
  //     });
  //   }
  //   return arr
  }


  // function addImageProcess(src) {
  //   return new Promise((resolve, reject) => {
  //     let img = new Image()
  //     img.onload = () => resolve(img.height)
  //     img.onerror = reject
  //     img.src = src
  //   })
  // }
  //
  // tmp.addImageProcess(imageUrl).then(height => {
  //   console.log(height)
  // })


  const canvas = document.getElementById("canvas");
  const context = canvas.getContext('2d');
  const images = populateImageArray('../images/zombie_01')
  //console.log(images)


  // const image = new Image();
  // image.onload = function(){
  //   context.drawImage(image,0,0);
  // };
  // image.src = "../images/zombie_01/frame_01.png";
})()