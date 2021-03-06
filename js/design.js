jscolor.presets.default = {
    position: 'bottom',
    width: 181,
    height: 100,
    padding: 10,
    sliderSize: 25,
    borderRadius: 0,
    borderWidth: 0,
    controlBorderWidth: 1,
    pointerBorderWidth: 1,
    borderColor: '#000',
    controlBorderColor: '#CCC',
    backgroundColor: '#fff',
    format: 'rgba',
    controlBorderColor: '#ccc',
    crossSize: 5,
    pointerBorderColor: '#fff',
    pointerBorderWidth: 1,
    showOnClick: true,
};

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
            $(this).parents('.colorpick').find('input[type=text]').click();
        });


        $('.rightside').on('input', '.colorpick1level input[type=text]', function(e){
            var value = $(this).val();
            $(this).parents('.colorpick').find('.square').css( 'background', value);
            $('.centerbox .question .name').css('color', value);
            $('.centerbox .question .question-name').css('color', value);
        });

        //color 2 level
        $('.rightside').on('input', '.colorpick2level input[type=text]', function(e){
            var value = $(this).val();
            $(this).parents('.colorpick').find('.square').css( 'background', value);
            $('.centerbox .question label').css('color', value);
            $('.centerbox .question p').css('color', value);
            $('.centerbox .question .description').css('color', value);
            $('.centerbox .question .text').css('color', value);
            $('.centerbox .question .matrix-table .value').css('color', value);

            $('.centerbox .question .select-styled').css('color', value);
            $('.centerbox .question .select-options').css('color', value);

        });

        $('.rightside').on('input', '.colorpickselect input[type=text]', function(e){
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

        $('.rightside').on('input', '.colorpickinput input[type=text]', function(e){
            var value = $(this).val();
            $(this).parents('.colorpick').find('.square').css( 'background', value);
            $('.centerbox .question input[type=text]').css('color', value);
            $('.centerbox .question input[type=email]').css('color', value);
            $('.centerbox .question input[type=tel]').css('color', value);
            $('.centerbox .question textarea').css('color', value);
        });

        $('.rightside').on('input', '.colorpickbackground input[type=text]', function(e){
            var value = $(this).val();
            $(this).parents('.colorpick').find('.square').css( 'background', value);
            $('.centerbox').css('background-color', value);
        });


        //btn question without bg 
        if($('.btn-answer').length>0){
            $('.btn-answer').parents('.question').addClass('nobgtext');
        }
        //color set 
        //color 1 level
        $('.centerbox .question .name').css('color', $('.rightside .colorpick1level input[type=text]').val());
        $('.centerbox .question .question-name').css('color', $('.rightside .colorpick1level input[type=text]').val());

        //color 2 level
        $('.centerbox .question label').css('color', $('.rightside .colorpick2level input[type=text]').val());
        $('.centerbox .question p').css('color', $('.rightside .colorpick2level input[type=text]').val());
        $('.centerbox .question .description').css('color', $('.rightside .colorpick2level input[type=text]').val());
        $('.centerbox .question .text').css('color', $('.rightside .colorpick2level input[type=text]').val());
        $('.centerbox .question .matrix-table .value').css('color', $('.rightside .colorpick2level input[type=text]').val());

        $('.centerbox .question .select-styled').css('color', $('.rightside .colorpick2level input[type=text]').val());
        $('.centerbox .question .select-options').css('color', $('.rightside .colorpick2level input[type=text]').val());

        //color pick
        var style =  
        '<style title="colorpickselectstyle">'
        +'    .construcot-container .centerbox input[type=checkbox]:checked + label::before,'
        +'    .construcot-container .centerbox input[type=radio]:checked + label::before {'
        +'    background: ' + $('.rightside .colorpickselect input[type=text]').val() + ';'
        +'    }'
        +'     .construcot-container .centerbox input[type=checkbox] + label::before,'
        +'    .construcot-container .centerbox input[type=radio] + label::before {'
        +'    border-color: ' + $('.rightside .colorpickselect input[type=text]').val() + ';'
        +'    }'
        '</style>';
        $('head').append(style);

        //color input
        $('.centerbox .question input[type=text]').css('color', $('.rightside .colorpickinput input[type=text]').val());
        $('.centerbox .question input[type=email]').css('color', $('.rightside .colorpickinput input[type=text]').val());
        $('.centerbox .question input[type=tel]').css('color', $('.rightside .colorpickinput input[type=text]').val());
        $('.centerbox .question textarea').css('color', $('.rightside .colorpickinput input[type=text]').val());
        $('.centerbox').css('background-color', $('.rightside .colorpickbackground input[type=text]').val());

        //position
        if($('.rightside .position-text input[type=radio]:checked').length>0){
            $('.centerbox').addClass('align' + $('.rightside .position-text input[type=radio]:checked').val());
        }
        else {
            $('.rightside .position-text input[type=radio][value=left]').attr('checked', 'checked');
        }

        //font
        $('.centerbox').addClass('font' + $('.fontselect').val());
        //bg for text
        if($('.colorpickbgtext input[type=text]').val()){
            var value = $('.colorpickbgtext input[type=text]').val();
            // var opacity = parseInt($('.opacitybgtext').find('input').val())/100;
            var rgbaCol = value;
            $('.construcot-container .centerbox .questions-box.bg-image .question').css('background', rgbaCol);
            $('.construcot-container .centerbox .questions-box.bg-image .question .mediablock .textblock').css('background', rgbaCol);
            $('.construcot-container .centerbox .questions-box.bg-image .question .answer .dropdown-list .dropdown-block').css('background', rgbaCol);
            $('.construcot-container .centerbox .questions-box.bg-image .question .selectdropdown .select-options').css('background', rgbaCol);
        }

        //add backgground picture
        $('.page-content').on('click', '.addpicture', function(e){
            $(this).next('input[type=file]').click();
        });
        //remove background 
        $('.page-content').on('click', '.filerow .removepicture', function(e){
            $('.bg-static').css('background-image', '');
            // $('.questions-box').removeClass('bg-image');
            $('.addpicture').removeClass('active');
            // $('.construcot-container .centerbox .questions-box .question').css('background', 'transparent');
            // $('.construcot-container .centerbox .questions-box .question .mediablock .textblock').css('background', 'transparent');
            // $('.construcot-container .centerbox .questions-box .question .answer .dropdown-list .dropdown-block').css('background', 'transparent');
            // $('.bgsettings').parents('.form-group').remove();
            $(this).remove();
        });
        //change input for file
        $('.page-content').on('change', '.pictureforpage', function(e){
            var fileName = e.target.files[0].name;
            if (e.target.files && e.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('.bg-static').css('background-image', 'url(' + e.target.result + ')');
                    $('.bg-static').css('background-position', 'center');
                    $('.bg-static').css('background-repeat', 'no-repeat');
                    $('.bg-static').css('background-size', 'cover');
                    $('.bg-static').addClass('bg-image');
                }
                reader.readAsDataURL(e.target.files[0]);
            }
            $('.addpicture').addClass('active');
            if($('.addpicture').parents('.filerow').find('.removepicture').length==0){
                $('.addpicture').parents('.filerow').append('<div class="removepicture"></div>');
            }
            // AddSettingsBackground();
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
        $('.rightside').on('input', '.colorpickbgtext input[type=text]', function(e){
            var value = $(this).val();
            $(this).parents('.colorpickbgtext').find('.square').css( 'background', value);
            var rgbaCol = value;
            $('.construcot-container .centerbox .questions-box.bg-image .question').css('background', rgbaCol);
            $('.construcot-container .centerbox .questions-box.bg-image .question .mediablock .textblock').css('background', rgbaCol);
            $('.construcot-container .centerbox .questions-box.bg-image .question .answer .dropdown-list .dropdown-block').css('background', rgbaCol);
            $('.construcot-container .centerbox .questions-box.bg-image .question .selectdropdown .select-options').css('background', rgbaCol);
        });
        //change bg opacity for text
        $('.rightside').on('change', '.opacitybgtext input', function(e){
            var value = $('.colorpickbgtext input[type=text]').val();
            var opacity = parseInt($(this).val())/100;
            var rgbaCol = value;
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


        // $('.questions-box').css('background-size', $('.questions-box').outerWidth());
        // $(window).resize(function() {
        //     $('.questions-box').css('background-size', $('.questions-box').outerWidth());
        // });
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

        //set code country of downloadinf page
        var TelCountries = $('.answer .phone-answer .code');
        if(TelCountries.length>0){
            TelCountries.each(function (index, telcountry) {
                var idQuestion =  $(telcountry).attr('name').split('_')[1];
                if($(telcountry).val().split(',').length != 0 && !$(telcountry).val().includes('+')){
                    country =  $(telcountry).val().split(',');
                }
                else {
                    country = 'all';
                }
                if(country.includes('all')) {
                    $('#questionanswers_' + idQuestion).find('.phone-answer input.code').val('');
                    $('#questionanswers_' + idQuestion).find('.phone-answer .intl-tel-input .selected-flag').css('pointer-events','all');
                    $('#questionanswers_' + idQuestion).find('.phone-answer .intl-tel-input .country').css('display', 'block');
                    $('#questionanswers_' + idQuestion).find('.intl-tel-input .selected-flag .flag').addClass('all-country');    
                }
                else if(country.length == 1) {
                    $('#questionanswers_' + idQuestion).find('.phone-answer input.code').val('');
                    $('#questionanswers_' + idQuestion).find('.phone-answer .intl-tel-input .country').css('display', 'block');
                    $('#questionanswers_' + idQuestion).find('.phone-answer .intl-tel-input .selected-flag').css('pointer-events','none');
                    $('#questionanswers_' + idQuestion).find('.phone-answer .intl-tel-input .country[data-country-code="'+ country + '"]').click();
                }
                else {
                    $('#questionanswers_' + idQuestion).find('.phone-answer input.code').val('');
                    $('#questionanswers_' + idQuestion).find('.phone-answer .intl-tel-input .selected-flag').css('pointer-events','all');
                    $('#questionanswers_' + idQuestion).find('.intl-tel-input .selected-flag .flag').addClass('all-country');
                    $('#questionanswers_' + idQuestion).find('.phone-answer .intl-tel-input .country').css('display', 'none');
                    for(const element of country){
                        $('#questionanswers_' + idQuestion).find('.phone-answer .intl-tel-input .country[data-country-code="'+ element + '"]').css('display', 'block');
                    }
                }
            });
        }

          //range settings
        //set range value on start
        // var ranges = $('.range .input-box input[type=range]');
        // if(ranges.length>0){
        //     ranges.each(function (index, range) {
        //         if(!$(range).attr('min')) {
        //             $(range).attr('min', 0);
        //         }
        //         if(!$(range).attr('max')) {
        //             $(range).attr('max', 10);
        //         }
        //         if($(range).val()){
        //             SetRangeValue(range, $(range).val());
        //         }
        //         else {
        //             SetRangeValue(range, 0);
        //         }
        //     });
        // }
        //set new range value when change value
        $('.centerbox').on('input', '.range input[type=range]', function(e){
            SetRangeValue(this, $(this).val());
        });

        //set new range value
        function SetRangeValue(rangeinput, value){
            var value = $(rangeinput).val();
            var max = $(rangeinput).attr('max');
            var min = $(rangeinput).attr('min');
            var range = max - min;
            var relvalue = value - min;
            var percent = (100/range)*relvalue;
            var parents = $(rangeinput).parents('.range');
            var paddleft = (30*percent)/100;
            parents.find('.label').css('left', 'calc(' + percent + '% - ' + paddleft + 'px)');
            parents.find('.label .value').html(value);
            parents.find('.input-box .bar-filled').css('width', percent + '%');
            parents.find('.label').css('background-position', percent + '%');
        };
        

        //customselect
        
        customSelectActive();
        function customSelectActive(){
            $('.customselect').each(function(){
                if(!$(this).hasClass('select-hidden')){
                    if($(this).attr('multiple')){
                        $(this).parent().addClass('customselect-wrapper');
                        var $this = $(this),
                        numberOfOptions = $(this).children('option').length;
                        $this.addClass('select-hidden'); 
                        $this.wrap('<div class="select"></div>');
                        $this.after('<div class="select-styled"></div>');
                        var $styledSelect = $this.next('div.select-styled');
                        if($this.find('option:selected').length == 0){
                            $styledSelect.html('<div class="default">Выберите ответ</div>');
                        }
                    
                        var $list = $('<ul />', {
                            'class': 'select-options'
                        }).insertAfter($styledSelect);
                        for (var i = 0; i < numberOfOptions; i++) {
                            var lioption;
                            var id = Math.floor(Math.random() * 100000);
                            $this.children('option').eq(i).attr('data-id', id);
                            if($this.children('option').eq(i)[0].selected){
                                $styledSelect.append('<div class="selectvalue" data-value="' + $this.children('option').eq(i).text() + '" data-id="'+ id + '">' + $this.children('option').eq(i).text() + '</div>');
                                lioption = '<li rel="'+ $this.children('option').eq(i).val() + '" data-id="'+ id + '"><div class="checked active"></div><div class="text">'+ $this.children('option').eq(i).text() + '</div></li>';
                            }
                            else {
                                lioption = '<li rel="'+ $this.children('option').eq(i).val() + '" data-id="'+ id + '" ><div class="checked"></div><div class="text">'+ $this.children('option').eq(i).text() + '</div></li>';
                            }
                            $(lioption).appendTo($list);
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
                            if($(e.currentTarget).find('.checked').hasClass('active')) {
                                $(e.currentTarget).find('.checked').removeClass('active');
                                var id = $(e.currentTarget).attr('data-id');
                                $styledSelect.find('.selectvalue[data-id="' + id + '"]').remove();
                                if($styledSelect.find('.selectvalue').length == 0){
                                    $styledSelect.html('<div class="default">Выберите ответ</div>');
                                }
                                $this.find('option[value="' + $(e.currentTarget).attr('rel') + '"][data-id="' + id + '"]').prop("selected", false)
                            }
                            else {
                                $(e.currentTarget).find('.checked').addClass('active');
                                var id = $(e.currentTarget).attr('data-id');
                                if($styledSelect.find('.default').length > 0){
                                    $styledSelect.find('.default').remove();
                                }
                                $styledSelect.append('<div class="selectvalue" data-value="' + $(e.currentTarget).attr('rel') + '" data-id="'+ id + '">' + $(e.currentTarget).attr('rel') + '</div>');
                                $this.find('option[value="' + $(e.currentTarget).attr('rel') + '"][data-id="' + id + '"]').prop("selected", true)
                            }
                            $this.change();
                        });

                        $(document).mousedown(function(e) {
                            if($(e.target).parents('.customselect-wrapper').length == 0) {
                                $styledSelect.removeClass('active');
                                $list.hide();
                            }
                        });

                        $(document).click(function() {
                            $styledSelect.removeClass('active');
                            $list.hide();
                        });
                    }
                    else {
                        $(this).parent().addClass('customselect-wrapper');
                        var $this = $(this),
                        numberOfOptions = $(this).children('option').length;
                        $this.addClass('select-hidden'); 
                        $this.wrap('<div class="select"></div>');
                        $this.after('<div class="select-styled"></div>');
                        var $styledSelect = $this.next('div.select-styled');
                        if($this.find('option:selected').length>0){
                            $styledSelect.text($this.find('option:selected').text());
                        }
                        else {
                            $styledSelect.text('Выберите ответ');
                        }
                    
                        var $list = $('<ul />', {
                            'class': 'select-options'
                        }).insertAfter($styledSelect);
                    
                        for (var i = 0; i < numberOfOptions; i++) {
                            var id = Math.floor(Math.random() * 100000);
                            $this.children('option').eq(i).attr('data-id', id);
                            lioption = '<li rel="'+ $this.children('option').eq(i).val() + '" data-id="'+ id + '">'+ $this.children('option').eq(i).text() + '</li>';
                            $(lioption).appendTo($list);
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
                        $(document).mousedown(function(e) {
                            if($(e.target).parents('.customselect-wrapper').length == 0) {
                                $styledSelect.removeClass('active');
                                $list.hide();
                            }
                        });
                        $(document).click(function() {
                            $styledSelect.removeClass('active');
                            $list.hide();
                        });
                    }
                }
            });   
        }
    });
});
