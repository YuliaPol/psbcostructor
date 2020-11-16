
if(chartData.length > 0){
    DrawCharts(chartData);
}
$( window ).resize(function() {
    ClearChart(chartData);
    DrawCharts(chartData);
});
function DrawCharts(chartData){
    for(let i = 0; i < chartData.length; i++){
        if(chartData[i].element && chartData[i].data){
            if(chartData[i].type == 'radialbar'){
                RadilaBar  = $(chartData[i].element).radialBar({
                    data: chartData[i].data,
                    width: "250",
                    height: "250",
                    padding: 10,
                });
            }
            if(chartData[i].type == 'simpleBar'){
                drawSimpleBar($(chartData[i].element), chartData[i].data);
            }
            if(chartData[i].type == 'horizontalbar'){
                drawHorizontalBar(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'dougnatSimple'){
                drawDoughnatSimple(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'pieSimple'){
                drawPieSimple(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'verticalBar'){
                drawVerticalBar(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'shadowLine'){
                drawShadowLine(chartData[i].element, chartData[i].data, chartData[i].borderColor);
            }
        }
    }
}
function ClearChart(chartData){
    // $('.chart-content .chart').children().html(' ');
    $('.chart-content .legend .legend-list').html(' ');
    for(let i = 0; i < chartData.length; i++){
        if(chartData[i].type !== 'radialbar'){
            $(chartData[i].element).html(' ');
        }
    }
}
function drawShadowLine(element, data, borderColor) {
    //type shadowLine
    (function()
    {
        var ShadowLineElement = Chart.elements.Line.extend({
            draw: function()
            {
                var ctx = this._chart.ctx;
                var vm = this._view;
                var borderColor = vm.borderColor;
                var originalStroke = ctx.stroke;
                ctx.stroke = function()
                {
                    ctx.save();
                    ctx.shadowColor = borderColor;
                    ctx.shadowBlur = 4;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    originalStroke.apply(this, arguments);
                    ctx.restore();
                };
                Chart.elements.Line.prototype.draw.apply(this, arguments);
                ctx.stroke = originalStroke;
            }
        });
        Chart.defaults.ShadowLine = Chart.defaults.line;
        Chart.controllers.ShadowLine = Chart.controllers.line.extend({
            datasetElementType: ShadowLineElement
        });
    })();

    if($(element).length==1){
        var id = element.split('.')[1];
        var width = 500;
        var height = 200;
        if(window.screen.width > 992 && window.screen.width <= 1200) {
            width = 600;
            height = 350;
        }
        else if(window.screen.width > 768 && window.screen.width <= 992){
            width = 600;
            height = 200;
        }
        else if(window.screen.width > 500 && window.screen.width <= 768) {
            width = 750;
            height = 250;
        }
        else if(window.screen.width <= 500) {
            width = 350;
            height = 200;
        }
        var canvas = '<canvas  id="' + id + '" style="height: '+ height + 'px; width: '+ width +'px;"></canvas>';
        $(canvas).appendTo($(element));
        data.reverse();   
        var newData = new Array(data.length);
        var backgroundColor = new Array(data.length);
        var labels = new Array(data.length);
        var maxValue = data[0].progress;
        for (let i = 0; i < data.length; i++) {
            labels[i] = 'Оценка ' + data[i].labelText;
            backgroundColor[i] = data[i].background;
            newData[i] = data[i].progress;
            if(maxValue<data[i].progress){
                maxValue = data[i].progress;
            }
        }
        maxValue = parseInt(maxValue) + 10;
        var shadowLineEl = document.getElementById(id).getContext('2d');
        gradient = shadowLineEl.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, borderColor);
        gradient.addColorStop(0.5, borderColor + '55');
        gradient.addColorStop(0.9, borderColor + '00');

        var ChartData = {
            labels: labels,
            datasets: [{
                data: newData,
                backgroundColor: gradient,
                pointBackgroundColor: 'white',
                borderWidth: 2,
                borderColor: borderColor,
            }]
        };

        //options team Chart
        var optionsLine = {
            responsive: true,
            maintainAspectRatio: true,
            cutoutPercentage: 70,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            hover: {mode: null},
            scales: {
                xAxes: [{
                    gridLines: {
                        color: '#D5D3D3',
                        lineWidth: 1
                    },
                    ticks: {
                        fontSize: 10
                    }
                }],
                yAxes: [{
                    barPercentage: 1.0,
                    weight: 100,
                    gridLines: {
                        color: '#D5D3D3',
                        lineWidth: 1
                    },
                    ticks: {
                        min: 0,
                        padding: 10,
                    }
                }],
            },
            elements: {
                line: {
                    tension: 0.4,
                }
            },
            legend: {
                display: false
            },
            point: {
                backgroundColor: 'white'
            },
            tooltips: {
                mode: 'nearest',
                backgroundColor: borderColor,
                titleFontSize: 8,
                titleAlign: 'center',
                position: 'average',
                xPadding: 10,
                yPadding: 5,
                cornerRadius: 10,
                displayColors: false,
                // yAlign: 'bottom',
                // xAlign: 'center',
                callbacks: {
                    title: function() {},
                    label: function(tooltipItem, data) {
                        var values = data.datasets[tooltipItem.datasetIndex].data;
                        var total = 0;
                        for(let i = 0; i < values.length; i++){
                            total += parseInt(values[i]);
                        }
                        var percent = Math.round((100/total)*data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                        var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
                        label =  percent + '% / '+ label + ' шт';
                        return label;
                    }
                }
            }
        };
        chartInstanceTeam = new Chart(shadowLineEl, {
            type: 'ShadowLine',
            data: ChartData,
            responsive: true,
            options: optionsLine
        });

    }
}
function drawDoughnatSimple(element, data){
    $(element).attr('data-legend', '1');
    if($(element).length==1){
        var newData = data;
        for (let i = 0; i < data.length; i++) {
            newData[i].title = data[i].labelText;
            newData[i].color = data[i].background;
            newData[i].value = parseInt(data[i].progress);
        }
        if(newData) {
            $(element).drawDoughnutChart(newData);
            DrawLegend1(element, data);
        }
    }
}
function drawPieSimple(element, data){
    if($(element).length==1){
        var newData = data;
        for (let i = 0; i < data.length; i++) {
            newData[i].title = data[i].labelText;
            newData[i].color = data[i].background;
            newData[i].value = parseInt(data[i].progress);
        }
        if(newData) {
            $(element).drawPieChart(newData);
            DrawLegend1(element, data);
        }
    }
}
function drawVerticalBar(element, data) {
    if($(element).length==1){
        var id = element.split('.')[1];
        var width = 300;
        var height = 200;
        if(window.screen.width > 768 && window.screen.width < 992){
            width = 350;
            height = 200;
        }
        else if(window.screen.width > 500 && window.screen.width <= 768) {
            width = 750;
            height = 250;
        }
        else if(window.screen.width <= 500) {
            width = 350;
            height = 200;
        }
        var canvas = '<canvas  id="' + id + '" style="height: '+ height + 'px; width: '+ width +'px;"></canvas>';
        $(canvas).appendTo($(element));
        data.reverse();   
        var newData = new Array(data.length);
        var backgroundColor = new Array(data.length);
        var labels = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            labels[i] = 'Оценка ' + data[i].labelText;
            backgroundColor[i] = data[i].background;
            newData[i] = data[i].progress;
        }

        var ChartData = {
            labels: labels,
            datasets: [{
                data: newData,
                backgroundColor: backgroundColor,
                hoverBackgroundColor: backgroundColor,
                borderWidth: 0
            }]
        };

        var vertical = document.getElementById(id).getContext('2d');
        var myBarChart = new Chart(vertical, {
            type: 'bar',
            data: ChartData,
            options: {
                tooltips: {
                    enabled: true,
                    mode: 'point',
                    backgroundColor: '#C9C9C9',
                    titleFontSize: 8,
                    titleAlign: 'center',
                    xPadding: 10,
                    yPadding: 5,
                    cornerRadius: 10,
                    displayColors: false,
                    callbacks: {
                        title: function() {},
                        label: function(tooltipItem, data) {
                            var values = data.datasets[tooltipItem.datasetIndex].data;
                            var total = 0;
                            for(let i = 0; i < values.length; i++){
                                total += parseInt(values[i]);
                            }
                            var percent = Math.round((100/total)*data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                            var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
                            label =  percent + '% / '+ label + ' шт';
                            return label;
                        }
                    }
                },
                hover: {mode: null},
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: '#fff',
                            lineWidth: 0
                        },
                        ticks: {
                            fontSize: 10,
                            min: 0,
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#D5D3D3',
                            lineWidth: 1
                        },
                        ticks: {
                            min: 0,
                            fontSize: 10,
                            padding: 10
                        }
                    }],
                },
            }
        });
    }
}
function drawSimpleBar(element, data) {
    if(data.length > 0){
        var percent = new Array(data.length);
        var summary = 0;
        var maxValue = 0;
        for (let i = 0; i < data.length; i++) {
            summary = summary + parseInt(data[i].progress);
            if(parseInt(data[i].progress) > maxValue){
                maxValue = parseInt(data[i].progress);
            }
        }

        var percentFill = new Array(data.length);
        var relativeFill = 100 / maxValue;
            
        var relative = 100 / summary;
        for (let i = 0; i < data.length; i++) {
            percent[i] = Math.round(relative*data[i].progress);
            percentFill[i] = Math.round(relativeFill*data[i].progress*0.9);
        }
        var elements = '<div class="barlist">';
        var width = parseInt(data.length);
        for (let i = 0; i < data.length; i++) {
            var top = 100 - percentFill[i];
            elements = elements + 
            '<div class="baritem" style="max-width: calc(100%/' + width +');width: calc(100%/' + width +');">'
            +'    <div class="barcol">'
            +'      <div class="barcolFill" style="background-color: '+ data[i].background + '; top: ' + top + '%"></div>'
            +'      <div class="value">' + percent[i] + '% / '+ data[i].progress + ' шт</div>'
            +'  </div>'
            +'  <div class="label">оценкa <span class="bold">' + data[i].labelText + '</span></div>'
            +'</div>';
        }
        var elements = elements + '</div>';
        element.addClass('varticalbarChart');
        $(elements).appendTo(element);
    }
}
function DrawLegend1(element, data) {
    var legend = $(element).parents('.chart-content').find('.legend .legend-list');
    var segmentTotal = 0;
    for (var i = 0, len = data.length; i < len; i++){
        if(data[i].value) {
            segmentTotal += data[i].value;
        }
    }
    //percent for each value
    for (var i = 0, len = data.length; i < len; i++){
        if(data[i].value) {
            data[i].percent = Math.round((100/segmentTotal)*data[i].value);
        }
    }
    for (var i = 0, len = data.length; i < len; i++){
        if( data[i].value) {
          var legendRow = 
          '<div class="legend-item">'
          +'    <div class="col-square">'
          +'      <div class="square" style="background: '+ data[i].color +'"></div>'
          +'  </div>'
          +'  <div class="col-label">'
          +'      Оценка <span class="bold">' + data[i].title + '</span>'
          +'  </div>'
          +'  <div class="col-value">'
          +'      ' + data[i].percent + '%'
          +'  </div>'
          +'</div>';
          $(legendRow).appendTo(legend);
        }
      }
}
function drawHorizontalBar(element, data){
    if($(element).length==1){
        var id = element.split('.')[1];
        var width = 600;
        var height = 230;
        if(window.screen.width > 768 && window.screen.width < 992){
            width = 600;
            height = 230;
        }
        else if(window.screen.width > 500 && window.screen.width <= 768) {
            width = 750;
            height = 250;
        }
        else if(window.screen.width <= 500) {
            width = 350;
            height = 200;
        }
        var canvas = '<canvas  id="' + id + '" style="height: '+ height + 'px; width: '+ width +'px;"></canvas>';
        $(canvas).appendTo($(element));        
        var newData = new Array(data.length);
        var backgroundColor = new Array(data.length);
        var labels = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            labels[i] = data[i].labelText;
            backgroundColor[i] = data[i].background;
            newData[i] = data[i].progress;
        }

        var ChartData = {
            labels: labels,
            datasets: [{
                data: newData,
                backgroundColor: backgroundColor,
                hoverBackgroundColor: backgroundColor,
                borderWidth: 0
            }]
        };

        var horizontal = document.getElementById(id).getContext('2d');
        var myBarChart = new Chart(horizontal, {
            type: 'horizontalBar',
            data: ChartData,
            options: {
                cornerRadius: 100,
                cornerposition: 'right', //right, left, bottom, top, all
                tooltips: {
                    enabled: false
                },
                hover: {mode: null},
                legend: {
                    display: false,
                },
                layout: {
                    padding: {
                        left: 50//for text-align
                    }
                }, 
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: '#D5D3D3',
                            lineWidth: 1
                        },
                        ticks: {
                            fontSize: 10,
                            min: 0,
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#D5D3D3',
                            lineWidth: 1
                        },
                        ticks: {
                            fontSize: 10,
                            mirror: true,//for text-align
                            padding: 50//for text-align
                        }
                    }],
                },
            },
            plugins: [{
                afterDraw: function(horizontal){    
                    var ctx = horizontal.chart.ctx; 
                    var yAxis = horizontal.scales['y-axis-0'];
                    var bottom = yAxis.bottom;
                    for (var index = 0; index < yAxis.ticks.length; index++) {
                        var y = yAxis.getPixelForTick(index);  
                        if (!window.document.documentMode) {
                            if(index != 0){
                                ctx.beginPath();
                                ctx.moveTo(15,  y + 0.5);
                                ctx.lineTo(yAxis.right,  y + 0.5);
                                ctx.lineWidth = 1;
                                ctx.strokeStyle = "#D5D3D3";
                                ctx.stroke();
                            }
                        }
                    }
                    ctx.beginPath();
                    ctx.moveTo(15,  bottom + 0.5);
                    ctx.lineTo(yAxis.right,  bottom + 0.5);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "#D5D3D3";
                    ctx.stroke();
                }
            }],
        });
    }
}

