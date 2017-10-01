$(document).ready(function () {
    var ctx = document.getElementById("canvas").getContext("2d");
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                getMockDataset()
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Testing'
            }
        }
    });
});

function getMockDataset() {
    var data = [];
    for (var x = -Math.PI; x < Math.PI; x += 0.1)
        data.push({
            x: x,
            y: Math.sin(x)
        });

    console.log(data);
    return {
        label: 'Sine',
        data: data
    };
}
