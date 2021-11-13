const canvas = document.getElementById('vis_canvas');
const canvasctx = canvas.getContext('2d');
const audioctx = new (window.AudioContext || window.webkitAudioContext)();
const audioEl = document.querySelector('audio');
const source = audioctx.createMediaElementSource(audioEl);
const analyser = audioctx.createAnalyser();
var visOption = document.getElementsByClassName('active')[0];
var options = document.getElementsByClassName('vis_option');

source.connect(analyser).connect(audioctx.destination);

analyser.fftSize=4096;
canvasctx.strokeStyle = '#0ff';
canvasctx.lineWidth = 2;
const bgColor = 'black';
const freqBarColor = '#0ff';
const freqBarHeightMult = 1.5;
const freqBarSpacer = 2;
const sampleSpacing = canvas.width / analyser.fftSize;
const scopeData = new Float32Array(analyser.fftSize);
const freqData = new Uint8Array(analyser.fftSize/2);

function drawScope() {
  analyser.getFloatTimeDomainData(scopeData);
  
  canvasctx.fillStyle = bgColor;
  canvasctx.fillRect(0, 0, canvas.width, canvas.height);

  let x = 0;
  let y = 0;
  canvasctx.beginPath();
  for (let datum of scopeData) {
    y = canvas.height/2 * (1 + datum);
    x += sampleSpacing;
    canvasctx.lineTo(x, y);
  }
  canvasctx.stroke();
  requestAnimationFrame(draw);
}

function logAverage(arr) {
  let ret = [];
  let i = 0;

  while (i < arr.length) {
    let next_i = 2 * i + 1;
    let average = arr.slice(i, next_i).reduce((acc, el) => acc + el) / (i + 1);
    ret.push(average);
    i = next_i;
  }

  return ret;
}

function drawFreq() {
  analyser.getByteFrequencyData(freqData);

  canvasctx.fillStyle = bgColor;
  canvasctx.fillRect(0, 0, canvas.width, canvas.height);
  canvasctx.fillStyle = freqBarColor;

  let bars = logAverage(freqData);
  const freqBarWidth = Math.floor(canvas.width / bars.length);
  let x = 0;
  let y = 0;
  for (let bar of bars) {
    y = canvas.height - freqBarHeightMult * bar;
    canvasctx.fillRect(x, y, freqBarWidth - freqBarSpacer, freqBarHeightMult * bar);
    x += freqBarWidth;
  }
  requestAnimationFrame(draw);
}

function draw() {
  switch (visOption.id) {
    case "scope": drawScope(); break;
    case "freq": drawFreq(); break;
  }
}

requestAnimationFrame(draw);

for (let option of options) {
  option.addEventListener('click', e => {
    visOption.classList.remove('active');
    e.target.classList.add('active');
    visOption = e.target;
  })
}
