jQuery(function ($) {
    $(document).ready(function () {
        if(typeof chartData != 'undefined'){
            if(chartData.length > 0){
                copyChartsForPdf();
                function copyChartsForPdf(){
                    var chartsElements = $('.charts-content').clone();
                    $('.charts-for-pdf').append(chartsElements);
                    for (let i = 0; i < chartData.length; i++) {
                        let className = chartData[i].element.split('.')[1] + '-PDF';
                        $('.charts-for-pdf').find(chartData[i].element).attr('class', className);
                    }
                }
                function drawChartsForPDF() {
                    var chartPDFData = new Array();
                    for (let i = 0; i < chartData.length; i++) {
                        let tempEl = chartData[i];
                        tempEl.elementPDF = tempEl.element + '-PDF';
                        chartPDFData.push(tempEl);
                    }
                    DrawChartsPDF(chartPDFData);
                }

                DrawCharts(chartData);
                drawChartsForPDF();
                $('#create_pdf').on('click', function () {
                    // $('body').scrollTop(0);
                    setTimeout(function(){ createPDF(); }, 1500);
                });
                var form = $('.charts-for-pdf'),
                cache_width = form.width(),
                a4 = [1100.28, 580.89];  // for a4 size paper width and height
                //create pdf
                function createPDF() {
                    getCanvas().then(function (canvas) {
                        var imgData = canvas.toDataURL('image/jpeg', 1.0);
                        /*
                        Here are the numbers (paper width and height) that I found to work.
                        It still creates a little overlap part between the pages, but good enough for me.
                        if you can find an official number from jsPDF, use them.
                        */
                        var imgWidth = 210;
                        var pageHeight = 295;
                        var imgHeight = canvas.height * imgWidth / canvas.width;
                        var heightLeft = imgHeight;

                        var doc = new jsPDF('p', 'mm');
                        var position = 0;
                        var today = new Date();
                        var dd = String(today.getDate()).padStart(2, '0');
                        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                        var yyyy = today.getFullYear();

                        doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
                        heightLeft -= pageHeight;
                        while (heightLeft >= 0) {
                            position = heightLeft - imgHeight;
                            doc.addPage();
                            doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
                            heightLeft -= pageHeight;
                        }

                        doc.save('выгрузка-' + dd + '-' + mm + '-' + yyyy + '.pdf');
                    });
                }


                // create canvas object
                function getCanvas() {
                    form.width(a4[0]);
                    return html2canvas(form[0], {
                        imageTimeout: 1000,
                        removeContainer: true
                    });
                }
            }
        }
    });
});
$( window ).resize(function() {
    if(typeof chartData != 'undefined'){
        if(chartData.length > 0){
            ClearChart(chartData);
            DrawCharts(chartData);
        }
    }
});
function DrawCharts(chartData){
    for(let i = 0; i < chartData.length; i++){
        if(chartData[i].element && chartData[i].data){
            if(chartData[i].type == 'radialbar'){
                var Radialdata = chartData[i].data;
                if(Radialdata[0].labelText !== '5') {
                    Radialdata.reverse();
                }
                RadilaBar  = $(chartData[i].element).radialBar({
                    data: Radialdata,
                    width: "250",
                    height: "250",
                    padding: 10,
                    legend: 'square'
                });
            }
            if(chartData[i].type == 'radialBar2'){
                var Radialdata = chartData[i].data;
                if(Radialdata[0].labelText !== '5') {
                    Radialdata.reverse();
                }
                RadilaBar  = $(chartData[i].element).radialBar({
                    data: Radialdata,
                    width: "250",
                    height: "250",
                    padding: 10,
                    strokeCloneCircle: 1,
                    round: false,
                    tooltip: true,
                    legend: 'circle'
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
            if(chartData[i].type == 'dougnatIncrease'){
                drawDoughnatIncrease(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'pieSimple'){
                drawPieSimple(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'pieRound'){
                drawPieRound(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'verticalBar'){
                drawVerticalBar(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'shadowLine'){
                drawShadowLine(chartData[i].element, chartData[i].data, chartData[i].borderColor);
            }
            if(chartData[i].type == 'lineDot'){
                drawLineDot(chartData[i].element, chartData[i].data, chartData[i].dotColor);
            }
            if(chartData[i].type == 'pyramid'){
                DrawPyramide(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'varticalBarShadow'){
                DrawVerticalBarShadow(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'HorizontalLines'){
                DrawHorizontalLines(chartData[i].element, chartData[i].data);
            }
            if(chartData[i].type == 'longLine'){
                DrawLongLine(chartData[i].element, chartData[i].data);
            }
        }
    }
}
function DrawChartsPDF(chartData){
    for(let i = 0; i < chartData.length; i++){
        if(chartData[i].elementPDF && chartData[i].data){
            if(chartData[i].type == 'radialbar'){
                var Radialdata = chartData[i].data;
                // Radialdata.reverse();
                RadilaBar  = $(chartData[i].elementPDF).radialBar({
                    data: Radialdata,
                    width: "350",
                    height: "350",
                    padding: 10,
                    legend: 'square'
                });
            }
            if(chartData[i].type == 'radialBar2'){
                var Radialdata = chartData[i].data;
                // Radialdata.reverse();
                RadilaBar  = $(chartData[i].elementPDF).radialBar({
                    data: Radialdata,
                    width: "350",
                    height: "350",
                    padding: 10,
                    strokeCloneCircle: 1,
                    round: false,
                    tooltip: true,
                    legend: 'circle'
                });
            }
            if(chartData[i].type == 'simpleBar'){
                drawSimpleBar($(chartData[i].elementPDF), chartData[i].data);
            }
            if(chartData[i].type == 'horizontalbar'){
                drawHorizontalBar(chartData[i].elementPDF, chartData[i].data);
            }
            if(chartData[i].type == 'dougnatSimple'){
                drawDoughnatSimple(chartData[i].elementPDF, chartData[i].data);
            }
            if(chartData[i].type == 'dougnatIncrease'){
                drawDoughnatIncrease(chartData[i].elementPDF, chartData[i].data);
            }
            if(chartData[i].type == 'pieSimple'){
                drawPieSimple(chartData[i].elementPDF, chartData[i].data);
            }
            if(chartData[i].type == 'pieRound'){
                drawPieRound(chartData[i].elementPDF, chartData[i].data);
            }
            if(chartData[i].type == 'verticalBar'){
                drawVerticalBar(chartData[i].elementPDF, chartData[i].data);
            }
            if(chartData[i].type == 'shadowLine'){
                drawShadowLine(chartData[i].elementPDF, chartData[i].data, chartData[i].borderColor);
            }
            if(chartData[i].type == 'lineDot'){
                drawLineDot(chartData[i].elementPDF, chartData[i].data, chartData[i].dotColor);
            }
            if(chartData[i].type == 'pyramid'){
                DrawPyramide(chartData[i].elementPDF, chartData[i].data);
            }
            if(chartData[i].type == 'varticalBarShadow'){
                DrawVerticalBarShadow(chartData[i].elementPDF, chartData[i].data);
            }
            if(chartData[i].type == 'HorizontalLines'){
                DrawHorizontalLines(chartData[i].elementPDF, chartData[i].data);
            }
            if(chartData[i].type == 'longLine'){
                DrawLongLine(chartData[i].elementPDF, chartData[i].data);
            }
        }
    }
}
function ClearChart(chartData){
    $('.doughnutTipExpand').remove();
    $('.pyraamidTip').remove();
    $('.doughnutTip').remove();
    $('.pieTip').remove();
    for(let i = 0; i < chartData.length; i++){
        if(chartData[i].type !== 'radialbar' && chartData[i].type !== 'radialBar2'){
            $(chartData[i].element).html(' ');
            $(chartData[i].element).parents('.chart-content').find('.legend .legend-list').html(' ');
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
    if($(element).length==1 && data.length > 0){
        if(data[0].labelText !== '5') {
            data.reverse();
        }
        var id = element.split('.')[1];
        var width = 500;
        var height = 200;
        if($(element).parents('.charts-for-pdf').length>0){
            width = 600;
            height = 200;
        } 
        else if($(element).parents('.width-50').length>0){
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
        }
        else if($(element).parents('.width-33').length>0){ 
            width = 300;
            height = 200;
            if(window.screen.width > 992 && window.screen.width <= 1200) {
                width = 200;
                height = 150;
            }
            else if(window.screen.width > 768 && window.screen.width <= 992){
                width = 500;
                height = 300;
            }
            else if(window.screen.width > 500 && window.screen.width <= 768) {
                width = 750;
                height = 350;
            }
            else if(window.screen.width <= 500) {
                width = 350;
                height = 200;
            }
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
        Chart.plugins.register({
            beforeRender: function(chart) {
                if (chart.config.options.showAllTooltips) {
                // create an array of tooltips, 
                // we can't use the chart tooltip because there is only one tooltip per chart
                chart.pluginTooltips = [];
                chart.config.data.datasets.forEach(function(dataset, i) {
                    chart.getDatasetMeta(i).data.forEach(function(sector, j) {
                    chart.pluginTooltips.push(new Chart.Tooltip({
                        _chart: chart.chart,
                        _chartInstance: chart,
                        _data: chart.data,
                        _options: chart.options.tooltips,
                        _active: [sector]
                    }, chart));
                    });
                });      
                chart.options.tooltips.enabled = false; // turn off normal tooltips
                }
            },
            afterDraw: function(chart, easing) {
                if (chart.config.options.showAllTooltips) {
                if (!chart.allTooltipsOnce) {
                    if (easing !== 1) {
                    return;
                    }
                    chart.allTooltipsOnce = true;
                }
                chart.options.tooltips.enabled = true;
                Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
                    tooltip.initialize();
                    tooltip.update();
                    tooltip.pivot();
                    tooltip.transition(easing).draw();
                });
                chart.options.tooltips.enabled = false;
                }
            }
        });
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
        var fontSize = 10;
        if($(element).parents('.charts-for-pdf').length>0){
            fontSize = 14;
        } 
        let showAllTooltips = false;
        if($(element).parents('.charts-for-pdf').length > 0){
            showAllTooltips = true;
        }
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
                        fontSize: fontSize,
                        min: 0
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
                        beginAtZero: true,
                        fontSize: fontSize,
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
                fontSize: fontSize,
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
                        var percent;
                        if(parseInt(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])>0){
                            percent = Math.round((100/total)*data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                        }
                        else {
                            percent = 0;
                        }
                        var label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
                        label =  percent + '% / '+ label + ' шт';
                        return label;
                    }
                }
            },
            showAllTooltips: showAllTooltips
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
    if($(element).length==1 && data.length > 0){
        $(element).attr('data-legend', '1');
        var newData = data;
        if(data[0].labelText !== '5') {
            newData.reverse();
        }
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
function drawDoughnatIncrease(element, data){
    if($(element).length==1 && data.length > 0){
        $(element).attr('data-increase', 'true');
        $(element).attr('data-tooltip', 'expand');
        $(element).addClass('addShadow');
        var newData = data;
        if(data[0].labelText !== '5') {
            newData.reverse();
        }
        for (let i = 0; i < data.length; i++) {
            newData[i].title = data[i].labelText;
            newData[i].color = data[i].background;
            newData[i].value = parseInt(data[i].progress);
        }
        if(newData) {
            $(element).drawDoughnutChart(newData);
            DrawLegend2(element, data);
        }
    }
}
function drawPieSimple(element, data){
    if($(element).length==1 && data.length > 0){
        var newData = new Array();
        var total = 0;
        for (let i = 0; i < data.length; i++) {
            var temp = {
                title: data[i].labelText,
                color: data[i].background,
                value: parseInt(data[i].progress)
            }
            total = total + parseInt(data[i].progress);
            newData.push(temp);
        }
        if(newData[0].title !== '5') {
            newData.reverse();
        }
        if(newData) {
            if(total > 0) {
                $(element).drawPieChart(newData);
            }
            DrawLegend1(element, newData);
        }
    }
}
function drawPieRound(element, data){
    if($(element).length==1 && data.length > 0){
        var newData = data;
        var total = 0;
        $(element).addClass('rounded');
        for (let i = 0; i < data.length; i++) {
            newData[i].title = data[i].labelText;
            newData[i].color = data[i].background;
            newData[i].value = parseInt(data[i].progress);
            total = total + parseInt(data[i].progress);
        }
        if(newData) {
            if(total > 0) {
                $(element).drawPieChart(newData);
            }
            DrawLegend2(element, data);
        }
    }
}
function drawVerticalBar(element, data) {
    if($(element).length==1 && data.length > 0){
        var id = element.split('.')[1];
        var width = 300;
        var height = 200;
        if(data[0].labelText !== '5') {
            data.reverse();
        }
        if($(element).parents('.charts-for-pdf').length>0){
            width = 600;
            height = 200;
        } 
        else if(window.screen.width > 768 && window.screen.width < 992){
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

        var fontSize = 10;
        if($(element).parents('.charts-for-pdf').length>0){
            fontSize = 14;
        } 
      
        Chart.plugins.register({
            beforeRender: function(chart) {
                if (chart.config.options.showAllTooltips) {
                // create an array of tooltips, 
                // we can't use the chart tooltip because there is only one tooltip per chart
                chart.pluginTooltips = [];
                chart.config.data.datasets.forEach(function(dataset, i) {
                    chart.getDatasetMeta(i).data.forEach(function(sector, j) {
                    chart.pluginTooltips.push(new Chart.Tooltip({
                        _chart: chart.chart,
                        _chartInstance: chart,
                        _data: chart.data,
                        _options: chart.options.tooltips,
                        _active: [sector]
                    }, chart));
                    });
                });      
                chart.options.tooltips.enabled = false; // turn off normal tooltips
                }
            },
            afterDraw: function(chart, easing) {
                if (chart.config.options.showAllTooltips) {
                if (!chart.allTooltipsOnce) {
                    if (easing !== 1) {
                    return;
                    }
                    chart.allTooltipsOnce = true;
                }
                chart.options.tooltips.enabled = true;
                Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
                    tooltip.initialize();
                    tooltip.update();
                    tooltip.pivot();
                    tooltip.transition(easing).draw();
                });
                chart.options.tooltips.enabled = false;
                }
            }
        });
        var vertical = document.getElementById(id).getContext('2d');
        let showAllTooltips = false;
        if($(element).parents('.charts-for-pdf').length > 0 ){
            showAllTooltips = true;
        }
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
                            var percent;
                            if(parseInt(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index])) {
                                percent = Math.round((100/total)*data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
                            }
                            else {
                                percent = 0;
                            }
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
                            fontSize: fontSize,
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
                            fontSize: fontSize,
                            padding: 10,
                            beginAtZero: true
                        }
                    }],
                },
                showAllTooltips: showAllTooltips
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
            if(parseInt(data[i].progress) > 0){
                percent[i] = Math.round(relative*parseInt(data[i].progress));
                percentFill[i] = Math.round(relativeFill*parseInt(data[i].progress)*0.9);
            }
            else {
                percent[i] = 0;
                percentFill[i] = 0;
            }
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
        var bars = $(element).find('.baritem');
        for (let i = 0; i < bars.length; i++) {
            let barHeight = parseInt($(bars[i]).find('.barcolFill').outerHeight());
            let textHeight = parseInt($(bars[i]).find('.barcol .value').outerHeight()) + 3;
            if(textHeight > barHeight){
                $(bars[i]).find('.barcol .value').addClass('blackcolor');
            }
        }
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
        else {
            data[i].percent = 0;
        }
    }
    for (var i = 0, len = data.length; i < len; i++){
        // if( data[i].value) {
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
        // }
      }
}
function DrawLegend2(element, data) {
    $(element).parents('.chart-content').find('.dougnat').addClass('smalllegend');
    $(element).parents('.chart-content').find('.pieRound').addClass('smalllegend');
    var legend = $(element).parents('.chart-content').find('.legend .legend-list');
    var dataLegend = new Array(data.length);
    var summary = 0;
    for (var i = 0, len = dataLegend.length; i < len; i++){
        dataLegend[i] = data[i];
        summary += parseInt(data[i].progress);
    }
    if(dataLegend[0].title !== '5'){
        dataLegend.reverse()
    }
    let percent = 0;
    if(summary > 0){
        percent = 100/summary;
    }
    for (var i = 0, len = dataLegend.length; i < len; i++){
        let addValues = ' ';
        if($(element).parents('.charts-for-pdf').length > 0){
            addValues = '<br> (' + Math.round(percent*parseInt(data[i].progress)) +  '% / ' + data[i].progress +' шт)';
        }
          var legendRow = 
          '<div class="legend-item">'
          +'    <div class="col-square">'
          +'      <div class="square" style="background: '+ dataLegend[i].color +'"></div>'
          +'  </div>'
          +'  <div class="col-label">'
          +'      Оценка <span class="bold">' + dataLegend[i].title + '</span>' + addValues
          +'  </div>'
          +'</div>';
          $(legendRow).appendTo(legend);
        // }
    }
}
function drawHorizontalBar(element, data){
    if($(element).length==1 && data.length > 0){
        if(data[0].labelText !== '5') {
            data.reverse();
        }
        var id = element.split('.')[1];
        var width = 600;
        var height = 230;
        if($(element).parents('.charts-for-pdf').length>0){
            width = 600;
            height = 200;
        } 
        else if($(element).parents('.width-50').length>0){
            if(window.screen.width > 992 && window.screen.width <= 1200){
                width = 400;
                height = 240;
            }
            else if(window.screen.width > 768 && window.screen.width <= 992){
                width = 600;
                height = 230;
            }
            else if(window.screen.width > 500 && window.screen.width <= 768) {
                width = 750;
                height = 250;
            }
            else if(window.screen.width <= 500) {
                width = 350;
                height = 350;
            }
        }
        else if($(element).parents('.width-33').length>0){ 
            width = 300;
            height = 200;
            if(window.screen.width > 992 && window.screen.width <= 1200) {
                width = 200;
                height = 150;
            }
            else if(window.screen.width > 768 && window.screen.width <= 992){
                width = 500;
                height = 300;
            }
            else if(window.screen.width > 500 && window.screen.width <= 768) {
                width = 750;
                height = 350;
            }
            else if(window.screen.width <= 500) {
                width = 350;
                height = 200;
            }
        }
        var canvas = '<canvas  id="' + id + '" style="height: '+ height + 'px; width: '+ width +'px;"></canvas>';
        $(canvas).appendTo($(element));        
        var newData = new Array(data.length);
        var backgroundColor = new Array(data.length);
        var labels = new Array(data.length);
        var maxValue = parseInt(data[0].progress);
        for (let i = 0; i < data.length; i++) {
            var label = 'баллов';
            if(data[i].labelText == '1'){
                label = 'балл';
            }
            else if(data[i].labelText == '2' || data[i].labelText == '3' || data[i].labelText == '4'){
                label = 'балла';
            }

            labels[i] = data[i].labelText + ' ' + label;
            backgroundColor[i] = data[i].background;
            newData[i] = data[i].progress;
            if(maxValue<parseInt(data[i].progress)) {
                maxValue = parseInt(data[i].progress);
            }
        }
        maxValue = Math.round(maxValue + maxValue/5);
        if(maxValue>500){
            maxValue = Math.round(maxValue*100)/100;
        }
        else if(maxValue>100){
            maxValue = Math.round(maxValue*50)/50;
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
        var fontSize = 10;
        if($(element).parents('.charts-for-pdf').length>0){
            fontSize = 12;
        } 
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
                        left: 50,//for text-align
                    }
                }, 
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: '#D5D3D3',
                            lineWidth: 1
                        },
                        ticks: {
                            fontSize: fontSize,
                            min: 0,
                            max: maxValue,
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                var axesValue = Math.round(value*10)/10;
                                if(index==values.length-1){
                                    return ' ';
                                }
                                else {
                                    return [' ' , axesValue,  'шт'];
                                }
                            },
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#D5D3D3',
                            lineWidth: 1
                        },
                        ticks: {
                            fontSize: fontSize,
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
                    var xAxis = horizontal.scales['x-axis-0'];
                    var bottom = yAxis.bottom;
                    //y-axis line
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
                            // else {
                            //     ctx.beginPath();
                            //     ctx.moveTo(15,  y + 0.5);
                            //     ctx.lineTo(yAxis.right,  y + 0.5);
                            //     ctx.lineWidth = 5;
                            //     ctx.strokeStyle = "#fff";
                            //     ctx.stroke();
                            // }
                        }
                    }
                    ctx.beginPath();
                    ctx.moveTo(15,  bottom + 0.5);
                    ctx.lineTo(yAxis.right,  bottom + 0.5);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "#D5D3D3";
                    ctx.stroke();

                    // //x-axis line
                    // for (var index = 0; index < xAxis.ticks.length; index++) {
                    //     var x = xAxis.getPixelForTick(index);
                    //     if (!window.document.documentMode) {
                    //         if(index != xAxis.ticks.length - 1){
                    //             ctx.beginPath();
                    //             ctx.moveTo(x + 0.5,  xAxis.bottom - 38);
                    //             ctx.lineTo(x + 0.5,  xAxis.bottom - 5);
                    //             ctx.lineWidth = 1;
                    //             ctx.strokeStyle = "#D5D3D3";
                    //             ctx.stroke();
                    //         }
                    //         else {
                    //             ctx.beginPath();
                    //             ctx.moveTo(x + 0.5,  xAxis.bottom - 38);
                    //             ctx.lineTo(x + 0.5,  xAxis.bottom);
                    //             ctx.lineWidth = 5;
                    //             ctx.strokeStyle = "#fff";
                    //             ctx.stroke();
                    //         }
                    //     }
                    // }
                }
            }],
        });
    }
}
function drawLineDot(element, data, dotColor) {
    if(data.length > 0 && $(element).length>0) {
        var maxValue = parseInt(data[0].progress);
        var minValue = parseInt(data[0].progress);
        var total = 0;
        for (let i = 0; i < data.length; i++) {
            total += parseInt(data[i].progress);
            if(maxValue<data[i].progress){
                maxValue = parseInt(data[i].progress);
            }
            if(minValue>data[i].progress){
                minValue = parseInt(data[i].progress);
            }
        }
        var maxAxes = 1;
        var minAxes = 0;
        var axes = new Array();
        var step = 1;
        if(maxValue < 1) {
            maxAxes = Math.round(maxValue*10)/10 + 0.1;
            step = 0.1;
        }
        else if(maxValue < 10) {
            maxAxes = Math.round(maxValue)/ + 1;
            step = 1;
        }
        else {
            step = 5;
            while ((maxValue + step)/step > 9 || step>10000){
                if(step >=200) {
                    step += 100;
                }
                else if(step >=50) {
                    step += 50;
                }
                else if(step >=30) {
                    step += 10;
                }
                else {
                    step += 5;
                }
            }
            maxAxes = maxValue + step;
            if(minValue > step && maxAxes > 100){
                minAxes = step;
            }
        }
        var axesValue = minAxes;
        for (let i = 0; axesValue < maxAxes + step; i++) {
            axes.push(axesValue);
            axesValue = axesValue + step;
        }
    
        var percentValue = new Array(data.length);
        var percentPosition = new Array(data.length);
    
        var minValuePosition = axes[0];
        var maxValuePosition = axes[axes.length-1];
        var axesRange = maxValuePosition - minValuePosition;
        var positionPercent = 100/axesRange;
        var valuePercent = 100/total;
    
        for (let i = 0; i < data.length; i++) {
            if(parseInt(data[i].progress) > 0){
                percentValue[i] = Math.round(valuePercent*parseInt(data[i].progress));
                percentPosition[i] = Math.round(positionPercent*(parseInt(data[i].progress) - minValuePosition));
            }
            else {
                percentValue[i] = 0;
                percentPosition[i] = 0;
            }
        }

        let tooltipValue = ' ';
        var str = '<div class="lineDotcont">';
        str += '<div class="lineDotlist">';
        for (let i = 0; i < data.length; i++) {
            var label = 'баллов';
            if(data[i].labelText == '1'){
                label = 'балл';
            }
            else if(data[i].labelText == '2' || data[i].labelText == '3' || data[i].labelText == '4'){
                label = 'балла';
            }
            if($(element).parents('.charts-for-pdf').length > 0){
                tooltipValue = '<div class="tooltip-value">' + percentValue[i] + '% / ' + data[i].progress + ' шт</div>';
            }
            str += 
            '<div class="lineDotRow">'
            +'    <div class="label">' + data[i].labelText + ' ' + label
            + tooltipValue
            +'</div>'
            +'  <div class="line-col">'
            +'      <div class="line" style="background: linear-gradient(90deg, '+ data[i].backgroundStart + ' 0%, '+ data[i].backgroundEnd + ' 100%);">'
            +'          <div class="dot" style="left: calc('+ percentPosition[i] + '% - 7px);border-color: '+ dotColor +'"></div>'
            +'          <div class="tooltip" style="left: calc('+ percentPosition[i] + '% - 37px);">' + percentValue[i] + '% / ' + data[i].progress + ' шт</div>'
            +'      </div>'
            +'  </div>'
            +'</div>';
        }
        str += '</div>';
        str += '<div class="y-axis">';
        for (let i = 0; i < axes.length; i++) {
            str +=
            '<div class="axis-item">'
            +'    ' + axes[i] + '<br>'
            +'  шт'
            +'</div>';
        }
        str += '</div>';
        str += '</div>';
        $(element).append(str);
    }
}
function DrawPyramide(element, data){
    function trapezoidPath (height, topBase, bottomBase) {
        const
            topBaseOffset = (100 - topBase) / 2,
            bottomBaseOffset = (100 - bottomBase) / 2

            var topRule = topBaseOffset === 0 ? '50% 0' : "".concat(topBaseOffset, "% 0%, ").concat(100 - topBaseOffset, "% 0%"),
            bottomRule = "".concat(100 - bottomBaseOffset, "% 100%, ").concat(bottomBaseOffset, "% 100%");

        return "polygon(".concat(topRule, ", ").concat(bottomRule, ")");
    }
    function calculateStyles (data) {
        var prevSizesCoef = 0;
        var areaAcc = 0;
        var returnStr = new Array(data.length);
        var total = 0;
        for (let i = 0; i < data.length; i++) {
            total += parseInt(data[i].value);
        }
        if(total == 0) {
            total = 1;
        }
        for (let i = 0; i < data.length; i++) {
            areaAcc = areaAcc + (total/data.length);
            var areaRatio = areaAcc / total;
            var sizesCoef = areaRatio;
            var sliceHeight = 100/data.length;
            var path = trapezoidPath(sliceHeight * 100, prevSizesCoef * 100, sizesCoef * 100)
            prevSizesCoef = sizesCoef
            returnStr[i] = 
            'clip-path: '+ path + ';';
        }
        return returnStr;
    }
    function Pyramid(dataPyramid, element) {
        var styles = calculateStyles(dataPyramid);
        var W = 280;
        var H = 36*dataPyramid.length;
        var $svg = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($(element));
            for (let i = 0; i < dataPyramid.length; i++) {
                var pyramidSlice = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                pyramidSlice.setAttribute('class', 'pyramid-chart-slice');
                pyramidSlice.setAttribute('width', '280');
                pyramidSlice.setAttribute('height', '36');
                pyramidSlice.setAttribute('x', '0');
                pyramidSlice.setAttribute('y', 36*i);
                pyramidSlice.setAttribute('fill', dataPyramid[i].background);
                pyramidSlice.setAttribute('data-value', dataPyramid[i].value);
                pyramidSlice.setAttribute('data-label', dataPyramid[i].title);
                pyramidSlice.setAttribute('data-percent', dataPyramid[i].percent);
                pyramidSlice.setAttribute('style', styles[i]);
                $(pyramidSlice).appendTo($svg);
            }
    }

    var summary = 0;
    var maxValue = 0;
    for (let i = 0; i < data.length; i++) {
        summary = summary + parseInt(data[i].progress);
        if(parseInt(data[i].progress) > maxValue){
            maxValue = parseInt(data[i].progress);
        }
    }

    var percent = new Array(data.length);
    var relative = 100 / summary;
    for (let i = 0; i < data.length; i++) {
        if(parseInt(data[i].progress)){
            percent[i] = Math.round(relative*parseInt(data[i].progress));
        }
        else {
            percent[i] = 0;
        }
    }

    var dataPyramid = new Array(data.length);

    for (let i = 0; i < data.length; i++) {
        dataPyramid[i] = {
            value: parseInt(data[i].progress),
            title: data[i].labelText,
            background: data[i].background,
            percent: percent[i],
        }
    }
    dataPyramid.sort(function (a, b) {
        return parseInt(b.value) - parseInt(a.value);
    });

    if(dataPyramid[0].title !== '1'){
        dataPyramid.reverse()
    }
    Pyramid(dataPyramid, element);

    //legend
    DrawLegendPyramide(element, data);
    //tooltip
    var tip = 
    '<div class="pyraamidTip" style="display:none;">'
    +'    <div class="tip-cont">'
    +'      <div class="label"> Оценка - </div>'
    +'      <div class="value">% / шт</div>'
    +'  </div>'
    +'</div>';
    $(tip).appendTo('body');
    $(element).on('mouseenter', '.pyramid-chart-slice', function(e){
        var label = $(this).attr('data-label');
        var value = $(this).attr('data-value');
        var percent = $(this).attr('data-percent');
        $('.pyraamidTip .label').html('Оценка - ' + label );
        $('.pyraamidTip .value').html(percent + '% / ' + value + ' шт');
        $('.pyraamidTip').fadeIn(0);
    });
    $(element).on('mouseleave', '.pyramid-chart-slice', function(e){
        $('.pyraamidTip').fadeOut(0);
    });
    $(element).on('mousemove', '.pyramid-chart-slice', function(e){
        $('.pyraamidTip').css({
            top: e.pageY - 50,
            left: e.pageX - $('.pyraamidTip').width() / 2 -5
        });
    });
}
function DrawLegendPyramide(element, data) {
    var legend = $(element).parents('.chart-content').find('.legend .legend-list');
    if(data[0].labelText !== '5'){
        data.reverse();
    }
    let summary = 0;
    if($(element).parents('.charts-for-pdf').length > 0){
        for (var i = 0, len = data.length; i < len; i++){
            summary += parseInt(data[i].progress);
        }
    }
    let percent = 0;
    if(summary > 0) {
        percent = 100/summary;
    }
    for (var i = 0, len = data.length; i < len; i++){
        let tooltipValue = ' ';
        if($(element).parents('.charts-for-pdf').length > 0){
            tooltipValue = '<span class="tooltip-value"> (' + Math.round(percent * parseInt(data[i].progress) ) + ' % / '+ data[i].progress + ' шт) </span>';
        }
        var legendRow = 
        '<div class="legend-item">'
        +'   <div class="square" style="background: '+ data[i].background +'"></div>'
        +'   <div class="label">- ' + data[i].labelText + tooltipValue +  '</div>'
        +'</div>';
        $(legendRow).appendTo(legend);
    }
}
function DrawVerticalBarShadow(element, data){
    if(data.length > 0){
        if(data[0].labelText !== '5') {
            data.reverse();
        }
        var percent = new Array(data.length);
        var summary = 0;
        var maxValue = 0;
        for (let i = 0; i < data.length; i++) {
            summary = summary + parseInt(data[i].progress);
            if(parseInt(data[i].progress) > maxValue){
                maxValue = parseInt(data[i].progress);
            }
        }

        var relativeFill = 100 / maxValue;
            
        var relative = 100 / summary;
        for (let i = 0; i < data.length; i++) {
            if(parseInt(data[i].progress)){
                percent[i] = Math.round(relative*parseInt(data[i].progress));
            }
            else {
                percent[i] = 0;
            }
        }
        var elements = '<div class="varticalBarShadowList">';
        var width = parseInt(data.length);
        for (let i = 0; i < data.length; i++) {
            var top = 100 - percent[i];
            elements = elements + 
            '<div class="vertical-item">'
            +'    <div class="vertical-bar">'
            +'      <div class="vertical-full" style="background-color: '+ data[i].background + '; top: ' + top + '%"></div>'
            +'      <div class="vertical-value">' + percent[i] + '% / '+ data[i].progress + ' шт</div>'
            +'  </div>'
            +'  <div class="vertical-label">'
            +'      Оценка <span class="bold">' + data[i].labelText + '</span>'
            +'  </div>'
            +'</div>';
        }
        var elements = elements + '</div>';
        $(elements).appendTo(element);

        var bars = $(element).find('.vertical-item');
        for (let i = 0; i < bars.length; i++) {
            let barHeight = parseInt($(bars[i]).find('.vertical-full').outerHeight());
            let textHeight = parseInt($(bars[i]).find('.vertical-bar .vertical-value').outerHeight()) + 3;
            if(textHeight > barHeight){
                $(bars[i]).find('.vertical-bar .vertical-value').addClass('blackcolor');
            }
        }

    }
}
function DrawHorizontalLines(element, data){
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
        var relative = 100 / summary;
        for (let i = 0; i < data.length; i++) {
            if(parseInt(data[i].progress)>0){
                percent[i] = Math.round(relative*parseInt(data[i].progress));
            }
            else {
                percent[i] = 0;
            }
        }
        var elements = '<div class="horizonatal-line">';
        for (let i = 0; i < data.length; i++) {
            var top = 100 - percent[i];
            elements = elements + 
            '<div class="item">'
            +'    <div class="labels">'
            +'      <div class="name">'
            +'          Ответы на оценку' 
            +'          <span class="bold">' + data[i].labelText + '</span>'
            +'      </div>'
            +'      <div class="values">' + percent[i] + '% /  ' + data[i].progress + ' шт</div>'
            +'  </div>'
            +'  <div class="line">'
            +'      <div class="line-active" style="background-color: '+ data[i].background + '; width: ' + percent[i] + '%"></div>'
            +'  </div>'
            +'</div>';
        }
        var elements = elements + '</div>';
        $(elements).appendTo(element);
    }
}
function DrawLongLine(element, data){
    if(data.length > 0){
        $(element).addClass('results');
        var percent = new Array(data.length);
        var summary = 0;
        var maxValue = 0;
        for (let i = 0; i < data.length; i++) {
            summary = summary + parseInt(data[i].progress);
            if(parseInt(data[i].progress) > maxValue){
                maxValue = parseInt(data[i].progress);
            }
        }
        var relative = 100 / summary;
        for (let i = 0; i < data.length; i++) {
            if(parseInt(data[i].progress) > 0){
                percent[i] = Math.round(relative*parseInt(data[i].progress));
            }
            else {
                percent[i] = Math.round(relative*parseInt(data[i].progress));
            }
        }
        var line = '<div class="line">';
        var tooltip = '<div class="tooltip"><div class="results-list">';
        for (let i = 0; i < data.length; i++) {

            var label = 'баллов';
            if(data[i].labelText == '1'){
                label = 'балл';
            }
            else if(data[i].labelText == '2' || data[i].labelText == '3' || data[i].labelText == '4'){
                label = 'балла';
            }

            line = line + 
                '<div class="result" style="background-color: '+ data[i].background + ';width: ' + percent[i] + '%"></div>';
            tooltip = tooltip + 
                '<div class="results-col">'
                +'    <div class="name">'
                +'      <div class="circle" style="background-color: '+ data[i].background + ';"></div>'
                +'      ' + data[i].labelText + ' ' + label
                +'  </div>'
                +'  <div class="value">' + data[i].progress + ' шт/' + percent[i] + '%</div>'
                +'</div>';
        }
        tooltip = tooltip + 
            '</div>'
            +'<div class="results-all">'
            +'  Всего ответов - '+ summary + ' шт'
            +'</div>';
        line = line + '</div>';
        tooltip = tooltip + '</div>';

        var elements = line + tooltip;
        $(elements).appendTo(element);
    }
}

