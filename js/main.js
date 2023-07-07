const buttonStart = document.querySelector("#startTimer");
const buttonClear = document.querySelector("#clear");
const buttonStop = document.querySelector("#stop");
const buttonResume = document.querySelector("#resume");
const buttonsBasicTime = document.querySelectorAll(".basic");
let timer = document.querySelector("#timer");
buttonResume.disabled = true;
buttonStop.disabled = true;
buttonClear.disabled = true;

//additional
function timeUnderTenChecker(number) {
  if (number < 10) return (number = "0" + number);
  else return number;
}
function timeToMs(x) {
  x =
    parseInt(x.slice(0, 2)) * 3600 +
    parseInt(x.slice(3, 6)) * 60 +
    parseInt(x.slice(6));
  return x;
}
buttonsBasicTime.forEach((button) => {
  button.addEventListener("click", function () {
    setTime.value =
      timeUnderTenChecker(parseInt(button.value / 3600)) +
      ":" +
      timeUnderTenChecker(parseInt((button.value % 3600) / 60)) +
      ":" +
      timeUnderTenChecker(parseInt((button.value % 3600) % 60));
  });
});

//main
function startTimer(setTime) {
  let interval = setInterval(function () {
    setTime--;
    timer.innerHTML =
      timeUnderTenChecker(parseInt(setTime / 3600)) +
      ":" +
      timeUnderTenChecker(parseInt((setTime % 3600) / 60)) +
      ":" +
      timeUnderTenChecker(parseInt((setTime % 3600) % 60));
    if (setTime === 0) {
      clearInterval(interval);
      buttonStart.disabled = false;
      buttonResume.disabled = true;
      buttonStop.disabled = true;
      buttonClear.disabled = true;
      document.querySelector("#bell").play();
    }
    buttonStop.addEventListener("click", () => {
      clearInterval(interval);
      buttonStart.disabled = false;
      buttonStop.disabled = true;
      buttonResume.disabled = false;
    });
    buttonClear.addEventListener("click", () => {
      timer.innerHTML = "00:00:00";
      setTime = 0;
      clearInterval(interval);
      buttonStart.disabled = false;
      buttonResume.disabled = true;
      buttonStop.disabled = true;
      buttonClear.disabled = true;
      document.querySelector("#setTime").value = "none";
    });
  }, 1000);
}
buttonStart.addEventListener("click", () => {
  let setTime = document.querySelector("#setTime").value;
  setTime = timeToMs(setTime);
  if (setTime > 0 && !isNaN(setTime)) {
    startTimer(setTime);
    buttonStart.disabled = true;
    buttonStop.disabled = false;
    buttonClear.disabled = false;
  }
});
buttonResume.addEventListener("click", () => {
  let setTime = document.querySelector("#timer").textContent;
  setTime = timeToMs(setTime);
  startTimer(setTime);
  buttonResume.disabled = true;
  buttonStop.disabled = false;
});
