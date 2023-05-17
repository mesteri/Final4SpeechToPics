const images = document.querySelectorAll("img");
let currentPage = 1;
let keyword = "";
let selectedImage = "";
var SpeechRec = new p5.SpeechRec();
let pword = "";
SpeechRec.continuous = true;
SpeechRec.interimResults = true;
let loadedImages = []; // store loaded images in an array
let loaded = false; // flag to indicate whether all images are loaded
let imageSize = 400; // size of each image
let numImages = 2; // number of images to display
let loadedeffect = Math.floor(Math.random() * 3) + 1;

function setup() {
  createCanvas(1860, 1050);
  SpeechRec.start();
  SpeechRec.onResult = setResult;
  SpeechRec.onStart = onStart;
  background(255);
}

function displayImages(keyword, page) {
  fetch(`https://apis.scrimba.com/unsplash/search/photos?query=${keyword}&page=${page}`)
    .then(res => res.json())
    .then(data => {
      loadedImages = []; // clear loaded images
      for (let i = 0; i < numImages; i++) {
        let img = loadImage(data.results[i].urls.small, () => {
          loadedImages.push(img);
          if (loadedImages.length === numImages) {
            loaded = true; // set loaded flag when all images are loaded
          }
        });
      }
    });
}

function draw() {
  // IMAGES
  if (loadedeffect == 1) {
    picLoaderOriginal();
  } else if (loadedeffect == 2) {
    picLoaderPosterFilter();
  } else {
    picLoaderBW();
  }
}

function onStart() {
  pword = SpeechRec.resultString;
}

function setResult() {
  if (SpeechRec.resultConfidence < 0.005 || pword == SpeechRec.resultString) {
    return 0;
  }
  pword = SpeechRec.resultString;
  let keyword = pword;
  switch (SpeechRec.resultString) {
    case pword:
      displayImages(keyword, currentPage);
      break;
  }
}

function picLoaderOriginal() {
  if (loaded) {
    for (let i = 0; i < numImages; i++) {
      let xPosition = random(0, width - imageSize);
      let yPosition = random(0, height - imageSize);
      tint(255, 255);
      image(loadedImages[i], xPosition * i, yPosition * i, imageSize, imageSize);
    }
    loaded = false;
  }
}

function picLoaderPosterFilter() {
  if (loaded) {
    for (let i = 0; i < numImages; i++) {
      let xPosition = random(0, width - imageSize);
      let yPosition = random(0, height - imageSize);
      let loadedPicture = loadedImages[i];
      let pg = createGraphics(imageSize, imageSize);
      pg.image(loadedPicture, 0, 0, imageSize, imageSize);
      pg.filter(POSTERIZE, 3);
      tint(255, 255);
      image(pg, xPosition * i, yPosition * i, imageSize, imageSize);
    }
    loaded = false;
  }
}

function picLoaderBW() {
  if (loaded) {
    for (let i = 0; i < numImages; i++) {
      let xPosition = random(0, width - imageSize);
      let yPosition = random(0, height - imageSize);
      let loadedPicture = loadedImages[i];
      let pg = createGraphics(imageSize, imageSize);
      pg.image(loadedPicture, 0, 0, imageSize, imageSize);
      pg.filter(GRAY);
      tint(255, 255);
      image(pg, xPosition * i, yPosition * i, imageSize, imageSize);
    }
    loaded = false;
  }
}
