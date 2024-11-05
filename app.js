const screens = document.querySelectorAll(".screen");
const sizeList = document.querySelector("#size-list");
const btnsContainer = document.querySelector("#btns");
const title = document.querySelector("#title");
let size = 4;
let numberOfBtns = 0;
let lastBtn = 0;
let hiddenBtn;
const timerBlock = document.querySelector("#timer");
let seconds = 0;
let minutes = 0;
let timerInterval;

sizeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("size-btn")) {
    size = parseInt(event.target.getAttribute("data-size"));
    numberOfBtns = size ** 2;
    lastBtn = numberOfBtns;
    createBoard();
    // shuffle();
    screens[0].classList.add("up");
    timerInterval = setInterval(timer, 1000);
  }
});
function createBoard() {
  btnsContainer.innerHTML = "";
  let wh = "";
  if (size === 3) {
    wh = `30%`;
  } else if (size === 4) {
    wh = `24.5%`;
  } else if (size === 5) {
    wh = `19%`;
  }

  for (let btn = 1; btn <= numberOfBtns; btn++) {
    const newBtn = document.createElement("button");
    newBtn.id = `btn${btn}`;
    newBtn.setAttribute("index", btn);
    newBtn.style.width = wh;
    newBtn.style.height = wh;
    newBtn.innerHTML = btn;
    newBtn.classList.add("btn");

    newBtn.addEventListener("click", () => {
      moveTile(newBtn);
    });
    btnsContainer.append(newBtn);
  }
  hiddenBtn = document.getElementById(`btn${lastBtn}`);
  hiddenBtn.classList.add("hiddenBtn");
  console.log(btnsContainer);
}

function moveTile(btn) {
  const clickedIndex = parseInt(btn.getAttribute("index"));
  const hiddenIndex = parseInt(hiddenBtn.getAttribute("index"));

  const rowSize = size;

  if (
    clickedIndex === hiddenIndex + rowSize ||
    clickedIndex === hiddenIndex - rowSize ||
    (clickedIndex === hiddenIndex + 1 && clickedIndex % rowSize !== 1) ||
    (clickedIndex === hiddenIndex - 1 && clickedIndex % rowSize !== 0)
  ) {
    changeBtn(btn);
  }
  controlWin();
}

function changeBtn(btn) {
  const tempText = btn.innerHTML;
  btn.innerHTML = hiddenBtn.innerHTML;
  hiddenBtn.innerHTML = tempText;
  btn.classList.add("hiddenBtn");
  hiddenBtn.classList.remove("hiddenBtn");
  hiddenBtn = btn;
}

// function shuffle(iterations) {
//   const buttons = Array.from(btnsContainer.children);

//   for (let i = 0; i < iterations; i++) {
//     for (let j = buttons.length - 1; j > 0; j--) {
//       const randomIndex = Math.floor(Math.random() * (j + 1));
//       const temp = buttons[j];
//       buttons[j] = buttons[randomIndex];
//       buttons[randomIndex] = temp;
//     }
//   }

//   // Append shuffled buttons back to the container
//   buttons.forEach((button, idx) => {
//     btnsContainer.appendChild(button);
//     button.setAttribute("index", idx + 1);
//   });
//   console.log("new" + hiddenBtn.getAttribute("index"));
//   console.log(btnsContainer);
// }
function shuffle() {
  const buttons = Array.from(btnsContainer.children);
  for (let j = buttons.length - 1; j > 0; j--) {
    const randomIndex = Math.floor(Math.random() * (j + 1));
    [buttons[j], buttons[randomIndex]] = [buttons[randomIndex], buttons[j]];
  }
  buttons.forEach((button, idx) => {
    btnsContainer.appendChild(button);
    button.setAttribute("index", idx + 1);
  });

  console.log("new " + hiddenBtn.getAttribute("index"));
  console.log(btnsContainer);
}

function controlWin() {
  const buttons = Array.from(btnsContainer.children);
  let isWin = true;
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const index = parseInt(button.getAttribute("index"));
    const value = parseInt(button.innerHTML);

    if (index !== value) {
      isWin = false;
      break;
    }
  }

  if (isWin) {
    timerBlock.textContent = `Your time: ${timerBlock.textContent}`;
    clearInterval(timerInterval);
    const titleOld = title.innerText;
    title.innerText = `Congratulations! 
    You've won!`;
    btnsContainer.innerHTML = `<button class="size-btn" id="new-game">New game</button>`;
    console.log("Congratulations! You've won!");
    const newGameButton = document.getElementById("new-game");
    newGameButton.addEventListener("click", () => {
      screens[0].classList.remove("up");
      title.innerText = titleOld;
      resetTimer();
    });
  } else {
    console.log("Not yet in order.");
  }
}

function timer() {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  timerBlock.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function resetTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  timerBlock.textContent = "00:00";
}
