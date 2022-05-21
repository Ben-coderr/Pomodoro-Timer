var start = document.getElementById("start");
var stop = document.getElementById("stop");
var reset = document.getElementById("reset");

var wm = document.getElementById("w_minutes");
var ws = document.getElementById("w_seconds");

var bm = document.getElementById("b_minutes");
var bs = document.getElementById("b_seconds");

//store a reference to a timer variable
var startTimer;

start.addEventListener("click", function () {
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
    start.style.opacity = "50%";
    reset.style.opacity = "100%";
    stop.style.opacity = "100%";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Timer is already running",
    });
  }
});

reset.addEventListener("click", function () {
  start.style.opacity = "100%";
  reset.style.opacity = "50%";
  stop.style.opacity = "100%";
  wm.value = "50";
  ws.innerText = "00";

  bm.innerText = 5;
  bs.innerText = "00";

  document.getElementById("counter").innerText = 0;
  stopInterval();
  startTimer = undefined;
  wm.removeAttribute("readonly");
});

stop.addEventListener("click", function () {
  start.style.opacity = "100%";
  reset.style.opacity = "100%";
  stop.style.opacity = "50%";
  stopInterval();
  startTimer = undefined;
});

//Start Timer Function
function timer() {
  //Work Timer Countdown
  wm.setAttribute("readonly", "");
  if (wm.value == 0 && ws.innerText == 0) {
    wm.value = "00";
    ws.innerText = "00";
  } else if (ws.innerText != 0) {
    ws.innerText--;
  } else if (ws.innerText == 0 && wm.value != 0) {
    wm.value--;
    ws.innerText = 59;
  }

  if (bs.innerText != 0) {
    bs.innerText--;
  }
  if (
    wm.value == 0 &&
    ws.innerText == 0 &&
    bs.innerText == 0 &&
    bm.innerText > 0
  ) {
    bm.innerText--;
    bs.innerText = 59;
  }
  if (
    wm.value == "00" &&
    ws.innerText == "00" &&
    bs.innerText == 0 &&
    bm.innerText == 0
  ) {
    bm.innerText = "05";
    bs.innerText = "00";
    wm.value = 50;
    ws.innerText = "00";
    stopInterval();
    start.style.opacity = "100%";
    startTimer = undefined;
    wm.removeAttribute("readonly");
    document.getElementById("counter").innerText++;
  }
  if (
    wm.value == 0 &&
    ws.innerText == 0 &&
    bm.innerText == 4 &&
    bs.innerText == 59
  ) {
    showNotification();
    var audio = new Audio(
      "images/X2Download.com - Classic Alarm Clock - Sound Effect for Editing (128 kbps).mp3"
    );
    audio.play();
  }
}

//Stop Timer Function
function stopInterval() {
  clearInterval(startTimer);
}

// background changer

let image_btn = document.querySelector(".image_btn");
let images = document.querySelector(".imgs");
let imgs = document.querySelectorAll(".imgs img");
let backLink = document.querySelector(".background_changer_wthLink");
image_btn.addEventListener("click", function () {
  images.classList.toggle("none");
  backLink.classList.toggle("none");
});

imgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    imgs.forEach((img) => {
      img.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    document.body.style.backgroundImage = `url(${img.src})`;
  });
});

let LinkInput = document.querySelector(".back_link");
backgroundChangerBtn = document.querySelector(".back_chng");
backgroundChangerBtn.addEventListener("click", function () {
  if (LinkInput.value !== "") {
    document.body.style.backgroundImage = `url(${LinkInput.value})`;
  }
});

// Notification
function showNotification() {
  let notification = new Notification("New essage fro decade", {
    body: "Hey friend",
    icon: "https://www.dzduino.com/image/cache/catalog/logo-1024x300.png.webp",
  });
}

Notification.requestPermission();