//show(hide) text on pie chart
$('.charts-content').on('mouseenter', '.pieSegmentGroup', function(e){
    var order = $(this).attr('data-order');
    $(this).parents('svg').find('.textSegment[data-order='+ order +']').addClass('active');
});
$('.charts-content').on('mouseleave', '.pieSegmentGroup', function(e){
    var order = $(this).attr('data-order');
    $(this).parents('svg').find('.textSegment[data-order='+ order +']').removeClass('active');
});

//show(hide) tooltip on anket
$('.charts-content').on('mouseenter', '.results .line', function(e){
    var left = parseInt(e.clientX) - 17 - 15;
    var tWidth = parseInt($(this).parents('.results').find('.tooltip').outerWidth());
    var tHeight = parseInt($(this).parents('.results').find('.tooltip').outerHeight()) / 2 - 16;

    var magleft = parseInt($('.charts-content').css('margin-left'));
    var magright = parseInt($('.charts-content').css('margin-right'));

    $(this).parents('.results').find('.tooltip').attr('data-left', magleft);
    $(this).parents('.results').find('.tooltip').attr('data-right', magright);

    if((left + tWidth) > parseInt($(this).outerWidth())){
        $(this).parents('.results').find('.tooltip').addClass('right');
        left = left - tWidth - 20 - magright;
    }
    else {
        $(this).parents('.results').find('.tooltip').removeClass('right');
        left = left - magleft;
    }
    $(this).parents('.results').find('.tooltip').css('left', left + 'px');
    $(this).parents('.results').find('.tooltip').css('top', -tHeight + 'px');
    $(this).parents('.results').find('.tooltip').fadeIn(100);
});

$('.charts-content').on('mousemove', '.results .line', function(e){
    var magleft = parseInt($(this).parents('.results').find('.tooltip').attr('data-left'));
    var magright = parseInt($(this).parents('.results').find('.tooltip').attr('data-right'));
    var left = parseInt(e.clientX) - 17 - 15;
    var tWidth = parseInt($(this).parents('.results').find('.tooltip').outerWidth());
    var tHeight = parseInt($(this).parents('.results').find('.tooltip').outerHeight()) / 2 - 16;
    if((left + tWidth) > parseInt($(this).outerWidth())){
        $(this).parents('.results').find('.tooltip').addClass('right');
        left = left - tWidth - 20 - magright;
    }
    else {
        left = left - magleft;
        $(this).parents('.results').find('.tooltip').removeClass('right');
    }
    $(this).parents('.results').find('.tooltip').css('left', left + 'px');
    $(this).parents('.results').find('.tooltip').css('top', -tHeight + 'px');
});

$('.charts-content').on('mouseleave', '.results .line', function(e){
    $(this).parents('.results').find('.tooltip').removeClass('right');
    $(this).parents('.results').find('.tooltip').fadeOut(0);
});