// dom elements

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const audio = document.getElementById("audio");
const form = document.querySelector(".form");
const range = document.querySelector("#volume");
const number = document.querySelector(".number");
const img = document.querySelector("img");
const start = document.getElementById("start");
const end = document.getElementById("end");
const progressForm = document.querySelector(".progressForm");
const progress = document.getElementById("progress");
const bars = document.querySelector("#bars");
const menu = document.querySelector(".menu");
const exit = document.getElementById("exit");
const list = document.querySelector(".list");
// variables
let index = 0;
let Playing = false;

let songs = [
  "Billie Eilish - Lovely",
  "Heather - Conan Gray",
  "Orxan - Unutmak Istiyorum",
  "Rauf Faik - метро",
];

// funtionsss

function load(i) {
  title.textContent = songs[i];
  cover.src = `img/${songs[i]}.jpg`;
  audio.src = `musics/${songs[i]}.mp3`;
}
load(index);

function nextFunction() {
  index++;

  if (index == songs.length) {
    index = 0;
  }
  load(index);
  prevPlaying();
}

function prevFunction() {
  index--;
  if (index < 0) {
    index = songs.length - 1;
  }
  load(index);
  prevPlaying();
}

function playFunction() {
  if (!Playing) {
    audio.play();
    Playing = true;
    playBtn.innerHTML = `
    <i class="fa-solid fa-pause"></i>
    `;
    img.style = `
    animation-play-state:running;
    `;
  } else {
    audio.pause();
    Playing = false;
    playBtn.innerHTML = `
    <i class="fas fas fa-play"></i>
    
    `;
    img.style = `
    animation-play-state:paused;
    `;
  }
}

function prevPlaying() {
  Playing = true;
  if (Playing) {
    audio.play();
    Playing = Playing;
    playBtn.innerHTML = `
    <i class="fa-solid fa-pause"></i>
    `;
  }
}

// eventssss
nextBtn.addEventListener("click", () => {
  nextFunction();
});

prevBtn.addEventListener("click", () => {
  prevFunction();
});
playBtn.addEventListener("click", () => {
  playFunction();
});

audio.volume = 0.5;
// forms

form.addEventListener("input", () => {
  number.textContent = range.value;
  setTimeout(() => {
    number.textContent = "";
  }, 2000);
  audio.volume = number.textContent / 100;
});

// time interval

setInterval(() => {
  let starting = Math.trunc(audio.currentTime);

  var minn = Math.floor(starting / 60);
  var secc = Math.floor(starting % 60);

  duration();
  start.textContent = `${minn < 10 ? "0" + minn : minn} : ${
    secc < 10 ? "0" + secc : secc
  } `;
  progress.value = starting;

  // console.log(progress.value);
  progress.setAttribute("max", `${audio.duration}`);
}, 1000);

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
  // console.log(progress.value);
});

function duration() {
  let allTime = Math.trunc(audio.duration);
  let min = Math.trunc(allTime / 60);

  let sec = allTime % 60;
  end.textContent = `${min < 10 ? "0" + min : min} : ${
    sec < 10 ? "0" + sec : sec
  }`;
}

// bars music list

songs.forEach((song, i) => {
  list.innerHTML += `
  <li class = "music" onclick="changeMusic(${i})" >${song}</li>
`;
});

function changeMusic(i) {
  load(i);
  playFunction();
}

bars.addEventListener("click", () => {
  menu.style = `
  z-index:10;
  `;
  bars.style.display = "none";
});
exit.addEventListener("click", () => {
  menu.style = `
  z-index:-10;
  `;
  bars.style.display = "block";
});
