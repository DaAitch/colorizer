const stream = require('stream');
const sharp = require('sharp');

const rgb2cmyk = ([r,g,b]) => {
  const k = Math.min(1-r, 1-g, 1-b);
  const w = 1-k;
  const c = 1 - r/w;
  const m = 1 - g/w;
  const y = 1 - b/w;
  return [c,m,y,k];
};

const cmyk2rgb = ([c,m,y,k]) => {
  const w = 1-k;
  const r = 1 - Math.min(1, c*w + k);
  const g = 1 - Math.min(1, m*w + k);
  const b = 1 - Math.min(1, y*w + k);
  return [r,g,b];
};

const rgbDist = ([r1,g1,b1], [r2,g2,b2]) => {
  return (r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2;
};

const cmykDist = (cmyk1, cmyk2) => {
  return rgbDist(cmyk2rgb(cmyk1), cmyk2rgb(cmyk2));
};

class RawToRgbStream extends stream.Duplex {
  constructor() {
    super({writableObjectMode: true});

    this._buffers = [];
  }

  _read(size) {

  }

  _write(chunk, encoding, callback) {
    this._buffers.push(chunk);
    callback();
  }
}

module.exports = {
  rgb2cmyk,
  rgbDist,
  cmyk2rgb,
  cmykDist,
  readImage
};
