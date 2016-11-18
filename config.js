if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  dateSpan: 14,
  xScale: 30,
  xSpan: 7,
  ySpan: 5,
  red: 225,
  green: 128,
  upArrow: [110, 113, 114, 115],
  downArrow: [117, 113, 114, 115],
  keymap: [
    [0x1B, 1],
    [0x70, 2],
    [0x71, 3],
    [0x72, 4],
    [0x73, 5],
    [0x74, 6],
    [0x75, 7],
    [0x76, 8],
    [0x77, 9],
    [0x78, 10],
    [0x79, 11],
    [0x7A, 12],
    [0x7B, 73],
    [0xC0, 13],
    [0x31, 14],
    [0x32, 15],
    [0x33, 16],
    [0x33, 17],
    [0x34, 18],
    [0x35, 19],
    [0x36, 20],
    [0x37, 21],
    [0x38, 22],
    [0x39, 23],
    [0xBD, 24],
    [0xBB, 85],
    [0x08, 87],
    [0x09, 25],
    [0x51, 26],
    [0x57, 27],
    [0x45, 28],
    [0x52, 29],
    [0x54, 30],
    [0x59, 31],
    [0x55, 32],
    [0x49, 33],
    [0x4F, 34],
    [0x50, 35],
    [0xDB, 36],
    [0xDD, 80],
    [0xDC, 81],
    [0x14, 37],
    [0x41, 38],
    [0x53, 39],
    [0x44, 40],
    [0x46, 41],
    [0x47, 42],
    [0x48, 43],
    [0x4A, 44],
    [0x4B, 45],
    [0x4C, 46],
    [0xBA, 47],
    [0xDE, 48],
    [0x0D, 83],
    [0xA0, 49],
    [0x5A, 51],
    [0x58, 52],
    [0x43, 53],
    [0x56, 54],
    [0x42, 55],
    [0x4E, 56],
    [0x4D, 57],
    [0xBC, 58],
    [0xBE, 59],
    [0xBF, 60],
    [0xA1, 91],
    [0xA2, 61],
    [0x5B, 62],
    [0xA4, 63],
    [0x20, 65],
    [0xA5, 68],
    [0x5C, 69],
    [0x5D, 70],
    [0xA3, 92],
  ],
};
