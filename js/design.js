jQuery(function ($) {
    $(document).ready(function () {

        // Restricts input for the set of matched elements to the given inputFilter function.
        $.fn.inputFilter = function(inputFilter) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
                if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                this.value = "";
                }
            });
        };

        $.datepicker.setDefaults(
            {
            closeText: 'Закрыть',
            prevText: '',
            currentText: 'Сегодня',
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
                'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
                'Июл','Авг','Сен','Окт','Ноя','Дек'],
            dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
            dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        });

        //btnoptions
        $('.rightside').on('change', '.position-text input[type=radio]', function(e){
            var className = "align" + $(this).val();
            $('.centerbox').removeClass('alignleft');
            $('.centerbox').removeClass('aligncenter');
            $('.centerbox').removeClass('alignright');
            $('.centerbox').addClass(className);
        });


        //font change
        $('.rightside').on('change', '.fontselect', function(e){
            var className = "font" + $(this).val();
            $('.centerbox').removeClassPrefix("font");
            $('.centerbox').addClass(className);
        });

        //color options level change
        $('.rightside').on('click', '.colorpick input[type=text]', function(e){
            $(this).prev('input').click();
        });

        $('.rightside').on('click', '.colorpick .square', function(e){
            $(this).parents('.colorpick').find('input[type=color]').click();
        });
        $('.rightside').on('change', '.colorpick1level input[type=color]', function(e){
            $(this).next('input').val($(this).val());
            var value = $(this).val();
            $(this).parents('.colorpick').find('.square').css( 'background', value);
            $('.centerbox .question .name').css('color', value);
            $('.centerbox .question .question-name').css('color', value);
        });
        //color 2 level
        $('.rightside').on('change', '.colorpick2level input[type=color]', function(e){
            $(this).next('input').val($(this).val());
            var value = $(this).val();
            $(this).parents('.colorpick').find('.square').css( 'background', value);
            $('.centerbox .question label').css('color', value);
            $('.centerbox .question p').css('color', value);
            $('.centerbox .question .description').css('color', value);
            $('.centerbox .question .text').css('color', value);
            $('.centerbox .question .matrix-table .value').css('color', value);
        });

        $('.rightside').on('change', '.colorpickselect input[type=color]', function(e){
            $(this).next('input').val($(this).val());
            var value = $(this).val();
            $(this).parents('.colorpick').find('.square').css( 'background', value);
            $('head style[title=colorpickselectstyle]').remove();
            var style =  
            '<style title="colorpickselectstyle">'
            +'    .construcot-container .centerbox input[type=checkbox]:checked + label::before,'
            +'    .construcot-container .centerbox input[type=radio]:checked + label::before {'
            +'    background: ' + value + ';'
            +'    }'
            +'     .construcot-container .centerbox input[type=checkbox] + label::before,'
            +'    .construcot-container .centerbox input[type=radio] + label::before {'
            +'    border-color: ' + value + ';'
            +'    }'
            '</style>';
            $('head').append(style);
        });

        $('.rightside').on('change', '.colorpickinput input[type=color]', function(e){
            $(this).next('input').val($(this).val());
            var value = $(this).val();
            $(this).parents('.colorpick').find('.square').css( 'background', value);
            $('.centerbox .question input[type=text]').css('color', value);
            $('.centerbox .question input[type=email]').css('color', value);
            $('.centerbox .question input[type=tel]').css('color', value);
            $('.centerbox .question textarea').css('color', value);
        });

        $('.rightside').on('change', '.colorpickbackground input[type=color]', function(e){
            $(this).next('input').val($(this).val());
            var value = $(this).val();
            $(this).parents('.colorpick').find('.square').css( 'background', value);
            $('.centerbox').css('background', value);
        });


        //btn question without bg 
        if($('.btn-answer').length>0){
            $('.btn-answer').parents('.question').addClass('nobgtext');
        }
        //color set 
        //color 1 level
        $('.centerbox .question .name').css('color', $('.rightside .colorpick1level input[type=color]').val());
        $('.centerbox .question .question-name').css('color', $('.rightside .colorpick1level input[type=color]').val());

        //color 2 level
        $('.centerbox .question label').css('color', $('.rightside .colorpick2level input[type=color]').val());
        $('.centerbox .question p').css('color', $('.rightside .colorpick2level input[type=color]').val());
        $('.centerbox .question .description').css('color', $('.rightside .colorpick2level input[type=color]').val());
        $('.centerbox .question .text').css('color', $('.rightside .colorpick2level input[type=color]').val());
        $('.centerbox .question .matrix-table .value').css('color', $('.rightside .colorpick2level input[type=color]').val());

        //color pick
        var style =  
        '<style title="colorpickselectstyle">'
        +'    .construcot-container .centerbox input[type=checkbox]:checked + label::before,'
        +'    .construcot-container .centerbox input[type=radio]:checked + label::before {'
        +'    background: ' + $('.rightside .colorpickselect input[type=color]').val() + ';'
        +'    }'
        +'     .construcot-container .centerbox input[type=checkbox] + label::before,'
        +'    .construcot-container .centerbox input[type=radio] + label::before {'
        +'    border-color: ' + $('.rightside .colorpickselect input[type=color]').val() + ';'
        +'    }'
        '</style>';
        $('head').append(style);

        //color input
        $('.centerbox .question input[type=text]').css('color', $('.rightside .colorpickinput input[type=color]').val());
        $('.centerbox .question input[type=email]').css('color', $('.rightside .colorpickinput input[type=color]').val());
        $('.centerbox .question input[type=tel]').css('color', $('.rightside .colorpickinput input[type=color]').val());
        $('.centerbox .question textarea').css('color', $('.rightside .colorpickinput input[type=color]').val());
        $('.centerbox').css('background', $('.rightside .colorpickbackground input[type=color]').val());

        //position
        $('.centerbox').addClass('align' + $('.rightside .position-text input[type=radio]:checked').val());

        //font
        $('.centerbox').addClass('font' + $('.fontselect').val());
        //bg for text
        if($('.colorpickbgtext input[type=color]').val() && $('.opacitybgtext').find('input').val()){
            var value = $('.colorpickbgtext input[type=color]').val();
            var opacity = parseInt($('.opacitybgtext').find('input').val())/100;
            var rgbaCol = 'rgba(' + parseInt(value.slice(-6, -4), 16) + ',' + parseInt(value.slice(-4, -2), 16) + ',' + parseInt(value.slice(-2), 16) + ',' + opacity + ')';
            $('.construcot-container .centerbox .questions-box.bg-image .question').css('background', rgbaCol);
            $('.construcot-container .centerbox .questions-box.bg-image .question .mediablock .textblock').css('background', rgbaCol);
            $('.construcot-container .centerbox .questions-box.bg-image .question .answer .dropdown-list .dropdown-block').css('background', rgbaCol);
        }

        //add backgground picture
        $('.page-content').on('click', '.addpicture', function(e){
            $(this).next('input[type=file]').click();
        });
        //remove background 
        $('.page-content').on('click', '.filerow .removepicture', function(e){
            $('.questions-box').css('background-image', '');
            $('.questions-box').removeClass('bg-image');
            $('.addpicture').removeClass('active');
            $('.construcot-container .centerbox .questions-box .question').css('background', 'transparent');
            $('.construcot-container .centerbox .questions-box .question .mediablock .textblock').css('background', 'transparent');
            $('.construcot-container .centerbox .questions-box .question .answer .dropdown-list .dropdown-block').css('background', 'transparent');
            $('.bgsettings').parents('.form-group').remove();
        });
        //change input for file
        $('.page-content').on('change', '.pictureforpage', function(e){
            var fileName = e.target.files[0].name;
            if (e.target.files && e.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('.questions-box').css('background-image', 'url(' + e.target.result + ')');
                    $('.questions-box').addClass('bg-image');
                }
                reader.readAsDataURL(e.target.files[0]);
            }
            $('.addpicture').addClass('active');
            $('.addpicture').parents('.filerow').append('<div class="removepicture"></div>');
            AddSettingsBackground();
        });
        function AddSettingsBackground() {
            var settings = 
            '<div class="form-group">'
            +'<div class="bgsettings">'
            +'    <div class="colorpickbgtext">'
            +'        <div class="square" style="background: #FEFDFD;"></div>'
            +'        <div class="inputs">'
            +'            <input type="color" value="#FEFDFD">'
            +'            <input type="text" name="background" id="background" value="#FEFDFD">'
            +'        </div>'
            +'        <div class="labelcolor">'
            +'           <label for="background_7">Фон для текста</label>'
            +'        </div>'
            +'    </div>'
            +'    <div class="opacitybgtext">'
            +'        <div class="inputs">'
            +'            <input type="text" name="opacity" id="opacity" min="0" max="100" value="50">'
            +'        </div>'
            +'        <div class="labelopacity">'
            +'            Прозрачность'
            +'        </div>'
            +'    </div>'
            +'</div>'
            +'</div>'
            $(settings).appendTo('.optionsblock .text-aside');
            $('.opacitybgtext').find('input').inputFilter(function(value) {
                return /^\d*$/.test(value) && (value === "" || (parseInt(value) <= 100 && parseInt(value) >= 0));
            });
        }
        //color options level change
        $('.rightside').on('click', '.colorpickbgtext input[type=text]', function(e){
            $(this).prev('input').click();
        });
        //change bg for text
        $('.rightside').on('change', '.colorpickbgtext input[type=color]', function(e){
            $(this).next('input').val($(this).val());
            var value = $(this).val();
            $(this).parents('.colorpickbgtext').find('.square').css( 'background', value);
            var opacity = 0;
            if($('.opacitybgtext').find('input').val() > 0){
                opacity = parseInt($('.opacitybgtext').find('input').val())/100;
            }
            var rgbaCol = 'rgba(' + parseInt(value.slice(-6, -4), 16) + ',' + parseInt(value.slice(-4, -2), 16) + ',' + parseInt(value.slice(-2), 16) + ',' + opacity + ')';
            $('.construcot-container .centerbox .questions-box.bg-image .question').css('background', rgbaCol);
            $('.construcot-container .centerbox .questions-box.bg-image .question .mediablock .textblock').css('background', rgbaCol);
            $('.construcot-container .centerbox .questions-box.bg-image .question .answer .dropdown-list .dropdown-block').css('background', rgbaCol);
        });
        //change bg opacity for text
        $('.rightside').on('change', '.opacitybgtext input', function(e){
            var value = $('.colorpickbgtext input[type=color]').val();
            var opacity = parseInt($(this).val())/100;
            var rgbaCol = 'rgba(' + parseInt(value.slice(-6, -4), 16) + ',' + parseInt(value.slice(-4, -2), 16) + ',' + parseInt(value.slice(-2), 16) + ',' + opacity + ')';
            $('.construcot-container .centerbox .questions-box.bg-image .question').css('background', rgbaCol);
            $('.construcot-container .centerbox .questions-box.bg-image .question .mediablock .textblock').css('background', rgbaCol);
            $('.construcot-container .centerbox .questions-box.bg-image .question .answer .dropdown-list .dropdown-block').css('background', rgbaCol);
        });

        $('.opacitybgtext').find('input').inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || (parseInt(value) <= 100 && parseInt(value) >= 0));
        });

        $.fn.removeClassPrefix = function(prefix) {
            this.each(function(i, el) {
                var classes = el.className.split(" ").filter(function(c) {
                    return c.lastIndexOf(prefix, 0) !== 0;
                });
                el.className = $.trim(classes.join(" "));
            });
            return this;
        };
        
        $('.date-answer input').datepicker();
        $('.centerbox').on('click', '.date-answer .icon-date', function(e){
            $(this).parents('.date-answer').find('input').datepicker('show');
        });
        $('.phone-answer input.code').intlTelInput({
            initialCountry: "ru",
        });

        $('.centerbox').on('keyup', '.phone-answer input', function(e){
            if (/\D/g.test(this.value))
            {
              this.value = this.value.replace(/\D/g, '');
            }
        });

        if($('#modal-error').length==0){
            var modal = 
            '<div id="modal-error" class="modal">'
            +'    <div class="modal-content">'
            +'        <span class="close">&times;</span>'
            +'        <div class="text">'
            +'            <p>Выберете, пожалуйста, ответ.</p>'
            +'        </div>'
            +'    </div>'
            +'</div>';
            $('body').append(modal);
        }

        // dropdownlist
        $('.centerbox').on('click', '.dropdown-list .question-name', function(e){
            if($(this).parents('.dropdown-block').hasClass('active')){
                $(this).parents('.dropdown-block').removeClass('active');
                $(this).parents('.dropdown-block').find('.dropdown-content').fadeOut(300);
            }
            else {
                $(this).parents('.dropdown-list').find('.dropdown-block').removeClass('active');
                $(this).parents('.dropdown-list').find('.dropdown-content').fadeOut(300);
                $(this).parents('.dropdown-block').addClass('active');
                $(this).parents('.dropdown-block').find('.dropdown-content').fadeIn(300);
            }
        });

        ResizeImg();
        //resiz img
        function ResizeImg() {
            var ImageBlock = $('.centerbox').find('.imageblock');
            var heightImgBlock = 0;
            ImageBlock.each(function (index, block) {
                var images = $(block).children();
                images.each(function (index2, img) {
                    $(img).css('min-width', '33%');
                    $(img).css('max-width', '33%');
                    $(img).css('height', '300px');
                    $(img).css('width', '33%');
                    $(img).find('img').css('height', 'calc(100% - 90px)');
                    $(img).find('img').css('object-fit', 'cover');
                });
            });
        }
        //video play
        $('.centerbox').on('click', '.videoblock', function(e){
            if($(this).children('video').get(0).paused){
                $(this).children('video').get(0).play();
                $(this).children('.play').fadeOut();
            }else{
               $(this).children('video').get(0).pause();
                $(this).children('.play').fadeIn();
            }
        });
        

        $('.audiowave').each(function(){

            //Generate unic ud
            var path = $(this).attr('data-audiopath');//path for audio
            var id = '_' + Math.random().toString(36).substr(2, 9);

            //Set id to container
            $(this).attr('id', id);
        
            //Initialize WaveSurfer
            var wavesurfer = WaveSurfer.create({
                container: '#' + id,
                scrollParent: true,
                backgroundColor: '#FFFFFF',
                height: 40,
                barMinHeight: 1,
                barWidth: 1.5,
                cursorWidth: 0,
                barGap: 2,
                waveColor: 'rgba(87, 34, 222, 0.2)',
                hideScrollbar: true,
                progressColor: "#5722DE"
            });
        
            //Load audio file
            wavesurfer.load(path);
        
            //Add button event
            $(this).parents('.audioblock').find('.playaudio').click(function(){
                wavesurfer.playPause();
            });
        });
    
        $('body').on('change, keypress, keydown, keyup', 'textarea', function(e){
            auto_grow(this);
        });


        var minRows = 5;
        var maxRows = 26;
        //autoheight textarea
        function auto_grow(id) {
            var t = id;
            if (t.scrollTop == 0)   t.scrollTop=1;
            while (t.scrollTop == 0) {
                if (t.rows > minRows)
                        t.rows--; else
                    break;
                t.scrollTop = 1;
                if (t.rows < maxRows)
                        t.style.overflowY = "hidden";
                if (t.scrollTop > 0) {
                    t.rows++;
                    break;
                }
            }
            while(t.scrollTop > 0) {
                if (t.rows < maxRows) {
                    t.rows++;
                    if (t.scrollTop == 0) t.scrollTop=1;
                } else {
                    t.style.overflowY = "auto";
                    break;
                }
            }
        }

        $('.questions-box .ranging-list').sortable({});


        //customselect

        $('.customselect').each(function(){

            $(this).parent().addClass('customselect-wrapper');
            var $this = $(this),
            numberOfOptions = $(this).children('option').length;
        
            $this.addClass('select-hidden'); 
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="select-styled"></div>');
            var $styledSelect = $this.next('div.select-styled');
            if($('.customselect option:selected').length>0){
                $styledSelect.text($('.customselect option:selected').text());
            }
            else {
                $styledSelect.text($this.children('option').eq(0).text());
            }
        
            var $list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter($styledSelect);
        
            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }
        
            var $listItems = $list.children('li');
        
            $styledSelect.click(function(e) {
                e.stopPropagation();
                $('div.select-styled.active').not(this).each(function(){
                    $(this).removeClass('active').next('ul.select-options').hide();
                });
                $(this).toggleClass('active').next('ul.select-options').toggle();
            });
        
            $listItems.click(function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
                $list.hide();
                $this.change();
            });
        
            $(document).click(function() {
                $styledSelect.removeClass('active');
                $list.hide();
            });
        });
    });
});
