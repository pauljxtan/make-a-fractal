// We look up the IFS function for the selected fractal in here
var ifsFunctionTable = {
  'barnsley': {niceName: "Barnsley's fern", ifsFunction: barnsley},
  'koch': {niceName: "Koch snowflake", ifsFunction: koch}
};

$(document).ready(function () {
  $('#iterations-info').tooltip({
    position: {
      at: 'right'
    }
  });

  $('#draw-button').click(function () {
    var fractal = $('#fractal-select').val();
    var iterations = $('#iterations-input').val();

    if (!(fractal in ifsFunctionTable)) {
      alert('Please select a fractal.');
      return;
    }
    if (iterations < 1) {
      alert('Please enter a number of iterations.');
      return;
    }
    if (iterations > 1000000) {
      alert('Please enter fewer than 1,000,000 iterations.');
      return;
    }

    $('#draw-button').addClass('is-loading');
    drawFractal(ifsFunctionTable[fractal], iterations);
  });
});

function drawFractal(ifsFunctionInfo, iterations) {
  $('#loading').fadeIn(250, function () {
    $('#graph').fadeOut(1000, function () {
      var data = ifsFunctionInfo.ifsFunction(iterations);
      var niceName = ifsFunctionInfo.niceName;
      createGraphAndHandlers(data, niceName + ' (' + iterations + ' iterations)');
      $('#loading').fadeOut(250, function () {
        // The fade-in doesn't seem to work very well for large datasets (> 30,000)
        $('#graph').fadeIn(1000, function () {
          $('#draw-button').removeClass('is-loading');
        });
      })
    });
  });
}

function createGraphAndHandlers(data, title) {
  // Sort the data so that various dygraph functions work properly
  data.sort(function (a, b) {
    return a[0] - b[0];
  });

  var graph = new Dygraph(
    document.getElementById('graph'),
    data,
    {
      title: title,
      drawPoints: true,
      strokeWidth: 0.0,
      height: 670,
      width: 670,
      legend: 'never',
      axes: {
        x: {drawAxis: false, drawGrid: false},
        y: {drawAxis: false, drawGrid: false}
      }
    }
  );
}

/**************** FRACTALS ****************/

/*
BARNSLEY FERN
(https://en.wikipedia.org/wiki/Barnsley_fern)
          | 0.00  0.00| |x|   |0.00|
f1(x,y) = |           | | | + |    |
          | 0.00  0.16| |y|   |0.00|

          | 0.85  0.04| |x|   |0.00|
f2(x,y) = |           | | | + |    |
          |-0.04  0.85| |y|   |1.60|

          | 0.20 -0.26| |x|   |0.00|
f3(x,y) = |           | | | + |    |
          | 0.23  0.22| |y|   |1.60|

          |-0.15  0.28| |x|   |0.00|
f4(x,y) = |           | | | + |    |
          | 0.26  0.24| |y|   |0.44|
*/
function barnsley(iterations) {
  var data = [];

  // Initialize at origin
  data.push([0.0, 0.0]);

  for (var i = 1; i < iterations; i++) {
    var roll = Math.random();
    var prev = data[i - 1];

    // 1% probability
    if (roll < 0.01) {
      data.push([
        0.0,
        0.16 * prev[1]
      ]);
    }
    // 85% probability
    else if (roll < 0.86) {
      data.push([
        +0.85 * prev[0] + 0.04 * prev[1],
        -0.04 * prev[0] + 0.85 * prev[1] + 1.6
      ]);
    }
    // 7% probability
    else if (roll < 0.93) {
      data.push([
        0.20 * prev[0] - 0.26 * prev[1],
        0.23 * prev[0] + 0.22 * prev[1] + 1.6
      ]);
    }
    // 7% probability
    else {
      data.push([
        -0.15 * prev[0] + 0.28 * prev[1],
        +0.26 * prev[0] + 0.24 * prev[1] + 0.44
      ]);
    }
  }
  return data;
}

/*
KOCH SNOWFLAKE
(Demir, Ozdemir and Saltan 2013)
TODO: add equations
*/
function koch(iterations) {
  var data = [];

// Initialize at origin
  data.push([0.0, 0.0]);

  for (var i = 1; i < iterations; i++) {
    var roll = Math.random();
    var prev = data[i - 1];

    // 25% probability each
    if (roll < 0.25) {
      data.push([
        1.0 / 3.0 * prev[0],
        1.0 / 3.0 * prev[1]
      ]);
    }
    else if (roll < 0.50) {
      data.push([
        1.0 / 6.0 * prev[0] - Math.sqrt(3) / 6.0 * prev[1] + 1.0 / 3.0,
        Math.sqrt(3) / 6.0 * prev[0] + 1.0 / 6.0 * prev[1]
      ]);
    }
    else if (roll < 0.75) {
      data.push([
        1.0 / 6.0 * prev[0] + Math.sqrt(3) / 6.0 * prev[1] + 0.5,
        -Math.sqrt(3) / 6.0 * prev[0] + 1.0 / 6.0 * prev[1] + Math.sqrt(3) / 6.0
      ]);
    }
    else {
      data.push([
        1.0 / 3.0 * prev[0] + 2.0 / 3.0,
        1.0 / 3.0 * prev[1]
      ]);
    }
  }
  return data;
}

/**************** HELPERS ****************/

function minMaxByDim(multiDimArray, dim) {
  var dimArray = multiDimArray.map(function (elem) {
    return elem[dim]
  });
  var min = Math.min.apply(null, dimArray);
  var max = Math.max.apply(null, dimArray);
  return {min: min, max: max};
}

function getMockSineData(points) {
  var data = [];
  var step = 2.0 * Math.PI / points;
  for (var x = -Math.PI; x < Math.PI; x += step)
    data.push([x, Math.sin(x)]);
  return data;
}

