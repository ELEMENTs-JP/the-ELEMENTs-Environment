﻿let generalChartHeight = 215;
let generalleft = 15;
let generalright = 35;
let generaltop = 10;
let generalbottom = 10;

import * as thePCKMOD from "./chartBase.js";

export function loadPieChart(divID, dotNetHelper) {
    // Create Parameter 
    let jsonParameter = {
        "DIV": divID,
        "ItemType": "",
        "AppType": "",
        "DataParameter": "",
        "Parameter": "",
        "DataFilter": "",
        "Filter": "",
        "ChartType": "",
    };

    try {
        dotNetHelper.invokeMethodAsync('LoadChartData', jsonParameter).then(data => {

            onPieChartJSSucess(data)
        });

        // Assembly Name + Method 
        //DotNet.invokeMethodAsync('STRIDES.PieChart', 'LoadPieChartData', jsonParameter).then(data => {

        //    onPieChartJSSucess(data)
        //});
    }
    catch (e) {
        console.log("FAIL: " + e);
    }

}


function onPieChartJSSucess(data) {

    try {
        let chartType = 'pie';
        let title = data.title.toString();
        title = data.div;
        let CutOutPercentage = 80;
        let legendePosition = 'right';
        let showLegende = false;

        // Farben 
        let colors = getChartColors();
        let legendTitle = '';

        // Arrays 
        let labelData = [];
        let dataset = [];

        try {
            for (let s = 0; s < data.series.length; s++) {
                let serie = data.series[s];
                if (serie === null)
                    continue;

                // Legende 
                legendTitle = serie.title;

                // Werte 
                for (let c = 0; c < serie.items.length; c++)
                {
                    try
                    {
                        let key = serie.items[c].key;
                        let value = serie.items[c].value;

                        // Test 
                        var randNum = Math.floor(Math.random() * 1000) + 1;
                        value = randNum;

                        if (key === null)
                            key = '---';

                        // Data 
                        labelData.push(key);
                        dataset.push(value);
                    }
                    catch (e) {
                        console.log("FAIL: " + e);
                    }
                }
            }
        }
        catch (e) { console.log("FAIL: " + e); }


        // Get Canvas + Check Visibility 
        let grapharea = null;
        let canvas = null;

        try {
            grapharea = document.getElementById(data.div).getContext("2d");
            canvas = document.getElementById(data.div);
            if (data.series.length === 0) {
                canvas.style.visibility = 'hidden';
                canvas.style.visibility = 'none';
DIV            }
            canvas.height = generalChartHeight;
        }
        catch (e) {
            console.log("FAIL: " + e);
        }

        // Package 
        let chartPCK = thePCKMOD.getPackageByID(data.div);
        if (chartPCK === null || chartPCK === undefined)
        {
            chartPCK = new thePCKMOD.tspChart();
            chartPCK.ID = data.div;
        }

        // Chart 
        let chart;
        if (chartPCK !== null && chartPCK !== undefined)
        {
            if (chartPCK.Chart !== null && chartPCK.Chart !== undefined)
            {
                chart = chartPCK.Chart;
            }
        }

    /*    try { chart.destroy(); } catch (eInner) { alert(eInner); }*/

        try {
            // Chart
            chart = new Chart(grapharea, {
                type: chartType,
                data: {
                    labels: labelData,
                    datasets: [
                        {
                            label: legendTitle,
                            borderColor: '#fff',
                            borderWidth: 2,

                            pointBorderColor: colors,
                            pointBackgroundColor: colors,

                            backgroundColor: colors,

                            data: dataset
                        }
                    ]
                },
                options: {
                    color: colors,
                    drawBorder: false,
                    drawTicks: true,
                    cutoutPercentage: CutOutPercentage,
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            left: generalleft,
                            right: generalright,
                            top: generaltop,
                            bottom: generalbottom
                        }
                    },
                    legend:
                    {
                        display: showLegende,
                        position: legendePosition,
                        align: "middle",
                        fontSize: 8,
                        strokeStyle: '#fff',
                        title: {
                            text: title,
                            color: 'rgb(255, 99, 132)',
                        },
                        labels: {
                            color: 'rgb(255, 99, 132)'
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: title,
                            position: 'top'
                        }
                    },
                    scales: {
                        yAxes: [{
                            grid: {
                                drawBorder: true,
                                display: true,
                                drawTicks: true
                            },
                            ticks: {
                                display: true,
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            grid: {
                                drawBorder: true,
                                display: false
                            },
                            ticks: {
                                display: true,
                                beginAtZero: false,
                                fontSize: 9
                            }
                        }]
                    }

                }
            });

            // append 
            chartPCK.Chart = chart;

            // Update 
            chart.options.plugins.legend.position = 'right';
            chart.update();
        }
        catch (e) {
            console.log("FAIL: " + e);
        }

    } catch (e) {
        console.log("FAIL: " + e);
    }
}

