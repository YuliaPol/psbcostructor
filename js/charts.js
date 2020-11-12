
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
        for (let i = 0; i < data.length; i++) {
            var top = 100 - percentFill[i];
            elements = elements + 
            '<div class="baritem">'
            +'    <div class="barcol">'
            +'      <div class="barcolFill" style="background-color: '+ data[i].background + '; top: ' + top + '%"></div>'
            +'      <div class="value">' + percent[i] + '% / '+ data[i].progress + ' шт</div>'
            +'  </div>'
            +'  <div class="label">оценкa <span class="bold">' + data[i].labelText + '</span></div>'
            +'</div>';
        }
        var elements = elements + '</div>';
        element.addClass('.simplebar');
        $(elements).appendTo(element);
    }
}