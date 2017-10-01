/*
https://en.wikipedia.org/wiki/Barnsley_fern
Barnsley's fern - 4 transformations
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
    data.push({x: 0.0, y: 0.0});

    for (var i = 1; i < iterations; i++) {
        var roll = Math.random();
        var prev = data[i - 1];

        // 1% probability
        if (roll < 0.1) {
            data.push({
                x: 0.0,
                y: 0.16 * prev.y
            });
        }
        // 85% probability
        else if (roll < 0.86) {
            data.push({
                x:  0.85 * prev.x + 0.04 * prev.y,
                y: -0.04 * prev.x + 0.85 * prev.y + 1.6
            });
        }
        // 7% probability
        else if (roll < 0.93) {
            data.push({
                x: 0.20 * prev.x - 0.26 * prev.y,
                y: 0.23 * prev.x + 0.22 * prev.y + 1.6
            });
        }
        // 7% probability
        else {
            data.push({
                x: -0.15 * prev.x + 0.28 * prev.y,
                y:  0.26 * prev.x + 0.24 * prev.y + 0.44
            });
        }
    }
    return data;
}