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
};

jQuery(function ($) {
    $(document).ready(function () {
        //hide datepicker while scroll
        $(".centerbox").scroll(function(){
            $( "#ui-datepicker-div" ).hide();
        });

        // Restricts input for the set of matched elements to the given inputFilter function.
        $.fn.inputFilter = function(inputFilter) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
                if($(this).hasClass('btnradius') && $(this).parents('.btn-options').find('.btnheight').val()){
                    var max = parseInt($(this).parents('.btn-options').find('.btnheight').val())/2;
                        if (inputFilter(this.value) && this.value < max ) {
                            this.oldValue = this.value;
                            this.oldSelectionStart = this.selectionStart;
                            this.oldSelectionEnd = this.selectionEnd;
                            } else if (this.hasOwnProperty("oldValue")) {
                            this.value = this.oldValue;
                            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                            } else {
                            this.value = "";
                            }
                }
                else {
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
                }
            });
        };

        $.fn.inputFilterRange = function(inputFilterRange) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
                if($(this).hasClass('rangemin') && $(this).parents('.row-options').find('.rangemax').val()){
                    var max = parseInt($(this).parents('.row-options').find('.rangemax').val());
                        if (inputFilterRange(this.value) && this.value < max ) {
                            this.oldValue = this.value;
                            this.oldSelectionStart = this.selectionStart;
                            this.oldSelectionEnd = this.selectionEnd;
                            } else if (this.hasOwnProperty("oldValue")) {
                            this.value = this.oldValue;
                            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                            } else {
                            this.value = "";
                            }
                }
                // else if ($(this).hasClass('rangemax') && $(this).parents('.row-options').find('.rangemin').val()) {
                //     var min = parseInt($(this).parents('.row-options').find('.rangemin').val());
                //         if (inputFilterRange(this.value) && this.value > min ) {
                //             this.oldValue = this.value;
                //             this.oldSelectionStart = this.selectionStart;
                //             this.oldSelectionEnd = this.selectionEnd;
                //             } else if (this.hasOwnProperty("oldValue")) {
                //             this.value = this.oldValue;
                //             this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                //             } else {
                //             this.value = "";
                //             }
                // }
                else {
                    if (inputFilterRange(this.value)) {
                        this.oldValue = this.value;
                        this.oldSelectionStart = this.selectionStart;
                        this.oldSelectionEnd = this.selectionEnd;
                        } else if (this.hasOwnProperty("oldValue")) {
                        this.value = this.oldValue;
                        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                        } else {
                        this.value = "";
                        }
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
        $('.rightside').on('change', '.position input[type=radio]', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            $('#questionanswers_' + idQuestion).find('.btn-answer').css('text-align', $(this).val());
        });

        $('.rightside').on('change', '.btnwidth', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val() + 'px';
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css('width', value);
        });

        $(".btnwidth").inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 1500);
        });

        $('.rightside').on('change', '.btnborderwidth', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val() + 'px';
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css('border-width', value);
        });

        $(".btnborderwidth").inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 10);
        });
        

        $('.rightside').on('change', '.btnheight', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val() + 'px';
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css('height', value);
        });

        $(".btnheight").inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500);
        });


        $('.rightside').on('change', '.btnradius', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val() + "px";
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css( {  borderRadius:   value });
        });

        
        $(".btnradius").inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500);
        });
        //btn background
        $('.rightside').on('change', '.btncolor', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val();
            $(this).parents('.btn-options').find('.optionbtntextcolor .color').css( 'background', value);
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css( 'background', value);
            $(this).parents('.optionbtngroup').find('.color').css( 'background', value);
        });

        $('.rightside').on('click', '.btncolor', function(e){
            $(this).prev('input').click();
        });

        $('.rightside').on('change', '.btnbordercolor', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val();
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css( 'border-color', value);
        });

        $('.rightside').on('click', '.btnbordercolor', function(e){
            $(this).prev('input').click();
        });
        
        $('.rightside').on('input', '.hiddeninputcolor', function(e){
            $(this).next('input').val($(this).val());
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val();
            $(this).parents('.btn-options').find('.optionbtntextcolor .color').css( 'background', value);
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css( 'background', value);
            $(this).parents('.optionbtngroup').find('.color').css( 'background', value);
        });

        //btn text color 
        $('.rightside').on('input', '.btntextcolor', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val();
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css( 'color', value);
            $(this).parents('.optionbtngroup').find('.color').css( 'color', value);

        });

        $('.rightside').on('click', '.btntextcolor', function(e){
            $(this).prev('input').click();
        });

        $('.rightside').on('input', '.hiddeninputtextcolor', function(e){
            $(this).next('input').val($(this).val());
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val();
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css( 'color', value);
            $(this).parents('.optionbtngroup').find('.color').css( 'color', value);
        });

        $('.rightside').on('change, keypress, keydown, keyup', '.btn_name', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val();
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').html(value);
        });
        $( ".listbox li" ).draggable({
            helper: "clone",
            cursor: "move",
            connectToSortable: ".centerboxs",
            containment: '.construcot-container'
        });
        $('.date-answer input').datepicker();
        $('.centerbox').on('click', '.date-answer .icon-date', function(e){
            $(this).parents('.date-answer').find('input').datepicker('show');
        });
        $('.phone-answer input.code').intlTelInput({
            initialCountry: "ru",
        });
        //set code country of downloadinf page
        var TelCountries = $('.rightside .telcountry');
        if(TelCountries.length>0){
            TelCountries.each(function (index, telcountry) {
                var name = $(telcountry).attr('name').split('[')[0];
                var idQuestion = name.split('_')[1];
                var country =  $(telcountry).val();
                if(country.includes('all') && !$(telcountry).hasClass('allcountry')){
                    var lielements = $(telcountry).parents('.select').find('.select-options li');
                    lielements.each(function (index, el) {
                        if(!$(el).find('.checked').hasClass('active')) {
                            $(el).click();
                        }
                    });
                    $(telcountry).addClass('allcountry');
                }
                else {
                    if($(telcountry).hasClass('allcountry') && !country.includes('all')){
                        var lielements = $(telcountry).parents('.select').find('.select-options li');
                        lielements.each(function (index, el) {
                            if($(el).find('.checked').hasClass('active')) {
                                $(el).click();
                            }
                        });
                    }
                    $(telcountry).removeClass('allcountry');
                    if(country.includes('all')) {
                       $(telcountry).parents('.select').find('.select-options li[rel=all]').click();
                    }
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
        //change default country code
        $('.rightside').on('change', '.telcountry', function(e){
            var name = $(this).attr('name').split('[')[0];
            var idQuestion = name.split('_')[1];
            var country =  $(this).val();
            var telcountry = this;
            if(country.includes('all') && !$(telcountry).hasClass('allcountry')){
                var lielements = $(telcountry).parents('.select').find('.select-options li');
                lielements.each(function (index, el) {
                    if(!$(el).find('.checked').hasClass('active')) {
                        $(el).click();
                    }
                });
                $(telcountry).addClass('allcountry');
            }
            else {
                if($(telcountry).hasClass('allcountry') && !country.includes('all')){
                    var lielements = $(telcountry).parents('.select').find('.select-options li');
                    lielements.each(function (index, el) {
                        if($(el).find('.checked').hasClass('active')) {
                            $(el).click();
                        }
                    });
                }
                $(telcountry).removeClass('allcountry');
                if(country.includes('all')) {
                   $(telcountry).parents('.select').find('.select-options li[rel=all]').click();
                }
            }
            if(country.includes('all') && $(telcountry).hasClass('allcountry') ) {
                $('#questionanswers_' + idQuestion).find('.phone-answer input.code').val('');
                $('#questionanswers_' + idQuestion).find('.phone-answer .intl-tel-input .selected-flag').css('pointer-events','all');
                $('#questionanswers_' + idQuestion).find('.phone-answer .intl-tel-input .country').css('display', 'block');
                $('#questionanswers_' + idQuestion).find('.intl-tel-input .selected-flag .flag').addClass('all-country');    
            }
            else if(country.length == 1) {
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
        

        $('.centerbox').on('keyup', '.phone-answer input', function(e){
            if (/[^\d|\-+|\.+]/g.test(this.value))
            {
              this.value = this.value.replace(/[^\d|\-+|\.+]/g, '');
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

        var Questions = $('.questions-box').children();
        Questions.each(function (index, question) {
            var id = $(question).attr('data-optionid');
            if($(question).find('.mediablock').length>0){
                if($(question).find('.imageblock').length>0){
                    $('#option_' + id).find('.uploadpicture').addClass('active');
                    $('#option_' + id).find('.uploadpicture').next('input').prop( "checked", true );
                }
                else if($(question).find('.audioblock').length>0){
                    $('#option_' + id).find('.uploadaudio').addClass('active');
                    $('#option_' + id).find('.uploadaudio').next('input').prop( "checked", true );
                }
                else if($(question).find('.videoblock').length>0){
                    $('#option_' + id).find('.uploadvideo').addClass('active');
                    $('#option_' + id).find('.uploadvideo').next('input').prop( "checked", true );
                }
                else if($(question).find('.textblock').length>0){
                    $('#option_' + id).find('.uploadtext').addClass('active');
                    $('#option_' + id).find('.uploadtext').find('input').prop( "checked", true );

                    var inputtext = 
                    '<div class="inser-text">'
                    +'    <label for="uploadtextinput_'+ id + '">Рекламный текст</label>'
                    +'    <textarea class="uploadtextinput" name="uploadtextinput_'+ id + '" id="uploadtextinput_' + id + '" placeholder="Введите текст">' + $(question).find('.textblock').html() + '</textarea>'
                    +'</div>';
                    $(inputtext).insertAfter($('#option_' + id).find('.uploadtext'));
                    $('#option_' + id).find('.uploadtext').next('.inser-text').fadeIn(300);
                }

            }
        });

        $( ".listbox li" ).toggleClass('dragged');

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

        //fille upload 
        //uploadpicture
        $('.rightside').on('click', '.eloptions .uploadpicture', function(e){
            $(this).parents('.filerow').children().removeClass('active');
            $(this).addClass('active');
            $(this).find('input[type=radio]').prop('checked', true);
            $(this).next('input[type=file]').val('');
            $(this).next('input[type=file]').click();
            if($(this).parents('.filerow').find('.inser-text').length>0){
                $(this).parents('.filerow').find('.inser-text').remove();
            }
        });

        $('.centerbox').on('click', '.addmorepictures', function(e){
            var idQuestion = $(this).parents('.question').find('input').attr('name').split('_')[1];
            $('#uploadimage_' + idQuestion).click();
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

        var _URL = window.URL || window.webkitURL;

        $('body').on('submit', '.uploadimageform' ,(function(e) {
            e.preventDefault();
            var QuestionId = $(this).find('input').attr('data-questionid');
            var idQuuiz = $(this).find('input').attr('data-quizid');
            var formData = new FormData(this);
            $.ajax({
                type:'POST', // Тип запроса
                url: '/admin/poll/image-upload', // Скрипт обработчика
                data: formData, // Данные которые мы передаем
                cache:false, // В запросах POST отключено по умолчанию, но перестрахуемся
                contentType: false, // Тип кодирования данных мы задали в форме, это отключим
                processData: false, // Отключаем, так как передаем файл
                success:function(data){
                    console.log('Файлы загружены');
                    const objfiles = JSON.parse(data);
                    SetImageFromAjax(objfiles, QuestionId);
                },
                error:function(data){
                  console.log(data);
                }
            });
        }));

        function SetImageFromAjax(files, idQuestion) {
            var child = $('#questionanswers_'+idQuestion);
            var image;
            // for (var i = 0; i < files.length; i++) {
            // files.forEach(function(item, i, arr) {
            $.each( files, function( i, item ) {
                var settingsImage =
                '<div class="remove-picture"></div>'
                +'<div class="bottom-row">'
                +'   <div class="inputsimage">'
                +'        <div class="inputgroup">'
                +'            <input type="radio" name="clickforimage_' + idQuestion + '_' + i +'" id="clickforimage_' + idQuestion + '_' + i +'_1"'
                +'                value="50">'
                +'            <label for="clickforimage_' + idQuestion + '_' + i + '_1">50 на картинку</label>'
                +'        </div>'
                +'        <div class="inputgroup">'
                +'            <input type="radio" name="clickforimage_' + idQuestion + '_' + i + '" id="clickforimage_' + idQuestion + '_' + i + '_2"'
                +'                value="100">'
                +'            <label for="clickforimage_' + idQuestion + '_' + i + '_2">100 на картинку</label>'
                +'        </div>'
                +'        <div class="inputgroup">'
                +'            <input type="radio" name="clickforimage_' + idQuestion  + '_' + i + '" id="clickforimage_'  + idQuestion + '_' + i + '_3"'
                +'                value="200">'
                +'            <label for="clickforimage_' + idQuestion  + '_' + i + '_3">200 на картинку</label>'
                +'        </div>'
                +'    </div>'
                +'</div>';
                image = 
                '<div class="image" style="width:33%">'
                +'<input type="hidden" value="'+ i +'" name="imageId_' + idQuestion + '_' + i + '">'
                +'<img src ="/admin/uploads/'+ item + '" alt="Image"> ' + settingsImage + '</div>';
                child.parents('.question').find('.imageblock').append(image);
                ResizeImg();
            });
        }


        //upload picture
        $('.rightside').on('change', '.uploadpictureinput', function(e){
            var idQuestion = $(this).prev('.uploadpicture').find('input').attr('name').split('_')[1];
            var tempFiles = 
            '<input class="uploadpictureinput" type="file" name="'+ $(this).attr('name') +'" multiple="" accept="image/x-png,image/gif,image/jpeg">';
            if(tempFiles){
               $(tempFiles).insertBefore($(this));
            }            
            var files = e.target.files;
            var child = $('#questionanswers_'+idQuestion);
            if(!child.parents('.question').find('.mediablock').length>0){
                var mideablock = '<div class="mediablock"></div>';
                $(child.parents('.question')).prepend(mideablock);
            }
            if(!child.parents('.question').find('.imageblock').length>0){
                child.parents('.question').find('.mediablock').html(' ');
                var imageblock = '<div class="imageblock"></div>';
                var settingsImage = 
                '<div class="bottom-row">'
                +'    <div class="removeallpictures">Удалить все</div>'
                +'    <div class="addmorepictures">Добавить до 10 фото</div>'
                +'</div>';
                $(child.parents('.question')).find('.mediablock').prepend(settingsImage);
                $(child.parents('.question')).find('.mediablock').prepend(imageblock);
            }

            var size = 0;
            for( var i = 0; i < files.length; i++ ) {
                size += files[i].size;
            }
            var maxsize = 1024*1024*20 - 1;
            if(files.length > 9 ) {
                $('#modal-error').find('.text').html('Выберете, пожалуйста, не больше 10 файлов');
                $('.modal').fadeIn(300);
            }
            else if (size > maxsize){
                $('#modal-error').find('.text').html('Размер файлов не должен превышать 20 МБ. Выберете, пожалуйста, файлы меньшего размера.');
                $('.modal').fadeIn(300);
            }
            else {
                // SetImage(files, idQuestion ,child);
                if($('.uploadimageform').length==0){
                    var testform = '<form style="display: none;" class="uploadimageform" enctype="multipart/form-data"></form>';
                    $('body').append(testform);
                }
                else {
                    $('.uploadimageform').html(' ');
                }
                var input = $(this).clone();
                var idQuuiz = $('#quiz-id').val();
                input.attr('data-questionid', idQuestion);
                input.attr('data-quizid', idQuuiz);
                input.attr('name', 'uploadimage_1[]');
                var inputquestion = '<input type="hidden" name="question_id" value="' + idQuestion + '">';
                var inputquiz = '<input type="hidden" name="quiz_id" value="'+ idQuuiz + '">';
                $('.uploadimageform').append(input);
                $('.uploadimageform').append(inputquestion);
                $('.uploadimageform').append(inputquiz);
                $('.uploadimageform').submit();
            }
        });

        $('.centerbox').on('click', '.remove-picture', function(e){
            var parents = $(this).parents('.imageblock');
            var pictureId = $(this).parents('.image').find('input[type=hidden]').val();
            $(this).parents('.image').remove();
            $.ajax ({
                type: 'POST',
                url: "/admin/poll/delete-image",
                dataType: "json",
                data: {
                    id: pictureId,
                }
            }).done(function (data) {
                // данные удалени
                console.log('Картинка удалена');
            }).fail(function () {
                // не удалось выполнить запрос к серверу
                console.log('Запрос не принят');
            });
            ResizeImg();
        });
        
        $('.centerbox').on('click', '.removeallpictures', function(e){
            var parents = $(this).parents('.mediablock').find('.imageblock');
            var Images = parents.children();
            Images.each(function (index, image) {
                var pictureId = $(image).find('input[type=hidden]').val();
                $(image).remove();
                    $.ajax({ 
                        type: 'POST',
                        url: '/admin/poll/delete-image',
                        data: 
                        {
                            id: pictureId,
                        },  
                        cache: false,
                        success: function (data) {
                            console.log(data);
                            console.log('Картинка удалена');
                        },
                        processData: false,
                        contentType: false, 
                });
            });
        });
        
        //uploadvideo
        $('.rightside').on('click', '.uploadvideo', function(e){
            $(this).parents('.filerow').children().removeClass('active');
            $(this).addClass('active');
            $(this).find('input[type=radio]').prop('checked', true);
            $(this).next('input[type=file]').val('');
            $(this).next('input[type=file]').click();
            if($(this).parents('.filerow').find('.inser-text').length>0){
                $(this).parents('.filerow').find('.inser-text').remove();
            }
        });

        $('.rightside').on('change', '.uploadvideoinput', function(e){
            var idQuestion = $(this).attr('name').split('_')[1];
            var child = $('#questionanswers_'+idQuestion);
            if(!child.parents('.question').find('.mediablock').length>0){
                var mideablock = '<div class="mediablock"></div>';
                $(child.parents('.question')).prepend(mideablock);
            }
            child.parents('.question').find('.mediablock').html(' ');
            if(!child.parents('.question').find('.videoblock').length>0){
                var videoblock = '<div class="videoblock"></div>';
                $(child.parents('.question')).find('.mediablock').prepend(videoblock);
            }

            var files = !!this.files ? this.files : [];
            var filename = files[0].name;
            if (!files.length || !window.FileReader) return; 
            if(filename.split('.').pop().toUpperCase()!="MP4"){
                $('#modal-error').find('.text').html('Пожалуйста, загрузите видеофайл в формате MP4');
                $('.modal').fadeIn(300);
            }
            else {

                if($('.uploadvideoform').length==0){
                    var testform = '<form style="display: none;" class="uploadvideoform" enctype="multipart/form-data"></form>';
                    $('body').append(testform);
                }
                else {
                    $('.uploadvideoform').html(' ');
                }

                //videо ajax
                var input = $(this).clone();
                var idQuuiz = $('#quiz-id').val();
                input.attr('data-questionid', idQuestion);
                input.attr('data-quizid', idQuuiz);
                input.attr('name', 'uploadvideo_1');
                var inputquestion = '<input type="hidden" name="question_id" value="' + idQuestion + '">';
                var inputquiz = '<input type="hidden" name="quiz_id" value="'+ idQuuiz + '">';
                $('.uploadvideoform').append(input);
                $('.uploadvideoform').append(inputquestion);
                $('.uploadvideoform').append(inputquiz);
                $('.uploadvideoform').submit();

                // if (/^video/.test( files[0].type)){ // only video file
                //     var reader = new FileReader(); // instance of the FileReader
                //     reader.readAsDataURL(files[0]); // read the local file
                //     reader.onloadend = function(){ // set video data as background of div
                //         var video = 
                //         '<video width="400" >'
                //         +'    <source src="'+ this.result + '">'
                //         +'    Your browser does not support HTML5 video.'
                //         +'</video>';
                //         var play ='<div class="play"></div>';
                //         child.parents('.question').find('.videoblock').append(video);
                //         child.parents('.question').find('.videoblock').append(play);
                //     }
                // }
            }
        });

        
        $('body').on('submit', '.uploadvideoform' ,(function(e) {
            e.preventDefault();
            var QuestionId = $(this).find('input').attr('data-questionid');
            var idQuuiz = $(this).find('input').attr('data-quizid');
            var formData = new FormData(this);
            $.ajax({
                type:'POST', // Тип запроса
                url: '/admin/poll/image-upload', // Скрипт обработчика
                data: formData, // Данные которые мы передаем
                cache:false, // В запросах POST отключено по умолчанию, но перестрахуемся
                contentType: false, // Тип кодирования данных мы задали в форме, это отключим
                processData: false, // Отключаем, так как передаем файл
                success:function(data){
                    console.log('Видео загружено');
                    const objfiles = JSON.parse(data);
                    SetVideoFromAjax(objfiles, QuestionId);
                },
                error:function(data){
                  console.log(data);
                }
            });
        }));

        
        function SetVideoFromAjax(files, idQuestion) {
            var child = $('#questionanswers_'+idQuestion);
            $.each( files, function( i, item ) {
                var video;
                video = 
                '<input type="hidden" value="'+ i +'" name="videoId_' + idQuestion + '_' + i + '">'
                +'<div class="remove-video"></div>'
                +'<video width="400" >'
                +'    <source src="/admin/uploads/'+ item + '">'
                +'    Your browser does not support HTML5 video.'
                +'</video>';
                var play ='<div class="play"></div>';
                child.parents('.question').find('.videoblock').html(video);
                child.parents('.question').find('.videoblock').append(play);
            });
        }

        $('.centerbox').on('click', '.remove-video', function(e){
            var videoId = $(this).parents('.videoblock').find('input[type=hidden]').val();
            $(this).parents('.videoblock').remove();
            $.ajax ({
                type: 'POST',
                url: "/admin/poll/delete-image",
                dataType: "json",
                data: {
                    id: videoId,
                }
            }).done(function (data) {
                // данные удалени
                console.log('Видео удалено');
            }).fail(function () {
                // не удалось выполнить запрос к серверу
                console.log('Запрос не принят');
            });
        });

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
        

        //uploadaudio

        $('.rightside').on('click', '.uploadaudio', function(e){
            $(this).parents('.filerow').children().removeClass('active');
            $(this).addClass('active');
            $(this).find('input[type=radio]').prop('checked', true);
            $(this).next('input[type=file]').val('');
            $(this).next('input[type=file]').click();
            if($(this).parents('.filerow').find('.inser-text').length>0){
                $(this).parents('.filerow').find('.inser-text').remove();
            }
        });

        $('.rightside').on('change', '.uploadaudioinput', function(e){
            var idQuestion = $(this).attr('name').split('_')[1];
            var child = $('#questionanswers_'+idQuestion);
            if(!child.parents('.question').find('.mediablock').length>0){
                var mideablock = '<div class="mediablock"></div>';
                $(child.parents('.question')).prepend(mideablock);
            }
            child.parents('.question').find('.mediablock').html(' ');
            if(!child.parents('.question').find('.audioblock').length>0){
                var audioblock = 
                '<div class="audioblock">'
                +'    <div class="playaudio"></div>'
                +'    <div class="remove-audio"></div>'
                +'    <input type="hidden" name="audioId_' + idQuestion + '">'
                +'    <div class="audio audiowave"> </div>'
                +'</div>';
                $(child.parents('.question')).find('.mediablock').prepend(audioblock);
            }

            var files = !!this.files ? this.files : [];
            var filename = files[0].name;
            var container = '#audiowave_' + idQuestion;
            if (!files.length || !window.FileReader) return; 
            if (/^audio/.test( files[0].type)){ 
                var reader = new FileReader(); // instance of the FileReader
                reader.readAsDataURL(files[0]); // read the local file
                reader.onloadend = function(){ // set  

                // Generate unic ud
                var id = '_' + Math.random().toString(36).substr(2, 9);
                var path = this.result;

                //Set id to container
                child.parents('.question').find('.mediablock').find('.audiowave').attr('id', id);

                //Initialize WaveSurfer
                var wavesurfer = WaveSurfer.create({
                    container: '#' + id,
                    scrollParent: true,
                    backgroundColor: '#FFFFFF',
                    barWidth: 1.5,
                    height: 40,
                    barMinHeight: 1,
                    cursorWidth: 0,
                    barGap: 2,
                    waveColor: 'rgba(87, 34, 222, 0.2)',
                    hideScrollbar: true,
                    progressColor: "#5722DE"
                });

                //Load audio file
                wavesurfer.load(path);

                //Add button event
                child.parents('.question').find('.mediablock').find('.playaudio').click(function(){
                    wavesurfer.playPause();
                });

                }
            }
            if($('.uploadaudioform').length==0){
                var testform = '<form style="display: none;" class="uploadaudioform" enctype="multipart/form-data"></form>';
                $('body').append(testform);
            }
            else {
                $('.uploadaudioform').html(' ');
            }
            //audio ajax
            var input = $(this).clone();
            var idQuuiz = $('#quiz-id').val();
            input.attr('data-questionid', idQuestion);
            input.attr('data-quizid', idQuuiz);
            input.attr('name', 'uploadaudio_1');
            var inputquestion = '<input type="hidden" name="question_id" value="' + idQuestion + '">';
            var inputquiz = '<input type="hidden" name="quiz_id" value="'+ idQuuiz + '">';
            $('.uploadaudioform').append(input);
            $('.uploadaudioform').append(inputquestion);
            $('.uploadaudioform').append(inputquiz);
            $('.uploadaudioform').submit();
        });

        $('body').on('submit', '.uploadaudioform' ,(function(e) {
            e.preventDefault();
            var QuestionId = $(this).find('input').attr('data-questionid');
            var idQuuiz = $(this).find('input').attr('data-quizid');
            var formData = new FormData(this);
            $.ajax({
                type:'POST', // Тип запроса
                url: '/admin/poll/image-upload', // Скрипт обработчика
                data: formData, // Данные которые мы передаем
                cache:false, // В запросах POST отключено по умолчанию, но перестрахуемся
                contentType: false, // Тип кодирования данных мы задали в форме, это отключим
                processData: false, // Отключаем, так как передаем файл
                success:function(data){
                    console.log('Аудио загружены');
                    const objfiles = JSON.parse(data);
                    SetAudioFromAjax(objfiles, QuestionId);
                },
                error:function(data){
                  console.log(data);
                }
            });
        }));

        function SetAudioFromAjax(files, idQuestion) {
            var child = $('#questionanswers_'+idQuestion);
            $.each( files, function( i, item ) {
                
                // // Generate unic ud
                // var id = '_' + Math.random().toString(36).substr(2, 9);
                // var path = "/admin/uploads/"+ item ;

                // //Set id to container
                // child.parents('.question').find('.mediablock').find('.audiowave').attr('id', id);

                // //Initialize WaveSurfer
                // var wavesurfer = WaveSurfer.create({
                //     container: '#' + id,
                //     scrollParent: true,
                //     backgroundColor: '#FFFFFF',
                //     barWidth: 1.5,
                //     height: 40,
                //     barMinHeight: 1,
                //     cursorWidth: 0,
                //     barGap: 2,
                //     waveColor: 'rgba(87, 34, 222, 0.2)',
                //     hideScrollbar: true,
                //     progressColor: "#5722DE"
                // });

                // //Load audio file
                // wavesurfer.load(path);

                // //Add button event
                // child.parents('.question').find('.mediablock').find('.playaudio').click(function(){
                //     wavesurfer.playPause();
                // });

                // var hiddenInput = '<input type="hidden" value="'+ i +'" name="audioId_' + idQuestion + '_' + i + '">';
                child.parents('.question').find('.audioblock').find('input[type=hidden]').val(i);
            });
        }

        $('.centerbox').on('click', '.remove-audio', function(e){
            var audioId = $(this).parents('.question').find('.audioblock').find('input[type=hidden]').val();
            $(this).parents('.audioblock').remove();
            $.ajax ({
                type: 'POST',
                url: "/admin/poll/delete-image",
                dataType: "json",
                data: {
                    id: audioId,
                }
            }).done(function (data) {
                // данные удалени
                console.log('Аудио удалено');
            }).fail(function () {
                // не удалось выполнить запрос к серверу
                console.log('Запрос не принят');
            });
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
        
        //upload text
        $('.rightside').on('click', '.uploadtext', function(e){
            if(!$(this).find('input[type=radio]').prop("checked")){
                $(this).parents('.filerow').children().removeClass('active');
                $(this).addClass('active');    
                $(this).find('input[type=radio]').prop('checked', true);
                var idQuestion = $(this).find('input[type=radio]').attr('name').split('_')[1];
                var child = $('#questionanswers_'+idQuestion);
                if(!child.parents('.question').find('.mediablock').length>0){
                    var mideablock = '<div class="mediablock"></div>';
                    $(child.parents('.question')).prepend(mideablock);
                }
                child.parents('.question').find('.mediablock').html(' ');
                if(!child.parents('.question').find('.textblock').length>0){
                    var textblock = 
                    '<div class="textblock"> Рекламный текст'
                    +'</div>';
                    $(child.parents('.question')).find('.mediablock').prepend(textblock);
                }
                var inputtext = 
                '<div class="inser-text">'
                +'    <label for="uploadtextinput_'+ idQuestion + '">Рекламный текст</label>'
                +'    <textarea class="uploadtextinput" name="uploadtextinput_'+ idQuestion + '" id="uploadtextinput_' + idQuestion + '" placeholder="Введите текст"></textarea>'
                +'</div>';
                $(inputtext).insertAfter($(this));
                $(this).next('.inser-text').fadeIn(300);
            }
        });
        
        if(document.getElementsByClassName('uploadtextinput')[0]){
            auto_grow(document.getElementsByClassName('uploadtextinput')[0]);
        }
        $('.rightside').on('change, keypress, keydown, keyup', '.uploadtextinput', function(e){
            var idQuestion = $(this).attr('name').split('_')[1];
            var child = $('#questionanswers_'+idQuestion);
            if(child.parents('.question').find('.mediablock .textblock').length>0){
                child.parents('.question').find('.mediablock .textblock').html($(this).val());
            }
            auto_grow(this);
        });
        $('body').on('change, keypress, keydown, keyup', 'textarea', function(e){
            auto_grow(this);
        });
        //change name of question
        $('.rightside').on('change, keypress, keydown, keyup', '.question_name', function(e){
            var id = $(this).attr('name').split('_')[1];
            $('#questionName_' + id).html($(this).val());
        });

        //change name of multiple question in scale
        $('.rightside').on('change, keypress, keydown, keyup', '.multiplequestion_name', function(e){
            var idQuestion = $(this).attr('name').split('_')[1];
            var idMultiple = $(this).attr('name').split('_')[2];
            var idMultiplePoint = $(this).attr('name').split('_')[3];
            if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                if(multipeQuestions[idMultiplePoint-1]){
                    $(multipeQuestions[idMultiplePoint-1]).find('.name').html($(this).val());
                }
            }
            // $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group .name')
            // $('#questionName_' + id).html($(this).val());
        });
        
        //change name of multiple question in scale
        $('.rightside').on('change, keypress, keydown, keyup', '.multiplequestion_name_2', function(e){
            var namequestion = $(this).attr('name').split('_');
            var idQuestion = namequestion[1];
            var idMultiple = namequestion[2];
            var idMultiplePoint = namequestion[3];
            var idPoint = parseInt(namequestion[4]);
            if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.item:nth-child('+ idPoint +')').length>0){
                if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                    let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                    if(multipeQuestions[idMultiplePoint-1]){
                        $(multipeQuestions[idMultiplePoint-1]).find('.item:nth-child('+ idPoint +')').find('.multiple-second-group .name').html($(this).val());
                    }
                }
            }
        });

        //change name of multiple question in scale
        $('.rightside').on('change, keypress, keydown, keyup', '.multiplescale-question-2', function(e){
            var namequestion = $(this).attr('name').split('_');
            var idQuestion = namequestion[1];
            var idMultiple = namequestion[2];
            var idMultiplePoint = namequestion[3];
            var idPoint = parseInt(namequestion[4]);
            var idSecondPoint = parseInt(namequestion[5]);
            if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.item:nth-child('+ idPoint +')').length>0){
                if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                    let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                    if(multipeQuestions[idMultiplePoint-1]){
                        let multi2 = $(multipeQuestions[idMultiplePoint-1]).find('.item:nth-child('+ idPoint +')').find('.multiple-second-group .item');
                        if(multi2[idSecondPoint-1]){
                            $(multi2[idSecondPoint-1]).html($(this).val());
                        }
                    }
                }
            }
        });
        
        //change description of question
        $('.rightside').on('change, keypress, keydown, keyup', '.question_description', function(e){
            var id = $(this).attr('name').split('_')[1];
            $('#questiondescription_' + id).html($(this).val());
        });
        
        //change matrix row
        $('.rightside').on('change, keypress, keydown, keyup', '.matrix-options .rowslist .row-item input', function(e){
            var name =  $(this).attr('name');
            var idQuestion = name.split('_')[1];
            var idPoints = parseInt(name.split('_')[2]) + 1;
            var value = $(this).val();
            $('#questionanswers_' + idQuestion + ' .matrix-table .matrix-row:nth-child(' + idPoints + ') .first-col .value').html(value);
        });

        //change matrix row
        $('.rightside').on('change, keypress, keydown, keyup', '.matrix-options .rowslist2 .row-item input', function(e){
            var name =  $(this).attr('name');
            var idQuestion = name.split('_')[1];
            var idPoints = parseInt(name.split('_')[2]) + 1;
            var value = $(this).val();
            $('#questionanswers_' + idQuestion + ' .matrix-table .first-row .col:nth-child(' + idPoints + ') .value').html(value);
        });

        //add matrix row
        $('.rightside').on('click', '.addmatrixrow', function(e){
            if($(this).parents('.matrix-options').find('.rowslist .row-item:last-child input').length>0)
            {
                var name =  $(this).parents('.matrix-options').find('.rowslist .row-item:last-child input').attr('name');
                var idQuestion = name.split('_')[1];
                var idPoints = parseInt(name.split('_')[2]) + 1;
            }
            else {
                var name =  $(this).parents('.matrix-options').find('input').attr('name');
                var idQuestion = name.split('_')[1];
                var idPoints = 1;
            }
            var numberCols = parseInt($(this).parents('.matrix-options').find('.rowslist2').children().length);
            if(idPoints<21) {
                if(idQuestion && idPoints) {
                    var newoptionrow = 
                    '<div class="row-item">'
                    +'    <input type="text" name="inputpoint_' + idQuestion + '_'+ idPoints + '" id="inputpoint_' + idQuestion + '_'+ idPoints + '" placeholder="Строка '+ idPoints + '">'
                    +'    <div class="edit-menu">'
                    +'        <div class="menu-dots"></div>'
                    +'        <div class="menu-list">'
                    +'            <div class="add-row addmatrixrow"></div>'
                    +'            <div class="delete-row deletematrixrow"></div>'
                    +'        </div>'
                    +'    </div>'
                    +'</div>';
                    $(this).parents('.matrix-options').find('.rowslist').append(newoptionrow);
                    var newrowanswer =
                    '<div class="matrix-row">'
                    +'    <div class="col first-col">'
                    +'        <div class="value">Строка '+ idPoints + '</div>'
                    +'    </div>';
    
                    if($(this).parents('.matrix-options').find('.matrixtype').is(':checked')){
                        for (let i = 0; i < numberCols; i++){
                            var newCol =
                            '<div class="col">'
                            +'    <input type="checkbox" name="answermatrix_' + idQuestion + '_' + idPoints +  '_' + i + '"  id="answermatrix_' + idQuestion + '_' + idPoints + '_' + i + '">'
                            +'    <label for="answermatrix_' + idQuestion + '_' + idPoints + '_' + i + '">'
                            +'    </label>'
                            +'</div>';
                            newrowanswer = newrowanswer + newCol;
                        }
                    }
                    else {
                        for (let i = 0; i < numberCols; i++){
                            var newCol =
                            '<div class="col">'
                            +'    <input type="radio" name="answermatrix_' + idQuestion + '_' + idPoints  + '"  id="answermatrix_' + idQuestion + '_' + idPoints + '_' + i + '">'
                            +'    <label for="answermatrix_' + idQuestion + '_' + idPoints + '_' + i + '">'
                            +'    </label>'
                            +'</div>';
                            newrowanswer = newrowanswer + newCol;
                        }
                    }
                    newrowanswer = newrowanswer +'    </div>'
                    +'</div>';
                    $('#questionanswers_' + idQuestion + ' .matrix-table').append(newrowanswer);
                }
            }
            else {
                $('#modal-error').find('.text').html('Вы можете задать не более 20 строк');
                $('.modal').fadeIn(300);
            }
        });
        //add matrix row
        $('.rightside').on('click', '.addmatrixrow2', function(e){
            if($(this).parents('.matrix-options').find('.rowslist2 .row-item:last-child input').length>0)
            {
                var name =  $(this).parents('.matrix-options').find('.rowslist2 .row-item:last-child input').attr('name');
                var idQuestion = name.split('_')[1];
                var idPoints = parseInt(name.split('_')[2]) + 1;
            }
            else {
                var name =  $(this).parents('.matrix-options').find('input').attr('name');
                var idQuestion = name.split('_')[1];
                var idPoints = 1;
            }
            var numberCols = parseInt($(this).parents('.matrix-options').find('.rowslist').children().length);
            if(idPoints<15) {
                if(idQuestion && idPoints) {
                    var newoptionrow = 
                    '<div class="row-item">'
                    +'    <input type="text" name="inputrow_' + idQuestion + '_'+ idPoints + '" id="inputrow_' + idQuestion + '_'+ idPoints + '" value="'+ idPoints + '">'
                    +'    <div class="edit-menu">'
                    +'        <div class="menu-dots"></div>'
                    +'        <div class="menu-list">'
                    +'            <div class="add-row addmatrixrow2"></div>'
                    +'            <div class="delete-row deletematrixrow2"></div>'
                    +'        </div>'
                    +'    </div>'
                    +'</div>';
                    $(this).parents('.matrix-options').find('.rowslist2').append(newoptionrow);
                    MatrixColChange(idQuestion, idPoints);
                }
            }
            else {
                $('#modal-error').find('.text').html('Вы можете задать не более 15 колонок');
                $('.modal').fadeIn(300);
            }
        });
        
        // add matric col
        $('.rightside').on('click', '.addcolmatrix', function(e){
            var colls = parseInt($(this).parents('.matrix-options').find('.matrix_number').val()) + 1;
            if(colls<16){
                $(this).parents('.matrix-options').find('.matrix_number').val(colls);
                $(this).parents('.matrix-options').find('.matrix_number').change();
            }
            else {
                $('#modal-error').find('.text').html('Вы можете задать не более 15 колонок');
                $('.modal').fadeIn(300);
            }
        });

        //delete matrix row
        $('.rightside').on('click', '.deletematrixrow', function(e){
            var name =  $(this).parents('.row-item').find('input').attr('name');
            var idQuestion = name.split('_')[1];
            var idPoints = parseInt(name.split('_')[2]) + 1;
            var parents =  $(this).parents('.rowslist');
            $(this).parents('.row-item').remove();
            $('#questionanswers_' + idQuestion + ' .matrix-table .matrix-row:nth-child(' + idPoints + ')').remove();
            var Subpoints = parents.children();
            Subpoints.each(function (index, subpoint) {
                var id = index + 1;
                var inputs = $(subpoint).find('input');
                inputs.each(function (index, input) {
                    if($(input).attr('name')){
                        prevId = $(input).attr('name').split("_");
                        prevId[2] = id;
                        newId = prevId.join('_');
                        $(input).attr('name', newId);
                    }
                    if($(input).attr('id')){
                        prevId = $(input).attr('id').split("_");
                        prevId[2] = id;
                        newId = prevId.join('_');
                        $(input).attr('id', newId);
                    }
                });
            });

            var SubpointsAnswer = $('#questionanswers_' + idQuestion + ' .matrix-table').children();
            SubpointsAnswer.each(function (index, subpoint) {
                var id = index;
                var inputs = $(subpoint).find('input');
                inputs.each(function (index, input) {
                    if($(input).attr('name')){
                        prevId = $(input).attr('name').split("_");
                        prevId[2] = id;
                        newId = prevId.join('_');
                        $(input).attr('name', newId);
                    }
                    if($(input).attr('id')){
                        prevId = $(input).attr('id').split("_");
                        prevId[2] = id;
                        newId = prevId.join('_');
                        $(input).attr('id', newId);
                    }
                });
                
                var labels = $(subpoint).find('label');
                labels.each(function (index, label) {
                    if($(label).attr('for')){
                        prevId = $(label).attr('for').split("_");
                        prevId[2] = id;
                        newId = prevId.join('_');
                        $(label).attr('for', newId);
                    }
                    if($(label).attr('id')){
                        prevId = $(label).attr('id').split("_");
                        prevId[2] = id;
                        newId = prevId.join('_');
                        $(label).attr('id', newId);
                    }
                });
            });
        });

        //delete matrix row
        $('.rightside').on('click', '.deletematrixrow2', function(e){
            var name =  $(this).parents('.row-item').find('input').attr('name');
            var idQuestion = name.split('_')[1];
            var idPoints = parseInt(name.split('_')[2]) + 1;
            var parents =  $(this).parents('.rowslist2');
            $(this).parents('.row-item').remove();
            var Subpoints = parents.children();
            Subpoints.each(function (index, subpoint) {
                var id = index + 1;
                var inputs = $(subpoint).find('input');
                inputs.each(function (index, input) {
                    if($(input).attr('name')){
                        prevId = $(input).attr('name').split("_");
                        prevId[2] = id;
                        newId = prevId.join('_');
                        $(input).attr('name', newId);
                    }
                    if($(input).attr('id')){
                        prevId = $(input).attr('id').split("_");
                        prevId[2] = id;
                        newId = prevId.join('_');
                        $(input).attr('id', newId);
                    }
                });
            });

            var SubpointsAnswer = $('#questionanswers_' + idQuestion + ' .matrix-table').children();
            SubpointsAnswer.each(function (i_subpoint, subpoint) {
                var answerCols = $(subpoint).children();
                answerCols.each(function (i_col, col) {
                    var index = i_col + 1;
                    if(index == idPoints) {
                        $(col).remove();
                    }
                });
            });

            var SubpointsAnswer = $('#questionanswers_' + idQuestion + ' .matrix-table').children();
            SubpointsAnswer.each(function (index, subpoint) {
                var answerCols = $(subpoint).children();
                answerCols.each(function (i_col, col) {
                    var id = i_col;
                    var inputs = $(col).find('input');
                    inputs.each(function (index, input) {
                        if($(input).attr('name')){
                            prevId = $(input).attr('name').split("_");
                            prevId[3] = id;
                            newId = prevId.join('_');
                            $(input).attr('name', newId);
                        }
                        if($(input).attr('id')){
                            prevId = $(input).attr('id').split("_");
                            prevId[3] = id;
                            newId = prevId.join('_');
                            $(input).attr('id', newId);
                        }
                    });
                    
                    var labels = $(col).find('label');
                    labels.each(function (index, label) {
                        if($(label).attr('for')){
                            prevId = $(label).attr('for').split("_");
                            prevId[3] = id;
                            newId = prevId.join('_');
                            $(label).attr('for', newId);
                        }
                        if($(label).attr('id')){
                            prevId = $(label).attr('id').split("_");
                            prevId[3] = id;
                            newId = prevId.join('_');
                            $(label).attr('id', newId);
                        }
                    });
                });
            });
        });

        //change points of matrix col
        $('.rightside').on('change', '.matrix_number', function(e){
            var id = $(this).attr('name').split('_')[1];
            var number = $(this).val();
            MatrixColChange(id, number);
        });

        $( ".matrix_number" ).spinner({
            min: 0,
            max: 15,
            spin: function( event, ui ) {
                var id = $(event.target).attr('name').split('_')[1];
                var number = ui.value;
                MatrixColChange(id, number);
            }
        });

        //set colls of matrix
        function MatrixColChange(id, number) {
            number = parseInt(number) + 1;
            var answerRows = $('#questionanswers_' + id + ' .matrix-table').children();
            answerRows.each(function (i_row, row) {
                var answerCols = $(row).children();
                if(answerCols.length > number){
                    var idrow = i_row + 1;
                    answerCols.each(function (i_col, col) {
                        var index = i_col + 1;
                        if(index > number) {
                            $(col).remove();
                        }
                    });
                }
                else if(answerCols.length < number){
                    // var name = $('#option_' + id).find('.matrix_number').attr('name');
                    var idQuestion = id;
                    var idPoints = parseInt($('#option_' + id).find('.matrix-options').find('.rowslist').children().length);
                    if(i_row == 0){
                        for (let i =  answerCols.length; i < number; i++){
                            var newCol =
                            '<div class="col">'
                            +'    <div class="value">' + i + '</div>'
                            +'</div>';
                            $(row).append(newCol);
                        }
                    }
                    else {
                        if($('#option_' + id).find('.matrixtype').is(':checked')){
                            for (let i =  answerCols.length; i < number; i++){
                                var newCol =
                                '<div class="col">'
                                +'    <input type="checkbox" name="answermatrix_' + idQuestion + '_' + i_row +  '_' + i + '"  id="answermatrix_' + idQuestion + '_' + i_row + '_' + i + '">'
                                +'    <label for="answermatrix_' + idQuestion + '_' + i_row + '_' + i + '">'
                                +'    </label>'
                                +'</div>';
                                $(row).append(newCol);
                            }
                        }
                        else {
                            for (let i =  answerCols.length; i < number; i++){
                                var newCol =
                                '<div class="col">'
                                +'    <input type="radio" name="answermatrix_' + idQuestion + '_' + i_row  + '"  id="answermatrix_' + idQuestion + '_' + i_row + '_' + i + '">'
                                +'    <label for="answermatrix_' + idQuestion + '_' + i_row + '_' + i + '">'
                                +'    </label>'
                                +'</div>';
                                $(row).append(newCol);
                            }
                        }
                    }
                }
            });
        }

        //ranging up 
        $('.centerbox').on('click', '.ranging-list .item-up', function(e){
            var idQuestion = parseInt($(this).parents('.rangint-item').find('input').attr('name').split('_')[1]);
            if($(this).parents('.rangint-item').prev().length>0){
                $(this).parents('.rangint-item').insertBefore($(this).parents('.rangint-item').prev());
            }
            RefreshRanginItems(idQuestion);
        });

        //ranging down 
        $('.centerbox').on('click', '.ranging-list .item-down', function(e){
            var idQuestion = parseInt($(this).parents('.rangint-item').find('input').attr('name').split('_')[1]);
            if($(this).parents('.rangint-item').next().length>0){
                $(this).parents('.rangint-item').insertAfter($(this).parents('.rangint-item').next());
            }
            RefreshRanginItems(idQuestion);
        });

        //Refresh items answer ranging
        function RefreshRanginItems(idQuestion) {
            var parents = $('#questionanswers_' + idQuestion).find('.ranging-list');
            var Subpoints = parents.children();
            Subpoints.each(function (index, subpoint) {
                var id = index + 1;
                var inputs = $(subpoint).find('input');
                inputs.each(function (index, input) {
                    if($(input).attr('name')){
                        prevId = $(input).attr('name').split("_");
                        prevId[2] = id;
                        newId = prevId.join('_');
                        $(input).attr('name', newId);
                    }
                    if($(input).attr('id')){
                        prevId = $(input).attr('id').split("_");
                        prevId[2] = id;
                        newId = prevId.join('_');
                        $(input).attr('id', newId);
                    }
                });
            });
        }
        

        
        //add ranging item
        $('.rightside').on('click', '.addrangingrow', function(e){
            if($(this).parents('.ranging-options').find('.rowslist .row-item:last-child input').length>0)
            {
                var name =  $(this).parents('.ranging-options').find('.rowslist .row-item:last-child input').attr('name');
                var idQuestion = name.split('_')[1];
                var idPoints = parseInt(name.split('_')[2]) + 1;
            }
            else {
                var name =  $(this).parents('.ranging-options').find('textarea').attr('name');
                var idQuestion = parseInt(name.split('_')[1]);
                var idPoints = 1;
            }
            if(idPoints<21){
                if(idQuestion && idPoints) {
                    var newoptionrow = 
                    '<div class="row-item">'
                    +'    <input type="text" name="inputpoint_' + idQuestion + '_'+ idPoints + '" id="inputpoint_' + idQuestion + '_'+ idPoints + '" placeholder="Строка '+ idPoints + '">'
                    +'    <div class="edit-menu">'
                    +'        <div class="menu-dots"></div>'
                    +'        <div class="menu-list">'
                    +'            <div class="add-row addrangingrow"></div>'
                    +'            <div class="delete-row deleterangingrow"></div>'
                    +'        </div>'
                    +'    </div>'
                    +'</div>';
                    $(this).parents('.ranging-options').find('.rowslist').append(newoptionrow);
    
                    var newrowanswer =
                    '<div class="rangint-item">'
                    +'     <input type="hidden" name="rangingorder_' + idQuestion + '_'+ idPoints + '" value="' + idPoints + '">'
                    +'     <div class="arrows">'
                    +'         <div class="item-up"></div>'
                    +'         <div class="item-down"></div>'
                    +'     </div>'
                    +'     <div class="text">'
                    +'         Текст'
                    +'     </div>'
                    +' </div>';
                    $('#questionanswers_' + idQuestion + ' .ranging-list').append(newrowanswer);
                }
            }
            else {
                $('#modal-error').find('.text').html('Вы можете задать не более 20 строк');
                $('.modal').fadeIn(300);
            }

        });

        
        //delete ranging row
        $('.rightside').on('click', '.deleterangingrow', function(e){
            var name =  $(this).parents('.row-item').find('input').attr('name');
            var idQuestion = name.split('_')[1];
            var idPoints = parseInt(name.split('_')[2]);
            var parents =  $(this).parents('.rowslist');
            $(this).parents('.row-item').remove();
            $('#questionanswers_' + idQuestion + ' .ranging-list .rangint-item:nth-child(' + idPoints + ')').remove();
            var Subpoints = parents.children();
            Subpoints.each(function (index, subpoint) {
                var id = index + 1;
                var inputs = $(subpoint).find('input');
                inputs.each(function (index, input) {
                    if($(input).attr('name')){
                        prevId = $(input).attr('name').split("_");
                        prevId[2] = id;
                        newId = prevId.join('_');
                        $(input).attr('name', newId);
                    }
                    if($(input).attr('id')){
                        prevId = $(input).attr('id').split("_");
                        prevId[2] = id;
                        newId = prevId.join('_');
                        $(input).attr('id', newId);
                    }
                });
            });

            RefreshRanginItems(idQuestion);
        });

        //change rangin item text 
        $('.rightside').on('change, keypress, keydown, keyup', '.ranging-options .rowslist .row-item input', function(e){
            var name =  $(this).attr('name');
            var idQuestion = name.split('_')[1];
            var idPoints = parseInt(name.split('_')[2]);
            var value = $(this).val();
            $('#questionanswers_' + idQuestion + ' .ranging-list .rangint-item:nth-child(' + idPoints + ') .text').html(value);
        });
        
        $('.rightside').on('change, keypress, keydown, keyup', '.dropdown-question', function(e){
            auto_grow(this);
            var name = $(this).attr('name').split('_');
            var select = $('#questionanswers_'+ name[1]).find('select');
            ChangeOption(select, name[2], $(this).val());
            // if($('#questionanswers_'+ name[1]).find('.dropdown-list .dropdown-block:nth-child('+ name[2] +')').find('.question-name').length>0){
            //     $('#questionanswers_'+ name[1]).find('.dropdown-list .dropdown-block:nth-child('+ name[2] +')').find('.question-name').html($(this).val());
            // }
        });

                
        $('.rightside').on('change, keypress, keydown, keyup', '.range-question', function(e){
            auto_grow(this);
            var name = $(this).attr('name').split('_');
            var idQuestion = name[1];
            var idPoint = name[2];
            if($('#questionanswers_' + idQuestion).find('.range-list .range-row:nth-child('+ idPoint + ')').length>0){
                $('#questionanswers_' + idQuestion).find('.range-list .range-row:nth-child('+ idPoint + ') .range-question').html($(this).val());
            }
            
        });


        $('.rightside').on('change, keypress, keydown, keyup', '.multiple-question', function(e){
            var name = $(this).attr('name').split('_');
            if($('#questionanswers_'+ name[1]).find('.multipleanswer .item:nth-child('+ name[2] +')').length>0){
                $('#questionanswers_'+ name[1]).find('.multipleanswer .item:nth-child('+ name[2] +') .value').html($(this).val());
            }
        });

        $('.rightside').on('change, keypress, keydown, keyup', '.multiplescale-question', function(e){
            var name = $(this).attr('name').split('_');
            var idQuestion = name[1];
            var idMultiple = name[2];
            var idMultiplePoint = $(this).attr('name').split('_')[3];
            var idPoint = name[4];
            if($('#questionbrnaching_'+ idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                    let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                    if(multipeQuestions[idMultiplePoint-1]){
                        $($(multipeQuestions[idMultiplePoint-1]).find('.item:nth-child('+ idPoint +') .value')[0]).html($(this).val());
                    }
                }
                // $('#questionbrnaching_'+ idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.item:nth-child('+ idPoint +')').html($(this).val());
            }
        });

        $('.rightside').on('change, keypress, keydown, keyup', '.dropdown-list .dropdown-group input', function(e){
            var name = $(this).attr('name').split('_');
            if($('#questionanswers_'+ name[1]).find('.dropdown-list .dropdown-block:nth-child('+ name[2] +') .dropdown-content .input-group:nth-child('+ name[3] +')').length>0){
                $('#questionanswers_'+ name[1]).find('.dropdown-list .dropdown-block:nth-child('+ name[2] +') .dropdown-content .input-group:nth-child('+ name[3] +')').find('label').html($(this).val());
                $('#questionanswers_'+ name[1]).find('.dropdown-list .dropdown-block:nth-child('+ name[2] +') .dropdown-content .input-group:nth-child('+ name[3] +')').find('input').val($(this).val());
            }
        });

        $('.rightside').on('click', '.dropdown-options .arrowshow', function(e){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                $(this).parents('.option-group').find('.dropdown-list').fadeOut(300);
            }
            else {
                $(this).addClass('active');
                $(this).parents('.option-group').find('.dropdown-list').fadeIn(300);
            }
        });
        //add dropdpwn option block
        
        $('.rightside').on('click', '.dropdown-options .add-multiple', function(e){
            var namequestion ;
            if($(this).parents('.dropdown-options').find('.option-group:last-child .multiple-question').length>0){
                namequestion = $(this).parents('.dropdown-options').find('.option-group:last-child .multiple-question').attr('name').split('_');
            }
            var idQuestion;
            var idPoint;
            if(namequestion){
                idQuestion = namequestion[1];
            }
            else {
                idQuestion = $(this).parents('.optionbox').find('input:first-child').attr('name').split('_')[1];
            }

            if(namequestion){
                idPoint = parseInt(namequestion[2]) + 1;
            }
            else {
                idPoint = 1;
            }
            var newOptionel = 
                '<div class="option-group">'
                +'    <div class="inputstables">'
                +'        <textarea class="multiple-question" name="inputpoint_'+ idQuestion + '_' + idPoint + '" id="inputpoint_' + idQuestion + '_' + idPoint + '" placeholder="Введите ответ"></textarea>'
                +'    </div>'
                +'    <div class="remove-multiple"></div>'
                +'</div>';
            $(newOptionel).appendTo($(this).parents('.dropdown-options').find('.optionsdropdownlist'));
            var newitem = '<div class="item"><div class="value">Ответ</div></div>';
            $(newitem).appendTo($('#questionanswers_' + idQuestion).find('.multipleanswer'));
        });

        $('.rightside').on('click', '.dropdown-options .add-multiplescale', function(e){
            var namequestion ;
            if($(this).parents('.dropdown-options').find('.option-group:last-child .multiplescale-question').length>0){
                namequestion = $(this).parents('.dropdown-options').find('.option-group:last-child .multiplescale-question').attr('name').split('_');
            }
            var idQuestion;
            var idPoint;
            var idMultiple;
            var idMultiplePoint;
            if(namequestion){
                idQuestion = namequestion[1];
                idMultiple = namequestion[2];
                idMultiplePoint = namequestion[3];
            }
            else {
                idQuestion = $(this).parents('.questionPoint').find('.branching_points ').attr('name').split('_')[1];
                idMultiple = $(this).parents('.questionPoint').find('.branching_points ').attr('name').split('_')[2];
                idMultiplePoint = $(this).parents('.dropdown-options').find('.multiplequestion_name ').attr('name').split('_')[3];
            }

            if(namequestion){
                idPoint = parseInt(namequestion[4]) + 1;
            }
            else {
                idPoint = 1;
            }
            var newOptionel = 
                '<div class="option-group">'
                +'    <div class="inputstables">'
                +'       <textarea class="multiplescale-question" name="multipleanswer_'+ idQuestion + '_'+ idMultiple + '_' + idMultiplePoint + '_' + idPoint +'" id="multipleanswer_'+ idQuestion + '_'+ idMultiple + '_'  + idMultiplePoint + '_'+ idPoint +'" placeholder="Введите ответ"></textarea>'
                +'  </div>'
                +'  <div class="remove-multiplescale"></div>'
                +'      <div class="change-type-multiplescale">'
                +'          <input type="checkbox" name="multipleanswertextbox_'+ idQuestion + '_'+ idMultiple + '_' + idMultiplePoint + '_' + idPoint +'" id="multipleanswertextbox_'+ idQuestion + '_'+ idMultiple + '_' + idMultiplePoint + '_' + idPoint +'">'
                +'          <div class="tooltip tooltip-checkbox">Сделать отрытым вопросом</div>'
                +'           <div class="tooltip tooltip-textbox">Сделать выбором из множества</div>'
                +'      </div>'
                +'                <div class="add-second-mlt-qst">'
                +'                  <div class="tooltip tooltip-add">Добавить множественный выбор</div>'
                +'                  <div class="tooltip tooltip-remove">Удалить множественный выбор</div>'
                +'              </div>'
                +'</div>';
            $(newOptionel).appendTo($($(this).parents('.dropdown-options').find('.optionsdropdownlist')[0]));
            var newitem = '<div class="item"><div class="value">Ответ</div></div>';
            let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
            if(multipeQuestions[idMultiplePoint-1]){
                $(newitem).appendTo($($(multipeQuestions[idMultiplePoint-1]).find('.multipleanswer')[0]));
            }
            // $(newitem).appendTo($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group .multipleanswer'));
        });
        
        $('.rightside').on('click', '.dropdown-options .add-multiplescale-2', function(e){
            var namequestion ;
            if($(this).parents('.second-options').find('.option-group:last-child .multiplescale-question-2').length>0){
                namequestion = $(this).parents('.second-options').find('.option-group:last-child .multiplescale-question-2').attr('name').split('_');
            }
            var idQuestion;
            var idMultiple;
            var idMultiplePoint;
            var idMultiplePointSecond;
            var idPoint;
            if(namequestion){
                idQuestion = namequestion[1];
                idMultiple = namequestion[2];
                idMultiplePoint = namequestion[3];
                idMultiplePointSecond = namequestion[4];
            }
            else {
                let nameQuestion2 = $(this).parents('.second-options').find('.multiplequestion_name_2').attr('name').split('_');
                console.log(nameQuestion2);
                idQuestion = nameQuestion2[1];
                idMultiple = nameQuestion2[2];
                idMultiplePoint = nameQuestion2[3];
                idMultiplePointSecond = nameQuestion2[4];
            }

            if(namequestion){
                idPoint = parseInt(namequestion[5]) + 1;
            }
            else {
                idPoint = 1;
            }
            var newOptionel = 
                '<div class="option-group">'
                +'    <div class="inputstables">'
                +'       <textarea class="multiplescale-question-2" name="multipleanswer2_'+ idQuestion + '_'+ idMultiple + '_' + idMultiplePoint + '_' + idMultiplePointSecond + '_' + idPoint +'" id="multipleanswer2_'+ idQuestion + '_'+ idMultiple + '_'  + idMultiplePoint  + '_' + idMultiplePointSecond + '_'+ idPoint +'" placeholder="Введите ответ"></textarea>'
                +'  </div>'
                +'  <div class="remove-multiplescale-2"></div>'
                +'      <div class="change-type-multiplescale-2">'
                +'          <input type="checkbox" name="multipleanswertextbox2_'+ idQuestion + '_'+ idMultiple + '_' + idMultiplePoint + '_' + idMultiplePointSecond + '_' + idPoint +'" id="multipleanswertextbox_'+ idQuestion + '_'+ idMultiple + '_' + idMultiplePoint  + '_' + idMultiplePointSecond  + '_' + idPoint +'">'
                +'          <div class="tooltip tooltip-checkbox">Сделать отрытым вопросом</div>'
                +'           <div class="tooltip tooltip-textbox">Сделать выбором из множества</div>'
                +'      </div>'
                +'</div>';
            $(newOptionel).appendTo($($(this).parents('.second-options').find('.optionsdropdownlist')[0]));
            var newitem = '<div class="item"><div class="value">Ответ</div></div>';
            let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
            if(multipeQuestions[idMultiplePoint-1]){
                $(newitem).appendTo($(multipeQuestions[idMultiplePoint-1]).find('.item:nth-child('+ idMultiplePointSecond +')').find('.multiple-second-group'));
            }
        });
        
        $('.rightside').on('click', '.dropdown-options .change-type-multiplescale-2', function(e){
            $(this).toggleClass('textbox');
            if($(this).find('input[type=checkbox]').is(":checked")){
                $(this).find('input[type=checkbox]').prop('checked', false );

                
                var namequestion = $($(this).parents('.option-group')[0]).find('.multiplescale-question-2').attr('name').split('_');
                var idQuestion = namequestion[1];
                var idMultiple = namequestion[2];
                var idMultiplePoint = namequestion[3];
                var idPoint = parseInt(namequestion[4]);
                var idPointSecond = parseInt(namequestion[5]);
                if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.item:nth-child('+ idPoint +')').length>0){
                    if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                        let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                        if(multipeQuestions[idMultiplePoint-1]){
                            let multi2 = $(multipeQuestions[idMultiplePoint-1]).find('.item:nth-child('+ idPoint +')').find('.multiple-second-group .item');
                            if(multi2[idPointSecond-1]){
                                let name = $(multi2[idPointSecond-1]).find('.name').html();
                                let newHtml = name;
                                $(multi2[idPointSecond-1]).html(newHtml);
                            }
                        }
                    }
                }

            }
            else {
                $(this).find('input[type=checkbox]').prop('checked', true );


                var namequestion = $($(this).parents('.option-group')[0]).find('.multiplescale-question-2').attr('name').split('_');
                var idQuestion = namequestion[1];
                var idMultiple = namequestion[2];
                var idMultiplePoint = namequestion[3];
                var idPoint = parseInt(namequestion[4]);
                var idPointSecond = parseInt(namequestion[5]);
                if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.item:nth-child('+ idPoint +')').length>0){
                    if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                        let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                        if(multipeQuestions[idMultiplePoint-1]){
                            let multi2 = $(multipeQuestions[idMultiplePoint-1]).find('.item:nth-child('+ idPoint +')').find('.multiple-second-group .item');
                            if(multi2[idPointSecond-1]){
                                let name = $(multi2[idPointSecond-1]).html();
                                let newHtml = 
                                '<div class="name">'+ name +'</div>'
                                +'<div class="form-group">'
                                +'    <input type="text" name="brnchmultibllockanswer_' + idQuestion + '_' + idMultiple +'_' + idMultiplePoint  + '_' + idPoint + '_' + idPointSecond + '"'
                                +'    id="brnchmultibllockanswer_' + idQuestion + '_' + idMultiple +'_' + idMultiplePoint  + '_' + idPoint + '_' + idPointSecond + '" placeholder="Ваш ответ">'
                                +'</div>';
                                $(multi2[idPointSecond-1]).html(newHtml);
                            }
                        }
                    }
                }
            }
        });
        $('.rightside').on('click', '.dropdown-options .change-type-multiplescale', function(e){
            $(this).toggleClass('textbox');
            if($(this).find('input[type=checkbox]').is(":checked")){
                $(this).find('input[type=checkbox]').prop('checked', false );
                var namequestion = $(this).parents('.option-group').find('.multiplescale-question').attr('name').split('_');
                var idQuestion = namequestion[1];
                var idMultiple = namequestion[2];
                var idMultiplePoint = namequestion[3];
                var idPoint = parseInt(namequestion[4]);
                if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.item:nth-child('+ idPoint +')').length>0){
                    if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                        let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                        if(multipeQuestions[idMultiplePoint-1]){
                            let multipeItems = $(multipeQuestions[idMultiplePoint-1]).find('.multipleanswer').children();
                            let name = $(multipeItems[idPoint-1]).find('.value .name').html();
                            let newHtml = name;
                            $(multipeItems[idPoint-1]).find('.value').html(newHtml);
                        }
                    }
                }
            }
            else {
                $(this).find('input[type=checkbox]').prop('checked', true );
                if($(this).parents('.option-group').find('.add-second-mlt-qst').hasClass('active')){
                    $(this).parents('.option-group').find('.add-second-mlt-qst').click();
                }

                var namequestion = $(this).parents('.option-group').find('.multiplescale-question').attr('name').split('_');
                var idQuestion = namequestion[1];
                var idMultiple = namequestion[2];
                var idMultiplePoint = namequestion[3];
                var idPoint = parseInt(namequestion[4]);
                if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.item:nth-child('+ idPoint +')').length>0){
                    if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                        let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                        if(multipeQuestions[idMultiplePoint-1]){
                            let multipeItems = $(multipeQuestions[idMultiplePoint-1]).find('.multipleanswer').children();
                            let name = $(multipeItems[idPoint-1]).find('.value').html();
                            let newHtml = 
                            '<div class="name">'+ name +'</div>'
                            +'<div class="form-group">'
                            +'    <input type="text" name="brnchmultibllockanswer_' + idQuestion + '_' + idMultiple +'_' + idMultiplePoint  + '_' + idPoint + '"'
                            +'    id="brnchmultibllockanswer_' + idQuestion + '_' + idMultiple +'_' + idMultiplePoint  + '_' + idPoint + '" placeholder="Ваш ответ">'
                            +'</div>';
                            $(multipeItems[idPoint-1]).find('.value').html(newHtml);
                        }
                    }
                }

            }
        });
        $('.rightside').on('click', '.dropdown-options .add-dropdown', function(e){
            var namequestion ;
            if($(this).parents('.dropdown-options').find('.option-group:last-child .dropdown-question').length>0){
                namequestion = $(this).parents('.dropdown-options').find('.option-group:last-child .dropdown-question').attr('name').split('_');
            }
            var idQuestion;
            var idPoint;
            if(namequestion){
                idQuestion = namequestion[1];
            }
            else {
                idQuestion = $(this).parents('.optionbox').find('input:first-child').attr('name').split('_')[1];
            }

            if(namequestion){
                idPoint = parseInt(namequestion[2]) + 1;
            }
            else {
                idPoint = 1;
            }
            var newOptionel = 
                '<div class="option-group">'
                +'    <div class="inputstables">'
                +'        <textarea class="dropdown-question" name="inputpoint_'+ idQuestion + '_' + idPoint + '" id="inputpoint_' + idQuestion + '_' + idPoint + '" placeholder="Введите ответ"></textarea>'
                +'    </div>'
                +'    <div class="remove-dropdown"></div>'
                +'</div>';
            $(newOptionel).appendTo($(this).parents('.dropdown-options').find('.optionsdropdownlist'));
            AddOption($('#questionanswers_' + idQuestion + ' select'));
        });
        
                
        $('.rightside').on('click', '.dropdown-options .add-range', function(e){
            var namequestion ;
            if($(this).parents('.dropdown-options').find('.option-group:last-child .range-question').length>0){
                namequestion = $(this).parents('.dropdown-options').find('.option-group:last-child .range-question').attr('name').split('_');
            }
            var idQuestion;
            var idPoint;
            if(namequestion){
                idQuestion = namequestion[1];
            }
            else {
                idQuestion = $(this).parents('.optionbox').find('input:first-child').attr('name').split('_')[1];
            }

            if(namequestion){
                idPoint = parseInt(namequestion[2]) + 1;
            }
            else {
                idPoint = 1;
            }
            var newOptionel = 
                '<div class="option-group">'
                +'    <div class="inputstables">'
                +'        <textarea class="range-question" name="inputpoint_'+ idQuestion + '_' + idPoint + '" id="inputpoint_' + idQuestion + '_' + idPoint + '" placeholder="Введите ответ"></textarea>'
                +'    </div>'
                +'    <div class="remove-rangin"></div>'
                +'</div>';
            $(newOptionel).appendTo($(this).parents('.dropdown-options').find('.optionsdropdownlist'));
            var rangemin = $(this).parents('.range-options').find('.rangemin').val();
            var rangemax = $(this).parents('.range-options').find('.rangemax').val();
            var rangevalue = Math.round((parseInt(rangemax) + parseInt(rangemin))/2);
            var step = $(this).parents('.range-options').find('.step').val();
            var textcolor = $(this).parents('.range-options').find('.textcolor ').val();
            var newEl = 
            '<div class="range-row">'
            +'    <div class="range-question">'
            +'      Ответ'
            +'  </div>'
            +'  <div class="range">'
            +'      <div class="label">'
            +'          <div class="value" style="color: ' + textcolor + '"></div>'
            +'      </div>'
            +'      <div class="input-box">'
            +'          <input class="input-range"'
            +'                name="range_'+ idQuestion + '_' + idPoint + '"'
            +'              id="range_'+ idQuestion + '_' + idPoint + '" type="range"'
            +'              min="'+ rangemin + '"'
            +'              max="' + rangemax + '"'
            +'              step="' + step + '"'
            +'              value="' + rangevalue +'"/>'
            +'          <div class="bar"></div>'
            +'          <div class="bar-filled"></div>'
            +'      </div>'
            +'  </div>'
            +'</div>';
            $(newEl).appendTo($('#questionanswers_' + idQuestion).find('.range-list'));
            SetRangeValue($('#questionanswers_' + idQuestion).find('.range-list .range-row:last-child input'), rangevalue);
            if($(this).parents('.range-options').find('.rangecolor').length>1) {
                var color1 = $(this).parents('.range-options').find('.rangecolor1').val();
                var color2 = $(this).parents('.range-options').find('.rangecolor2').val();
                SetRangeColor2($('#questionanswers_' + idQuestion).find('.input-range'), color1, color2);
            }
            else {
                var color = $(this).parents('.range-options').find('.rangecolor1').val();
                SetRangeColor($('#questionanswers_' + idQuestion).find('.input-range'), color);
            }
        });
        
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
        //         // if($(range).val()){
        //         //     SetRangeValue(range, $(range).val());
        //         // }
        //         // else {
        //         //     SetRangeValue(range, 0);
        //         // }
        //     });
        // }
        //set new range value when change value
        $('.centerbox').on('input', '.range input[type=range]', function(e){
            if($(this).val()){
                SetRangeValue(this, $(this).val());
            }
        });

        //set new color 
        $('.rightside').on('input, change', '.row-color .rangecolor', function(e){
            var idQuestion = $(this).parents('.row-color').find('.rangecolor1').attr('name').split('_')[1];
            $(this).parents('.optiongroup').find('.color').css('background', $(this).val());
            if($(this).parents('.row-color').find('.rangecolor').length>1){
                var color1 = $(this).parents('.row-color').find('.rangecolor1').val();
                var color2 = $(this).parents('.row-color').find('.rangecolor2').val();
                if($(this).hasClass('rangecolor1')) {
                    color1 = $(this).val();
                }
                else {
                    color2 = $(this).val();
                }
                SetRangeColor2($('#questionanswers_' + idQuestion).find('.input-range'), color1, color2);
            }
            else {
                var color = $(this).val();
                SetRangeColor($('#questionanswers_' + idQuestion).find('.input-range'), color);
            }
        });
        $('.rightside').on('click', '.row-color .addranhecolor', function(e){
            var idQuestion = $(this).parents('.row-color').find('.rangecolor1').attr('name').split('_')[1];
            var value = $(this).parents('.row-color').find('.rangecolor1').val();
            var newcolor = 
                '<div class="optiongroup">'
                +'    <label for="color_' + idQuestion + '_2">'
                +'      <div class="color" style="background: '+ value +';"></div>'
                +'  </label>'
                +'  <input class="rangecolor rangecolor2" type="text"  name="color_' + idQuestion + '_2"  id="color_' + idQuestion + '_2" value="'+ value +'" data-jscolor="">'
                +'</div>'
                +'<div class="optionremove">'
                +'  <div class="removerangecolor"></div>'
                +'  <div class="tooltip">Удалить цвет</div>'
                +'</div>';
                $(newcolor).appendTo($(this).parents('.row-color'));
                $(this).parents('.optionadd').remove();
                jscolor.install('.rightside')
        });

        $('.rightside').on('click', '.row-color .removerangecolor', function(e){
            var idQuestion = $(this).parents('.row-color').find('.rangecolor1').attr('name').split('_')[1];
            var color = $(this).parents('.row-color').find('.rangecolor1').val();
            SetRangeColor($('#questionanswers_' + idQuestion).find('.input-range'), color);
            var newcolor = 
                '<div class="optionadd">'
                +'    <div class="addranhecolor"></div>'
                +'  <div class="tooltip">Добавить цвет</div>'
                +'</div>';
                $(newcolor).appendTo($(this).parents('.row-color'));
                $(this).parents('.row-color').find('.rangecolor2').parents('.optiongroup').remove();
                $(this).parents('.optionremove').remove();
        });

        $('.rightside').on('change', '.range-options .rangemin', function(e){
            var idQuestion = $(this).attr('name').split('_')[1];
            var min = $(this).val();
            SetRangeMin($('#questionanswers_' + idQuestion).find('.input-range'), min);
        });

        $(".rangemin").inputFilterRange(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 1500);
        });

        
        $('.rightside').on('change', '.range-options .step', function(e){
            if(parseInt($(this).val()) > parseInt($(this).parents('.range-options').find('.rangemax').val())){
                $(this).val(1);
                $('#modal-error').find('.text').html('Вы не можете ввести шаг больше, чем максимальное значение');
                $('.modal').fadeIn(300);
            }
            else {
                var idQuestion = $(this).attr('name').split('_')[1];
                var step = $(this).val();
                SetRangeStep($('#questionanswers_' + idQuestion).find('.input-range'), step);
            }
        });

        $(".step").inputFilterRange(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 1500);
        });


        $('.rightside').on('change', '.range-options .rangemax', function(e){
            if(parseInt($(this).val()) < parseInt($(this).parents('.range-options').find('.rangemin').val())){
                $(this).val(parseInt($(this).parents('.range-options').find('.rangemin').val()) + 1);
                $('#modal-error').find('.text').html('Вы не можете ввести максимальное значение меньше, чем минимальное значение');
                $('.modal').fadeIn(300);
            }
            else {
                var idQuestion = $(this).attr('name').split('_')[1];
                var max = $(this).val();
                SetRangeMax($('#questionanswers_' + idQuestion).find('.input-range'), max);
            }
        });

        $(".rangemax").inputFilterRange(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 1500);
        });

        $('.rightside').on('input, change', '.range-options .textcolor', function(e){
            var idQuestion = $(this).attr('name').split('_')[1];
            $(this).parents('.optiongroup').find('.color').css('background', $(this).val());
            var color = $(this).val();
            SetRangeTextColor($('#questionanswers_' + idQuestion).find('.input-range'), color);
        });

        //set settings on download page
        var rangeOptions = $('.rightside .range-options');
        rangeOptions.each(function (index, rangeOption) {
            idQuestion = $(this).find('.question_name').attr('name').split('_')[1];
            if($(rangeOption).find('.rangecolor').length>1){
                var color1 = $(rangeOption).find('.rangecolor1').val();
                var color2 = $(rangeOption).find('.rangecolor2').val();
                var parents = $(rangeOption).find('.range')
                var background = 'linear-gradient(to right, ' + color1 + ', ' + color2 + ')';
                var parents = $('#questionanswers_' + idQuestion).find('.range');
                parents.find('.label').css('background', background);
                parents.find('.input-box .bar-filled').css('background', background);
                parents.find('.label').css('background-size', '200px');
                parents.find('.input-box .bar-filled').css('background-size', '200px');
            }
            else {
                var color = $(rangeOption).find('.rangecolor1').val();
                SetRangeColor($('#questionanswers_' + idQuestion).find('.input-range'), color);
            }
            var min = $(rangeOption).find('.rangemin').val();
            $('#questionanswers_' + idQuestion).find('.input-range').attr('min', min);

            var max = $(rangeOption).find('.rangemax').val();
            $('#questionanswers_' + idQuestion).find('.input-range').attr('max', max);

            var step = $(rangeOption).find('.step').val();
            $('#questionanswers_' + idQuestion).find('.input-range').attr('step', step);

            var color = $(rangeOption).find('.textcolor').val();
            SetRangeTextColor($('#questionanswers_' + idQuestion).find('.input-range'), color);
        });

        //change color settings range
        function SetRangeColor(rangeinput, color){
            var parents = $(rangeinput).parents('.range');
            parents.find('.label').css('background', color);
            parents.find('.input-box .bar-filled').css('background', color);
        };
        //change color settings range
        function SetRangeColor2(rangeinput, color1, color2){
            var background = 'linear-gradient(to right, ' + color1 + ', ' + color2 + ')';
            var parents = $(rangeinput).parents('.range');
            parents.find('.label').css('background', background);
            parents.find('.input-box .bar-filled').css('background', background);
            parents.find('.label').css('background-size', '200px');
            parents.find('.input-box .bar-filled').css('background-size', '200px');
            var rangeElements = parents.find('.input-box input');
            rangeElements.each(function (index, range) {
                SetRangeValue(range, $(range).val());
            });
        };

        //change color settings range
        function SetRangeTextColor(rangeinput, color){
            var parents = $(rangeinput).parents('.range');
            parents.find('.label .value').css('color', color);
        };

        //change max settings range
        function SetRangeMax(rangeinput, max){
            $(rangeinput).attr('max', max);
            var val = $(rangeinput).val();
            SetRangeValue(rangeinput, val);
        };

        //change min settings range
        function SetRangeMin(rangeinput, min){
            $(rangeinput).attr('min', min);
            var val = $(rangeinput).val();
            SetRangeValue(rangeinput, val);
        };

        //change step settings range
        function SetRangeStep(rangeinput, step){
            $(rangeinput).attr('step', step);
            var val = $(rangeinput).val();
            SetRangeValue(rangeinput, val);
        };

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


        //dropdown  multiple change
        // $('.rightside').on('click', '.dropdown-options .dropdownmultiple', function(e){
        //     var idQuestion = $(this).attr('name').split('_')[1];
        //     if($(this).is(':checked')){
        //         var newSelect = 
        //         '<div class="dropdownanswer">'
        //         +'    <div class="selectdropdown">'
        //         +'       <select name="questionanswersdrp_'+ idQuestion + '" class="customselect" multiple>';
        //         var options = $('#option_'+ idQuestion + ' .optionsdropdownlist').children();
        //         options.each(function (index, option) {
        //             if($(option).find('.dropdown-question').val()){
        //                 newSelect += '<option val="'+ $(option).find('.dropdown-question').val() + '">'+ $(option).find('.dropdown-question').val() +'</option>';
        //             }
        //             else {
        //                 newSelect += '<option val="">Ответ</option>';
        //             }
        //         });
        //         newSelect += '</select></div></div>';
        //         $('#questionanswers_' + idQuestion).html(newSelect);
        //     }
        //     else {
        //         var newSelect = 
        //         '<div class="dropdownanswer">'
        //         +'    <div class="selectdropdown">'
        //         +'       <select name="questionanswersdrp_'+ idQuestion + '" class="customselect">';
        //         var options = $('#option_'+ idQuestion + ' .optionsdropdownlist').children();
        //         options.each(function (index, option) {
        //             if($(option).find('.dropdown-question').val()){
        //                 newSelect += '<option val="'+ $(option).find('.dropdown-question').val() + '">'+ $(option).find('.dropdown-question').val() +'</option>';
        //             }
        //             else {
        //                 newSelect += '<option val="">Ответ</option>';
        //             }
        //         });
        //         newSelect += '</select></div></div>';
        //         $('#questionanswers_' + idQuestion).html(newSelect);
        //     }
        //     customSelectActive();
        // });

        //matrix  multiple change
        $('.rightside').on('click', '.matrix-options .matrixtype', function(e){
            var idQuestion = parseInt($(this).attr('name').split('_')[1]);
            if($(this).is(':checked')){
                var inputs = $('#questionanswers_' + idQuestion).find('input');
                inputs.each(function (index, input) {
                    if($(input).attr('type') == 'radio'){
                        $(input).attr('type', 'checkbox');
                    }
                    if($(input).attr('name')){
                        $(input).attr('name', $(input).attr('id'));
                    }
                });
            }
            else {
                var inputs = $('#questionanswers_' + idQuestion).find('input');
                inputs.each(function (index, input) {
                    if($(input).attr('type') == 'checkbox'){
                        $(input).attr('type', 'radio');
                    }
                    if($(input).attr('name')){
                        var prevName = $(input).attr('name').split('_');
                        prevName.splice(3 ,1);
                        $(input).attr('name', prevName.join('_'));
                    }
                });
            }
        });
        //branching hidden question show
        // $('.centerbox').on('change', '.branchingquestion input[type=radio]', function(e){
        //     var idQuestion = $(this).attr('id').split('_')[1];
        //     var idPoint = parseInt($(this).attr('id').split('_')[2]);
        //     if($(this).is(':checked')){
        //         $(this).parents('.question').find('.hidden-question-group').fadeOut(300);
        //         $('#hiddenquestion_' + idQuestion + '_' + idPoint).fadeIn(300);
        //     }
        // });

        //hidden question input 
        $('.rightside').on('change , keypress, keydown, keyup', '.branching-group input[type=text]', function(e){
            var idQuestion = $(this).attr('name').split('_')[1];
            var idPoint = parseInt($(this).attr('name').split('_')[2]);
            if(idQuestion && idPoint ){
                if($('#questionbrnaching_'+ idQuestion).find('.branching-group:nth-child('+ idPoint + ') .question-group .branching-question').find('.name').length>0){
                    $('#questionbrnaching_'+ idQuestion).find('.branching-group:nth-child('+ idPoint + ') .question-group .branching-question').find('.name').html($(this).val());
                }
            }
        });

        $('.rightside').on('click', '.dropdown-options .adddropdownsubpoints', function(e){
            var namequestion = $(this).parents('.option-group').find('.dropdown-question').attr('name').split('_');
            var idQuestion;
            var idPoint;
            var idSubpoint;
            var multiple;
            var newEl;
            if($(this).parents('.dropdown-options').find('.dropdownmultiple:checked').length>0){
                multiple = true;
            }
            else {
                multiple = false;
            }
            if(!$(this).parents('.option-group').find('.arrowshow').hasClass('active')){
                $(this).parents('.option-group').find('.arrowshow').click();
            }
            if(namequestion[1]){
                idQuestion = namequestion[1];
            }
            else {
                idQuestion = $(this).parents('.optionbox').find('input:first-child').attr('name').split('_')[1];
            }

            if(namequestion[2]){
                idPoint = parseInt(namequestion[2]);
            }
            else {
                idPoint = 1;
            }
            if($(this).parents('.option-group').find('.dropdown-group:last-child').length>0){
                idSubpoint = parseInt($(this).parents('.option-group').find('.dropdown-group:last-child input').attr('name').split('_')[3]) + 1;
            }
            else {
                idSubpoint = 1;
            }
            var newOptionel = 
                '<div class="dropdown-group">'
                +'    <input type="text" name="subpoint_'+ idQuestion + '_' + idPoint + '_' + idSubpoint +'" id="subpoint_'+ idQuestion + '_' + idPoint + '_' + idSubpoint +'" placeholder="Введите текст">'
                +'    <div class="removedropdownsub"></div>'
                +'</div>';
            if(multiple){
                newEl = 
                '<div class="input-group">'
                +'    <input type="checkbox" name="questionanswers_'+ idQuestion + '_' + idPoint + '_' + idSubpoint +'" id="questionanswers_'+ idQuestion + '_' + idPoint + '_' + idSubpoint +'">'
                +'    <label for="questionanswers_'+ idQuestion + '_' + idPoint + '_'+ idSubpoint +'"></label>'
                +'</div>';
            }
            else {
                newEl = 
                '<div class="input-group">'
                +'    <input type="radio" name="questionanswers_'+ idQuestion + '_' + idPoint + '" id="questionanswers_'+ idQuestion + '_' + idPoint + '_' + idSubpoint +'">'
                +'    <label for="questionanswers_'+ idQuestion + '_' + idPoint + '_'+ idSubpoint +'"></label>'
                +'</div>';
            }
            $(newOptionel).appendTo($(this).parents('.option-group').find('.dropdown-list'));
            $(newEl).appendTo('#questionanswers_' + idQuestion + ' .dropdown-block:nth-child('+ idPoint +') .dropdown-content');
        });

        $('.rightside').on('click', '.dropdown-options .removedropdownsub', function(e){
            var parents = $(this).parents('.dropdown-list');
            $(this).parents('.dropdown-group').remove();
            var Subpoints = parents.children();
            if(Subpoints.length>0){
                Subpoints.each(function (index, subpoint) {
                    var id = index + 1;
                    var inputs = $(subpoint).find('input');
                    inputs.each(function (index, input) {
                        if($(input).attr('name')){
                            prevId = $(input).attr('name').split("_");
                            prevId[3] = id;
                            newId = prevId.join('_');
                            $(input).attr('name', newId);
                        }
                        if($(input).attr('id')){
                            prevId = $(input).attr('id').split("_");
                            prevId[3] = id;
                            newId = prevId.join('_');
                            $(input).attr('id', newId);
                        }
                    });
                });
            }
            var namequestion = $(this).parents('.dropdown-group').find('input').attr('name').split('_');
            var idQuestion = parseInt(namequestion[1]);
            var idPoint = parseInt(namequestion[2]);
            var idSubpoint = parseInt(namequestion[3]);
            $('#questionanswers_' + idQuestion + ' .dropdown-block:nth-child('+ idPoint +')' + ' .input-group:nth-child(' + idSubpoint + ')').remove();
            var Subpoints = $('#questionanswers_' + idQuestion + ' .dropdown-block:nth-child('+ idPoint +') .dropdown-content').children();
            if(Subpoints.length>0){
                Subpoints.each(function (index, subpoint) {
                    var id = index + 1;
                    var inputs = $(subpoint).find('input');
                    inputs.each(function (index, input) {
                        if($(input).attr('name')){
                            prevId = $(input).attr('name').split("_");
                            prevId[3] = id;
                            newId = prevId.join('_');
                            $(input).attr('name', newId);
                        }
                        if($(input).attr('id')){
                            prevId = $(input).attr('id').split("_");
                            prevId[3] = id;
                            newId = prevId.join('_');
                            $(input).attr('id', newId);
                        }
                    });

                    var labels = $(subpoint).find('label');
                    labels.each(function (index, label) {
                        if($(label).attr('for')){
                            prevId = $(label).attr('for').split("_");
                            prevId[3] = id;
                            newId = prevId.join('_');
                            $(label).attr('for', newId);
                        }
                        if($(label).attr('id')){
                            prevId = $(label).attr('id').split("_");
                            prevId[3] = id;
                            newId = prevId.join('_');
                            $(label).attr('id', newId);
                        }
                    });
                });
            }

        });
        
        $('.rightside').on('click', '.dropdown-options .remove-multiple', function(e){
            var parents = $(this).parents('.optionsdropdownlist');
            var namequestion = $(this).parents('.option-group').find('.multiple-question').attr('name').split('_');
            var idQuestion = namequestion[1];
            var idPoint = parseInt(namequestion[2]);
            $('#questionanswers_' + idQuestion + ' .multipleanswer .item:nth-child('+ idPoint +')').remove();

            $(this).parents('.option-group').remove();
            var Subpoints = parents.children();
            if(Subpoints.length>0){
                Subpoints.each(function (index, subpoint) {
                    var id = index + 1;
                    var inputs = $(subpoint).find('input');
                    inputs.each(function (index, input) {
                        if($(input).attr('name')){
                            prevId = $(input).attr('name').split("_");
                            prevId[2] = id;
                            newId = prevId.join('_');
                            $(input).attr('name', newId);
                        }
                        if($(input).attr('id')){
                            prevId = $(input).attr('id').split("_");
                            prevId[2] = id;
                            newId = prevId.join('_');
                            $(input).attr('id', newId);
                        }
                    });

                    var textareas = $(subpoint).find('textarea');
                    textareas.each(function (index, textarea) {
                        if($(textarea).attr('name')){
                            prevId = $(textarea).attr('name').split("_");
                            prevId[2] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('name', newId);
                        }
                        if($(textarea).attr('id')){
                            prevId = $(textarea).attr('id').split("_");
                            prevId[2] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('id', newId);
                        }
                    });
                });
            }
        });

                
        $('.rightside').on('click', '.dropdown-options .remove-multiplescale', function(e){
            var parents = $(this).parents('.optionsdropdownlist');
            var namequestion = $(this).parents('.option-group').find('.multiplescale-question').attr('name').split('_');
            var idQuestion = namequestion[1];
            var idMultiple = namequestion[2];
            var idMultiplePoint = namequestion[3];
            var idPoint = parseInt(namequestion[4]);
            if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.item:nth-child('+ idPoint +')').length>0){
                if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                    let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                    if(multipeQuestions[idMultiplePoint-1]){
                        // $(multipeQuestions[idMultiplePoint-1]).find('.item:nth-child('+ idPoint +')').remove();
                        let multipeItems = $(multipeQuestions[idMultiplePoint-1]).find('.multipleanswer').children();
                        $(multipeItems[idPoint-1]).remove();

                    }
                }
            }
            $(this).parents('.option-group').remove();
            var Subpoints = parents.children();
            if(Subpoints.length>0){
                Subpoints.each(function (index, subpoint) {
                    var id = index + 1;
                    var inputs = $(subpoint).find('input');
                    inputs.each(function (index, input) {
                        if($(input).attr('name')){
                            prevId = $(input).attr('name').split("_");
                            prevId[4] = id;
                            newId = prevId.join('_');
                            $(input).attr('name', newId);
                        }
                        if($(input).attr('id')){
                            prevId = $(input).attr('id').split("_");
                            prevId[4] = id;
                            newId = prevId.join('_');
                            $(input).attr('id', newId);
                        }
                    });

                    var textareas = $(subpoint).find('textarea');
                    textareas.each(function (index, textarea) {
                        if($(textarea).attr('name')){
                            prevId = $(textarea).attr('name').split("_");
                            prevId[4] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('name', newId);
                        }
                        if($(textarea).attr('id')){
                            prevId = $(textarea).attr('id').split("_");
                            prevId[4] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('id', newId);
                        }
                    });
                });
            }
        });

        $('.rightside').on('click', '.dropdown-options .remove-multiplescale-2', function(e){
            var parents = $(this).parents('.second-options');
            var namequestion = $($(this).parents('.option-group')[0]).find('.multiplescale-question-2').attr('name').split('_');
            var idQuestion = namequestion[1];
            var idMultiple = namequestion[2];
            var idMultiplePoint = namequestion[3];
            var idPoint = parseInt(namequestion[4]);
            var idPointSecond = parseInt(namequestion[5]);
            if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.item:nth-child('+ idPoint +')').length>0){
                if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                    let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                    if(multipeQuestions[idMultiplePoint-1]){
                        let multi2 = $(multipeQuestions[idMultiplePoint-1]).find('.item:nth-child('+ idPoint +')').find('.multiple-second-group .item');
                        if(multi2[idPointSecond-1]){
                            $(multi2[idPointSecond-1]).remove();
                        }
                    }
                }
            }
            $($(this).parents('.option-group')[0]).remove();
            var Subpoints = parents.find('.optionsdropdownlist').children();
            if(Subpoints.length>0){
                Subpoints.each(function (index, subpoint) {
                    var id = index + 1;
                    var inputs = $(subpoint).find('input');
                    inputs.each(function (index, input) {
                        if($(input).attr('name')){
                            prevId = $(input).attr('name').split("_");
                            prevId[5] = id;
                            newId = prevId.join('_');
                            $(input).attr('name', newId);
                        }
                        if($(input).attr('id')){
                            prevId = $(input).attr('id').split("_");
                            prevId[5] = id;
                            newId = prevId.join('_');
                            $(input).attr('id', newId);
                        }
                    });

                    var textareas = $(subpoint).find('textarea');
                    textareas.each(function (index, textarea) {
                        if($(textarea).attr('name')){
                            prevId = $(textarea).attr('name').split("_");
                            prevId[5] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('name', newId);
                        }
                        if($(textarea).attr('id')){
                            prevId = $(textarea).attr('id').split("_");
                            prevId[5] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('id', newId);
                        }
                    });
                });
            }
        });

        $('.rightside').on('click', '.multiple-row .remobe-multiple-row', function(e){
            var parents = $(this).parents('.multiple-row');
            var namequestion = $(this).parents('.multiple-row').find('.multiplequestion_name').attr('name').split('_');
            var idQuestion = namequestion[1];
            var idMultiple = namequestion[2];
            if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group').length>0){
                $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group').remove();
                parents.remove();
            }
        });
        $('.rightside').on('click', '.multiple-row .add-second-mlt-qst', function(e){
            if($(this).hasClass('active') || $($(this).parents('.option-group')[0]).find('.second-options').length>0 ){
                $(this).removeClass('active');
                var namequestion = $(this).parents('.option-group').find('.multiplescale-question').attr('name').split('_');
                var idQuestion = namequestion[1];
                var idMultiple = namequestion[2];
                var idMultiplePoint = namequestion[3];
                var idPoint = namequestion[4];
                $(this).parents('.option-group').find('.second-options').remove();
                if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                    let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                    if(multipeQuestions[idMultiplePoint-1]){
                        $(multipeQuestions[idMultiplePoint-1]).find('.item:nth-child('+ idPoint +')').find('.multiple-second-group').remove();
                    }
                }
            }
            else {
                $(this).addClass('active');
                var namequestion = $($(this).parents('.option-group')[0]).find('.multiplescale-question').attr('name').split('_');
                var idQuestion = namequestion[1];
                var idMultiple = namequestion[2];
                var idMultiplePoint = namequestion[3];
                var idPoint = namequestion[4];
                if(idQuestion && idMultiple && idMultiplePoint){
                    let newOption = 
                        '  <div class="dropdown-options second-options">'
                        +'      <div class="form-group">'
                        +'          <div class="top-row">'
                        +'              <label for="multiplequestion2_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '">Вопрос</label>'
                        +'              <div class="remove-brn-mtp-qst-2"></div>'
                        +'          </div>'
                        +'          <textarea class="multiplequestion_name_2" name="multiplequestion2_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_' + idPoint + '" id="multiplequestion2_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_' + idPoint  + '" placeholder="Введите вопрос"></textarea>'
                        +'      </div>'
                        +'      <div class="top-row">'
                        +'          <div class="namelabel">Ответы</div>'
                        +'          <div class="add-multiplescale-2"></div>'
                        +'      </div>'
                        +'      <div class="optionsdropdownlist">'
                        +'          <div class="option-group">'
                        +'              <div class="inputstables">'
                        +'                  <textarea class="multiplescale-question-2" name="multipleanswer2_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_' + idPoint + '_1" id="multipleanswer2_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_' + idPoint + '_1" placeholder="Введите ответ"></textarea>'
                        +'              </div>'
                        +'              <div class="remove-multiplescale-2"></div>'
                        +'                <div class="change-type-multiplescale-2">'
                        +'                  <input type="checkbox" name="multipleanswertextbox2_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_' + idPoint + '_1" id="multipleanswertextbox2_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_' + idPoint + '_1">'
                        +'                  <div class="tooltip tooltip-checkbox">Сделать отрытым вопросом</div>'
                        +'                  <div class="tooltip tooltip-textbox">Сделать выбором из множества</div>'
                        +'              </div>'
                        +'          </div>'
                        +'          <div class="option-group">'
                        +'              <div class="inputstables">'
                        +'                  <textarea class="multiplescale-question-2" name="multipleanswer2_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_' + idPoint + '_2" id="multipleanswer2_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_' + idPoint + '_2" placeholder="Введите ответ"></textarea>'
                        +'              </div>'
                        +'              <div class="remove-multiplescale-2"></div>'
                        +'                <div class="change-type-multiplescale-2">'
                        +'                  <input type="checkbox" name="multipleanswertextbox2_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint+ '_' + idPoint + '_2" id="multipleanswertextbox2_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_' + idPoint + '_2">'
                        +'                  <div class="tooltip tooltip-checkbox">Сделать отрытым вопросом</div>'
                        +'                  <div class="tooltip tooltip-textbox">Сделать выбором из множества</div>'
                        +'              </div>'
                        +'          </div>'
                        +'      </div>'
                        +'</div>';
        
                    var newEl = 
                        '<div class="multiple-second-group">'
                        +'    <div class="name">'
                        +'      Вопрос'
                        +'  </div>'
                        +'  <div class="multipleanswer">'
                        +'      <div class="item"><div class="value">Ответ</div></div>'
                        +'      <div class="item"><div class="value">Ответ</div></div>'
                        +'  </div>'
                        +'</div>';
    
                    $(newOption).appendTo($($(this).parents('.option-group')[0]));
                    if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')')){
                        let multipeQuestions = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                        if(multipeQuestions[idMultiplePoint-1]){
                            let multipeItems = $(multipeQuestions[idMultiplePoint-1]).find('.multipleanswer').children();
                            $(newEl).appendTo($(multipeItems[idPoint-1]));
                        }
                    }
                }
            }
        });
        
        $('.rightside').on('click', '.multiple-row .add-multiple-row', function(e){
            var parents = $(this).parents('.multiple-row');
            var namequestion = $(this).parents('.questionPoint').find('.branching-list .branching-group input').attr('name').split('_');
            var idQuestion = namequestion[1];
            var idMultiple = namequestion[2];
            var idMultiplePoint = parents.children('.dropdown-options').length + 1;
            if(idQuestion && idMultiple && idMultiplePoint){
                let newOption = 
                    '  <div class="dropdown-options">'
                    +'      <div class="form-group">'
                    +'          <div class="top-row">'
                    +'              <label for="multiplequestion_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '">Вопрос</label>'
                    +'              <div class="remove-brn-mtp-qst"></div>'
                    +'          </div>'
                    +'          <textarea class="multiplequestion_name" name="multiplequestion_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '" id="multiplequestion_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint  + '" placeholder="Введите вопрос"></textarea>'
                    +'      </div>'
                    +'        <div class="multityperow">'
                    +'          <div class="namelabel">Выбор одного из списка</div>'
                    +'          <label class="switch" for="doradio_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint +'">'
                    +'              <input type="checkbox" name="doradio_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint +'" id="doradio_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint +'">'
                    +'              <span class="slider round"></span>'
                    +'              <div class="tooltip">Сделать выбор одного варианта</div>'
                    +'          </label>'
                    +'      </div>'
                    +'      <div class="top-row">'
                    +'          <div class="namelabel">Ответы</div>'
                    +'          <div class="add-multiplescale"></div>'
                    +'      </div>'
                    +'      <div class="optionsdropdownlist">'
                    +'          <div class="option-group">'
                    +'              <div class="inputstables">'
                    +'                  <textarea class="multiplescale-question" name="multipleanswer_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_1" id="multipleanswer_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_1" placeholder="Введите ответ"></textarea>'
                    +'              </div>'
                    +'              <div class="remove-multiplescale"></div>'
                    +'                <div class="change-type-multiplescale">'
                    +'                  <input type="checkbox" name="multipleanswertextbox_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_1" id="multipleanswertextbox_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_1">'
                    +'                  <div class="tooltip tooltip-checkbox">Сделать отрытым вопросом</div>'
                    +'                  <div class="tooltip tooltip-textbox">Сделать выбором из множества</div>'
                    +'              </div>'
                    +'                <div class="add-second-mlt-qst">'
                    +'                  <div class="tooltip tooltip-add">Добавить множественный выбор</div>'
                    +'                  <div class="tooltip tooltip-remove">Удалить множественный выбор</div>'
                    +'              </div>'
                    +'          </div>'
                    +'          <div class="option-group">'
                    +'              <div class="inputstables">'
                    +'                  <textarea class="multiplescale-question" name="multipleanswer_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_2" id="multipleanswer_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_2" placeholder="Введите ответ"></textarea>'
                    +'              </div>'
                    +'              <div class="remove-multiplescale"></div>'
                    +'                <div class="change-type-multiplescale">'
                    +'                  <input type="checkbox" name="multipleanswertextbox_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_2" id="multipleanswertextbox_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_2">'
                    +'                  <div class="tooltip tooltip-checkbox">Сделать отрытым вопросом</div>'
                    +'                  <div class="tooltip tooltip-textbox">Сделать выбором из множества</div>'
                    +'              </div>'
                    +'                <div class="add-second-mlt-qst">'
                    +'                  <div class="tooltip tooltip-add">Добавить множественный выбор</div>'
                    +'                  <div class="tooltip tooltip-remove">Удалить множественный выбор</div>'
                    +'              </div>'
                    +'          </div>'
                    +'      </div>'
                    +'</div>';
    
                var newEl = 
                    '<div class="multiple-group">'
                    +'    <div class="name">'
                    +'      Вопрос'
                    +'  </div>'
                    +'  <div class="multipleanswer">'
                    +'      <div class="item"><div class="value">Ответ</div></div>'
                    +'      <div class="item"><div class="value">Ответ</div></div>'
                    +'  </div>'
                    +'</div>';

                $(newOption).appendTo(parents);
                $(newEl).appendTo($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')'));
            }
        });
        
        $('.rightside').on('click', '.multiple-row .remove-brn-mtp-qst-2', function(e){
            var parents = $(this).parents('.second-options');
            var namequestion = $(this).parents('.second-options').find('.multiplequestion_name_2').attr('name').split('_');
            var idQuestion = namequestion[1];
            var idMultiple = namequestion[2];
            var idMultiplePoint = namequestion[3];
            if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group').length>0){
                let multipleGropus = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                if(multipleGropus[idMultiplePoint-1]) {
                    $(multipleGropus[idMultiplePoint-1]).find('.multiple-second-group').remove();
                }
                parents.remove();
            }
        });
        $('.rightside').on('click', '.multiple-row .remove-brn-mtp-qst', function(e){
            var parents = $(this).parents('.dropdown-options');
            var parentsMultiple = $(this).parents('.multiple-row');
            var namequestion = $(this).parents('.dropdown-options').find('.multiplequestion_name').attr('name').split('_');
            var idQuestion = namequestion[1];
            var idMultiple = namequestion[2];
            var idMultiplePoint = namequestion[3];
            if($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group').length>0){
                let multipleGropus = $('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')').find('.multiple-group');
                if(multipleGropus[idMultiplePoint-1]) {
                    multipleGropus[idMultiplePoint-1].remove();
                }
                parents.remove();
                let multipleQuestions = parentsMultiple.find('.dropdown-options');
                if(multipleQuestions.length>0){
                    RefrestBranchingMultiple(multipleQuestions);
                }
            }
        });
        function RefrestBranchingMultiple(multipleQuestions){
            multipleQuestions.each(function (index, question) {
                let id = index + 1;
                var inputs = $(question).find('input');
                inputs.each(function (index, input) {
                    if($(input).attr('name')){
                        prevId = $(input).attr('name').split("_");
                        prevId[3] = id;
                        newId = prevId.join('_');
                        $(input).attr('name', newId);
                    }
                    if($(input).attr('id')){
                        prevId = $(input).attr('id').split("_");
                        prevId[3] = id;
                        newId = prevId.join('_');
                        $(input).attr('id', newId);
                    }
                });
                var textareas = $(question).find('textarea');
                textareas.each(function (index, textarea) {
                    if($(textarea).attr('name')){
                        prevId = $(textarea).attr('name').split("_");
                        prevId[3] = id;
                        newId = prevId.join('_');
                        $(textarea).attr('name', newId);
                    }
                    if($(textarea).attr('id')){
                        prevId = $(textarea).attr('id').split("_");
                        prevId[3] = id;
                        newId = prevId.join('_');
                        $(textarea).attr('id', newId);
                    }
                });
                var labels = $(question).find('label');
                labels.each(function (index, label) {
                    if($(label).attr('for')){
                        prevId = $(label).attr('for').split("_");
                        prevId[3] = id;
                        newId = prevId.join('_');
                        $(label).attr('for', newId);
                    }
                });
            }); 
        }
        $('.rightside').on('click', '.branchingoptionbox .add-multiplescalerow', function(e){
            if($(this).parents('.questionPoint').find('.multiple-row').length == 0){
                var name = $(this).parents('.questionPoint').find('.branching_points ').attr('name').split('_');
                var idQuestion = name[1];
                var idMultiple = name[2];
                var idMultiplePoint = 1;

                var newOption = 
                    '<div class="multiple-row">'
                    +'    <div class="option-row-name">'
                    +'       <p>Множественный выбор</p>'
                    +'      <div class="remobe-multiple-row"></div>'
                    +'        <div class="add-multiple-row">'
                    +'          <div class="tooltip">Добавить вопрос</div>'
                    +'      </div>'
                    +'  </div>'
                    +'  <div class="dropdown-options">'
                    +'      <div class="form-group">'
                    +'          <div class="top-row">'
                    +'              <label for="multiplequestion_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '">Вопрос</label>'
                    +'              <div class="remove-brn-mtp-qst"></div>'
                    +'          </div>'
                    +'          <textarea class="multiplequestion_name" name="multiplequestion_'+ idQuestion +'_'+ idMultiple+ '_'+ idMultiplePoint + '" id="multiplequestion_'+ idQuestion +'_'+ idMultiple+ '_'+ idMultiplePoint + '" placeholder="Введите вопрос"></textarea>'
                    +'      </div>'
                    +'        <div class="multityperow">'
                    +'          <div class="namelabel">Выбор одного из списка</div>'
                    +'          <label class="switch" for="doradio_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint +'">'
                    +'              <input type="checkbox" name="doradio_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint +'" id="doradio_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint +'">'
                    +'              <span class="slider round"></span>'
                    +'              <div class="tooltip">Сделать выбор одного варианта</div>'
                    +'          </label>'
                    +'      </div>'
                    +'      <div class="top-row">'
                    +'          <div class="namelabel">Ответы</div>'
                    +'          <div class="add-multiplescale"></div>'
                    +'      </div>'
                    +'      <div class="optionsdropdownlist">'
                    +'          <div class="option-group">'
                    +'              <div class="inputstables">'
                    +'                  <textarea class="multiplescale-question" name="multipleanswer_'+ idQuestion +'_'+ idMultiple+ '_'+ idMultiplePoint + '_1" id="multipleanswer_'+ idQuestion +'_'+ idMultiple+ '_'+ idMultiplePoint + '_1" placeholder="Введите ответ"></textarea>'
                    +'              </div>'
                    +'              <div class="remove-multiplescale"></div>'
                    +'                <div class="change-type-multiplescale">'
                    +'                  <input type="checkbox" name="multipleanswertextbox_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_1" id="multipleanswertextbox_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_1">'
                    +'                  <div class="tooltip tooltip-checkbox">Сделать отрытым вопросом</div>'
                    +'                  <div class="tooltip tooltip-textbox">Сделать выбором из множества</div>'
                    +'              </div>'
                    +'                <div class="add-second-mlt-qst">'
                    +'                  <div class="tooltip tooltip-add">Добавить множественный выбор</div>'
                    +'                  <div class="tooltip tooltip-remove">Удалить множественный выбор</div>'
                    +'              </div>'
                    +'          </div>'
                    +'          <div class="option-group">'
                    +'              <div class="inputstables">'
                    +'                  <textarea class="multiplescale-question" name="multipleanswer_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_2" id="multipleanswer_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_2" placeholder="Введите ответ"></textarea>'
                    +'              </div>'
                    +'              <div class="remove-multiplescale"></div>'
                    +'                <div class="change-type-multiplescale">'
                    +'                  <input type="checkbox" name="multipleanswertextbox_'+ idQuestion +'_'+ idMultiple + '_' + idMultiplePoint + '_2" id="multipleanswertextbox_'+ idQuestion +'_'+ idMultiple + '_'+ idMultiplePoint + '_2">'
                    +'                  <div class="tooltip tooltip-checkbox">Сделать отрытым вопросом</div>'
                    +'                  <div class="tooltip tooltip-textbox">Сделать выбором из множества</div>'
                    +'              </div>'
                    +'                <div class="add-second-mlt-qst">'
                    +'                  <div class="tooltip tooltip-add">Добавить множественный выбор</div>'
                    +'                  <div class="tooltip tooltip-remove">Удалить множественный выбор</div>'
                    +'              </div>'
                    +'          </div>'
                    +'      </div>'
                    +'  </div>'
                    +'</div>';
    
                var newEl = 
                    '<div class="multiple-group">'
                    +'    <div class="name">'
                    +'      Вопрос'
                    +'  </div>'
                    +'  <div class="multipleanswer">'
                    +'      <div class="item"><div class="value">Ответ</div></div>'
                    +'      <div class="item"><div class="value">Ответ</div></div>'
                    +'  </div>'
                    +'</div>';
                $(newOption).appendTo($(this).parents('.questionPoint'));
                $(newEl).appendTo($('#questionbrnaching_' + idQuestion).find('.branching-group:nth-child('+ idMultiple +')'));
            }
        });
        
        $('.rightside').on('click', '.dropdown-options .remove-dropdown', function(e){
            var parents = $(this).parents('.optionsdropdownlist');
            var namequestion = $(this).parents('.option-group').find('.dropdown-question').attr('name').split('_');
            var idQuestion = namequestion[1];
            var idPoint = parseInt(namequestion[2]);
            $('#questionanswers_' + idQuestion + ' .dropdown-block:nth-child('+ idPoint +')').remove();
            RemoveOption($('#questionanswers_' + idQuestion).find('select'), idPoint );

            $(this).parents('.option-group').remove();
            var Subpoints = parents.children();
            if(Subpoints.length>0){
                Subpoints.each(function (index, subpoint) {
                    var id = index + 1;
                    var inputs = $(subpoint).find('input');
                    inputs.each(function (index, input) {
                        if($(input).attr('name')){
                            prevId = $(input).attr('name').split("_");
                            prevId[2] = id;
                            newId = prevId.join('_');
                            $(input).attr('name', newId);
                        }
                        if($(input).attr('id')){
                            prevId = $(input).attr('id').split("_");
                            prevId[2] = id;
                            newId = prevId.join('_');
                            $(input).attr('id', newId);
                        }
                    });

                    var textareas = $(subpoint).find('textarea');
                    textareas.each(function (index, textarea) {
                        if($(textarea).attr('name')){
                            prevId = $(textarea).attr('name').split("_");
                            prevId[2] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('name', newId);
                        }
                        if($(textarea).attr('id')){
                            prevId = $(textarea).attr('id').split("_");
                            prevId[2] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('id', newId);
                        }
                    });
                });
            }
            

        });

        
        $('.rightside').on('click', '.dropdown-options .remove-rangin', function(e){
            var parents = $(this).parents('.optionsdropdownlist');
            var namequestion = $(this).parents('.option-group').find('.range-question').attr('name').split('_');
            var idQuestion = namequestion[1];
            var idPoint = parseInt(namequestion[2]);
            $('#questionanswers_' + idQuestion + ' .range-row:nth-child('+ idPoint +')').remove();

            $(this).parents('.option-group').remove();
            var Subpoints = parents.children();
            if(Subpoints.length>0){
                Subpoints.each(function (index, subpoint) {
                    var id = index + 1;
                    var inputs = $(subpoint).find('input');
                    inputs.each(function (index, input) {
                        if($(input).attr('name')){
                            prevId = $(input).attr('name').split("_");
                            prevId[2] = id;
                            newId = prevId.join('_');
                            $(input).attr('name', newId);
                        }
                        if($(input).attr('id')){
                            prevId = $(input).attr('id').split("_");
                            prevId[2] = id;
                            newId = prevId.join('_');
                            $(input).attr('id', newId);
                        }
                    });

                    var textareas = $(subpoint).find('textarea');
                    textareas.each(function (index, textarea) {
                        if($(textarea).attr('name')){
                            prevId = $(textarea).attr('name').split("_");
                            prevId[2] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('name', newId);
                        }
                        if($(textarea).attr('id')){
                            prevId = $(textarea).attr('id').split("_");
                            prevId[2] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('id', newId);
                        }
                    });
                });
            }
            

        });

        var minRows = 2;
        var maxRows = 26;
        //autoheight textarea
        function auto_grow(id) {
            var t = id;
            // if (t.scrollTop == 0)   t.scrollTop=1;
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
        //change name of points of branching question
        $('.rightside').on('change , keypress, keydown, keyup', '.branching_points', function(e){
            var idQuestion = $(this).attr('name').split('_')[1];
            var idPoint = $(this).attr('name').split('_')[2];
            if(idQuestion && idPoint){
                $('#questionbrnaching_'+ idQuestion).find('.branching-group:nth-child('+ idPoint + ')').find('.group-name').html($(this).val());
            }
        });

        //change name of points of question
        $('.rightside').on('change , keypress, keydown, keyup', '.question_points', function(e){
            var id = $(this).attr('name').split('_');
            id[0] = '#questionpointsanswer';
            $(id.join('_')).html($(this).val());
            if($(this).parents('.optionbox').find('.brnachingonoff:checked').length>0){
                var questionId = $(this).attr('name').split('_')[1];
                var questionPointsId = $(this).attr('name').split('_')[2];
                if($('#option_' + questionId).find('.branchingoptionbox').find('.inputtables .questionPoint:nth-child('+ questionPointsId + ')').length>0) {
                    $('#option_' + questionId).find('.branchingoptionbox').find('.inputtables .questionPoint:nth-child('+ questionPointsId + ') .branching_points').val($(this).val());
                    $('#questionbrnaching_' + questionId).find('.branching-group:nth-child('+ questionPointsId + ')').find('.group-name').html($(this).val());
                }
            };
        });
        $('.rightside').on('change', '.brnachingonoff', function(e){
            if($(this).is(':checked')){
                var id = $(this).attr('name').split('_')[1];
                var typeparent;
                if($(this).parents('.optionbox').find('.orderinput').prev('input').val()){
                    typeparent = $(this).parents('.optionbox').find('.orderinput').prev('input').val();
                }
                AddQuestionBranching(typeparent, id)
            }
            else {
                var id = $(this).attr('name').split('_')[1];
                $('#questionbrnaching_' + id).parents('.subquestion').remove();
                $('#option_' + id).find('.branchingoptionbox').remove();
            }
        });

        $('.rightside').on('change', '.multionoff', function(e){
            var id = $(this).attr('name').split('_')[1];
            console.log('id:' + id);
            if(id){
                $.ajax ({
                    type: 'POST',
                    url: "/admin/ajax/make-question-multy",
                    dataType: "json",
                    data: { 
                        id: id
                    },
                }).done(function (data) {
                    // данные сохранены
                    console.log(data);
                    console.log('Множественный выбор изменен');
                }).fail(function (data) {
                    // не удалось выполнить запрос к серверу
                    console.log(data);
                    console.log('Запрос не принят');
                });
            }
        });

        $('.rightside').on('change', '.requiredinput .requiredonoff', function(e){
            if($(this).is(':checked')){
                var id = $(this).attr('name').split('_')[1];
                var textSet = 
                '<div class="form-group requiredtextcont" style="display:none;">'
                +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение"></textarea>'
                +'</div>';
                $(textSet).insertAfter($(this).parents('.requiredinput'));
                $(this).parents('.requiredinput').next('.requiredtextcont').fadeIn(300);
            }
            else {
                $(this).parents('.requiredinput').next('.requiredtextcont').remove();
            }
        });
        function AddQuestionBranching(type, id){
            if(type == "single" || type == "singleBranching"){
                var points = $("#option_" + id).find('.inputtables').children();
                var subpointsstr = '';
                var answerstr = '';
                points.each(function (index, subpoint) {
                    var index = index + 1;
                    var text = $(subpoint).find('.question_points').val();
                    subpointsstr = subpointsstr
                    +'                <div class="questionPoint" id="questionPoint_' + id + '_'+ index + '">'
                    +'                    <input class="branching_points hidden" readonly name="groupname_' + id + '_' + index + '" id="groupname_' + id + '_'+ index + '" type="text" value="'+ text +'">'
                    +'                      <div class="branching_points_circle"></div>'
                    +'                    <div class="branching-list">'
                    +'                       <div class="branching-group">'
                    +'                            <input type="text" name="branchingpoint_' + id + '_'+ index + '" id="branchingpoint_' + id + '_'+ index + '" placeholder="Введите вопрос">'
                    +'                            <div class="add-multiplescalerow"></div>'
                    +'                      </div>'
                    +'                    </div>'
                    +'                </div>';
                    answerstr = answerstr 
                    +'<div class="branching-group">'
                    +'  <div class="group-name">'+ text +'</div>'
                    +'  <div class="question-group">'
                    +'        <div class="branching-question">'
                    +'            <div class="name">'
                    +'                Вопрос'
                    +'            </div>'
                    +'            <div class="hidden-question-answer">'
                    +'                <div class="form-group">'
                    +'                    <input type="text" name="hiddenquestionanswer_' + id + '_'+ index + '_1"'
                    +'                        id="hiddenquestionanswer_' + id + '_'+ index + '_1" placeholder="Ваш ответ">'
                    +'                </div>'
                    +'            </div>'
                    +'        </div>' 
                    +'  </div>'
                    +'</div>';
                });
                var option = 
                '        <div class="form-group branchingoptionbox">'
                +'            <p>Вопросы ветвление</p>'
                +'            <div class="inputtables branchingForSingle" id="branchingtables_' + id + '">'
                +               subpointsstr
                +'            </div>'
                +'        </div>';
    
                var el =
                '<div class="subquestion branchingquestion" data-optionid="' + id + '">'
                +'       <div class="name">Ветвление ответа</div>'
                +'    <div class="answer" id="questionbrnaching_' + id + '">'
                +      answerstr
                +'    </div>'
                +'    </div>'
                +'</div>';
                $('#questionanswers_' + id).parents('.question').append(el);
                $(option).insertAfter($('#option_' + id).find('.multityperow'));
                // $('.optionsblock .eloptions').append(option);
            }
            if(type == "scale"){
                var typescale = $("#option_" + id).find('.scale-radio input[type=radio]:checked').val();
                if(typescale == 4 ){
                    var el = 
                    '<div class="subquestion branchingquestion" data-optionid="' + id + '">'
                    +'       <div class="name">Ветвление ответа</div>'
                    +'    <div class="answer" id="questionbrnaching_' + id + '">'
                    +'        <div class="branching-group">'
                    +'            <div class="group-name">0-5</div>'
                    +'            <div class="question-group">'
                    +'                <div class="branching-question">'
                    +'                    <div class="name">'
                    +'                        Вопрос'
                    +'                    </div>'
                    +'                    <div class="hidden-question-answer">'
                    +'                        <div class="form-group">'
                    +'                            <input type="text" name="hiddenquestionanswer_' + id + '_1_1"'
                    +'                                id="hiddenquestionanswer_' + id + '_1_1" placeholder="Ваш ответ">'
                    +'                        </div>'
                    +'                    </div>'
                    +'                </div>  '
                    +'            </div>'
                    +'        </div>'
                    +'        <div class="branching-group">'
                    +'            <div class="group-name">6-10</div>'
                    +'            <div class="question-group">'
                    +'                <div class="branching-question">'
                    +'                    <div class="name">'
                    +'                        Вопрос'
                    +'                    </div>'
                    +'                    <div class="hidden-question-answer">'
                    +'                        <div class="form-group">'
                    +'                            <input type="text" name="hiddenquestionanswer_' + id + '_2_1"'
                    +'                                id="hiddenquestionanswer_' + id + '_2_1" placeholder="Ваш ответ">'
                    +'                        </div>'
                    +'                    </div>'
                    +'                </div>  '
                    +'            </div>'
                    +'        </div>'
                    +'    </div>'
                    +'</div>';
                    var option = 
                    '<div class="branchingoptionbox">'
                    +'        <div class="form-group spinner-wrapper">'
                    +'            <label for="number_' + id + '">Колличество пунктов </label>'
                    +'            <input class="question_number_branching spinner" name="number_' + id + '" id="number_' + id + '" type="text"'
                    +'                value="2">'
                    +'        </div>'
                    +'            <div class="slider">'
                    +'                <div class="sliderscale scale10">'
                    +'                    <div>1</div>'
                    +'                    <div>2</div>'
                    +'                    <div>3</div>'
                    +'                    <div>4</div>'
                    +'                    <div>5</div>'
                    +'                    <div>6</div>'
                    +'                    <div>7</div>'
                    +'                   <div>8</div>'
                    +'                  <div>9</div>'
                    +'                  <div>10</div>'
                    +'              </div>'
                    +'              <div class="slidercursor" data-value="4"></div>'
                    +'          </div>'
                    +'        <div class="form-group">'
                    +'            <p>Варианты ответов</p>'
                    +'            <div class="inputtables branchingForScale" id="branchingtables_' + id + '">'
                    +'                <div class="questionPoint" id="questionPoint_' + id + '_1">'
                    +'                    <input class="branching_points" readonly name="groupname_' + id + '_1" id="groupname_' + id + '_1"'
                    +'                        type="text" value="0-5">'
                    +'                    <div class="branching-list">'
                    +'                       <div class="branching-group">'
                    +'                            <input type="text" name="branchingpoint_' + id + '_1" id="branchingpoint_' + id + '_1" placeholder="Введите вопрос">'
                    +'                            <div class="add-multiplescalerow"></div>'
                    +'                      </div>'
                    +'                    </div>'
                    +'                </div>'
                    +'                <div class="questionPoint" id="questionPoint_' + id + '_2">'
                    +'                   <input class="branching_points" readonly name="groupname_' + id + '_2" id="groupname_' + id + '_2"'
                    +'                       type="text" value="6-10">'
                    +'                  <div class="branching-list">'
                    +'                       <div class="branching-group">'
                    +'                            <input type="text" name="branchingpoint_' + id + '_2" id="branchingpoint_' + id + '_2" placeholder="Введите вопрос">'
                    +'                            <div class="add-multiplescalerow"></div>'
                    +'                      </div>'
                    +'                   </div>'
                    +'               </div>'
                    +'           </div>'
                    +'</div>';
                    $('#questionanswers_' + id).parents('.question').append(el);
                    $(option).insertBefore($('#option_' + id).find('.scale-option'));
                    ChangeSlider(id);
                }
                else if(typescale == 1 || typescale == 3){
                    var el = 
                    '<div class="subquestion branchingquestion" data-optionid="' + id + '">'
                    +'       <div class="name">Ветвление ответа</div>'
                    +'    <div class="answer" id="questionbrnaching_' + id + '">'
                    +'        <div class="branching-group">'
                    +'            <div class="group-name">1-5</div>'
                    +'            <div class="question-group">'
                    +'                <div class="branching-question">'
                    +'                    <div class="name">'
                    +'                        Вопрос'
                    +'                    </div>'
                    +'                    <div class="hidden-question-answer">'
                    +'                        <div class="form-group">'
                    +'                            <input type="text" name="hiddenquestionanswer_' + id + '_1_1"'
                    +'                                id="hiddenquestionanswer_' + id + '_1_1" placeholder="Ваш ответ">'
                    +'                        </div>'
                    +'                    </div>'
                    +'                </div>  '
                    +'            </div>'
                    +'        </div>'
                    +'        <div class="branching-group">'
                    +'            <div class="group-name">6-10</div>'
                    +'            <div class="question-group">'
                    +'                <div class="branching-question">'
                    +'                    <div class="name">'
                    +'                        Вопрос'
                    +'                    </div>'
                    +'                    <div class="hidden-question-answer">'
                    +'                        <div class="form-group">'
                    +'                            <input type="text" name="hiddenquestionanswer_' + id + '_2_1"'
                    +'                                id="hiddenquestionanswer_' + id + '_2_1" placeholder="Ваш ответ">'
                    +'                        </div>'
                    +'                    </div>'
                    +'                </div>  '
                    +'            </div>'
                    +'        </div>'
                    +'    </div>'
                    +'</div>';
                    var option = 
                    '<div class="branchingoptionbox">'
                    +'        <div class="form-group spinner-wrapper">'
                    +'            <label for="number_' + id + '">Колличество пунктов </label>'
                    +'            <input class="question_number_branching spinner" name="number_' + id + '" id="number_' + id + '" type="text"'
                    +'                value="2">'
                    +'        </div>'
                    +'            <div class="slider">'
                    +'                <div class="sliderscale scale10">'
                    +'                    <div>1</div>'
                    +'                    <div>2</div>'
                    +'                    <div>3</div>'
                    +'                    <div>4</div>'
                    +'                    <div>5</div>'
                    +'                    <div>6</div>'
                    +'                    <div>7</div>'
                    +'                   <div>8</div>'
                    +'                  <div>9</div>'
                    +'                  <div>10</div>'
                    +'              </div>'
                    +'              <div class="slidercursor" data-value="4"></div>'
                    +'          </div>'
                    +'        <div class="form-group">'
                    +'            <p>Варианты ответов</p>'
                    +'            <div class="inputtables branchingForScale" id="branchingtables_' + id + '">'
                    +'                <div class="questionPoint" id="questionPoint_' + id + '_1">'
                    +'                    <input class="branching_points" readonly name="groupname_' + id + '_1" id="groupname_' + id + '_1"'
                    +'                        type="text" value="1-5">'
                    +'                    <div class="branching-list">'
                    +'                       <div class="branching-group">'
                    +'                            <input type="text" name="branchingpoint_' + id + '_1" id="branchingpoint_' + id + '_1" placeholder="Введите вопрос">'
                    +'                            <div class="add-multiplescalerow"></div>'
                    +'                      </div>'
                    +'                    </div>'
                    +'                </div>'
                    +'                <div class="questionPoint" id="questionPoint_' + id + '_2">'
                    +'                   <input class="branching_points" readonly name="groupname_' + id + '_2" id="groupname_' + id + '_2"'
                    +'                       type="text" value="6-10">'
                    +'                  <div class="branching-list">'
                    +'                       <div class="branching-group">'
                    +'                            <input type="text" name="branchingpoint_' + id + '_2" id="branchingpoint_' + id + '_2" placeholder="Введите вопрос">'
                    +'                            <div class="add-multiplescalerow"></div>'
                    +'                      </div>'
                    +'                   </div>'
                    +'               </div>'
                    +'           </div>'
                    +'</div>';
                    $('#questionanswers_' + id).parents('.question').append(el);
                    $(option).insertBefore($('#option_' + id).find('.scale-option'));
                    ChangeSlider(id);
                }
                if (typescale == 2 || typescale == 5 ) {
                    var el = 
                    '<div class="subquestion branchingquestion" data-optionid="' + id + '">'
                    +'       <div class="name">Ветвление ответа</div>'
                    +'    <div class="answer" id="questionbrnaching_' + id + '">'
                    +'        <div class="branching-group">'
                    +'            <div class="group-name">1-2</div>'
                    +'            <div class="question-group">'
                    +'                <div class="branching-question">'
                    +'                    <div class="name">'
                    +'                        Вопрос'
                    +'                    </div>'
                    +'                    <div class="hidden-question-answer">'
                    +'                        <div class="form-group">'
                    +'                           <input type="text" name="hiddenquestionanswer_' + id + '_1_1" id="hiddenquestionanswer_' + id + '_1_1"'
                    +'                              placeholder="Ваш ответ">'
                    +'                      </div>'
                    +'                  </div>'
                    +'              </div>'
                    +'            </div>'
                    +'        </div>'
                    +'        <div class="branching-group">'
                    +'            <div class="group-name">3-5</div>'
                    +'            <div class="question-group">'
                    +'                <div class="branching-question">'
                    +'                    <div class="name">'
                    +'                        Вопрос'
                    +'                    </div>'
                    +'                    <div class="hidden-question-answer">'
                    +'                        <div class="form-group">'
                    +'                           <input type="text" name="hiddenquestionanswer_' + id + '_1_1" id="hiddenquestionanswer_' + id + '_1_1"'
                    +'                              placeholder="Ваш ответ">'
                    +'                      </div>'
                    +'                  </div>'
                    +'              </div>'
                    +'            </div>'
                    +'        </div>'
                    +'    </div>'
                    +'</div>';
                    var option = 
                    '<div class="branchingoptionbox">'
                    +'        <div class="form-group spinner-wrapper">'
                    +'            <label for="number_' + id + '">Колличество пунктов </label>'
                    +'            <input class="question_number_branching spinner" name="number_' + id + '" id="number_' + id + '" type="text"'
                    +'                value="2">'
                    +'        </div>'
                    +'            <div class="slider">'
                    +'                <div class="sliderscale scale5">'
                    +'                    <div>1</div>'
                    +'                    <div>2</div>'
                    +'                    <div>3</div>'
                    +'                    <div>4</div>'
                    +'                    <div>5</div>'
                    +'                </div>'
                    +'                <div class="slidercursor5" data-value="2"></div>'
                    +'            </div>'
                    +'        <div class="form-group">'
                    +'            <p>Варианты ответов</p>'
                    +'            <div class="inputtables branchingForScale" id="branchingtables_' + id + '">'
                    +'                <div class="questionPoint" id="questionPoint_' + id + '_1">'
                    +'                    <input class="branching_points" readonly name="groupname_' + id + '_1" id="groupname_' + id + '_1"'
                    +'                        type="text" value="1-2">'
                    +'                    <div class="branching-list">'
                    +'                       <div class="branching-group">'
                    +'                            <input type="text" name="branchingpoint_' + id + '_1" id="branchingpoint_' + id + '_1" placeholder="Введите вопрос">'
                    +'                            <div class="add-multiplescalerow"></div>'
                    +'                      </div>'
                    +'                    </div>'
                    +'                </div>'
                    +'                <div class="questionPoint" id="questionPoint_' + id + '_2">'
                    +'                   <input class="branching_points" readonly name="groupname_' + id + '_2" id="groupname_' + id + '_2"'
                    +'                       type="text" value="3-5">'
                    +'                  <div class="branching-list">'
                    +'                       <div class="branching-group">'
                    +'                            <input type="text" name="branchingpoint_' + id + '_2" id="branchingpoint_' + id + '_2" placeholder="Введите вопрос">'
                    +'                            <div class="add-multiplescalerow"></div>'
                    +'                      </div>'
                    +'                   </div>'
                    +'               </div>'
                    +'           </div>'
                    +'</div>';
                    $('#questionanswers_' + id).parents('.question').append(el);
                    $(option).insertBefore($('#option_' + id).find('.scale-option'));
                    ChangeSlider5(id);
                }
                if($('.slidercursor')){
                    var sliders = $('.slidercursor');
                    sliders.each(function (index, slider) {
                        var slidervalue = $(slider).attr("data-value");
                        var idQuestion = $(slider).parents('.optionbox').attr('id').split('_')[1];
                        $(slider).slider({
                            min: 1,
                            max: 9,
                            step: 1,
                            value: slidervalue,
                            change: function( event, ui ) {
                                var sliders = $('#option_' + idQuestion).find('.branchingoptionbox').find('.slidercursor');
                                var values = new Array(sliders.length);
                                sliders.each(function (index, slider) {
                                    values[index] = $(slider).attr('data-value');
                                });
                                if(values.includes(ui.value)){
                                    ui.value = $(slider).attr('data-value');
                                }
                                else {
                                    $(slider).attr("data-value", ui.value);
                                    ChangeSlider(idQuestion);
                                }
                            }
                        });
                    });
                }
                if($('.slidercursor5')){
                    var sliders = $('.slidercursor5');
                    sliders.each(function (index, slider) {
                        var slidervalue = $(slider).attr("data-value");
                        var idQuestion = $(slider).parents('.optionbox').attr('id').split('_')[1];
                        $(slider).slider({
                            min: 1,
                            max: 4,
                            step: 1,
                            value: slidervalue,
                            change: function( event, ui ) {
                                var sliders = $('#option_' + idQuestion).find('.branchingoptionbox').find('.slidercursor');
                                var values = new Array(sliders.length);
                                sliders.each(function (index, slider) {
                                    values[index] = $(slider).attr('data-value');
                                });
                                if(values.includes(ui.value)){
                                    ui.value = $(slider).attr('data-value');
                                }
                                else {
                                    $(slider).attr("data-value", ui.value);
                                    ChangeSlider5(idQuestion);
                                }
                            }
                        });
                    });
                }
            }
            $( ".question_number_branching" ).spinner({
                min: 2,
                max: 5,
                spin: function( event, ui ) {
                    var id = $(event.target).attr('name').split('_')[1];
                    var number = ui.value;
                    var questionPoints = $('#branchingtables_' + id).find('.questionPoint');
                    questionPoints.each(function (index, question) {
                        if((index + 1) > number) {
                            $('#hiddenquestion_' + id + '_' + index).remove();
                            $(question).remove();
                        }
                    });
                    var currentId = questionPoints.length
                    if(number > questionPoints.length){
                        while (currentId != number){
                            currentId++;
                            var newQuestion = 
                            '<div class="questionPoint" id="questionPoint_'+ id + '_' + currentId +'">'
                            +'    <input class="branching_points" readonly name="groupname_'+ id + '_' + currentId +'" id="groupname_'+ id + '_' + currentId +'" type="text" placeholder="Вариант ответа">'
                            +'    <div class="branching-list">'
                            +'        <div class="branching-group">'
                            +'            <input type="text" name="branchingpoint_'+ id + '_' + currentId +'" id="branchingpoint_'+ id + '_' + currentId +'" placeholder="Введите вопрос">'
                            +'            <div class="add-multiplescalerow"></div>'
                            +'      </div>'
                            +'  </div>'
                            +'</div>';
                            $(newQuestion).appendTo($('#branchingtables_' + id));
                        }
                    }
                    SetPointOfQuestionBranching(id, number);
                }
            });
            RefreshItems();
        }
        if($('.slidercursor')){
            var sliders = $('.slidercursor');
            sliders.each(function (index, slider) {
                var slidervalue = $(slider).attr("data-value");
                var idQuestion = $(slider).parents('.optionbox').attr('id').split('_')[1];
                $(slider).slider({
                    min: 1,
                    max: 9,
                    step: 1,
                    value: slidervalue,
                    change: function( event, ui ) {
                        var sliders = $('#option_' + idQuestion).find('.slidercursor');
                        var values = new Array(sliders.length);
                        sliders.each(function (index, slider) {
                            values[index] = $(slider).attr('data-value');
                        });
                        if(values.includes(ui.value)){
                            ui.value = $(slider).attr('data-value');
                        }
                        else {
                            $(slider).attr("data-value", ui.value);
                            ChangeSlider(idQuestion);
                        }
                    }
                });
            });
        }
        if($('.slidercursor5')){
            var sliders = $('.slidercursor5');
            sliders.each(function (index, slider) {
                var slidervalue = $(slider).attr("data-value");
                var idQuestion = $(slider).parents('.optionbox').attr('id').split('_')[1];
                $(slider).slider({
                    min: 1,
                    max: 4,
                    step: 1,
                    value: slidervalue,
                    change: function( event, ui ) {
                        var sliders = $('#option_' + idQuestion).find('.slidercursor');
                        var values = new Array(sliders.length);
                        sliders.each(function (index, slider) {
                            values[index] = $(slider).attr('data-value');
                        });
                        if(values.includes(ui.value)){
                            ui.value = $(slider).attr('data-value');
                        }
                        else {
                            $(slider).attr("data-value", ui.value);
                            ChangeSlider5(idQuestion);
                        }
                    }
                });
            });
        }

        //change position of cursor for branching dcale
        function ChangeSlider(idQuestion){
            
            var sliders = $('#option_' + idQuestion).find('.branchingoptionbox').find('.slidercursor');
            var values = new Array(sliders.length);
            var ranges = new Array(sliders.length + 1);
            sliders.each(function (index, slider) {
                values[index] = $(slider).attr('data-value');
            });
            values.sort((a,b)=>a-b);
            var index = 0;
            var prevvalue = 1;
            if($('#option_' + idQuestion).find('.scale-radio input[type=radio]:checked')){
                if($('#option_' + idQuestion).find('.scale-radio input[type=radio]:checked').val() == 4) {
                    prevvalue = 0;
                }
            }
            var newvalue = 10;
            values.forEach(function(element){
                newvalue = parseInt(element);
                if(prevvalue==newvalue || prevvalue>newvalue){
                    ranges[index] = prevvalue;
                    prevvalue = newvalue + 1;
                }
                else {
                    ranges[index] = prevvalue + '-' + newvalue;
                    prevvalue = newvalue + 1;
                }
                index ++;
            });
            if(prevvalue==10){
                ranges[index] = prevvalue;
            }
            else {
                ranges[index] = prevvalue + '-' + 10;
            }
            var subpoints = $('#option_' + idQuestion).find('.branchingoptionbox').find('.inputtables').find('.questionPoint');
            subpoints.each(function (index, subpoint) {
                $(subpoint).find('.branching_points').val(ranges[index]);
                $(subpoint).find('.branching_points').change();
            });
        }

        function ChangeSlider5(idQuestion){
            var sliders = $('#option_' + idQuestion).find('.branchingoptionbox').find('.slidercursor5');
            var values = new Array(sliders.length);
            var ranges = new Array(sliders.length + 1);
            sliders.each(function (index, slider) {
                values[index] = $(slider).attr('data-value');
            });
            values.sort((a,b)=>a-b);
            var index = 0;
            var prevvalue = 1;
            var newvalue = 5;
            values.forEach(function(element){
                newvalue = parseInt(element);
                if(prevvalue==newvalue || prevvalue>newvalue){
                    ranges[index] = prevvalue;
                    prevvalue = newvalue + 1;
                }
                else {
                    ranges[index] = prevvalue + '-' + newvalue;
                    prevvalue = newvalue + 1;
                }
                index ++;
            });
            if(prevvalue==5){
                ranges[index] = prevvalue;
            }
            else {
                ranges[index] = prevvalue + '-' + 5;
            }
            var subpoints = $('#option_' + idQuestion).find('.branchingoptionbox').find('.inputtables').find('.questionPoint');
            subpoints.each(function (index, subpoint) {
                $(subpoint).find('.branching_points').val(ranges[index]);
                $(subpoint).find('.branching_points').change();
            });
        }

        $('.rightside').on('change , keypress, keydown, keyup', '.ratinstables input[type=text]', function(e){
            var idQuestion = $(this).attr('name').split('_')[1];
            var idPoint = parseInt($(this).attr('name').split('_')[2]);
            if(idQuestion && idPoint){
                if($('#questionanswer_'+ idQuestion +'_' + idPoint).next ('label').find('.text').length>0){
                    $('#questionanswer_'+ idQuestion +'_' + idPoint).next ('label').find('.text').html($(this).val());
                }
            }
        });

        $('.rightside').on('change , keypress, keydown, keyup', '.scale-option .scalelabels textarea', function(e){
            var idQuestion = $(this).attr('name').split('_')[1];
            if($('#questionanswers_' + idQuestion).find('.scaleanswer .rightlabel').length==0){
                var label = 
                '<div class="scalelabels">'
                +'    <div class="rightlabel"></div>'
                +'    <div class="leftlabel"></div>'
                +'</div>';
                $(label).appendTo($('#questionanswers_' + idQuestion + ' .scaleanswer'));
            }
            if($(this).parent('.rightlabel').length>0){
                $('#questionanswers_' + idQuestion).find('.scaleanswer .rightlabel').html($(this).val());
            }
            else if ($(this).parent('.leftlabel').length>0){
                $('#questionanswers_' + idQuestion).find('.scaleanswer .leftlabel').html($(this).val());
            }
        });

        $('.rightside').on('change', '.scale-radio input[type=radio]', function(e){
            var el = '';
            var id = $(this).attr('name').split('_')[1];
            var type = $(this).val();
            var pollid = $('#quiz-id').val();
            if(type && pollid && id){
                $.ajax ({
                    type: 'POST',
                    url: "/admin/poll/create-question",
                    dataType: "json",
                    data: { 
                        questiontype: "scale",
                        quizid: pollid,
                        questionid: id,
                        scaletype: type
                    },
                }).done(function (data) {
                    // данные сохранены
                    console.log('Тип шкалы изменен');
                }).fail(function (data) {
                    // не удалось выполнить запрос к серверу
                    console.log(data);
                    console.log('Запрос не принят');
                });
            }
            if($('#questionanswers_' + id).parents('.question').find('.subquestion').length>0){
                if(type == 1 || type == 4 || type == 3){
                    if($('#questionanswers_' + id).hasClass('answer-star5')
                    || $('#questionanswers_' + id).hasClass('answer-ratings5')){
                        $('#option_' + id).find('.brnachingonoff').click();
                    }
                    else {
                        ChangeSlider(id);
                    }
                }
                if(type == 2 || type == 5) {
                    if($('#questionanswers_' + id).hasClass('answer-colorstar')
                    || $('#questionanswers_' + id).hasClass('answer-star10')
                    || $('#questionanswers_' + id).find('.answer-ratings10').length>0){
                        $('#option_' + id).find('.brnachingonoff').click();
                    }
                    else {
                        ChangeSlider5(id);
                    }
                }
            }
            if(type == 1){
                el = 
                '<div class="answer answer-colorstar" id="questionanswers_'+ id +'"><div class="scaleanswer">'
                +'    <div class="rating">'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_10" value="10">'
                +'        <label for="questionanswer_'+ id +'_10"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_9" value="9">'
                +'        <label for="questionanswer_'+ id +'_9"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_8" value="8">'
                +'        <label for="questionanswer_'+ id +'_8"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_7" value="7">'
                +'        <label for="questionanswer_'+ id +'_7"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_6" value="6">'
                +'        <label for="questionanswer_'+ id +'_6"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_5" value="5">'
                +'        <label for="questionanswer_'+ id +'_5"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_4" value="4">'
                +'        <label for="questionanswer_'+ id +'_4"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_3" value="3">'
                +'        <label for="questionanswer_'+ id +'_3"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_2" value="2">'
                +'        <label for="questionanswer_'+ id +'_2"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_1" value="1">'
                +'        <label for="questionanswer_'+ id +'_1"></label>'
                +'    </div>'
                +'</div></div>';
            }
            else if(type == 2){
                el =
                '<div class="answer answer-star5" id="questionanswers_'+ id +'">'
                +'    <div class="rating">'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_5" value="5">'
                +'        <label for="questionanswer_'+ id +'_5"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_4" value="4">'
                +'        <label for="questionanswer_'+ id +'_4"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_3" value="3">'
                +'        <label for="questionanswer_'+ id +'_3"></label>'
                +'       <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_2" value="2">'
                +'        <label for="questionanswer_'+ id +'_2"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_1" value="1">'
                +'        <label for="questionanswer_5_1"></label>'
                +'    </div>'
                +'</div>';
            }
            else if(type == 3){
                el = 
                '<div class="answer answer-star10" id="questionanswers_'+ id +'"><div class="scaleanswer">'
                +'    <div class="rating">'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_10" value="10">'
                +'        <label for="questionanswer_'+ id +'_10"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_9" value="9">'
                +'        <label for="questionanswer_'+ id +'_9"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_8" value="8">'
                +'        <label for="questionanswer_'+ id +'_8"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_7" value="7">'
                +'        <label for="questionanswer_'+ id +'_7"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_6" value="6">'
                +'        <label for="questionanswer_'+ id +'_6"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_5" value="5">'
                +'        <label for="questionanswer_'+ id +'_5"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_4" value="4">'
                +'        <label for="questionanswer_'+ id +'_4"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_3" value="3">'
                +'        <label for="questionanswer_'+ id +'_3"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_2" value="2">'
                +'        <label for="questionanswer_'+ id +'_2"></label>'
                +'        <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_1" value="1">'
                +'        <label for="questionanswer_'+ id +'_1"></label>'
                +'    </div>'
                +'</div></div>';
            }
            else if(type == 4){
                el = 
                '<div class="answer" id="questionanswers_'+ id +'">'
                +'    <div class="scaleanswer scaleanswer10">'
                +'    <div class="answer-ratings10">'
                +'    <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_0" value="0">'
                +'    <label  for="questionanswer_'+ id +'_0">'
                +'        <div class="digit color0">'
                +'            0'
                +'        </div>'
                +'    </label>'
                +'    <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_1" value="1">'
                +'    <label  for="questionanswer_'+ id +'_1">'
                +'        <div class="digit color1">'
                +'            1'
                +'        </div>'
                +'    </label>'
                +'    <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_2"  value="2">'
                +'    <label  for="questionanswer_'+ id +'_2">'
                +'        <div class="digit color2">'
                +'            2'
                +'        </div>'
                +'    </label>'
                +'    <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_3"  value="3">'
                +'    <label  for="questionanswer_'+ id +'_3">'
                +'        <div class="digit color3">'
                +'            3'
                +'        </div>'
                +'    </label>'
                +'    <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_4"  value="4">'
                +'    <label  for="questionanswer_'+ id +'_4">'
                +'        <div class="digit color4">'
                +'            4'
                +'        </div>'
                +'    </label>'
                +'    <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_5"  value="5">'
                +'    <label for="questionanswer_'+ id +'_5">'
                +'        <div class="digit color5">'
                +'            5'
                +'        </div>'
                +'    </label>'
                +'    <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_6"  value="6">'
                +'    <label  for="questionanswer_'+ id +'_6">'
                +'        <div class="digit color6">'
                +'            6'
                +'        </div>'
                +'    </label>'
                +'    <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_7"  value="7">'
                +'    <label for="questionanswer_'+ id +'_7">'
                +'        <div class="digit color7">'
                +'            7'
                +'        </div>'
                +'    </label>'
                +'    <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_8"  value="8">'
                +'    <label for="questionanswer_'+ id +'_8">'
                +'        <div class="digit color8">'
                +'            8'
                +'        </div>'
                +'    </label>'
                +'    <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_9"  value="9">'
                +'    <label  for="questionanswer_'+ id +'_9">'
                +'        <div class="digit color9">'
                +'            9'
                +'        </div>'
                +'    </label>'
                +'    <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_10"  value="10">'
                +'    <label for="questionanswer_'+ id +'_10">'
                +'        <div class="digit color10">'
                +'            10'
                +'        </div>'
                +'    </label>'
                +'</div></div></div>';
            }
            else if(type == 5){
                var text1 = $('#scaleRating5_'+ id +'_1').val();
                var text2 = $('#scaleRating5_'+ id +'_2').val();
                var text3 = $('#scaleRating5_'+ id +'_3').val();
                var text4 = $('#scaleRating5_'+ id +'_4').val();
                var text5 = $('#scaleRating5_'+ id +'_5').val();
                el =
                '<div class="answer answer-ratings5" id="questionanswers_'+ id +'">'
                +'    <div class="radio-wrapper">'
                +'        <div class="radio-cont">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_1" value="1">'
                +'            <label for="questionanswer_'+ id +'_1">'
                +'                <div class="number">1</div>'
                +'               <div class="text">'
                +                   text1
                +'                </div>'
                +'            </label>'
                +'        </div>'
                +'        <div class="radio-cont">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_2" value="2">'
                +'            <label for="questionanswer_'+ id +'_2">'
                +'                <div class="number">2</div>'
                +'                <div class="text">'
                +                   text2
                +'                </div>'
                +'            </label>'
                +'        </div>'
                +'        <div class="radio-cont">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_3" value="3">'
                +'            <label for="questionanswer_'+ id +'_3">'
                +'                <div class="number">3</div>'
                +'                <div class="text">'
                +                   text3
                +'                </div>'
                +'            </label>'
                +'        </div>'
                +'        <div class="radio-cont">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_4" value="4">'
                +'            <label for="questionanswer_'+ id +'_4">'
                +'                <div class="number">4</div>'
                +'                <div class="text">'
                +                   text4
                +'                </div>'
                +'            </label>'
                +'        </div>'
                +'        <div class="radio-cont">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_5" value="5">'
                +'            <label for="questionanswer_'+ id +'_5">'
                +'                <div class="number">5</div>'
                +'                <div class="text">'
                +                   text5
                +'                </div>'
                +'            </label>'
                +'        </div>'
                +'    </div>'
                +'</div>';
            }
            if(el){
                $('#questionanswers_' +id).remove();
                $('#questionName_' + id).after(el);;
                if(type == 1 || type == 4 || type == 3){
                    if($('#option_' + id).find('.scalelabels').length>0) {
                        var lefttext = $('#option_' + id).find('.scalelabels .leftlabel textarea').val();
                        var righttext = $('#option_' + id).find('.scalelabels .rightlabel textarea').val();
                        var label = 
                        '<div class="scalelabels">'
                        +'    <div class="rightlabel">'+ righttext + '</div>'
                        +'    <div class="leftlabel">'+ lefttext +'</div>'
                        +'</div>';
                        $(label).appendTo($('#questionanswers_' + id + ' .scaleanswer'));
                        $('#option_' + id).find('.scalelabels').insertAfter($(this).next());
                    }
                    else {
                        var scalelabels = 
                        '<div class="scalelabels">'
                        +'    <div class="rightlabel">'
                        +'        <textarea rows="2"'
                        +'            name="rightlabelscale_' + id + '" placeholder="Совершенно не удовлетворен"></textarea>'
                        +'    </div>'
                        +'    <div class="leftlabel">'
                        +'        <textarea rows="2"'
                        +'            name="leftlabelscale_' + id + '" placeholder="Полностью удовлетворен"></textarea>'
                        +'    </div>'
                        +'</div>';
                        $(scalelabels).insertAfter($(this).next());
                    }
                }
                else {
                    if($('#option_' + id).find('.scalelabels').length>0) {
                        $('#option_' + id).find('.scalelabels').remove();
                    }
                }
            }
        });

        // $(".spinner").inputFilter(function(value) {
        //     return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 15);
        // });
        
        $(".question_number_branching").inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || (parseInt(value) <= 5 && parseInt(value) >= 2));
        });

        $( ".freeanswer_number" ).spinner({
            min: 0,
            max: 15,
            spin: function( event, ui ) {
                var id = parseInt($(event.target).attr('name').split('_')[1]);
                var number = ui.value;
                SetPointOfFreeQuestion(id, number);
            }
        });

        $( ".question_number" ).spinner({
            min: 0,
            max: 15,
            spin: function( event, ui ) {
                var id = $(event.target).attr('name').split('_')[1];
                var number = ui.value;
                var questionPoints = $('#inputtables_' + id).find('.questionPoint');
                questionPoints.each(function (index, question) {
                    if((index + 1) > number) {
                        $(question).remove();
                    }
                });
                var currentId = questionPoints.length
                if(number > questionPoints.length){
                    while (currentId != number){
                        currentId++;
                        var newQuestion = 
                        '<div class="questionPoint" id="questionPoint_'+ id + '_' + currentId +'">'
                        +'    <label for="inputpoint_'+ id + '_' + currentId +'">'+ currentId +'</label>'
                        +'    <input class="question_points" name="inputpoint_'+ id + '_' + currentId +'" id="inputpoint_'+ id + '_' + currentId +'" type="text" placeholder="Вариант ответа">'
                        +'</div>';
                        $(newQuestion).appendTo($('#inputtables_' + id));
                    }
                }
                SetPointOfQuestion(id, number);
            }
        });

        $( ".question_number_branching" ).spinner({
            min: 2,
            max: 5,
            spin: function( event, ui ) {
                var id = $(event.target).attr('name').split('_')[1];
                var number = ui.value;
                var questionPoints = $('#branchingtables_' + id).find('.questionPoint');
                questionPoints.each(function (index, question) {
                    if((index + 1) > number) {
                        $(question).remove();
                        $('#hiddenquestion_' + id + '_' + index).remove();
                    }
                });
                var currentId = questionPoints.length
                if(number > questionPoints.length){
                    while (currentId != number){
                        currentId++;
                        var newQuestion = 
                        '<div class="questionPoint" id="questionPoint_'+ id + '_' + currentId +'">'
                        +'    <input class="branching_points" readonly name="groupname_'+ id + '_' + currentId +'" id="groupname_'+ id + '_' + currentId +'" type="text" placeholder="Вариант ответа">'
                        +'    <div class="branching-list">'
                        +'        <div class="branching-group">'
                        +'            <input type="text" name="branchingpoint_'+ id + '_' + currentId +'" id="branchingpoint_'+ id + '_' + currentId +'" placeholder="Введите вопрос">'
                        +'            <div class="add-multiplescalerow"></div>'
                        +'      </div>'
                        +'  </div>'
                        +'</div>';
                        $(newQuestion).appendTo($('#branchingtables_' + id));
                    }
                }
                SetPointOfQuestionBranching(id, number);
            }
        });

        //add subpoints
        $('.rightside').on('click', '.branching-btn', function(e){
            var subPoints = $(this).next('.branching-list').children();
            var prevNameInput = $(this).prev('.branching_points').attr('id').split('_');
            var questionId =  prevNameInput[1];
            var questionPointsId =  parseInt(prevNameInput[2]);
                var el = 
                '<div class="branching-group">'
                +'    <input type="text" name="branchingpoint_'+ questionId + '_' + questionPointsId + '" id="branchingpoint_'+ questionId + '_' + questionPointsId + '">'
                +'    <div class="deleteSubPoint"></div>'
                +'</div>';
                $(this).next('.branching-list').append(el);
                if(!$(this).hasClass('active')){
                    $(this).addClass('active');
                }

                var hiddenquestion = 
                '<div class="branching-question">'
                +'    <div class="name">'
                +'        Вопрос'
                +'    </div>'
                +'    <div class="hidden-question-answer">'
                +'        <div class="form-group">'
                +'            <input type="text" name="hiddenquestionanswer_'+ questionId + '_' + questionPointsId + '"'
                +'                id="hiddenquestionanswer_'+ questionId + '_' + questionPointsId  + '" placeholder="Ваш ответ">'
                +'        </div>'
                +'    </div>'
                +'</div> '

                if($('#questionbrnaching_'+ questionId).find('.branching-group:nth-child('+ questionPointsId + ')').length>0) {
                    $(hiddenquestion).appendTo($('#questionbrnaching_'+ questionId).find('.branching-group:nth-child('+ questionPointsId + ') .question-group'));
                }
                else {
                    console.log("Branching Error");
                }
        });

        //delete subpoints
        $('.rightside').on('click', '.deleteSubPoint', function(e){
            var parents = $(this).parents('.branching-list');
            $(this).parents('.branching-group').remove();
            var idQuestion = $(this).parents('.branching-group').find('input').attr('name').split('_')[1];
            var idPoint = parseInt($(this).parents('.branching-group').find('input').attr('name').split('_')[2]);
            var idSubPoint = parseInt($(this).parents('.branching-group').find('input').attr('name').split('_')[3]);
            if(idQuestion && idPoint && idSubPoint){
                if($('#questionbrnaching_'+ idQuestion).find('.branching-group:nth-child('+ idPoint + ') .question-group .branching-question:nth-child('+ idSubPoint + ')').find('.name').length>0){
                    $('#questionbrnaching_'+ idQuestion).find('.branching-group:nth-child('+ idPoint + ') .question-group .branching-question:nth-child('+ idSubPoint + ')').remove();
                }
                var SubpointsAnswer = $('#questionbrnaching_'+ idQuestion).find('.branching-group:nth-child('+ idPoint + ') .question-group').children();
                if(SubpointsAnswer.length>0){
                    SubpointsAnswer.each(function (index, subpoint) {
                        var id = index + 1;
                        var inputs = $(subpoint).find('input');
                        inputs.each(function (index, input) {
                            if($(input).attr('name')){
                                prevId = $(input).attr('name').split("_");
                                prevId[3] = id;
                                newId = prevId.join('_');
                                $(input).attr('name', newId);
                            }
                            if($(input).attr('id')){
                                prevId = $(input).attr('id').split("_");
                                prevId[3] = id;
                                newId = prevId.join('_');
                                $(input).attr('id', newId);
                            }
                        });
                    });
                }
            }

            var Subpoints = parents.children();
            if(Subpoints.length>0){
                Subpoints.each(function (index, subpoint) {
                    var id = index + 1;
                    var inputs = $(subpoint).find('input');
                    inputs.each(function (index, input) {
                        if($(input).attr('name')){
                            prevId = $(input).attr('name').split("_");
                            prevId[3] = id;
                            newId = prevId.join('_');
                            $(input).attr('name', newId);
                        }
                        if($(input).attr('id')){
                            prevId = $(input).attr('id').split("_");
                            prevId[3] = id;
                            newId = prevId.join('_');
                            $(input).attr('id', newId);
                        }
                    });
                });
            }
            else {
                parents.prev('.branching-btn').removeClass('active');
            }
        });

        //change points of question
        $('.rightside').on('change', '.question_number', function(e){
            var id = $(this).attr('name').split('_')[1];
            var number = $(this).val();
            var questionPoints = $('#inputtables_' + id).find('.questionPoint');
            questionPoints.each(function (index, question) {
                if((index + 1) > number) {
                    $(question).remove();
                }
            });
            var currentId = questionPoints.length
            if(number > questionPoints.length){
                while (currentId != number){
                    currentId++;
                    var newQuestion = 
                    '<div class="questionPoint" id="questionPoint_'+ id + '_' + currentId +'">'
                    +'    <label for="inputpoint_'+ id + '_' + currentId +'">'+ currentId +'</label>'
                    +'    <input class="question_points" name="inputpoint_'+ id + '_' + currentId +'" id="inputpoint_'+ id + '_' + currentId +'" type="text"  placeholder="Вариант ответа">'
                    +'</div>';
                    $(newQuestion).appendTo($('#inputtables_' + id));
                }
            }
            SetPointOfQuestion(id, number);
        });

        //change points of question
        $('.rightside').on('change', '.question_number_branching', function(e){
            var id = $(this).attr('name').split('_')[1];
            var number = $(this).val();
            var questionPoints = $('#branchingtables_' + id).find('.questionPoint');
            questionPoints.each(function (index, question) {
                if((index + 1) > number) {
                    $(question).remove();
                    $('#hiddenquestion_' + id + '_' + index).remove();
                }
            });
            var currentId = questionPoints.length
            if(number > questionPoints.length){
                while (currentId != number){
                    currentId++;
                    var newQuestion = 
                    '<div class="questionPoint" id="questionPoint_'+ id + '_' + currentId +'">'
                    +'    <input class="branching_points" readonly name="groupname_'+ id + '_' + currentId +'" id="groupname_'+ id + '_' + currentId +'" type="text" placeholder="Вариант ответа">'
                    +'    <div class="branching-list">'
                    +'        <div class="branching-group">'
                    +'            <input type="text" name="branchingpoint_'+ id + '_' + currentId +'" id="branchingpoint_'+ id + '_' + currentId +'" placeholder="Введите вопрос">'
                    +'            <div class="add-multiplescalerow"></div>'
                    +'      </div>'
                    +'  </div>'
                    +'</div>';
                    $(newQuestion).appendTo($('#branchingtables_' + id));
                }
            }
            SetPointOfQuestionBranching(id, number);
        });

        //change points of free question
        $('.rightside').on('change', '.freeanswer_number', function(e){
            var id = parseInt($(this).attr('name').split('_')[1]);
            var number = $(this).val();
            SetPointOfFreeQuestion(id, number);
        });
        
        //set points of question
        function SetPointOfQuestion(id, number) {
            var questionPoints = $('#questionanswers_' + id).find('.form-group');
            questionPoints.each(function (index, question) {
                if((index + 1) > number) {
                    $(question).remove();
                    if($('#option_' + id).find('.brnachingonoff:checked')){
                        SetPointOfQuestionBranchingSingle(id,number);
                    }
                }
            });
            var currentId = questionPoints.length
            if(number > questionPoints.length){
                while (currentId != number){
                    currentId++;
                    var newQuestion = 
                    '<div class="form-group" id="questionformAnswer_'+ id + '_' + currentId +'">'
                    +'    <input type="radio" name="questionanswer_'+ id + '" id="questionanswer_'+ id + '_' + currentId +'">'
                    +'    <label id="questionpointsanswer_'+ id + '_' + currentId +'" for="questionanswer_'+ id + '_' + currentId +'">Вариант ответа</label>'
                    +'</div>';
                    $(newQuestion).appendTo($('#questionanswers_' + id));
                    if($('#option_' + id).find('.brnachingonoff:checked')){
                        SetPointOfQuestionBranchingSingle(id, number);
                    }
                }
            }
        }
        
        //set points of question
        function SetPointOfQuestionBranchingSingle(id, number) {
            var questionPoints = $('#option_' + id).find('.branchingForSingle .questionPoint');
            questionPoints.each(function (index, question) {
                if((index + 1) > number) {
                    $(question).remove();
                    $('#hiddenquestion_' + id + '_' + index).remove();
                }
            });
            var currentId = questionPoints.length
            if(number > questionPoints.length){
                while (currentId != number){
                    currentId++;
                    var newQuestion = 
                     '                <div class="questionPoint" id="questionPoint_' + id + '_'+ currentId + '">'
                    +'                    <input class="branching_points hidden" readonly name="groupname_' + id + '_' + currentId +'" id="groupname_' + id + '_'+ currentId + '" type="text" value="">'
                    +'                      <div class="branching_points_circle"></div>'
                    +'                    <div class="branching-list">'
                    +'                       <div class="branching-group">'
                    +'                            <input type="text" name="branchingpoint_' + id + '_'+ currentId + '" id="branchingpoint_' + id + '_'+ currentId + '" placeholder="Введите вопрос">'
                    +'                            <div class="add-multiplescalerow"></div>'
                    +'                      </div>'
                    +'                    </div>'
                    +'                </div>';
                    $(newQuestion).appendTo($('#branchingtables_' + id));
                }
            }

            var questionPoints = $('#questionbrnaching_' + id).find('.branching-group');
            questionPoints.each(function (index, question) {
                if((index + 1) > number) {
                    $(question).remove();
                    if($('#option_'+ id).find('.brnachingonoff:checked')){
                        var questionId = id;
                        var questionPointsId = index + 1;
                        
                        if($('#option_' + questionId).find('.branchingoptionbox').find('.inputtables .questionPoint:nth-child('+ questionPointsId + ')').length>0) {
                            $('#option_' + questionId).find('.branchingoptionbox').find('.inputtables .questionPoint:nth-child('+ questionPointsId + ') .branching_points').remove();
                            $('#questionbrnaching_'+ questionId).find('.branching-group:nth-child('+ questionPointsId + ')').remove();
                        }
                    };
                }
            });
            var currentId = questionPoints.length
            if(number > questionPoints.length){
                while (currentId != number){
                    currentId++;
                    var newQuestion = 
                    '<div class="branching-group">'
                    +'    <div class="group-name">Ответ</div>'
                    +'    <div class="question-group">'
                    +'        <div class="branching-question">'
                    +'            <div class="name">'
                    +'               Вопрос'
                    +'          </div>'
                    +'          <div class="hidden-question-answer">'
                    +'              <div class="form-group">'
                    +'                  <input type="text" name="hiddenquestionanswer_'+ id + '_' + currentId +'_1"'
                    +'                      id="hiddenquestionanswer_'+ id + '_' + currentId +'_1" placeholder="Ваш ответ">'
                    +'              </div>'
                    +'          </div>'
                    +'      </div>'  
                    +'    </div>'
                    +'</div>';
                    $(newQuestion).appendTo($('#questionbrnaching_' + id));
                }
            }
        }
            
        //set points of question
        function SetPointOfQuestionBranching(id, number) {
            var questionPoints = $('#questionbrnaching_' + id).find('.branching-group');
            questionPoints.each(function (index, question) {
                if((index + 1) > number) {
                    $(question).remove();
                    if($('#option_' + id).find('.branchingoptionbox').find('.scale10').length>0) {
                        if($('#option_' + id).find('.branchingoptionbox').find('.slidercursor:last-child').length>0){
                            $('#option_' + id).find('.branchingoptionbox').find('.slidercursor:last-child').remove();
                            ChangeSlider(id);
                        }            
                    }
                    else {
                        if($('#option_' + id).find('.branchingoptionbox').find('.slidercursor5:last-child').length>0){
                            $('#option_' + id).find('.branchingoptionbox').find('.slidercursor5:last-child').remove();
                            ChangeSlider5(id);
                        }            
                    }
                    
                    if($('#option' + id).find('.branchingoptionbox').find('.brnachingonoff:checked')){
                        var questionId = $('#option' + id).find('.branchingoptionbox').find('.subquestionID').val();
                        var questionPointsId = number;
                        if($('#option_' + questionId).find('.branchingoptionbox').find('.inputtables .questionPoint:nth-child('+ questionPointsId + ')').length>0) {
                            $('#option_' + questionId).find('.branchingoptionbox').find('.inputtables .questionPoint:nth-child('+ questionPointsId + ') .branching_points').remove();
                            $('#questionbrnaching_'+ questionId).find('.branching-group:nth-child('+ questionPointsId + ')').remove();
                        }
                    };
                }
            });
            var currentId = questionPoints.length
            if(number > questionPoints.length){
                while (currentId != number){
                    currentId++;
                    if($('#option_' + id).find('.branchingoptionbox').find('.slider').length>0){
                        if($('#option_' + id).find('.branchingoptionbox').find('.scale10').length>0) {
                            var sliders = $('#option_' + id).find('.branchingoptionbox').find('.slidercursor');
                            var values = new Array(sliders.length);
                            sliders.each(function (index, slider) {
                                values[index] = parseInt($(slider).attr('data-value'));
                            });
                            var newvalue =  Math.floor(Math.random() * (9 - 1 + 1) + 1);
                            index = 0;
                            while(values.includes(newvalue) && index<10){
                                newvalue =  Math.floor(Math.random() * (9 - 1 + 1) + 1);
                                index++;
                            }
                            var newslider = '<div class="slidercursor" data-value="'+ newvalue + '"></div>';
                            $('#option_' + id).find('.branchingoptionbox').find('.slider').append(newslider);
                            var sliders = $('.slidercursor');
                            sliders.each(function (index, slider) {
                                var slidervalue = $(slider).attr("data-value");
                                var idQuestion = $(slider).parents('.optionbox').attr('id').split('_')[1];
                                $(slider).slider({
                                    min: 1,
                                    max: 9,
                                    step: 1,
                                    value: slidervalue,
                                    change: function( event, ui ) {
                                        var sliders = $('#option_' + idQuestion).find('.branchingoptionbox').find('.slidercursor');
                                        var values = new Array(sliders.length);
                                        sliders.each(function (index, slider) {
                                            values[index] = $(slider).attr('data-value');
                                        });
                                        if(values.includes(ui.value)){
                                            ui.value = $(slider).attr('data-value');
                                        }
                                        else {
                                            $(slider).attr("data-value", ui.value);
                                            ChangeSlider(idQuestion);
                                        }
                                    }
                                });
                            });
                        }
                        else {
                            var sliders = $('#option_' + id).find('.branchingoptionbox').find('.slidercursor5');
                            var values = new Array(sliders.length);
                            sliders.each(function (index, slider) {
                                values[index] = parseInt($(slider).attr('data-value'));
                            });
                            var newvalue =  Math.floor(Math.random() * (4 - 1 + 1) + 1);
                            index = 0;
                            while(values.includes(newvalue) && index<10){
                                newvalue =  Math.floor(Math.random() * (4 - 1 + 1) + 1);
                                index++;
                            }
                            var newslider = '<div class="slidercursor5" data-value="'+ newvalue + '"></div>';
                            $('#option_' + id).find('.branchingoptionbox').find('.slider').append(newslider);
                            var sliders = $('.slidercursor5');
                            sliders.each(function (index, slider) {
                                var slidervalue = $(slider).attr("data-value");
                                var idQuestion = $(slider).parents('.optionbox').attr('id').split('_')[1];
                                $(slider).slider({
                                    min: 1,
                                    max: 4,
                                    step: 1,
                                    value: slidervalue,
                                    change: function( event, ui ) {
                                        var sliders = $('#option_' + idQuestion).find('.branchingoptionbox').find('.slidercursor5');
                                        var values = new Array(sliders.length);
                                        sliders.each(function (index, slider) {
                                            values[index] = $(slider).attr('data-value');
                                        });
                                        if(values.includes(ui.value)){
                                            ui.value = $(slider).attr('data-value');
                                        }
                                        else {
                                            $(slider).attr("data-value", ui.value);
                                            ChangeSlider5(idQuestion);
                                        }
                                    }
                                });
                            });
                        }
                    }
                    var newQuestion = 
                    '<div class="branching-group">'
                    +'    <div class="group-name">Ответ</div>'
                    +'    <div class="question-group">'
                    +'        <div class="branching-question">'
                    +'            <div class="name">'
                    +'               Вопрос'
                    +'          </div>'
                    +'          <div class="hidden-question-answer">'
                    +'              <div class="form-group">'
                    +'                  <input type="text" name="hiddenquestionanswer_'+ id + '_' + currentId +'_1"'
                    +'                      id="hiddenquestionanswer_'+ id + '_' + currentId +'_1" placeholder="Ваш ответ">'
                    +'              </div>'
                    +'          </div>'
                    +'      </div>'  
                    +'    </div>'
                    +'</div>';
                    $(newQuestion).appendTo($('#questionbrnaching_' + id));
                    $('#option_' + id).find('.branchingoptionbox').find('.inputtables .branching_points').change();
                }
            }
        }

        //set points of question
        function SetPointOfFreeQuestion(id, number) {
            var questionPoints = $('#questionanswers_' + id).find('.form-group');
            questionPoints.each(function (index, question) {
                if((index + 1) > number) {
                    $(question).remove();
                }
            });
            var currentId = questionPoints.length
            if(number > questionPoints.length){
                while (currentId != number){
                    currentId++;
                    var newQuestion = 
                    '<div class="form-group" id="questionformAnswer_'+ id + '_' + currentId +'">'
                    +'    <input type="text" name="questionanswer_'+ id + '_' + currentId +'" id="questionanswer_'+ id + '_' + currentId +'" placeholder="Ваш ответ">'
                    +'</div>';
                    $(newQuestion).appendTo($('#questionanswers_' + id));
                }
            }
        }

        var i = parseInt($('.questions-box').attr('data-count')) + 1;
        $(".questions-box").droppable({
        drop: function(event, ui) {
                var item = $(ui.draggable).html();
                var fieldId = 'question'+'_'+i;
                var eventTop = event.pageY;
                var offsetY = event.offsetY;
                var children = $('.questions-box').children();
                var appendInde = getAppendIndex(children, eventTop, offsetY);
                var el = '';
                var option = '';
                // var id = parseInt($('.questions-box').attr('data-count')) + 1;
                var id;
                var type = $(ui.draggable).attr('data-type');
                var pollid = $('#quiz-id').val();
                // if(type && pollid){
                //     AddQuestion(type, Math.floor(Math.random() * 100000), appendInde);
                // }
                if(type && pollid){
                    $.ajax ({
                        type: 'POST',
                        url: "/admin/poll/create-question",
                        dataType: "json",
                        data: { 
                            questiontype: type,
                            quizid: pollid
                        },
                    }).done(function (data) {
                        // данные сохранены
                        AddQuestion(type, data, appendInde);
                        console.log('Вопрос создан');
                    }).fail(function (data) {
                        // не удалось выполнить запрос к серверу
                        console.log(data);
                        console.log('Запрос не принят');
                    });
                }
            }
        });
        

        ///drag and drop on mobile

        // if($( window ).width() < 768){
        //     document.addEventListener('DOMContentLoaded', (event) => {
        //         function handleDragStart(e) {
        //           this.style.opacity = '0.4';
        //         }
        //         function handleDragEnd(e) {
        //           this.style.opacity = '1';
              
        //           items.forEach(function (item) {
        //             item.classList.remove('over');
        //           });
        //         }
        //         function handleDragOver(e) {
        //           if (e.preventDefault) {
        //             e.preventDefault();
        //           }
        //           return false;
        //         }
        //         function handleDragEnter(e) {
        //           this.classList.add('over');
        //         }
        //         function handleDragLeave(e) {
        //           this.classList.remove('over');
        //         }
        //         let items = document.querySelectorAll('.container .box');
        //         items.forEach(function(item) {
        //           item.addEventListener('dragstart', handleDragStart, false);
        //           item.addEventListener('dragover', handleDragOver, false);
        //           item.addEventListener('dragenter', handleDragEnter, false);
        //           item.addEventListener('dragleave', handleDragLeave, false);
        //           item.addEventListener('dragend', handleDragEnd, false);
        //         });
        //       });
        // }

        function AddQuestion(type, id, appendInde){
            if (type === "single"){
                el =
                '<div class="question active"  data-optionId="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name" id="questionName_'+ id +'">'
                +'        Вопрос '
                +'    </div>'
                +'    <div class="answer flex-50" id="questionanswers_'+ id +'">'
                +'        <div class="form-group" id="questionformAnswer_'+ id +'_1">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_1">'
                +'            <label id="questionpointsanswer_'+ id +'_1" for="questionanswer_'+ id +'_1">Вариант ответа</label>'
                +'        </div>'
                +'        <div class="form-group" id="questionformAnswer_'+ id + '_2">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_2">'
                +'            <label  id="questionpointsanswer_'+ id +'_2" for="questionanswer_'+ id +'_2">Вариант ответа</label>'
                +'       </div>'
                +'    </div>'
                +'</div>'
                ;
                option = 
                '<div class="optionbox active option_single" id="option_'+ id +'">'
                +'<input type="hidden" name="questiontype_'+ id +'" value="single" >'
                +'<input type="hidden"  class="orderinput" name="questionorder_'+ id +'" value="'+ id +'" >'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside">'
                +'        <div class="filerow">'
                +'            <div class="uploadpicture">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                    value="image">'
                +'            </div>'
                +'            <input class="uploadpictureinput" type="file"'
                +'                name="uploadimage_'+ id +'[]" multiple="multiple"'
                +'                accept="image/x-png,image/gif,image/jpeg">'
                +'            <div class="uploadvideo">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                    value="video">'
                +'            </div>'
                +'            <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'" id="uploadvideo_'+ id +'"'
                +'            accept="video/mp4,video/x-m4v,video/*">'
                +'            <div class="uploadaudio">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_3"'
                +'                    value="audio">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'        <div class="form-group">'
                +'            <label for="question_'+ id +'">Вопрос</label>'
                +'            <textarea class="question_name" name="question_'+ id +'" id="question_'+ id +'" placeholder="Введите вопрос"></textarea>'
                +'        </div>'
                +'        <div class="form-group spinner-wrapper">'
                +'           <label for="number_'+ id +'">Колличество пунктов </label>'
                +'           <input  class="question_number spinner" name="number_'+ id +'" id="number_'+ id +'" type="text" value="2">'
                +'       </div>'
                +'       <div class="form-group">'
                +'           <p>Варианты ответов</p>'
                +'           <div class="inputtables" id="inputtables_'+ id +'">'
                +'               <div class="questionPoint" id="questionPoint_'+ id +'_1">'
                +'                   <label for="inputpoint_'+ id +'_1">1</label>'
                +'                   <input class="question_points" name="inputpoint_'+ id +'_1" id="inputpoint_'+ id +'_1" type="text" placeholder="Вариант ответа">'
                +'               </div>'
                +'               <div class="questionPoint" id=" questionPoint_'+ id +'_2">'
                +'                   <label for="inputpoint_'+ id +'_2">2</label>'
                +'                   <input class="question_points" name="inputpoint_'+ id +'_2" id="inputpoint_'+ id +'_2" type="text" placeholder="Вариант ответа">'
                +'               </div>'
                +'           </div>'
                +'       </div>'
                +'   </div>'
                +'</div>'
                ;
            }
            else if (type === "free"){
                el = 
                '<div class="question active"   data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name " id="questionName_'+ id +'">'
                +'        Вопрос'
                +'    </div>'
                +'    <div class="answer freeanswer" id="questionanswers_'+ id +'">'
                +'        <div class="form-group" id="questionformAnswer_'+ id +'_1">'
                +'            <input type="text" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_1" placeholder="Ваш ответ">'
                +'        </div>'
                +'    </div>'
                +'</div> ';
                option =
                '<div class="optionbox active option_single" id="option_'+ id +'">'
                +'<input type="hidden" name="questiontype_'+ id +'" value="free" >'
                +'<input type="hidden"  class="orderinput" name="questionorder_'+ id +'" value="'+ id +'" >'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside">'
                +'        <div class="filerow">'
                +'            <div class="uploadpicture">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                    value="image">'
                +'            </div>'
                +'            <input class="uploadpictureinput" type="file"'
                +'                name="uploadimage_'+ id +'[]" multiple="multiple"'
                +'                accept="image/x-png,image/gif,image/jpeg">'
                +'            <div class="uploadvideo">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                    value="video">'
                +'            </div>'
                +'            <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'" id="uploadvideo_'+ id +'"'
                +'            accept="video/mp4,video/x-m4v,video/*">'
                +'            <div class="uploadaudio">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_3"'
                +'                    value="audio">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'" checked="checked">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'<div class="form-group requiredtextcont">'
                +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение">Введите значение</textarea>'
                +'</div>'
                +'        <div class="form-group">'
                +'            <label for="question_'+ id +'">Вопрос</label>'
                +'            <textarea class="question_name" name="question_'+ id +'" id="question_'+ id +'" placeholder="Вопрос"></textarea>'
                +'        </div>'
                +'    </div>'
                +'</div>' ;
            }
            else if (type === "listfree"){
                el =
                '<div class="question active" data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name" id="questionName_'+ id +'">'
                +'        Вопрос'
                +'    </div>'
                +'    <div class="answer freeanswer" id="questionanswers_'+ id +'">'
                +'        <div class="form-group" id="questionformAnswer_'+ id +'_1">'
                +'            <input type="text" name="questionanswer_'+ id +'_1" id="questionanswer_'+ id +'_1" placeholder="Ваш ответ">'
                +'        </div>'
                +'        <div class="form-group" id="questionformAnswer_'+ id +'_2">'
                +'            <input type="text" name="questionanswer_'+ id +'_2" id="questionanswer_'+ id +'_2" placeholder="Ваш ответ">'
                +'        </div>'
                +'        <div class="form-group" id="questionformAnswer_'+ id +'_3">'
                +'            <input type="text" name="questionanswer_'+ id +'_3" id="questionanswer_'+ id +'_3" placeholder="Ваш ответ">'
                +'        </div>'
                +'    </div>'
                +'</div>';
                option =
                '<div class="optionbox active" id="option_'+ id +'">'
                +'<input type="hidden" name="questiontype_'+ id +'" value="listfree" >'
                +'<input type="hidden"  class="orderinput" name="questionorder_'+ id +'" value="'+ id +'" >'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside">'
                +'        <div class="filerow">'
                +'            <div class="uploadpicture">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                    value="image">'
                +'            </div>'
                +'            <input class="uploadpictureinput" type="file"'
                +'                name="uploadimage_'+ id +'[]" multiple="multiple"'
                +'                accept="image/x-png,image/gif,image/jpeg">'
                +'            <div class="uploadvideo">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                    value="video">'
                +'            </div>'
                +'            <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'" id="uploadvideo_'+ id +'"'
                +'            accept="video/mp4,video/x-m4v,video/*">'
                +'            <div class="uploadaudio">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_3"'
                +'                    value="audio">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'" checked="checked">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'<div class="form-group requiredtextcont">'
                +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение">Введите значение</textarea>'
                +'</div>'
                +'        <div class="form-group">'
                +'            <label for="question_'+ id +'">Вопрос</label>'
                +'            <textarea class="question_name" name="question_'+ id +'" id="question_3" placeholder="Введите вопрос"></textarea>'
                +'        </div>'
                +'        <div class="form-group spinner-wrapper">'
                +'            <label for="number_'+ id +'">Колличество пунктов </label>'
                +'            <input  class="freeanswer_number spinner" name="number_'+ id +'" id="number_'+ id +'" type="text" value="3">'
                +'        </div>'
                +'    </div>'
                +'</div>';
            }
            else if (type === 'branching') {
                el =
                '<div class="question branchingquestion active" data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'       <div class="name">Ветвление ответа</div>'
                +'    <div class="name " id="questionName_'+ id +'">'
                +'        Ветвление'
                +'    </div>'
                +'    <div class="answer flex-50" id="questionanswers_'+ id +'">'
                +'        <div class="form-group" id="questionformAnswer_'+ id +'_1">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_1">'
                +'            <label id="questionpointsanswer_'+ id +'_1" for="questionanswer_'+ id +'_1">Вариант ответа</label>'
                +'        </div>'
                +'        <div class="form-group" id="questionformAnswer_'+ id +'_2">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_2">'
                +'            <label  id="questionpointsanswer_'+ id +'_2" for="questionanswer_'+ id +'_2">Вариант ответа</label>'
                +'        </div>'
                +'    </div>'
                +'    <div class="hidden-question-list"></div>'
                +'</div>';
                option =
                '<div class="optionbox active" id="option_'+ id +'">'
                +'<input type="hidden" name="questiontype_'+ id +'" value="branching" >'
                +'<input type="hidden"  class="orderinput" name="questionorder_'+ id +'" value="'+ id +'" >'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside">'
                +'        <div class="filerow">'
                +'            <div class="uploadpicture">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                    value="image">'
                +'            </div>'
                +'            <input class="uploadpictureinput" type="file"'
                +'                name="uploadimage_'+ id +'[]" multiple="multiple"'
                +'                accept="image/x-png,image/gif,image/jpeg">'
                +'            <div class="uploadvideo">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                    value="video">'
                +'            </div>'
                +'            <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'" id="uploadvideo_'+ id +'"'
                +'            accept="video/mp4,video/x-m4v,video/*">'
                +'            <div class="uploadaudio">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_3"'
                +'                    value="audio">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'" checked="checked">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'<div class="form-group requiredtextcont">'
                +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение">Выберете значение</textarea>'
                +'</div>'
                +'        <div class="form-group">'
                +'            <label for="question_'+ id +'">Вопрос</label>'
                +'            <textarea class="question_name" name="question_'+ id +'" id="question_'+ id +'" placeholder="Введите вопрос"></textarea>'
                +'        </div>'
                +'        <div class="form-group spinner-wrapper">'
                +'            <label for="number_'+ id +'">Колличество пунктов </label>'
                +'            <input  class="question_number_branching spinner" name="number_'+ id +'" id="number_'+ id +'" type="text" value="2">'
                +'        </div>'
                +'        <div class="form-group">'
                +'            <p>Варианты ответов</p>'
                +'            <div class="inputtables" id="inputtables_'+ id +'">'
                +'                <div class="questionPoint" id="questionPoint_'+ id +'_1">'
                +'                    <label for="inputpoint_'+ id +'_1">1</label>'
                +'                    <input class="branching_points" readonly name="inputpoint_'+ id +'_1" id="inputpoint_'+ id +'_1" type="text" placeholder="Вариант ответа">'
                +'                    <div class="branching-btn"></div>'
                +'                    <div class="branching-list">'
                +'                    </div>'
                +'                </div>'
                +'                <div class="questionPoint" id="questionPoint_'+ id +'_2">'
                +'                    <label for="inputpoint_'+ id +'_2">2</label>'
                +'                    <input class="branching_points" readonly name="inputpoint_'+ id +'_2" id="inputpoint_'+ id +'_2" type="text" placeholder="Вариант ответа">'
                +'                    <div class="branching-btn"></div>'
                +'                    <div class="branching-list">'
                +'                    </div>'
                +'                </div>'
                +'           </div>'
                +'        </div>'
                +'    </div>'
                +'</div>';
            }
            else if (type === "scale"){
                el =
                '<div class="question active" data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name " id="questionName_'+ id +'">'
                +'        Вопрос'
                +'    </div>'
                +'<div class="answer answer-ratings5" id="questionanswers_'+ id +'">'
                +'    <div class="radio-wrapper">'
                +'        <div class="radio-cont">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_1" value="1">'
                +'            <label for="questionanswer_'+ id +'_1">'
                +'                <div class="number">1</div>'
                +'               <div class="text"> '
                +'                </div>'
                +'            </label>'
                +'        </div>'
                +'        <div class="radio-cont">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_2" value="2">'
                +'            <label for="questionanswer_'+ id +'_2">'
                +'                <div class="number">2</div>'
                +'                <div class="text"> '
                +'                </div>'
                +'            </label>'
                +'        </div>'
                +'        <div class="radio-cont">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_3" value="3">'
                +'            <label for="questionanswer_'+ id +'_3">'
                +'                <div class="number">3</div>'
                +'                <div class="text"> '
                +'                </div>'
                +'            </label>'
                +'        </div>'
                +'        <div class="radio-cont">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_4" value="4">'
                +'            <label for="questionanswer_'+ id +'_4">'
                +'                <div class="number">4</div>'
                +'                <div class="text"> '
                +'                </div>'
                +'            </label>'
                +'        </div>'
                +'        <div class="radio-cont">'
                +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_5" value="5">'
                +'            <label for="questionanswer_'+ id +'_5">'
                +'                <div class="number">5</div>'
                +'                <div class="text"> '
                +'                </div>'
                +'            </label>'
                +'        </div>'
                +'    </div>'
                +'</div>'
                +'</div> ';
                option = 
                '<div class="optionbox active" id="option_'+ id +'">'
                +'<input type="hidden" name="questiontype_'+ id +'" value="scale" >'
                +'<input type="hidden"  class="orderinput" name="questionorder_'+ id +'" value="'+ id +'" >'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside">'
                +'        <div class="filerow">'
                +'            <div class="uploadpicture">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                    value="image">'
                +'            </div>'
                +'            <input class="uploadpictureinput" type="file"'
                +'                name="uploadimage_'+ id +'[]"  multiple="multiple"'
                +'                accept="image/x-png,image/gif,image/jpeg">'
                +'            <div class="uploadvideo">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                    value="video">'
                +'            </div>'
                +'            <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'" id="uploadvideo_'+ id +'"'
                +'            accept="video/mp4,video/x-m4v,video/*">'
                +'            <div class="uploadaudio">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_3"'
                +'                    value="audio">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'" checked="checked">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'<div class="form-group requiredtextcont">'
                +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение">Выберете значение</textarea>'
                +'</div>'
                +'            <div class="multityperow">'
                +'                <div class="namelabel">'
                +'                    Ветвление ответа'
                +'                </div>'
                +'              <label class="switch" for="branchingonoff_'+ id +'">'
                +'                  <input type="checkbox" class="brnachingonoff"'
                +'                      name="branchingonoff_'+ id +'" id="branchingonoff_'+ id +'">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'        <div class="form-group">'
                +'            <label for="question_'+ id +'">Вопрос</label>'
                +'            <textarea class="question_name" name="question_'+ id +'" id="question_'+ id +'" placeholder="Введите вопрос"></textarea>'
                +'        </div>'
                +'        <div class="scale-option">'
                +'            <div class="form-group">'
                +'                <p>Шкала оценок</p>'
                +'                <div class="scale-radio">'
                +'                    <input type="radio" name="typescale_'+ id +'" id="typescale_'+ id +'_1" value="1">'
                +'                    <label for="typescale_'+ id +'_1" class="scalelabel">'
                +'                        <div class="colorstars"></div>'
                +'                    </label>'
                +'                    <input type="radio" name="typescale_'+ id +'" id="typescale_'+ id +'_2" value="2">'
                +'                    <label for="typescale_'+ id +'_2" class="scalelabel ">'
                +'                        <div class="stars5"></div>'
                +'                   </label>'
                +'                    <input type="radio" name="typescale_'+ id +'" id="typescale_'+ id +'_3" value="3">'
                +'                    <label for="typescale_'+ id +'_3" class="scalelabel">'
                +'                        <div class="stars10"></div>'
                +'                    </label>'
                +'                    <input type="radio" name="typescale_'+ id +'" id="typescale_'+ id +'_4" value="4">'
                +'                    <label for="typescale_'+ id +'_4" class="scalelabel">'
                +'                        <div class="ratings10"></div>'
                +'                    </label>'
                +'                    <input type="radio" name="typescale_'+ id +'" id="typescale_'+ id +'_5" value="5" checked="checked">'
                +'                    <label for="typescale_'+ id +'_5" class="scalelabel">'
                +'                        <div class="ratings5">'
                +'                            <div class="circles">'
                +'                                <div class="cirle">1</div>'
                +'                                <div class="cirle">2</div>'
                +'                                <div class="cirle">3</div>'
                +'                                <div class="cirle">4</div>'
                +'                                <div class="cirle">5</div>'
                +'                            </div>'
                +'                            <div class="ratinstables">'
                +'                                <div class="cirlce-group">'
                +'                                    <div class="circle">1</div>'
                +'                                    <input type="text" name="inputpoint_'+ id +'_1" id="scaleRating5_'+ id +'_1" placeholder="Введите текст">'
                +'                               </div>'
                +'                                <div class="cirlce-group">'
                +'                                    <div class="circle">2</div>'
                +'                                    <input type="text" name="inputpoint_'+ id +'_2" id="scaleRating5_'+ id +'_2" placeholder="Введите текст">'
                +'                                </div>'
                +'                                <div class="cirlce-group">'
                +'                                    <div class="circle">3</div>'
                +'                                    <input type="text" name="inputpoint_'+ id +'_3" id="scaleRating5_'+ id +'_3" placeholder="Введите текст">'
                +'                                </div>'
                +'                                <div class="cirlce-group">'
                +'                                    <div class="circle">4</div>'
                +'                                    <input type="text" name="inputpoint_'+ id +'_4" id="scaleRating5_'+ id +'_4" placeholder="Введите текст">'
                +'                                </div>'
                +'                                <div class="cirlce-group">'
                +'                                    <div class="circle">5</div>'
                +'                                    <input type="text" name="inputpoint_'+ id +'_5" id="scaleRating5_'+ id +'_5" placeholder="Введите текст">'
                +'                                </div>'
                +'                           </div>'
                +'                       </div>'
                +'                    </label>'
                +'                </div>'
                +'            </div>'
                +'        </div>'
                +'    </div>'
                +'</div>';
            }
            else if (type === "dropdown"){
                el = 
                '<div class="question active" data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name " id="questionName_'+ id +'">'
                +'        Вопрос'
                +'    </div>'
                +'    <div class="answer" id="questionanswers_'+ id +'">'
                +'        <div class="dropdownanswer">'
                +'            <div class="selectdropdown">'
                +'                <select name="questionanswersdrp_'+ id +'" class="customselect">'
                +'                    <option value="Ответ">Ответ</option>'
                +'                    <option value="Ответ">Ответ</option>'
                +'                    <option value="Ответ">Ответ</option>'
                +'                </select> '
                +'            </div>'
                +'        </div>'
                +'   </div>'
                +'</div>';
                option =
                '<div class="optionbox active" id="option_'+ id +'">'
                +'    <input type="hidden" name="questiontype_'+ id +'" value="dropdown" >'
                +'    <input type="hidden"  class="orderinput" name="questionorder_'+ id +'" value="'+ id +'" >'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside ">'
                +'        <div class="filerow">'
                +'            <div class="uploadpicture">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                    value="image">'
                +'            </div>'
                +'            <input class="uploadpictureinput" type="file"'
                +'                name="uploadimage_'+ id +'[]"  multiple="multiple"'
                +'                accept="image/x-png,image/gif,image/jpeg">'
                +'            <div class="uploadvideo">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                    value="video">'
                +'            </div>'
                +'            <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'" id="uploadvideo_'+ id +'"'
                +'            accept="video/mp4,video/x-m4v,video/*">'
                +'            <div class="uploadaudio">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_3"'
                +'                    value="audio">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'" checked="checked">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'<div class="form-group requiredtextcont">'
                +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение">Выберете значение</textarea>'
                +'</div>'
                +'        <div class="dropdown-options">'
                +'        <div class="form-group">'
                +'            <label for="question_'+ id +'">Вопрос</label>'
                +'            <textarea class="question_name" name="question_'+ id +'" id="question_'+ id +'" placeholder="Введите вопрос"></textarea>'
                +'        </div>'
                +'            <div class="top-row">'
                +'                <div class="namelabel">Вопросы</div>'
                +'                <div class="add-dropdown"></div>'
                +'            </div>'
                +'            <div class="optionsdropdownlist">'
                +'                <div class="option-group">'
                +'                    <div class="inputstables">'
                +'                        <textarea class="dropdown-question" name="inputpoint_'+ id +'_1" id="inputpoint_'+ id +'_1" placeholder="Введите ответ"></textarea>'
                +'                    </div>'
                +'                    <div class="remove-dropdown"></div>'
                +'                </div>'
                +'                <div class="option-group">'
                +'                    <div class="inputstables">'
                +'                        <textarea class="dropdown-question" name="inputpoint_'+ id +'_2" id="inputpoint_'+ id +'_2"  placeholder="Введите ответ"></textarea>'
                +'                    </div>'
                +'                    <div class="remove-dropdown"></div>'
                +'                </div>'
                +'                <div class="option-group">'
                +'                    <div class="inputstables">'
                +'                        <textarea class="dropdown-question" name="inputpoint_'+ id +'_3" id="inputpoint_'+ id +'_3"  placeholder="Введите ответ"></textarea>'
                +'                    </div>'
                +'                    <div class="remove-dropdown"></div>'
                +'                </div>'
                +'            </div>'
                +'        </div>'
                +'    </div>'
                +'</div>'
                ;
            }
            else if (type === "dropdownmt"){
                el =
                '<div class="question active" data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name " id="questionName_'+ id +'"> Вопрос </div>'
                +'    <div class="answer" id="questionanswers_'+ id +'">'
                +'        <div class="multipleanswer">'
                +'            <div class="item"><div class="value">Ответ 1</div></div>'
                +'            <div class="item"><div class="value">Ответ 2</div></div>'
                +'        </div>'
                +'    </div>'
                +'</div>';
                option = 
                '<div class="optionbox active" id="option_'+ id +'">'
                +'    <input type="hidden" name="questiontype_'+ id +'" value="dropdownmultiple" >'
                +'    <input type="hidden"  class="orderinput" name="questionorder_'+ id +'" value="'+ id +'" >'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside ">'
                +'        <div class="filerow">'
                +'            <div class="uploadpicture">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                    value="image">'
                +'            </div>'
                +'            <input class="uploadpictureinput" type="file"'
                +'                name="uploadimage_'+ id +'[]" multiple'
                +'                accept="image/x-png,image/gif,image/jpeg">'
                +'            <div class="uploadvideo">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                    value="video">'
                +'            </div>'
                +'            <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'" id="uploadvideo_'+ id +'"'
                +'            accept="video/mp4,video/x-m4v,video/*">'
                +'            <div class="uploadaudio">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_3"'
                +'                    value="audio">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'" checked="checked">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'<div class="form-group requiredtextcont">'
                +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение">Выберете значение</textarea>'
                +'</div>'
                +'        <div class="dropdown-options">'
                +'           <div class="form-group">'
                +'              <label for="question_'+ id +'">Вопрос</label>'
                +'              <textarea class="question_name" name="question_'+ id +'" id="question_'+ id +'" placeholder="Введите вопрос"></textarea>'
                +'          </div>'
                +'          <div class="top-row">'
                +'              <div class="namelabel">Ответы</div>'
                +'              <div class="add-multiple"></div>'
                +'          </div>'
                +'          <div class="optionsdropdownlist">'
                +'              <div class="option-group">'
                +'                  <div class="inputstables">'
                +'                      <textarea class="multiple-question" name="inputpoint_'+ id +'_1" id="inputpoint_'+ id +'_1" placeholder="Введите ответ">Ответ 1</textarea>'
                +'                  </div>'
                +'                  <div class="remove-multiple"></div>'
                +'              </div>'
                +'              <div class="option-group">'
                +'                  <div class="inputstables">'
                +'                      <textarea class="multiple-question" name="inputpoint_'+ id +'_2" id="inputpoint_'+ id +'_2" placeholder="Введите ответ">Ответ 2</textarea>'
                +'                  </div>'
                +'                  <div class="remove-multiple"></div>'
                +'              </div>'
                +'          </div>'
                +'      </div>'
                +'    </div>'
                +'</div>';
            }
            if (type === 'matrix') {
                el =
                '<div class="question active" data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name " id="questionName_'+ id +'">'
                +'        Вопрос'
                +'    </div>'
                +'    <div class="description " id="questiondescription_'+ id +'">'
                +'        Описание'
                +'    </div>'
                +'    <div class="answer" id="questionanswers_'+ id +'">'
                +'        <div class="matrix-table">'
                +'            <div class="first-row">'
                +'                <div class="empty col"></div>'
                +'                <div class="col">'
                +'                    <div class="value">1</div>'
                +'               </div>'
                +'               <div class="col">'
                +'                    <div class="value">2</div>'
                +'               </div>'
                +'           </div>'
                +'           <div class="matrix-row">'
                +'               <div class="col first-col">'
                +'                   <div class="value">Текст</div>'
                +'               </div>'
                +'               <div class="col">'
                +'                   <input type="radio" name="answermatrix_'+ id +'_1"  id="answermatrix_'+ id +'_1_1">'
                +'                   <label for="answermatrix_'+ id +'_1_1">'
                +'                   </label>'
                +'               </div>'
                +'               <div class="col">'
                +'                   <input type="radio" name="answermatrix_'+ id +'_1"  id="answermatrix_'+ id +'_1_2">'
                +'                   <label for="answermatrix_'+ id +'_1_2">'
                +'                   </label>'
                +'               </div>'
                +'           </div>'
                +'           <div class="matrix-row">'
                +'                <div class="col first-col">'
                +'                   <div class="value">Текст</div>'
                +'               </div>'
                +'               <div class="col">'
                +'                   <input type="radio" name="answermatrix_'+ id +'_2"  id="answermatrix_'+ id +'_2_1">'
                +'                   <label for="answermatrix_'+ id +'_2_1">'
                +'                   </label>'
                +'                </div>'
                +'               <div class="col">'
                +'                   <input type="radio" name="answermatrix_'+ id +'_2"  id="answermatrix_'+ id +'_2_2">'
                +'                   <label for="answermatrix_'+ id +'_2_2">'
                +'                   </label>'
                +'               </div>'
                +'           </div>'
                +'       </div>'
                +'   </div>'
                +'</div>';
                option =
                '<div class="optionbox active" id="option_'+ id +'">'
                +'    <input type="hidden" name="questiontype_'+ id +'" value="matrix">'
                +'    <input type="hidden" class="orderinput" name="questionorder_'+ id +'" value="'+ id +'">'
                +'    <div class="header-aside">'
                +'       Настройки'
                +'   </div>'
                +'   <div class="text-aside ">'
                +'        <div class="filerow">'
                +'            <div class="uploadpicture">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                    value="image">'
                +'            </div>'
                +'            <input class="uploadpictureinput" type="file"'
                +'                name="uploadimage_'+ id +'[]"  multiple'
                +'                accept="image/x-png,image/gif,image/jpeg">'
                +'            <div class="uploadvideo">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                    value="video">'
                +'            </div>'
                +'            <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'" id="uploadvideo_'+ id +'"'
                +'            accept="video/mp4,video/x-m4v,video/*">'
                +'            <div class="uploadaudio">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_3"'
                +'                    value="audio">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'" checked="checked">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'<div class="form-group requiredtextcont">'
                +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение">Выберете значение</textarea>'
                +'</div>'
                +'      <div class="matrix-options">'
                +'          <div class="multityperow">'
                +'              <div class="namelabel">'
                +'                  Множественный выбор'
                +'              </div>'
                +'              <label class="switch" for="matrix_'+ id +'">'
                +'                  <input type="checkbox" class="matrixtype"'
                +'                      name="matrix_'+ id +'" id="matrix_'+ id +'">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'          <div class="form-group">'
                +'              <label for="question_'+ id +'">Вопрос</label>'
                +'              <textarea class="question_name" name="question_'+ id +'" id="question_'+ id +'" placeholder="Введите вопрос"></textarea>'
                +'          </div>'
                +'          <div class="form-group">'
                +'              <label for="questiondescription_'+ id +'">Доп. описание</label>'
                +'              <textarea class="question_description" name="questiondescription_'+ id +'" id="questiondescription_'+ id +'" placeholder="Введите описание"></textarea>'
                +'          </div>'
                +'          <div class="form-group">'
                +'              <p>Ответы</p>'
                +'              <div class="rowslist">'
                +'                  <div class="row-item">'
                +'                      <input type="text" name="inputpoint_'+ id +'_1" id="inputpoint_'+ id +'_1" placeholder="Введите текст">'
                +'                      <div class="edit-menu">'
                +'                          <div class="menu-dots"></div>'
                +'                          <div class="menu-list">'
                +'                              <div class="add-row addmatrixrow"></div>'
                +'                              <div class="delete-row deletematrixrow"></div>'
                +'                          </div>'
                +'                      </div>'
                +'                  </div>'
                +'                  <div class="row-item">'
                +'                      <input type="text" name="inputpoint_'+ id +'_2" id="inputpoint_'+ id +'_2" placeholder="Введите текст">'
                +'                      <div class="edit-menu">'
                +'                          <div class="menu-dots"></div>'
                +'                          <div class="menu-list">'
                +'                              <div class="add-row addmatrixrow"></div>'
                +'                              <div class="delete-row deletematrixrow"></div>'
                +'                          </div>'
                +'                      </div>'
                +'                  </div>'
                +'              </div>'
                +'          </div>'
                +'            <div class="form-group">'
                +'               <p>Колонки</p>'
                +'              <div class="rowslist2">'
                +'                  <div class="row-item">'
                +'                      <input type="text" name="inputrow_'+ id +'_1" id="inputrow_'+ id +'_1" value="1">'
                +'                      <div class="edit-menu">'
                +'                          <div class="menu-dots"></div>'
                +'                          <div class="menu-list">'
                +'                              <div class="add-row addmatrixrow2"></div>'
                +'                              <div class="delete-row deletematrixrow2"></div>'
                +'                          </div>'
                +'                      </div>'
                +'                  </div>'
                +'                  <div class="row-item">'
                +'                      <input type="text" name="inputrow_'+ id +'_2" id="inputrow_'+ id +'_2" value="2">'
                +'                      <div class="edit-menu">'
                +'                          <div class="menu-dots"></div>'
                +'                          <div class="menu-list">'
                +'                              <div class="add-row addmatrixrow2"></div>'
                +'                              <div class="delete-row deletematrixrow2"></div>'
                +'                          </div>'
                +'                      </div>'
                +'                  </div>'
                +'              </div>'
                +'          </div>'
                +'          <div class="matrix-btn-row">'
                +'              <div class="addmatrixrow add-btn">'
                +'                  <div class="icon-add">'
                +'                  </div>'
                +'                  Добавить строку'
                +'              </div>'
                +'              <div class="addmatrixrow2 add-btn">'
                +'                  <div class="icon-add">'
                +'                  </div>'
                +'                  Добавить колонки'
                +'              </div>'
                +'          </div>'
                +'      </div>'
                +'  </div>'
                +'</div>';
            }
            if (type === 'ranging') {
                el =
                '<div class="question" data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name " id="questionName_'+ id +'">'
                +'        Вопрос'
                +'    </div>'
                +'    <div class="description " id="questiondescription_'+ id +'">'
                +'        Описание'
                +'    </div>'
                +'    <div class="answer" id="questionanswers_'+ id +'">'
                +'        <div class="ranging-list">'
                +'            <div class="rangint-item">'
                +'                <input type="hidden" name="rangingorder_'+ id +'_1" value="1">'
                +'                <div class="arrows">'
                +'                    <div class="item-up"></div>'
                +'                    <div class="item-down"></div>'
                +'                </div>'
                +'                <div class="text">'
                +'                    Текст'
                +'                </div>'
                +'            </div>'
                +'        </div>'
                +'    </div>'
                +'</div>';
                option = 
                '<div class="optionbox" id="option_'+ id +'">'
                +'   <input type="hidden" name="questiontype_'+ id +'" value="ranging">'
                +'    <input type="hidden" class="orderinput" name="questionorder_'+ id +'" value="'+ id +'">'
                +'    <div class="header-aside">'
                +'      Настройки'
                +'  </div>'
                +'  <div class="text-aside ">'
                +'      <div class="filerow">'
                +'          <div class="uploadpicture">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                  value="image">'
                +'          </div>'
                +'          <input class="uploadpictureinput" type="file" name="uploadimage_'+ id +'"'
                +'              multiple accept="image/x-png,image/gif,image/jpeg">'
                +'          <div class="uploadvideo">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="video">'
                +'          </div>'
                +'          <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'"'
                +'              id="uploadvideo_'+ id +'" accept="video/mp4,video/x-m4v,video/*">'
                +'          <div class="uploadaudio">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="audio">'
                +'          </div>'
                +'          <input class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'"'
                +'              id="uploadaudio_'+ id +'" accept="audio/*">'
                +'          <div class="uploadtext">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="text">'
                +'          </div>'
                +'      </div>'
                +'      <div class="ranging-options">'
                +'          <div class="form-group">'
                +'              <label for="question_'+ id +'">Вопрос</label>'
                +'              <textarea class="question_name" name="question_'+ id +'" id="question_'+ id +'" placeholder="Введите вопрос"></textarea>'
                +'          </div>'
                +'          <div class="form-group">'
                +'              <label for="questiondescription_'+ id +'">Доп. описание</label>'
                +'              <textarea class="question_description" name="questiondescription_'+ id +'" id="questiondescription_'+ id +'" placeholder="Введите описание"></textarea>'
                +'          </div>'
                +'          <div class="form-group">'
                +'              <p>Ответы</p>'
                +'              <div class="rowslist">'
                +'                  <div class="row-item">'
                +'                      <input type="text" name="inputpoint_'+ id +'_1" id="inputpoint_'+ id +'_1" placeholder="Введите текст">'
                +'                      <div class="edit-menu">'
                +'                          <div class="menu-dots"></div>'
                +'                          <div class="menu-list">'
                +'                              <div class="add-row addrangingrow"></div>'
                +'                              <div class="delete-row deleterangingrow"></div>'
                +'                          </div>'
                +'                      </div>'
                +'                  </div>'
                +'              </div>'
                +'          </div>'
                +'          <div class="ranging-btn-row">'
                +'              <div class="addrangingrow add-btn">'
                +'                  <div class="icon-add">'
                +'                  </div>'
                +'                  Добавить строку'
                +'              </div>'
                +'          </div>'
                +'      </div>'
                +'  </div>'
                +'</div>';
            }
            if (type === 'name') {
                el = 
                '<div class="question active" data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name " id="questionName_'+ id +'">'
                +'        Введите Ваше имя'
                +'    </div>'
                +'    <div class="answer" id="questionanswers_'+ id +'">'
                +'        <div class="name-answer">'
                +'            <div class="col-name">'
                +'                <label for="anwername_'+ id +'">Имя</label>'
                +'                <input type="text" name="anwername_'+ id +'" id="anwername_'+ id +'" value="Имя" placeholder="Имя">'
                +'            </div>'
                +'            <div class="col-name">'
                +'                <input type="text" name="anwername_'+ id +'" id="anwername_'+ id +'" placeholder="Отчество">'
                +'            </div>'
                +'            <div class="col-name">'
                +'                <input type="text" name="anwername_'+ id +'" id="anwername_'+ id +'"  placeholder="Фамилия">'
                +'            </div>'
                +'        </div>'
                +'    </div>'
                +'</div>';
                option =
                '<div class="optionbox active" id="option_'+ id +'">'
                +'   <input type="hidden" name="questiontype_'+ id +'" value="name">'
                +'    <input type="hidden" class="orderinput" name="questionorder_'+ id +'" value="'+ id +'">'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside ">'
                +'      <div class="filerow">'
                +'          <div class="uploadpicture">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                  value="image">'
                +'          </div>'
                +'          <input class="uploadpictureinput" type="file" name="uploadimage_'+ id +'"'
                +'              multiple accept="image/x-png,image/gif,image/jpeg">'
                +'          <div class="uploadvideo">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="video">'
                +'          </div>'
                +'          <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'"'
                +'              id="uploadvideo_'+ id +'" accept="video/mp4,video/x-m4v,video/*">'
                +'          <div class="uploadaudio">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="audio">'
                +'          </div>'
                +'          <input class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'"'
                +'              id="uploadaudio_'+ id +'" accept="audio/*">'
                +'          <div class="uploadtext">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="text">'
                +'          </div>'
                +'      </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'" checked="checked">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'<div class="form-group requiredtextcont">'
                +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение">Введите имя</textarea>'
                +'</div>'
                +'    </div>'
                +'</div>';
            }
            if (type === 'date') {
                el = 
                '<div class="question active" data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name " id="questionName_'+ id +'">'
                +'        Дата'
                +'    </div>'
                +'    <div class="answer" id="questionanswers_'+ id +'">'
                +'        <div class="date-answer">'
                +'            <div class="col-date">'
                +'                <input type="text" name="anwerdate_'+ id +'" id="anwerdate_'+ id +'"  placeholder="01.01.2020">'
                +'                <div class="icon-date"></div>'
                +'            </div>'
                +'        </div>'
                +'    </div>'
                +'</div>';
                option =
                '<div class="optionbox active" id="option_'+ id +'">'
                +'    <input type="hidden" name="questiontype_'+ id +'" value="date">'
                +'    <input type="hidden" class="orderinput" name="questionorder_'+ id +'" value="'+ id +'">'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside ">'
                +'      <div class="filerow">'
                +'          <div class="uploadpicture">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                  value="image">'
                +'          </div>'
                +'          <input class="uploadpictureinput" type="file" name="uploadimage_'+ id +'"'
                +'               multiple accept="image/x-png,image/gif,image/jpeg">'
                +'          <div class="uploadvideo">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="video">'
                +'          </div>'
                +'          <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'"'
                +'              id="uploadvideo_'+ id +'" accept="video/mp4,video/x-m4v,video/*">'
                +'          <div class="uploadaudio">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="audio">'
                +'          </div>'
                +'          <input class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'"'
                +'              id="uploadaudio_'+ id +'" accept="audio/*">'
                +'          <div class="uploadtext">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="text">'
                +'          </div>'
                +'      </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'" checked="checked">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'<div class="form-group requiredtextcont">'
                +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение">Введите дату</textarea>'
                +'</div>'
                +'    </div>'
                +'</div>';
            }
            if (type === 'email') {
                el = 
                '<div class="question active" data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name " id="questionName_'+ id +'">'
                +'        Введите Ваш E-mail'
                +'    </div>'
                +'    <div class="answer" id="questionanswers_'+ id +'">'
                +'        <div class="email-answer">'
                +'            <div class="col-email">'
                +'                <input type="text" name="answeremail_'+ id +'" id="answeremail_'+ id +'" placeholder="Email">'
                +'            </div>'
                +'        </div>'
                +'    </div>'
                +'</div>';
                option =
                '<div class="optionbox active" id="option_'+ id +'">'
                +'    <input type="hidden" name="questiontype_'+ id +'" value="email">'
                +'    <input type="hidden" class="orderinput" name="questionorder_'+ id +'" value="'+ id +'">'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside ">'
                +'      <div class="filerow">'
                +'          <div class="uploadpicture">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                  value="image">'
                +'          </div>'
                +'          <input class="uploadpictureinput" type="file" name="uploadimage_'+ id +'"'
                +'               multiple accept="image/x-png,image/gif,image/jpeg">'
                +'          <div class="uploadvideo">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="video">'
                +'          </div>'
                +'          <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'"'
                +'              id="uploadvideo_'+ id +'" accept="video/mp4,video/x-m4v,video/*">'
                +'          <div class="uploadaudio">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="audio">'
                +'          </div>'
                +'          <input class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'"'
                +'              id="uploadaudio_'+ id +'" accept="audio/*">'
                +'          <div class="uploadtext">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="text">'
                +'          </div>'
                +'      </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'" checked="checked">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'<div class="form-group requiredtextcont">'
                +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение">Введите электронную почту</textarea>'
                +'</div>'
                +'    </div>'
                +'</div>';
            }
            if (type === 'phone') {
                el = 
                '<div class="question active" data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name " id="questionName_'+ id +'">'
                +'        Введите Ваш номер телефона'
                +'    </div>'
                +'    <div class="answer" id="questionanswers_'+ id +'">'
                +'        <div class="phone-answer">'
                +'          <div class="col-phone">'
                +'                <div class="inputs">'
                +'                    <input class="code" type="text" name="answerphonecode_'+ id +'" id="answerphonecode_'+ id +'" value="+7" readonly>'
                +'                    <input class="phone" type="tel" name="answerphone_'+ id +'" id="answerphone_'+ id +'" maxlength="9">'
                +'               </div>'
                +'              <div class="lines">'
                +'                  <div class="line"></div>'
                +'                  <div class="line"></div>'
                +'                  <div class="line"></div>'
                +'              </div>'
                +'          </div>'
                +'      </div>'
                +'  </div>'
                +'</div>';
                option =
                '<div class="optionbox active" id="option_'+ id +'">'
                +'    <input type="hidden" name="questiontype_'+ id +'" value="phone">'
                +'    <input type="hidden" class="orderinput" name="questionorder_'+ id +'" value="'+ id +'">'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside ">'
                +'      <div class="filerow">'
                +'          <div class="uploadpicture">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                  value="image">'
                +'          </div>'
                +'          <input class="uploadpictureinput" type="file" name="uploadimage_'+ id +'"'
                +'               multiple accept="image/x-png,image/gif,image/jpeg">'
                +'          <div class="uploadvideo">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="video">'
                +'          </div>'
                +'          <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'"'
                +'              id="uploadvideo_'+ id +'" accept="video/mp4,video/x-m4v,video/*">'
                +'          <div class="uploadaudio">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="audio">'
                +'          </div>'
                +'          <input class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'"'
                +'              id="uploadaudio_'+ id +'" accept="audio/*">'
                +'          <div class="uploadtext">'
                +'              <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                  value="text">'
                +'          </div>'
                +'      </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'" checked="checked">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'<div class="form-group requiredtextcont">'
                +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение">Введите телефон</textarea>'
                +'</div>'
                +'        <div class="from-group">'
                +'            <p>Выберете страну</p>'
                +'      </div>'
                +'      <div class="form-group">'
                +'          <select name="telcountry_'+ id +'[]" class="customselect telcountry" multiple>'
                +'              <option value="ru" selected>Россия</option>'
                +'              <option value="by">Белоруссия</option>'
                +'              <option value="ua">Украина</option>'
                +'              <option value="kz">Казахстан</option>'
                +'              <option value="tj">Таджикистан  </option>'
                +'              <option value="tm">Туркменистан  </option>'
                +'              <option value="uz">Узбекистан  </option>'
                +'              <option value="kg">Киргизстан  </option>'
                +'              <option value="az">Азербайджан  </option>'
                +'              <option value="md">Молдова</option>'
                +'          </select> '
                +'      </div>'
                +'    </div>'
                +'</div>';
            }
            if (type === 'btn') {
                el = 
                '<div class="question" data-optionid="'+ id +'">'
                +'    <input type="hidden" name="questiontype_'+ id +'" value="btn">'
                +'    <input type="hidden" class="orderinput" name="questionorder_'+ id +'" value="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="answer" id="questionanswers_'+ id +'">'
                +'        <div class="btn-answer"'
                +'            style="text-align: center;">'
                +'           <button class="btn" type="submit"'
                +'                style="'
                +'                background: #F26126;'
                +'                width: 131px;'
                +'                height: 36px;'
                +'                border-radius: 30px;">'
                +'                Отправить'
                +'            </button>'
                +'        </div>'
                +'    </div>'
                +'</div>';
                option = 
                '<div class="optionbox" id="option_'+ id +'">'
                +'    <input type="hidden" name="questiontype_'+ id +'" value="btn">'
                +'    <input type="hidden" class="orderinput" name="questionorder_'+ id +'" value="'+ id +'">'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside ">'
                +'        <div class="btn-options">'
                +'            <div class="position">'
                +'                <div class="left">'
                +'                    <input type="radio" value="left" name="inputpoint_'+ id +'_1" id="inputpointposition_'+ id +'_1">'
                +'                    <label for="inputpointposition_'+ id +'_1">'
                +'                    </label>'
                +'                </div>'
                +'                <div class="center">'
                +'                    <input type="radio" value="center" name="inputpoint_'+ id +'_1" id="inputpointposition_'+ id +'_2" checked>'
                +'                    <label for="inputpointposition_'+ id +'_2">'
                +'                    </label>'
                +'                </div>'
                +'                <div class="right">'
                +'                    <input type="radio" value="right" name="inputpoint_'+ id +'_1" id="inputpointposition_'+ id +'_3">'
                +'                    <label for="inputpointposition_'+ id +'_3">'
                +'                    </label>'
                +'                </div>'
                +'            </div>'
                +'            <div class="row-options">'
                +'                <div class="optionbtngroup">'
                +'                    <label for="inputpoint_'+ id +'_2">W</label>'
                +'                    <input class="btnwidth" type="text"  name="inputpoint_'+ id +'_2"  id="inputpoint_2" value="131">'
                +'                    <div class="tooltip">Ширина</div>'
                +'                </div>'
                +'                <div class="optionbtngroup">'
                +'                    <label for="inputpoint_'+ id +'_3">H</label>'
                +'                    <input class="btnheight" type="text"  name="inputpoint_'+ id +'_3"  id="inputpoint_'+ id +'_3" value="36">'
                +'                    <div class="tooltip">Высота</div>'
                +'                </div>'
                +'            </div>'
                +'            <div class="row-options">'
                +'              <div class="optionbtngroup">'
                +'                  <label for="inputpoint_'+ id +'_7">'
                +'                      <div class="border"></div>'
                +'                  </label>'
                +'                  <input class="btnborderwidth" type="text"  name="inputpoint_'+ id +'_9"  id="inputpoint_'+ id +'_9" value="0">'
                +'                   <div class="tooltip">Ширина обводки</div>'
                +'              </div>'
                +'              <div class="optionbtngroup">'
                +'                  <label for="inputpoint_'+ id +'_8">'
                +'                      <div class="bordercolor"></div>'
                +'                  </label>'
                +'                  <input class="btnbordercolor" type="text"  name="inputpoint_'+ id +'_10"  id="inputpoint_'+ id +'_10" value="#ffffff" data-jscolor="">'
                +'                    <div class="tooltip">Цвет обводки</div>'
                +'              </div>'
                +'          </div>'
                +'            <div class="row-options">'
                +'                <div class="optionbtngroup">'
                +'                    <label for="inputpoint_'+ id +'_4">'
                +'                        <div class="radius"></div>'
                +'                    </label>'
                +'                    <input class="btnradius" type="text"  name="inputpoint_'+ id +'_4"  id="inputpoint_'+ id +'_4" value="30">'
                +'                    <div class="tooltip">Радиус скругления<br>(не больше половины высоты)</div>'
                +'                </div>'
                +'                <div class="optionbtngroup">'
                +'                    <label for="inputpoint_'+ id +'_5">'
                +'                        <div class="color"'
                +'                        style="background: #F26126"></div>'
                +'                    </label>'
                +'                   <input class="btncolor" type="text"  name="inputpoint_'+ id +'_6"  id="inputpoint_'+ id +'_6" value="#F26126" data-jscolor="">'
                +'                    <div class="tooltip">Цвет кнопки</div>'
                +'               </div>'
                +'           </div>'
                +'            <div class="row-options">'
                +'                <div class="optionbtngroup optionbtntextcolor">'
                +'                  <label for="inputpoint_'+ id +'_7">'
                +'                      <div class="color" style=" background-color: #F26126; color: #ffffff;">T</div>'
                +'                  </label>'
                // +'                  <input type="color" class="hiddeninput hiddeninputtextcolor" name="hiddeninputtextcolor_'+ id +'_7" value="#ffffff">'
                +'                  <input class="btntextcolor" type="text" name="inputpoint_'+ id +'_8" id="inputpoint_'+ id +'_8" value="#ffffff" data-jscolor="">'
                +'                    <div class="tooltip">Цвет текста</div>'
                +'              </div>'
                +'          </div>'
                +'           <div class="form-group">'
                +'               <label for="question_'+ id +'">Текст кнопки</label>'
                +'               <input class="btn_name" name="question_'+ id +'" id="question_'+ id +'" value="Отправить">'
                +'           </div>'
                +'       </div>'
                +'   </div>'
                +'</div>';
            }
            if (type === 'diapason') {
                el = 
                '<div class="question" data-optionid="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'  <div class="name " id="questionName_'+ id +'">'
                +'      Вопрос'
                +'  </div>'
                +'  <div class="description " id="questiondescription_'+ id +'">'
                +'      Описание'
                +'  </div>'
                +'  <div class="answer" id="questionanswers_'+ id +'">'
                +'      <div class="range-list">'
                +'          <div class="range-row">'
                +'              <div class="range-question">'
                +'                  Ответ'
                +'              </div>'
                +'              <div class="range">'
                +'                  <div class="label">'
                +'                      <div class="value"></div>'
                +'                  </div>'
                +'                  <div class="input-box">'
                +'                      <input class="input-range" name="range_'+ id +'_1" id="range_'+ id +'_1" type="range" min="0" max="10" step="1"/>'
                +'                      <div class="bar"></div>'
                +'                      <div class="bar-filled"></div>'
                +'                  </div>'
                +'              </div>'
                +'          </div>'
                +'      </div>'
                +'  </div>'
                +'</div>';
                option = 
                    '<div class="optionbox" id="option_'+ id +'">'
                    +'   <input type="hidden" name="questiontype_'+ id +'" value="diapason">'
                    +'  <input type="hidden" class="orderinput" name="questionorder_'+ id +'" value="'+ id +'">'
                    +'  <div class="header-aside">'
                    +'      Настройки'
                    +'  </div>'
                    +'  <div class="text-aside range-options">'
                    +'        <div class="filerow">'
                    +'            <div class="uploadpicture">'
                    +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                    +'                    value="image">'
                    +'            </div>'
                    +'            <input class="uploadpictureinput" type="file"'
                    +'                name="uploadimage_'+ id +'[]" multiple="multiple"'
                    +'                accept="image/x-png,image/gif,image/jpeg">'
                    +'            <div class="uploadvideo">'
                    +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                    +'                    value="video">'
                    +'            </div>'
                    +'            <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'" id="uploadvideo_'+ id +'"'
                    +'            accept="video/mp4,video/x-m4v,video/*">'
                    +'            <div class="uploadaudio">'
                    +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_3"'
                    +'                    value="audio">'
                    +'            </div>'
                    +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                    +'            accept="audio/*">'
                    +'            <div class="uploadtext">'
                    +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                    +'                    value="text">'
                    +'            </div>'
                    +'        </div>'
                    +'            <div class="requiredinput">'
                    +'              <div class="namelabel">'
                    +'                  Обязательно к заполнению'
                    +'              </div>'
                    +'              <label class="switch" for="required_'+ id +'">'
                    +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'" checked="checked">'
                    +'                  <span class="slider round"></span>'
                    +'              </label>'
                    +'          </div>'
                    +'<div class="form-group requiredtextcont">'
                    +'    <label for="requiredtext_'+ id + '">Сообщение при ошибке</label>'
                    +'  <textarea class="requiredtext" name="requiredtext_'+ id + '"'
                    +'      id="requiredtext_'+ id + '" placeholder="Введите сообщение">Выберете значение</textarea>'
                    +'</div>'
                    +'      <div class="form-group">'
                    +'          <label for="question_'+ id +'">Вопрос</label>'
                    +'          <textarea class="question_name" name="question_'+ id +'"'
                    +'              id="question_'+ id +'">Вопрос</textarea>'
                    +'      </div>'
                    +'      <div class="form-group">'
                    +'          <label for="questiondescription_1">Доп. описание</label>'
                    +'          <textarea class="question_description" name="questiondescription_'+ id +'"'
                    +'              id="questiondescription_'+ id +'">описание</textarea>'
                    +'      </div>'
                    +'      <div class="row-options row-color">'
                    +'          <div class="optiongroup">'
                    +'              <label for="color_'+ id +'_1">'
                    +'                  <div class="color" style="background: #563BC2;"></div>'
                    +'              </label>'
                    +'              <input class="rangecolor rangecolor1" type="text"  name="color_'+ id +'_1"  id="color_'+ id +'_1" value="#563BC2" data-jscolor="">'
                    +'          </div>'
                    +'          <div class="optionadd">'
                    +'              <div class="addranhecolor"></div>'
                    +'              <div class="tooltip">Добавить цвет</div>'
                    +'          </div>'
                    +'      </div>'
                    +'      <div class="row-options">'
                    +'          <div class="optiongroup">'
                    +'              <label for="rangemin_'+ id +'">MIN</label>'
                    +'              <input class="rangemin" type="text"  name="rangemin_'+ id +'"  id="rangemin_'+ id +'" value="0">'
                    +'              <div class="tooltip">Минимальное значение оценки</div>'
                    +'          </div>'
                    +'          <div class="optiongroup">'
                    +'              <label for="rangemax_'+ id +'">MAX</label>'
                    +'              <input class="rangemax" type="text"  name="rangemax_'+ id +'"  id="rangemax_'+ id +'" value="10">'
                    +'              <div class="tooltip">Максимальное значение оценки</div>'
                    +'          </div>'
                    +'      </div>'
                    +'      <div class="row-options">'
                    +'          <div class="optiongroup">'
                    +'              <label for="step_'+ id +'">STEP</label>'
                    +'              <input class="step" type="text"  name="step_'+ id +'"  id="step_'+ id +'" value="1">'
                    +'              <div class="tooltip">Шаг диапазона</div>'
                    +'          </div>'
                    +'          <div class="optiongroup">'
                    +'              <label for="textcolor_'+ id +'">'
                    +'                  <div class="color" style="background: #ffffff;"></div>'
                    +'              </label>'
                    +'              <input class="textcolor" type="text"  name="textcolor_'+ id +'"  id="textcolor_'+ id +'" value="#ffffff" data-jscolor="">'
                    +'              <div class="tooltip">Цвет текста</div>'
                    +'          </div>'
                    +'      </div>'
                    +'      <div class="dropdown-options">'
                    +'          <div class="top-row">'
                    +'              <div class="namelabel">Вопросы</div>'
                    +'              <div class="add-range"></div>'
                    +'          </div>'
                    +'          <div class="optionsdropdownlist">'
                    +'              <div class="option-group">'
                    +'                  <div class="inputstables">'
                    +'                      <textarea class="range-question" name="inputpoint_'+ id +'_1" placeholder="Введите ответ"'
                    +'                          id="inputpoint_'+ id +'_1"></textarea>'
                    +'                  </div>'
                    +'                  <div class="remove-rangin"></div>'
                    +'              </div>'
                    +'          </div>'
                    +'      </div>'
                    +'  </div>'
                    +'</div>';
            }
            if (type === 'singleBranching') {
                el =
                '<div class="question active"  data-optionId="'+ id +'">'
                +'    <div class="close-question"></div>'
                +'    <div class="name" id="questionName_'+ id +'">'
                +'        Вопрос '
                +'    </div>'
                +'       <div class="answer flex-30" id="questionanswers_'+ id +'">'
                +'          <div class="form-group" id="questionformAnswer_'+ id +'_1">'
                +'              <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_1">'
                +'              <label id="questionpointsanswer_'+ id +'_1" for="questionanswer_'+ id +'_1">'
                +'                  Ответ </label>'
                +'              </div>'
                +'          <div class="form-group" id="questionformAnswer_'+ id +'_2">'
                +'              <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_2">'
                +'              <label id="questionpointsanswer_'+ id +'_2" for="questionanswer_'+ id +'_2">'
                +'                  Ответ'
                +'              </label>'
                +'          </div>'
                +'      </div>'
                +'      <div class="subquestion branchingquestion" data-optionid="'+ id +'">'
                +'          <div class="name">Ветвление ответа</div>'
                +'          <div class="answer" id="questionbrnaching_'+ id +'">'
                +'              <div class="branching-group">'
                +'                  <div class="group-name">Ответ</div>'
                +'                  <div class="question-group">'
                +'                      <div class="branching-question">'
                +'                          <div class="name"> Вопрос </div>'
                +'                          <div class="hidden-question-answer">'
                +'                              <div class="form-group">'
                +'                                  <input type="text" name="hiddenquestionanswer_'+ id +'_1_1" id="hiddenquestionanswer_'+ id +'_1_1" placeholder="Ваш ответ">'
                +'                              </div>'
                +'                          </div>'
                +'                      </div>'
                +'                  </div>'
                +'              </div>'
                +'              <div class="branching-group">'
                +'                  <div class="group-name">Ответ</div>'
                +'                  <div class="question-group">'
                +'                      <div class="branching-question">'
                +'                          <div class="name"> Вопрос </div>'
                +'                          <div class="hidden-question-answer">'
                +'                              <div class="form-group">'
                +'                                  <input type="text" name="hiddenquestionanswer_'+ id +'_2_1" id="hiddenquestionanswer_'+ id +'_2_1" placeholder="Ваш ответ">'
                +'                              </div>'
                +'                          </div>'
                +'                      </div>'
                +'                  </div>'
                +'              </div>'
                +'          </div>'
                +'      </div>'
                +'</div>'
                ;
                option = 
                '<div class="optionbox active option_single" id="option_'+ id +'">'
                +'<input type="hidden" name="questiontype_'+ id +'" value="singleBranching" >'
                +'<input type="hidden"  class="orderinput" name="questionorder_'+ id +'" value="'+ id +'" >'
                +'    <div class="header-aside">'
                +'        Настройки'
                +'    </div>'
                +'    <div class="text-aside">'
                +'        <div class="filerow">'
                +'            <div class="uploadpicture">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_1"'
                +'                    value="image">'
                +'            </div>'
                +'            <input class="uploadpictureinput" type="file"'
                +'                name="uploadimage_'+ id +'[]" multiple="multiple"'
                +'                accept="image/x-png,image/gif,image/jpeg">'
                +'            <div class="uploadvideo">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_2"'
                +'                    value="video">'
                +'            </div>'
                +'            <input class="uploadvideoinput" type="file" name="uploadvideo_'+ id +'" id="uploadvideo_'+ id +'"'
                +'            accept="video/mp4,video/x-m4v,video/*">'
                +'            <div class="uploadaudio">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_3"'
                +'                    value="audio">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
                +'            <div class="requiredinput">'
                +'              <div class="namelabel">'
                +'                  Обязательно к заполнению'
                +'              </div>'
                +'              <label class="switch" for="required_'+ id +'">'
                +'                  <input type="checkbox" class="requiredonoff" name="required_'+ id +'" id="required_'+ id +'">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'          <div class="multityperow">'
                +'              <div class="namelabel"> Ветвление ответа </div>'
                +'              <label class="switch" for="branchingonoff_'+ id +'">'
                +'                  <input type="checkbox" class="brnachingonoff" name="branchingonoff_'+ id +'" id="branchingonoff_'+ id +'" checked="checked">'
                +'                  <span class="slider round"></span>'
                +'              </label>'
                +'          </div>'
                +'          <div class="form-group branchingoptionbox">'
                +'              <p>Вопросы ветвление</p>'
                +'              <div class="inputtables branchingForSingle" id="branchingtables_'+ id +'">'
                +'                  <div class="questionPoint" id="questionPoint_'+ id +'_1">'
                +'                      <input class="branching_points hidden" readonly="" name="groupname_'+ id +'_1" id="groupname_'+ id +'_1" type="text" value="Да">'
                +'                      <div class="branching_points_circle"></div>'
                +'                      <div class="branching-list">'
                +'                          <div class="branching-group">'
                +'                              <input type="text" name="branchingpoint_'+ id +'_1" id="branchingpoint_'+ id +'_1" placeholder="Введите вопрос">'
                +'                              <div class="add-multiplescalerow"></div>'
                +'                          </div>'
                +'                      </div>'
                +'                  </div>'
                +'                  <div class="questionPoint" id="questionPoint_'+ id +'_2">'
                +'                      <input class="branching_points hidden" readonly="" name="groupname_'+ id +'_2" id="groupname_'+ id +'_2" type="text" value="Нет">'
                +'                      <div class="branching_points_circle"></div>'
                +'                      <div class="branching-list">'
                +'                          <div class="branching-group">'
                +'                              <input type="text" name="branchingpoint_'+ id +'_2" id="branchingpoint_'+ id +'_2" placeholder="Введите вопрос">'
                +'                              <div class="add-multiplescalerow"></div>'
                +'                          </div>'
                +'                      </div>'
                +'                  </div>'
                +'              </div>'
                +'          </div>'
                +'        <div class="form-group">'
                +'            <label for="question_'+ id +'">Вопрос</label>'
                +'            <textarea class="question_name" name="question_'+ id +'" id="question_'+ id +'" placeholder="Введите вопрос"></textarea>'
                +'        </div>'
                +'        <div class="form-group spinner-wrapper">'
                +'           <label for="number_'+ id +'">Колличество пунктов </label>'
                +'           <input  class="question_number spinner" name="number_'+ id +'" id="number_'+ id +'" type="text" value="2">'
                +'       </div>'
                +'        <div class="multityperow">'
                +'          <div class="namelabel">Множественный выбор</div>'
                +'          <label class="switch" for="multionoff_'+ id +'">'
                +'              <input type="checkbox" class="multionoff" name="multionoff_'+ id +'" id="multionoff_'+ id +'">'
                +'              <span class="slider round"></span>'
                +'          </label>'
                +'      </div>'
                +'       <div class="form-group">'
                +'           <p>Варианты ответов</p>'
                +'           <div class="inputtables" id="inputtables_'+ id +'">'
                +'               <div class="questionPoint" id="questionPoint_'+ id +'_1">'
                +'                   <label for="inputpoint_'+ id +'_1">1</label>'
                +'                   <input class="question_points" name="inputpoint_'+ id +'_1" id="inputpoint_'+ id +'_1" type="text" placeholder="Вариант ответа">'
                +'               </div>'
                +'               <div class="questionPoint" id=" questionPoint_'+ id +'_2">'
                +'                   <label for="inputpoint_'+ id +'_2">2</label>'
                +'                   <input class="question_points" name="inputpoint_'+ id +'_2" id="inputpoint_'+ id +'_2" type="text" placeholder="Вариант ответа">'
                +'               </div>'
                +'           </div>'
                +'       </div>'
                +'   </div>'
                +'</div>'
                ;
            }
            var children = $('.questions-box').children();

            var childrenOptions = $('.optionsblock .eloptions').children();
            $('.questions-box .question').removeClass('active');
            $('.optionsblock .optionbox').removeClass('active');
            if( appendInde === 'last' ){
                $('.questions-box').append(el);
                $('.optionsblock .eloptions').append(option);
            }
            else if ( appendInde < 0 ) {
                $('.questions-box').prepend(el);
                $('.optionsblock .eloptions').prepend(option);
            }
            else {
                $(children[appendInde]).after( el );
                $(childrenOptions[appendInde]).after(option);
            }
            //scroll to element
            if($('.question[data-optionId='+ id +']')[0].offsetTop + 20 < $('.centerbox').scrollTop()){
                $('.centerbox').animate({
                    scrollTop: $('.question[data-optionId='+ id +']')[0].offsetTop - 100
                }, 2000);
            }
            if($('.question[data-optionId='+ id +']')[0].offsetTop + 20 > $('.centerbox').scrollTop() + $('.centerbox').height()){
                $('.centerbox').animate({
                    scrollTop: $('.question[data-optionId='+ id +']')[0].offsetTop - 100
                }, 2000);
            }
            $('.questions-box .ranging-list').sortable({});
            
            $( ".matrix_number" ).spinner({
                min: 0,
                max: 15,
                spin: function( event, ui ) {
                    var id = $(event.target).attr('name').split('_')[1];
                    var number = ui.value;
                    MatrixColChange(id, number);
                }
            });

            $( ".question_number" ).spinner({
                min: 0,
                max: 15,
                spin: function( event, ui ) {
                    var id = $(event.target).attr('name').split('_')[1];
                    var number = ui.value;
                    var questionPoints = $('#inputtables_' + id).find('.questionPoint');
                    questionPoints.each(function (index, question) {
                        if((index + 1) > number) {
                            $(question).remove();
                        }
                    });
                    var currentId = questionPoints.length
                    if(number > questionPoints.length){
                        while (currentId != number){
                            currentId++;
                            var newQuestion = 
                            '<div class="questionPoint" id="questionPoint_'+ id + '_' + currentId +'">'
                            +'    <label for="inputpoint_'+ id + '_' + currentId +'">'+ currentId +'</label>'
                            +'    <input class="question_points" name="inputpoint_'+ id + '_' + currentId +'" id="inputpoint_'+ id + '_' + currentId +'" type="text" placeholder="Вариант ответа">'
                            +'</div>';
                            $(newQuestion).appendTo($('#inputtables_' + id));
                        }
                    }
                    SetPointOfQuestion(id, number);
                }
            });


            $( ".question_number_branching" ).spinner({
                min: 2,
                max: 5,
                spin: function( event, ui ) {
                    var id = $(event.target).attr('name').split('_')[1];
                    var number = ui.value;
                    var questionPoints = $('#branchingtables_' + id).find('.questionPoint');
                    questionPoints.each(function (index, question) {
                        if((index + 1) > number) {
                            $('#hiddenquestion_' + id + '_' + index).remove();
                            $(question).remove();
                        }
                    });
                    var currentId = questionPoints.length
                    if(number > questionPoints.length){
                        while (currentId != number){
                            currentId++;
                            var newQuestion = 
                            '<div class="questionPoint" id="questionPoint_'+ id + '_' + currentId +'">'
                            +'    <input class="branching_points" readonly name="groupname_'+ id + '_' + currentId +'" id="groupname_'+ id + '_' + currentId +'" type="text" placeholder="Вариант ответа">'
                            +'    <div class="branching-list">'
                            +'        <div class="branching-group">'
                            +'            <input type="text" name="branchingpoint_'+ id + '_' + currentId +'" id="branchingpoint_'+ id + '_' + currentId +'" placeholder="Введите вопрос">'
                            +'            <div class="add-multiplescalerow"></div>'
                            +'      </div>'
                            +'  </div>'
                            +'</div>';
                            $(newQuestion).appendTo($('#branchingtables_' + id));
                        }
                    }
                    SetPointOfQuestionBranching(id, number);
                }
            });
            $( ".freeanswer_number" ).spinner({
                min: 0,
                max: 15,
                spin: function( event, ui ) {
                    var id = parseInt($(event.target).attr('name').split('_')[1]);
                    var number = ui.value;
                    SetPointOfFreeQuestion(id, number);
                }
            });
            $('.date-answer input').datepicker();
            $('.phone-answer input.code').intlTelInput({
                initialCountry: "ru",
            });
            $('.questions-box').attr('data-count', i);
            customSelectActive();
            jscolor.install('.rightside');
            RefreshItems();
        }
        // delete question
        $('.questions-box').on('click', '.close-question', function(e){
            if($(this).parents('.subquestion').length>0){
                var optionId = '#option_' + $(this).parents('.subquestion').attr('data-optionid');
                $(optionId).find('.brnachingonoff').click();
            }
            else {
                if($(this).parents('.question').find('.subquestion').length>0){
                    var optionId = '#option_' + $(this).parents('.question').attr('data-optionid');
                    $(optionId).find('.brnachingonoff').click();
                }
                var optionId = '#option_' + $(this).parents('.question').attr('data-optionid');
                var id = parseInt($('.questions-box').attr('data-count')) - 1;
                $(optionId).remove();
                if($(this).parents('.question').hasClass('active')){
                    $('.optionsblock .default').addClass('active');
                }
                $(this).parents('.question').remove();
                $('.questions-box').attr('data-count', id);
    
                var deleteID = $(this).parents('.question').attr('data-optionid');
                $.ajax ({
                    type: 'POST',
                    url: "/admin/poll/delete-question",
                    dataType: "json",
                    data: { 
                        id: deleteID,
                    }
                }).done(function (data) {
                    // данные удалени
                    console.log('Вопрос удален');
                }).fail(function () {
                    // не удалось выполнить запрос к серверу
                    console.log('Запрос не принят');
                });
                RefreshItems();
            }
        });
        
        //activating question
        $('.questions-box').on('click', '.question', function(e){
            if(!$(e.target).hasClass('close-question') && !$(this).parents('.centerbox').hasClass('full-width')){
                var id = $(this).attr('data-optionid');
                $('.questions-box .question').removeClass('active');
                $('.optionsblock .optionbox').removeClass('active');
                $('.optionsblock .branchingoptionbox').removeClass('active');
                $(this).addClass('active');
                $('.optionsblock #option_' + id ).addClass('active');
            }
        });

        //activating subquestion
        // $('.questions-box').on('click', '.subquestion', function(e){
        //     if(!$(e.target).hasClass('close-question') && !$(this).parents('.centerbox').hasClass('full-width')){
        //         var id = $(this).attr('data-optionid');
        //         $('.questions-box .question').removeClass('active');
        //         $('.optionsblock .optionbox').removeClass('active');
        //         $('.optionsblock .branchingoptionbox').removeClass('active');
        //         $(this).addClass('active');
        //         $('.optionsblock #branchinoption_' + id ).addClass('active');
        //     }
        // });
        
        function getAppendIndex(arr, top, offsetY) {
            if( arr.length === 0 ) {
                return 'last';
            }
            else {
                for( var i = 0; i < arr.length; i++ ) {
                    var elTop = $(arr[i]).offset().top,
                        elBottom = $(arr[i]).offset().top + $(arr[i]).height() + 31,
                        height = $(arr[i]).height() + 31;
                    if( top > elTop + height && top < elBottom + offsetY ) {
                        return i;
                    }
                    else if(top > elTop && top < elBottom) {
                        return ( i - 1 );
                    }
                }
                return  arr.length - 1;
            }
        }

        function RefreshItems() {
            var childrenQuestions = $('.questions-box').find('.question');
            var childrenOptions = $('.optionsblock .eloptions').children();
            var prevId;
            var newId;
            if(parseInt($('.questions-box').attr('data-count'))>0){
                childrenQuestions.each(function (index, question) {
                    var id = index + 1;
                    if($('#option_'+$(question).attr('data-optionid')).length>0){
                        var questionId = $(question).attr('data-optionid');
                        $('#option_'+ questionId ).find('.orderinput').val(id);
                    }
                });
                var nodeList = childrenOptions;
                var itemsArray = [];
                if(nodeList[0]){
                    var parent = nodeList[0].parentNode;
                    for (var i = 0; i < nodeList.length; i++) {    
                        itemsArray.push(parent.removeChild(nodeList[i]));
                    }
                    itemsArray.sort(function(nodeA, nodeB) {
                        var idA = parseInt($(nodeA).find('.orderinput').val());
                        var idB = parseInt($(nodeB).find('.orderinput').val());
                        var numberA = parseInt(idA);
                        var numberB = parseInt(idB);
                        if (numberA < numberB) return -1;
                        if (numberA > numberB) return 1;
                        return 0;
                    })
                        .forEach(function(node) {
                        parent.appendChild(node)
                    });
                }
            }
        }
        $('.questions-box .ranging-list').sortable({});
        if($( window ).width() > 700) {
            $('.questions-box').sortable({
                deactivate: function (event, ui) {
                    RefreshItems();
                    $('.optionsblock .default').addClass('active');
                }
            });
        }
        //customselect
        customSelectActive();
        // RemoveOption($('.customselect'), 1);
        function RemoveOption(select, lenghtid){
            var id = $(select).find('option:nth-child(' + lenghtid + ')').attr('data-id');
            var $styledSelect = $(select).next('div.select-styled');
            $(select).find('option:nth-child(' + lenghtid + ')').remove();
            $(select).parents('.customselect-wrapper').find('ul li[data-id="'+ id + '"]').remove();
            if($(select).attr('multiple')){
                if($(select).find('option[data-id="'+ id + '"]:selected').length>0){
                    $styledSelect.html('Выберите ответ');
                }
            }
            else {
                if($(select).find('option[data-id="'+ id + '"]:selected').length==0){
                    $styledSelect.html('Выберите ответ');
                }
            }
        }
        function ChangeOption(select, lenghtid, value){
            var id = $(select).find('option:nth-child(' + lenghtid + ')').attr('data-id');
            var $styledSelect = $(select).next('div.select-styled');
            $(select).find('option:nth-child(' + lenghtid + ')').text(value);
            $(select).find('option:nth-child(' + lenghtid + ')').attr('value', value);
            if($(select).attr('multiple')){
                if($(select).parents('.customselect-wrapper').find('ul li[data-id="'+ id + '"] .checked').hasClass('active')){
                    $(select).parents('.customselect-wrapper').find('ul li[data-id="'+ id + '"] .text').html(value);
                    $styledSelect.find('[data-id="'+ id + '"]').html(value);
                }
                else {
                    $(select).parents('.customselect-wrapper').find('ul li[data-id="'+ id + '"] .text').html(value);
                }
            }
            else {
                $(select).parents('.customselect-wrapper').find('ul li[data-id="'+ id + '"]').html(value);
                if($(select).find('option[data-id="'+ id + '"]:selected').length>0){
                    $styledSelect.html(value);
                }
            }
            $(select).parents('.customselect-wrapper').find('ul li[data-id="'+ id + '"]').attr('rel', value);
        }
        function AddOption(select){
            var id = Math.floor(Math.random() * 100000);
            if($(select).attr('multiple')){
                $(select).append('<option value="" data-id="'+ id + '"></option>');
                $(select).parents('.customselect-wrapper').find('ul').append('<li rel="" data-id="'+ id + '"><div class="checked"></div><div class="text">Ответ</div></li>');
                var $styledSelect = $(select).next('div.select-styled');
                $this = select;
                var listItem = $(select).parents('.customselect-wrapper').find('ul li:last-child');
                $(listItem).click(function(e) {
                        e.stopPropagation();
                        if($(e.currentTarget).find('.checked').hasClass('active')) {
                            $(e.currentTarget).find('.checked').removeClass('active');
                            var id = $(e.currentTarget).attr('data-id');
                            $styledSelect.find('.selectvalue[data-id="' + id + '"]').remove();
                            if($styledSelect.find('.selectvalue').length == 0){
                                $styledSelect.html('<div class="default">Выберите ответ</div>');
                            }
                            $this.find('option[data-id="' + id + '"]').prop("selected", false)
                        }
                        else {
                            $(e.currentTarget).find('.checked').addClass('active');
                            var id = $(e.currentTarget).attr('data-id');
                            if($styledSelect.find('.default').length > 0){
                                $styledSelect.find('.default').remove();
                            }
                            $styledSelect.append('<div class="selectvalue" data-value="' + $(e.currentTarget).attr('rel') + '" data-id="'+ id + '">' + $(e.currentTarget).attr('rel') + '</div>');
                            $this.find('option[data-id="' + id + '"]').prop("selected", true)
                        }
                    select.change();
                });
            }
            else {
                $(select).append('<option value="" data-id="'+ id + '"></option>');
                $(select).parents('.customselect-wrapper').find('ul').append('<li rel="" data-id="'+ id + '">Ответ</li>');
                var $styledSelect = $(select).next('div.select-styled');
                $this = select;
                var listItem = $(select).parents('.customselect-wrapper').find('ul li:last-child');
                $(listItem).click(function(e) {
                    e.stopPropagation();
                    $styledSelect.text($(this).text()).removeClass('active');
                    $this.val($(this).attr('rel'));
                    $(select).parents('.customselect-wrapper').find('ul').hide();
                    $this.change();
                });
            }
        }
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
                                if($(e.currentTarget).attr('rel') !== 'all'){
                                    $styledSelect.append('<div class="selectvalue" data-value="' + $(e.currentTarget).attr('rel') + '" data-id="'+ id + '">' + $(e.currentTarget).find('.text').html() + '</div>');
                                }
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

                        $(document).click(function(e) {
                            if(!$(e.target).hasClass('country')){
                                $styledSelect.removeClass('active');
                                $list.hide();
                            }
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
