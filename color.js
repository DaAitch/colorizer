const sharp = require('sharp');
const colors = require('./colors');

const set = new Set();

const rgbHash = (r,g,b) => r + 256*(g + 256*b);

(async () => {

  const imagePath = 'image.png';
  const channelsParam = '0,10,20,35;10,20,30,80';

  console.log(`Read image ${imagePath}`);
  const rgbBuffer = await sharp(imagePath).raw().toBuffer();
  if (rgbBuffer.length % 3 !== 0) {
    throw new Error('expect rgb buffer');
  }

  const channels = channelsParam.split(';').map(cmykString => cmykString.split(','));
  
  for (let i = 0; i < rgbBuffer.length; i+=3) {
    const r = buffer[i];
    const g = buffer[i+1];
    const b = buffer[i+2];

    const hash = rgbHash(r,g,b);
    set.add(hash);
  }

  // for (const value of set.values()) {
  //   console.log({value});
  // }
})();


// const c = color.cmyk(255, 0, 0, 0).mix(color.cmyk(0, 255, 0, 0));
// console.log({c, r: c.red(), g: c.green(), b: c.blue()});

