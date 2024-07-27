const ctx = document.getElementById('finance-chart').getContext('2d');

const data = {
    labels: [],
    datasets: [
        {
            label: 'Income',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Light Blue
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },
        {
            label: 'Expense',
            data: [],
            backgroundColor: 'rgba(255, 159, 64, 0.6)', // Light Orange
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }
    ]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Amount'
                }
            }
        }
    }
};

const myChart = new Chart(ctx, config);

document.getElementById('finance-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting in the traditional way

    const month = document.getElementById('month').value;
    const income = parseFloat(document.getElementById('income').value);
    const expense = parseFloat(document.getElementById('expense').value);

    // Check if the month is already in the data
    const monthIndex = data.labels.indexOf(month);
    if (monthIndex === -1) {
        // Add new month
        data.labels.push(month);
        data.datasets[0].data.push(income);
        data.datasets[1].data.push(expense);
    } else {
        // Update existing month
        data.datasets[0].data[monthIndex] = income;
        data.datasets[1].data[monthIndex] = expense;
    }

    // Update the chart
    myChart.update();

    // Clear form fields
    document.getElementById('finance-form').reset();
});
