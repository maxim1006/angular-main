export const StepDurationGraphModel = {
    chart: {
    },
    title: {
        text: ''
    },
    credits: {
        enabled: false
    },
    xAxis: {
        categories: ['September', 'October', 'November', 'December', 'January']
    },
    labels: {
        items: [{
            html: '',
            style: {
                left: '50px',
                top: '18px',
                color: 'black'
            }
        }]
    },
    series: [{
        type: 'column',
        name: 'Step',
        data: [0, 4.0, 2.8, 2.5, 2.4]
    }, {
        type: 'column',
        name: 'Stage',
        data: [1.4, 1.7, 1.6, 1.5, 1.4]
    }, {
        type: 'column',
        name: 'Case',
        data: [0.9, 1.1, 1, 0.9, 1]
    }, {
        type: 'spline',
        name: 'Journey',
        data: [3.5, 5.0, 3.8, 3.5, 3.0],
        marker: {
            lineWidth: 2,
            lineColor: "#EDD4BF",
            fillColor: 'white'
        }
    }]
};

export const SuccessRateCustomerGraphModel = {
    chart: {
        type: 'column'
    },
    credits: {
        enabled: false
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['Atlanta', 'Washington', 'Dallas', 'Bengaluru', 'Hyderabad']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Success Rate'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: 'gray'
            }
        }
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                color: 'black',
                textOutline: '0px',
                borderWidth: 0,
                backgroundColor: "transparent"
            }
        }
    },
    series: [{
        name: 'L1 Support',
        data: [72, 68, 75, 12, 7]
    }, {
        name: 'CA Group',
        data: [8, 12, 10, 62, 8]
    }, {
        name: 'Tech Support',
        data: [5, 4, 4, 7, 35]
    }]
};

