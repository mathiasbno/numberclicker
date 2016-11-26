let timerStarted = false;
let totalSeconds = 0;
let timer = null;

const startTimer = () => {
  timerStarted = true;
  timer = setInterval(setTime, 1000);
}

const setTime = () => {
  ++totalSeconds;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;

  function strPadLeft(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  const finalTime = strPadLeft(minutes, '0', 2) + ':' + strPadLeft(seconds, '0', 2);

  $('#timer').html(finalTime);
}

const stopTime = () => {
  clearTimeout(timer);
  timerStarted = false;

  $('#timer').addClass('done');
}

const resetTimer = () => {
  stopTime();
  $('#timer').removeClass('done').html('00:00');
  totalSeconds = 0;
}

const generateGrid = () => {
  const count = parseInt($('.count').val()) || 30;

  console.log(count);

  const grid = Array.apply(0, new Array(count)).map(function(element, i) {
    return i + 1;
  });

  return grid;
}

const sortGrid = (grid) => {
  grid.sort(function() { return 0.5 - Math.random() });

  return grid;
}

const paintGrid = () => {
  const grid = generateGrid();

  const sortedGrid = sortGrid(grid);

  sortedGrid.forEach((number) => {
    $('.number-wrapper').append(`<div class="number" data-id="${number}"><span>${number}</span></div>`);
  });
}

const init = () => {
  $('.number-wrapper').html('');
  resetTimer();
  paintGrid();

  const grid = generateGrid();

  $('.number').on('click', function() {
    if (timerStarted === false) {
      startTimer();
    }

    if ($(this).data('id') === grid[0]) {
      $(this).addClass('done');
      grid.shift();
    }

    if (grid.length === 0) {
      stopTime();
    }
  });
}

$(document).ready(() => {
  init();

  $('.reset').on('click', function() {
    init();
  });
});
