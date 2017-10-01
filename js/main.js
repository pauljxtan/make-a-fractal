$(document).ready(function () {
    var ctx = document.getElementById("canvas").getContext("2d");
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                //getMockSineDataset()
                getBarnsleyDataset(10000)
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Testing'
            },
            events: []
        }
    });
});

function getDataset(label, data) {
    return {
        label: label,
        data: data
    };
}

function getBarnsleyDataset(iterations) {
    return getDataset("Barnsley's fern", barnsley(iterations))
}

function getMockSineDataset() {
    return getDataset("Sine", getMockSineData());
}

function getMockSineData() {
    var data = [];
    for (var x = -Math.PI; x < Math.PI; x += 0.1)
        data.push({
            x: x,
            y: Math.sin(x)
        });
    return data;
}