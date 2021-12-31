let timerStarted = false;
let startTime = null;
let time = null;

function strPadLeft(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

const startTimer = () => {
  timerStarted = true;
  startTime = Date.now();
  tick();
};

const tick = () => {
  let currentTime = Date.now();
  time = currentTime - startTime;

  setTime();

  if (timerStarted) {
    window.requestAnimationFrame(tick);
  }
};

const setTime = () => {
  const minutes = strPadLeft(new Date(time).getMinutes(), "0", 2);
  const seconds = strPadLeft(new Date(time).getSeconds(), "0", 2);
  const milliseconds = strPadLeft(new Date(time).getMilliseconds(), "0", 2);

  const finalTime = `${minutes}:${seconds}:${milliseconds}`;

  $("#timer").html(finalTime);
};

const stopTime = () => {
  timerStarted = false;

  $("#timer").addClass("done");
};

const resetTimer = () => {
  stopTime();
  startTime = 0;
  time = 0;
  $("#timer").removeClass("done").html("00:00:00");
};

const generateGrid = () => {
  const count = parseInt($(".count").val()) || 16;

  console.log(count);

  const grid = Array.apply(0, new Array(count)).map(function (element, i) {
    return i + 1;
  });

  return grid;
};

const sortGrid = (grid) => {
  grid.sort(function () {
    return 0.5 - Math.random();
  });

  return grid;
};

const paintGrid = () => {
  const grid = generateGrid();

  const sortedGrid = sortGrid(grid);

  sortedGrid.forEach((number) => {
    $(".number-wrapper").append(
      `<div class="number" data-id="${number}"><span>${number}</span></div>`
    );
  });
};

const init = () => {
  $(".number-wrapper").html("");
  resetTimer();
  paintGrid();

  const grid = generateGrid();

  $(".number").on("click", function () {
    if (timerStarted === false) {
      startTimer();
    }

    if ($(this).data("id") === grid[0]) {
      $(this).addClass("done");
      grid.shift();
    }

    if (grid.length === 0) {
      stopTime();
    }
  });
};

$(document).ready(() => {
  init();

  $(".reset").on("click", function () {
    init();
  });
});
