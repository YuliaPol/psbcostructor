/*--------------------------------------------------------------------
 *JAVASCRIPT "jquery.radialBar.js"
 *Version:    0.1.0 - 2020
 *author:     Ahed Kabalan
 *Licensed MIT 
-----------------------------------------------------------------------*/

;(function ($) {
    "use strict";

    var pluginName = 'radialBar';

    var svgNS = "http://www.w3.org/2000/svg";

    var RadialBar = function (element, options) {
        var self = this;
        self.element = element;
        self.$element = $(element);
        self._init(options);
    };

    RadialBar.prototype = {
        constructor: RadialBar,
        _init: function (options) {
            var self = this, $el = self.$element.addClass('');
            self.options = options;
            $.each(options, function (key, value) {
                self[key] = value;
            });

            self._dataPercent();
            self._build();
            var $container = self.$container = $(document.createElement("div")).insertBefore($el);
            $(document.createElement("div")).attr('class', 'radia-bar-container').appendTo($container)
                .append(self.svgContainer);

            return $el.removeClass('radia-bar-loading');
        },
        _dataPercent: function(){
            var self = this;
            var length = self.options["data"].length;
            var data = self.options["data"];
            if(length>0){
                var percent = new Array(length);
                var summary = 0;
                for (let i = 0; i < length; i++) {
                    summary = summary + parseInt(data[i].progress);
                }
                var relative = 100 / summary;
                for (let i = 0; i < length; i++) {
                    percent[i] = Math.round(relative*data[i].progress);
                }
                self.options["percent"] = percent;
            }
        },
        _build: function(){
            var self = this;
            
            var w = typeof self.options.width === 'undefined' ? "200" : self.options.width,
                h = typeof self.options.height === 'undefined' ? "200" : self.options.height;

            if (w > $(window).width()) {
              w = $(window).width();
            }

            var r = self.radius = w / 3, paddingLabel = r + 20;
            var scale = "-"+ (r * 1.5) +" -"+ (r * 1.5) +" "+ w +" "+ h +"";
            
            var strokeWidth = self.strokeWidth = self.options.strokeWidth || 12;

            self._buildSvg(w, h, scale);
            self._addShadow();

            
            var length = self.options["data"].length;
            var padding = self.options.padding || 20;
            var division = (r - padding) / length;
            var maxValue = 0;
            for (let i = 0; i < length; i++) {
                if(parseInt(data[i].progress) > maxValue){
                    maxValue = parseInt(data[i].progress);
                }
            }
            var raiusCircle = w / 2;
            for(var i = 0; i < length; i++){
                var object = self.options["data"][i];
                var percent = self.options["percent"][i];
                var stroreWidth = 12;
                if(i<6){
                    stroreWidth = 12 - i;
                }
                else {
                    stroreWidth = 12 - 6;
                }
                self._buildCircle(object, raiusCircle, stroreWidth, maxValue);
                self._buildLabel(object, paddingLabel, percent);
                paddingLabel += 20;
                r = r - division;
                raiusCircle = raiusCircle - division;
            }
        },

        _buildSvg: function(width, height, scale){
            var self = this;
            var svgElem = self.svgContainer = document.createElementNS(svgNS, "svg");
            svgElem.setAttributeNS(null, "width", width);
            svgElem.setAttributeNS(null, "height", height);
            svgElem.setAttributeNS(null, "viewBox", scale);

            
        },

        _addShadow: function(){
            var self = this;
            //add shadow
            var shadow = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            shadow.setAttribute('id', 'boxshadow');
            var feDropShadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
            feDropShadow.setAttribute('dx', '0');
            feDropShadow.setAttribute('dy', '2');
            feDropShadow.setAttribute('stdDeviation', '2');
            feDropShadow.setAttribute('flood-color', 'black');
            feDropShadow.setAttribute('flood-opacity', '0.25');
            $(feDropShadow).appendTo(shadow);
            $(shadow).appendTo(self.svgContainer);
        },
        _buildCircle: function(object, r, stroreWidth, maxValue){
            var self = this;
            var radius = r - 10;
            var circumference = radius * 2 * Math.PI;

            // var offset = circumference - object.progress / 100 * circumference;
            var offset = circumference - object.progress / maxValue * 0.9 * circumference;

            var circle = document.createElementNS(svgNS,"circle");
            circle.setAttribute("cy", 0);
            circle.setAttribute("cx", 0);
            circle.setAttribute("r", radius);
            circle.setAttribute("stroke-width", stroreWidth);
            circle.setAttribute("fill", "none");
            circle.setAttribute("stroke", '#F5F7FA');

            var clonedCircle = $(circle).clone()[0];
            clonedCircle.setAttribute("stroke", object.background);
            clonedCircle.setAttribute("transform", "rotate(-90 0 0)")
            clonedCircle.setAttribute("stroke-dasharray", circumference+" "+circumference);
            clonedCircle.setAttribute("stroke-dashoffset", offset);
            clonedCircle.setAttribute("stroke-linecap", "round");
            clonedCircle.setAttribute("style", "transition: stroke-dashoffset 1s ease-out 0s; filter: url(#boxshadow);");

            self.svgContainer.appendChild(circle);
            self.svgContainer.appendChild(clonedCircle);
        },

        _buildLabel: function(object, padding, percent){
            var self = this;
            var legend = $(self.element).parents('.radialbarmultiple').find('.legend .legend-list');
            var legendRow = 
            '<div class="legend-row">'
            +'    <div class="legend-value" style="background-color: ' + object.background + ';">'+ percent + '% / ' + object.progress + ' шт</div>'
            +'    <div class="legend-label">Ответы на оценку <span class="bold">'+ object.labelText + '</span></div>'
            +'</div>';
            $(legendRow).appendTo(legend);
            // var circle = document.createElementNS(svgNS,"circle");
            // circle.setAttribute("cy", padding);
            // circle.setAttribute("cx", -self.radius);
            // circle.setAttribute("r", 5);
            // circle.setAttribute("stroke-width", 8);
            // circle.setAttribute("fill", "none");
            // circle.setAttribute("stroke", '#F5F7FA');

            // var clonedCircle = $(circle).clone()[0];
            // clonedCircle.setAttribute("stroke", object.background);
            // clonedCircle.setAttribute("r", 3);
            // clonedCircle.setAttribute("fill", object.background);

            // var text = document.createElementNS(svgNS,"text");
            // text.setAttribute("y", padding + 5);
            // text.setAttribute("x", -self.radius + 10);
            // text.setAttribute("font-size", 12);
            // var textNode = document.createTextNode(object.labelText);
            // text.appendChild(textNode);

            // self.svgContainer.appendChild(circle);
            // self.svgContainer.appendChild(clonedCircle);
            // self.svgContainer.appendChild(text);
        },

        destroy: function() {
            
        },

    };

    $.fn[pluginName] = function (options) {

        var args = arguments;

        if (options === undefined || typeof options === 'object') {
            return this.each(function() {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.extend({}, $.fn[pluginName].defaults, options);
                    $.data(this, 'plugin_' + pluginName, new RadialBar(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function() {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Progressing && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
        }
    };

    $.fn[pluginName].defaults = {
        
    };

    $.fn[pluginName].Constructor = RadialBar;
}(jQuery));