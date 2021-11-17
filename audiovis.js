const canvas = document.getElementById('vis_canvas');
const canvasctx = canvas.getContext('2d');
let audioctx = new (window.AudioContext || window.webkitAudioContext)();
const audioEl = document.querySelector('audio');
audioEl.onplay = () => {
  audioctx.resume();
}
const source = audioctx.createMediaElementSource(audioEl);
const analyser = audioctx.createAnalyser();
var visOption = document.getElementsByClassName('active')[0];
var options = document.getElementsByClassName('vis_option');

source.connect(analyser).connect(audioctx.destination);

analyser.fftSize=8192;
canvasctx.strokeStyle = '#0ff';
canvasctx.lineWidth = 2;
const bgColor = 'black';
const freqBarColor = '#0ff';
const freqBarHeightMult = 1.5;
const freqBarSpacer = 2;
const sampleStep = Math.max(1, Math.floor(analyser.fftSize / canvas.width));
const scopeData = new Uint8Array(analyser.fftSize);
const freqData = new Uint8Array(analyser.frequencyBinCount);
const freqBarWidth = Math.floor(canvas.width / Math.log2(analyser.fftSize));
const heightByteRatio = canvas.height / 256;
const specFillRate = 2;
const specShadowWidth = 40;
var specPosition = 0;

function drawScope() {
  analyser.getByteTimeDomainData(scopeData);
  
  canvasctx.fillStyle = bgColor;
  canvasctx.fillRect(0, 0, canvas.width, canvas.height);

  let x = 0;
  let y = canvas.height / 2;
  canvasctx.beginPath();
  for (let i=0; i < analyser.fftSize; i += sampleStep) {
    y = canvas.height/2 + heightByteRatio * (scopeData[i] - 128);
    canvasctx.lineTo(x, y);
    x += 1;
  }
  canvasctx.stroke();
  requestAnimationFrame(draw);
}

function logAverage(arr, base) {
  let ret = [];
  let i = 0;

  while (i < arr.length) {
    let next_i = base * i + 1;
    let average = arr.slice(i, next_i).reduce((acc, el) => acc + el) / (i + 1);
    ret.push(average);
    i = next_i;
  }

  return ret;
}

function drawHist() {
  analyser.getByteFrequencyData(freqData);

  canvasctx.fillStyle = bgColor;
  canvasctx.fillRect(0, 0, canvas.width, canvas.height);
  canvasctx.fillStyle = freqBarColor;

  let bars = logAverage(freqData, 2);
  let x = 0;
  let y = 0;
  for (let bar of bars) {
    y = canvas.height - freqBarHeightMult * bar;
    canvasctx.fillRect(x, y, freqBarWidth - freqBarSpacer, freqBarHeightMult * bar);
    x += freqBarWidth;
  }
  requestAnimationFrame(draw);
}

function drawSpec() {
  analyser.getByteFrequencyData(freqData);
  let grad = canvasctx.createLinearGradient(specPosition, 0, specPosition, canvas.height);

  for (let i = 0; i < freqData.length; i++) {
    let bin = freqData[i] * 2.2;
    let low = Math.min(50, bin);
    let mid = Math.min(255, Math.max(0, bin - 50));
    let high = Math.max(0, bin - 305);
    let color = `rgb(${mid}, ${high}, ${low})`
    grad.addColorStop(1 - Math.sqrt(i/freqData.length), color);
  }

  canvasctx.fillStyle = grad;
  canvasctx.fillRect(specPosition, 0, specFillRate, canvas.height);
  specPosition += specFillRate;

  let shadow = canvasctx.createLinearGradient(specPosition, 0, specPosition + specShadowWidth, 0);
  shadow.addColorStop(0, 'rgba(0, 0, 0, 0.06');
  shadow.addColorStop(1, 'rgba(0, 0, 0, 0');
  canvasctx.fillStyle = shadow;
  canvasctx.fillRect(specPosition, 0, specShadowWidth, canvas.height);

  if (specPosition > canvas.width) specPosition = 0;

  requestAnimationFrame(draw);
}

function draw() {
  switch (visOption.id) {
    case "scope": drawScope(); break;
    case "hist": drawHist(); break;
    case "spec": drawSpec(); break;
  }
}

requestAnimationFrame(draw);

for (let option of options) {
  option.addEventListener('click', e => {
    visOption.classList.remove('active');
    e.target.classList.add('active');
    visOption = e.target;
    canvasctx.fillStyle = bgColor;
    canvasctx.fillRect(0, 0, canvas.width, canvas.height);
  })
}