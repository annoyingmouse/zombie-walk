export const chunkArray = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size))
export const populateImageArray = (src, num) => Array.from({length: num}, (_, i) => i + 1).map(n => `${src}/frame_${(n).toString().padStart(2, '0')}.png`)
export const preloadImages = srcs => {
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
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min