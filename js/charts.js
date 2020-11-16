
if(chartData.length > 0){
    for(let i = 0; i < chartData.length; i++){
        if(chartData[i].element && chartData[i].data){
            var data = chartData[i].data;
            if(chartData[i].type == 'radialbar'){
                $(chartData[i].element).radialBar({
                    data: data,
                    width: "250",
                    height: "250",
                    padding: 10,
                });
            }
            if(chartData[i].type == 'simpleBar'){
                drawSimpleBar($(chartData[i].element), data);
            }
            if(chartData[i].type == 'horizontalbar'){
                drawHorizontalBar(chartData[i].element, data);
            }
            if(chartData[i].type == 'dougnatSimple'){
                drawDoughnatSimple(chartData[i].element, data);
            }
        }
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
        }
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
function drawHorizontalBar(element, data){
    if($(element).length==1){
        var id = element.split('.')[1];
        var canvas = '<canvas  id="' + id + '" style="height: 230px; width: 600px;"></canvas>';
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