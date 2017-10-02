var rgbaBlack = 'rgba(0,0,0,1';

$(document).ready(function () {
    drawFractal(barnsley, 20000);
});

function drawFractal(ifsFunction, iterations) {
    $('#graph').fadeOut(1000, function () {
        var data = ifsFunction(iterations);
        createGraphAndHandlers(data);
        $('#graph').fadeIn(1000);
    });
}

function createGraphAndHandlers(data) {
    // Sort the data so that various dygraph functions work properly
    data.sort(function (a, b) {
        return a[0] - b[0];
    });

    var graph = new Dygraph(
        document.getElementById('graph'),
        data,
        {
            drawPoints: true,
            strokeWidth: 0.0,
            height: 500,
            width: 500,
            legend: 'never'
        }
    );
}

/**************** FRACTALS ****************/

/*
https://en.wikipedia.org/wiki/Barnsley_fern
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