// Colors 
function getChartColors() {

    try {
        // viele starke Farben 
        let colors = [
            '#34A853', // green 
            '#ddd',
            '#e01256', // red 
            '#ccc',
            '#008CD8', // hellblau 
            '#aaa',
            '#AB117F', // deep pink 
            '#888',
            '#3B2F77', // violett 
            '#666',
            '#FCC200', // yellow 
            '#444',
            '#00A9A0', // türkis 
            '#222',
            '#E2007D', // rose 
            '#000',
            '#0085A4', // seeblau 
            '#E87A2C', // orange 
            '#DC0A15' // signal red 
        ];

        // shuffle(colors);
        return colors;
    } catch (e) {

        // viele starke Farben 
        let cathColors = [
            '#34A853', // green 
            '#eee',
            '#e01256', // red 
            '#ccc',
            '#008CD8', // hellblau 
            '#aaa',
            '#AB117F', // deep pink 
            '#888',
            '#3B2F77', // violett 
            '#666',
            '#FCC200', // yellow 
            '#444',
            '#00A9A0', // türkis 
            '#222',
            '#E2007D', // rose 
            '#000',
            '#0085A4', // seeblau 
            '#E87A2C', // orange 
            '#DC0A15' // signal red 
        ];

        // shuffle(colors);
        return cathColors;
    }
}
function getChartColorsMultiple(multiply) {

    try {

        let colors = [];

        for (let c = 0; c < multiply; c++) {
            colors.push('#32AA50');
            colors.push('#eee');
            colors.push('#DF1455');
            colors.push('#ccc');
            colors.push('#008CD7');
            colors.push('#aaa');
            colors.push('#AA1482');
            colors.push('#888');
            colors.push('#3C327D');
            colors.push('#666');
            //colors.push('#444');
            colors.push('#00AAAA');
            colors.push('#222');
            colors.push('#DC0082');
            //colors.push('#000');
            colors.push('#007DAF');
            colors.push('#E60F5A');
        }

        // shuffle(colors);
        return colors;
    } catch (e) {

        // viele starke Farben 
        let cathColors = [
            '#34A853', // green 
            '#eee',
            '#e01256', // red 
            '#ccc',
            '#008CD8', // hellblau 
            '#aaa',
            '#AB117F', // deep pink 
            '#888',
            '#3B2F77', // violett 
            '#666',
            '#FCC200', // yellow 
            '#444',
            '#00A9A0', // türkis 
            '#222',
            '#E2007D', // rose 
            '#000',
            '#0085A4', // seeblau 
            '#E87A2C', // orange 
            '#DC0A15' // signal red 
        ];

        // shuffle(colors);
        return cathColors;
    }
}
function getChartColorsShuffled() {

    try {

        // viele starke Farben 
        let colors = getChartColors();
        shuffle(colors);
        return colors;
    } catch (e) {
        // viele starke Farben 
        let theco = getChartColors();
        shuffle(theco);
        return theco;
    }
}
