let video = document.querySelector('video');
let toggle = document.querySelector('.toggle');
let skipButtons = document.querySelectorAll('[data-skip]');
let sliders = document.querySelectorAll('.player__slider');
let progressBar = document.querySelector('.progress__filled');
let progress = document.querySelector('.progress');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  console.log(method);
  video[method]();
}

function updateBtnIcon(){
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
  console.log(video.currentTime);
}
function handleRangeUpdate() {
  video[this.name] = this.value;
}
function timeUpdate() {
  const percent = (video.currentTime / video.duration)*100
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  let currentTime = (e.offsetX/video.duration) * video.duration;
  video.currentTime = currentTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtnIcon);
video.addEventListener('pause', updateBtnIcon);
video.addEventListener('timeupdate', timeUpdate);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn =>
  btn.addEventListener('click', skip));
sliders.forEach(slider =>
  slider.addEventListener('mousemove',handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove', (e) =>{ if (mouseDown) scrub(e)});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
