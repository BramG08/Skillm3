const time = document.getElementById("js--time");

time.innerHTML = new Date().getHours() + ":" + new Date().getMinutes();

const barctx = document.getElementById("js--chart-staafchart").getContext("2d");
const donutctx = document.getElementById("js--chart-donutchart").getContext("2d");

let chartData = [];
let fetchCount = 0; // Counter to track completed fetches

for (let i = 1; i <= 100; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then(response => response.json())
        .then(data => {
            chartData.push({
                label: data.name.charAt(0).toUpperCase() + data.name.slice(1), // Capitalize name
                value: data.base_experience // Use base experience as value
            });
            fetchCount++;

            // Render charts once all fetches are complete
            if (fetchCount === 100) {
                renderCharts();
            }
        });
}

const backgroundColors = [
    'rgba(255, 99, 132, 0.2)',  // Red
    'rgba(54, 162, 235, 0.2)',  // Blue
    'rgba(255, 206, 86, 0.2)',  // Yellow
];

const borderColors = [
    'rgba(255, 99, 132, 1)',  // Red
    'rgba(54, 162, 235, 1)',  // Blue
    'rgba(255, 206, 86, 1)',  // Yellow
];

function renderCharts() {
    const labels = chartData.map(item => item.label);
    const data = chartData.map(item => item.value);

    const chart = new Chart(barctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pokemons per type',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Sort the data by ascending order based on value
    const combined = labels.map((label, index) => ({
        label,
        value: data[index],
        backgroundColor: backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
        borderColor: borderColors[Math.floor(Math.random() * borderColors.length)]
    })).sort((a, b) => a.value - b.value);

    const sortedLabels = combined.map(item => item.label);
    const sortedData = combined.map(item => item.value);

    const chart2 = new Chart(donutctx, {
        type: 'doughnut',
        data: {
            labels: sortedLabels,
            datasets: [{
                label: 'Pokemons per type',
                data: sortedData,
                backgroundColor: combined.map(item => item.backgroundColor),
                borderColor: combined.map(item => item.borderColor),
                borderWidth: 1,
                cutout: "25%"
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}