export const SuccessRateCCGraphModel = {
    chart: {
        type: 'column'
    },
    credits: {
        enabled: false
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Success Rate'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '<b>{point.y}</b>'
    },
    series: [{
        name: 'Population',
        data: [
            ['Tech Savvy', 92.7],
            ['Millenial', 78.1],
            ['Yuppie', 77.2],
            ['Baby Boomers', 10.5],
            ['Old School', 8.0],

        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: 'black',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
};

export const CustomerProfileGraphModel = {
    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['Baby Bumblers', 'Millennial', 'Sport'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    plotOptions: {
        bar: {
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Escalate to Customer Advocacy',
        data: [20, 30, 20]
    }, {
        name: 'Visual Support',
        data: [20, 25, 20]
    }, {
        name: 'Reset Device',
        data: [45, 40, 55]
    }, {
        name: 'Issue Resolved',
        data: [15, 5, 5]
    }]
};

export const JourneysStatsGraphModel = {
    chart: {
        zoomType: 'x'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'datetime',
        title: {
            text: null
        },
        startOnTick: 14,
        endOnTick: false
    },
    yAxis: {
        endOnTick: false,
        startOnTick: false,
        labels: {
            enabled: false
        },
        title: {
            text: null
        },
        tickPositions: [0]
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            fillColor: "#BF5B5B",
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },

    series: [{
        type: 'area',
        lineWidth: 0,
        marker: {
            enabled: false,
        },
        name: '',
        data: createRandomDateGraphArray(190, 200, 50)
    }]
};

export const ActivityByJourneyTypeGraphModel = {
    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['Nurture', 'Promo', 'Gift', 'Event', 'Upsell'],
        title: {
            text: null,
        },
        legend: {
            enabled: false
        }
    },
    yAxis: {
        min: 0,
        title: null,
        labels: {
            overflow: 'justify'
        },
        legend: {
            enabled: false
        }
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    plotOptions: {
        bar: {
        }
    },
    credits: {
        enabled: false
    },
    series: [
        {
            type: "bar",
            name: '',
            data: [
                {
                    color: "rgba(91, 192, 41, 0.6)",
                    x: 0,
                    y: 1100000
                },
                {
                    color: "rgba(255, 187, 41, 0.6)",
                    x: 1,
                    y: 920000
                },
                {
                    color: "rgba(31, 142, 218, 0.6)",
                    x: 2,
                    y: 730000
                },
                {
                    color: "rgba(191, 91, 91, 0.6)",
                    x: 3,
                    y: 580000
                },
                {
                    color: "rgba(120, 196, 235, 0.6)",
                    x: 4,
                    y: 400000
                }
            ],
            showInLegend: false,
            color: "rgba(91, 192, 41, 0.6)",
            colorIndex: 1
        }
    ]
};

export const InboundActivityGraphModel = {

    chart: {
        type: 'bubble',
        zoomType: 'xy'
    },

    title: {
        text: ''
    },

    xAxis: {
        gridLineWidth: 0,
        min: 0,
        max: 15,
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        min: 0,
        max: 100,
        title: {
            enabled: false
        },
        labels: {
            format: '{value} %'
        }
    },

    tooltip: {
        pointFormat: '{point.x}, {point.y}%, {point.z}'
    },

    series: [
        {
            name: "Green",
            data: [
                [13.5, 20, 32],
                [11, 80, 32],
                [4, 80, 51],
                [3, 35, 47],
                [2.4, 10, 51],
                [1.5, 30, 60],
                [1.5, 50, 37],
                [1, 80, 32],
            ],
            marker: {
                fillColor: "rgba(91, 192, 41, 0.6)",
                lineWidth: 0
            },
            showInLegend: false,
            zMin: 20
        },
        {
            name: "Blue",
            data: [
                [11, 25, 25],
                [10.5, 70, 25],
                [7.8, 58, 14],
                [6, 38, 13],
                [4, 20, 49],
                [4, 20, 49],
                [1.3, 6, 60],
                [0.7, 50, 41],
            ],
            marker: {
                fillColor: "rgba(31, 142, 218, 0.6)",
                lineWidth: 0
            },
            showInLegend: false,
            zMin: 10
        },
        {
            name: "Red",
            data: [
                [9, 16, 34],
                [7.7, 5, 27],
                [4, 74, 49],
                [3.2, 30, 57],
                [2, 30, 48],
                [1, 55, 52]
            ],
            marker: {
                fillColor: "rgba(191, 91, 91, 0.6);",
                lineWidth: 0
            },
            showInLegend: false,
            zMin: 10
        },
        {
            name: "Red",
            data: [
                [8, 30, 25],
                [6, 16, 25],
                [4.8, 58, 41],
                [3, 10, 63],
                [2.3, 54, 49],
                [1, 10, 50],
                [0.5, 30, 45]
            ],
            marker: {
                fillColor: "rgba(255, 187, 41, 0.6)",
                lineWidth: 0
            },
            showInLegend: false,
            zMin: 10
        }
    ]

};

export const JourneysLifecycleGraphModel = {
    chart: {
        type: 'pie'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    plotOptions: {
        pie: {
            shadow: false,
            center: ['50%', '50%']
        }
    },
    tooltip: {
        valueSuffix: ' ',
        pointFormat: '{point.y}'
    },
    series: [{
        data:  [
            {
                name: 'Active',
                y: 156,
                color: 'rgb(91, 192, 41)',
                dataLabels: {
                    color: 'rgb(91, 192, 41)',
                    connectorColor: 'rgb(91, 192, 41)',
                    formatter: function () {
                        return this.y > 1 ? '<b style="font-size: 16px">' + this.y + '</b>' + ': <br />' + this.point.name : null;
                    }
                }
            },
            {
                name: 'Drafts',
                y: 44,
                color: "#B9B9B9",
                dataLabels: {
                    color: '#999999',
                    connectorColor: '#B9B9B9',
                    formatter: function () {
                        return this.y > 1 ? '<b style="font-size: 16px">' + this.y + '</b>' + ': <br />' + this.point.name : null;
                    }
                }
            },
            {
                name: 'Scheduled',
                y: 12,
                color: "rgb(255, 187, 41)",
                dataLabels: {
                    color: 'rgb(255, 187, 41)',
                    connectorColor: 'rgb(255, 187, 41)',
                    formatter: function () {
                        return this.y > 1 ? '<b style="font-size: 16px">' + this.y + '</b>' + ': <br />' + this.point.name : null;
                    }
                }
            }
        ],
        size: '80%',
        innerSize: '60%'
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 400
            },
            chartOptions: {
                series: [{
                    id: 'versions',
                    dataLabels: {
                        enabled: false
                    }
                }]
            }
        }]
    }
};

export const DatabaseActivityGraphModel = {
    chart: {
        type: 'column'
    },
    credits: {
        enabled: false
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        tickWidth:0,
        gridLineWidth: 0,
        labels: {
            enabled: false
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        gridLineWidth: 0,
        labels: {
            enabled: false
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        enabled: false
    },
    plotOptions: {
        column: {
            groupPadding:0.01
        }
    },
    series: [{
        data: [
            [0, 10],
            [5, 8],
            [11, 3],
            [15, 2],
            [20, 4],
            [22, 10],
            [27, 8],
            [29, 6],
        ],
        dataLabels: {
            enabled: false
        }
    }]
};


/* helpers */
export function createRandomDateGraphArray(minNumber: number, maxNumber, numberOfElements: number): number[] {
    let arr = [];

    while(numberOfElements--) {
        let currentDate = new Date(),
            dateGraphDataArray = [];

        currentDate.setDate(currentDate.getDate() + numberOfElements);
        dateGraphDataArray.push(+currentDate);
        dateGraphDataArray.push((Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber)/100);

        arr.push(dateGraphDataArray)
    }

    return arr;
}
