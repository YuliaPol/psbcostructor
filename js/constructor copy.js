jQuery(function ($) {
    $(document).ready(function () {

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

        $('.rightside').on('change', '.btnheight', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val() + 'px';
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css('height', value);
        });

        $('.rightside').on('change', '.btnradius', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val() + "px";
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css( {  borderRadius:   value });
        });

        $('.rightside').on('change', '.btncolor', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val();
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css( 'background', value);
            $(this).parents('.optionbtngroup').find('.color').css( 'background', value);
        });

        $('.rightside').on('click', '.btncolor', function(e){
            $(this).prev('input').click();
        });

        $('.rightside').on('change', '.hiddeninputcolor', function(e){
            $(this).next('input').val($(this).val());
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val();
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').css( 'background', value);
            $(this).parents('.optionbtngroup').find('.color').css( 'background', value);
        });

        $('.rightside').on('change, keypress, keydown, keyup', '.btn_name', function(e){
            var idQuestion =  $(this).attr('name').split('_')[1];
            var value = $(this).val();
            $('#questionanswers_' + idQuestion).find('.btn-answer .btn').html(value);
        });
        $( ".listbox li" ).draggable({
            helper: "clone",
            cursor: "move",
        });
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
            var index = 1;
            if(child.parents('.question').find('.imageblock').children().length>0){
                index = child.parents('.question').find('.imageblock').children().length + 1;
            }
            var index2 = 1;
            var image;
            // for (var i = 0; i < files.length; i++) {
            // files.forEach(function(item, i, arr) {
            $.each( files, function( i, item ) {
                var image;
                var settingsImage =
                '<div class="remove-picture"></div>'
                +'<div class="bottom-row">'
                +'   <div class="inputsimage">'
                +'        <div class="inputgroup">'
                +'            <input type="radio" name="clickforimage_' + idQuestion + '_' + index +'" id="clickforimage_' + idQuestion + '_' + index +'_1"'
                +'                value="50">'
                +'            <label for="clickforimage_' + idQuestion + '_' + index + '_1">50 на картинку</label>'
                +'        </div>'
                +'        <div class="inputgroup">'
                +'            <input type="radio" name="clickforimage_' + idQuestion + '_' + index + '" id="clickforimage_' + idQuestion + '_' + index + '_2"'
                +'                value="100">'
                +'            <label for="clickforimage_' + idQuestion + '_' + index + '_2">100 на картинку</label>'
                +'        </div>'
                +'        <div class="inputgroup">'
                +'            <input type="radio" name="clickforimage_' + idQuestion  + '_' + index + '" id="clickforimage_'  + idQuestion + '_' + index + '_3"'
                +'                value="200">'
                +'            <label for="clickforimage_' + idQuestion  + '_' + index + '_3">200 на картинку</label>'
                +'        </div>'
                +'    </div>'
                +'</div>';
                image = 
                '<div class="image" style="width:33%">'
                +'<input type="hidden" value="'+ i +'" name="imageId_' + idQuestion + '_' + i + '">'
                +'<img src ="/admin/uploads/'+ item + '" alt="Image"> ' + settingsImage + '</div>';
                child.parents('.question').find('.imageblock').append(image);
                ResizeImg();
                index++;
                index2++;
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

            if(files.length > 9 ) {
                $('#modal-error').find('.text').html('Выберете, пожалуйста, не больше 10 файлов');
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
                console.log('Вопрос удален');
            }).fail(function () {
                // не удалось выполнить запрос к серверу
                console.log('Запрос не принят');
            });
            var Images = parents.children();
            Images.each(function (index, image) {
                var id = index + 1;
                var inputs = $(image).find('input');
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

                var labels = $(image).find('label');
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

                if (/^video/.test( files[0].type)){ // only video file
                    var reader = new FileReader(); // instance of the FileReader
                    reader.readAsDataURL(files[0]); // read the local file
                    reader.onloadend = function(){ // set video data as background of div
                        var video = 
                        '<video width="400" >'
                        +'    <source src="'+ this.result + '">'
                        +'    Your browser does not support HTML5 video.'
                        +'</video>';
                        var play ='<div class="play"></div>';
                        child.parents('.question').find('.videoblock').append(video);
                        child.parents('.question').find('.videoblock').append(play);
                    }
                }
            }
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

                        //Generate unic ud
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
            var numberCols = parseInt($(this).parents('.matrix-options').find('.matrix_number').val());
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
                    answerCols.each(function (i_col, col) {
                        var index = i_col + 1;
                        if(index > number) {
                            $(col).remove();
                        }
                    });
                }
                else if(answerCols.length < number){
                    var name = $('#option_' + id).find('.matrix_number').attr('name');
                    var idQuestion = name.split('_')[1];
                    var idPoints = i_row;
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
                                +'    <input type="checkbox" name="answermatrix_' + idQuestion + '_' + idPoints +  '_' + i + '"  id="answermatrix_' + idQuestion + '_' + idPoints + '_' + i + '">'
                                +'    <label for="answermatrix_' + idQuestion + '_' + idPoints + '_' + i + '">'
                                +'    </label>'
                                +'</div>';
                                $(row).append(newCol);
                            }
                        }
                        else {
                            for (let i =  answerCols.length; i < number; i++){
                                var newCol =
                                '<div class="col">'
                                +'    <input type="radio" name="answermatrix_' + idQuestion + '_' + idPoints  + '"  id="answermatrix_' + idQuestion + '_' + idPoints + '_' + i + '">'
                                +'    <label for="answermatrix_' + idQuestion + '_' + idPoints + '_' + i + '">'
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
            if($('#questionanswers_'+ name[1]).find('.dropdown-list .dropdown-block:nth-child('+ name[2] +')').find('.question-name').length>0){
                $('#questionanswers_'+ name[1]).find('.dropdown-list .dropdown-block:nth-child('+ name[2] +')').find('.question-name').html($(this).val());
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
        $('.rightside').on('click', '.dropdown-options .add-dropdown', function(e){
            var namequestion ;
            if($(this).parents('.dropdown-options').find('.option-group:last-child .dropdown-question').length>0){
                namequestion = $(this).parents('.dropdown-options').find('.option-group:last-child .dropdown-question').attr('name').split('_');
            }
            var idQuestion;
            var idPoint;
            if(namequestion){
                idQuestion = parseInt(namequestion[1]);
            }
            else {
                idQuestion = parseInt($(this).parents('.optionbox').find('input:first-child').attr('name').split('_')[1]);
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
                +'        <textarea class="dropdown-question" name="inputpoint_'+ idQuestion + '_' + idPoint + '" id="inputpoint_' + idQuestion + '_' + idPoint + '" placeholder="Введите вопрос"></textarea>'
                +'        <div class="dropdown-list">'
                +'        </div>'
                +'    </div>'
                +'    <div class="adddropdownsubpoints"></div>'
                +'    <div class="remove-dropdown"></div>'
                +'    <div class="arrowshow"></div>'
                +'</div>';
            var newEl = 
                '<div class="dropdown-block">'
                +'    <div class="dropdown-arrow"></div>'
                +'    <div class="question-name">'
                +'        Вопрос'
                +'    </div>'
                +'    <div class="dropdown-content">'
                +'    </div>'
                +'</div>';
            $(newOptionel).appendTo($(this).parents('.dropdown-options').find('.optionsdropdownlist'));
            $(newEl).appendTo('#questionanswers_' + idQuestion + ' .dropdown-list');
        });
        


        //dropdown  multiple change
        $('.rightside').on('click', '.dropdown-options .dropdownmultiple', function(e){
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
        $('.centerbox').on('change', '.branchingquestion input[type=radio]', function(e){
            var idQuestion = $(this).attr('id').split('_')[1];
            var idPoint = parseInt($(this).attr('id').split('_')[2]);
            if($(this).is(':checked')){
                $(this).parents('.question').find('.hidden-question-group').fadeOut(300);
                $('#hiddenquestion_' + idQuestion + '_' + idPoint).fadeIn(300);
            }
        });

        //hidden question input 
        $('.rightside').on('change , keypress, keydown, keyup', '.branching-group input[type=text]', function(e){
            var idQuestion = parseInt($(this).attr('name').split('_')[1]);
            var idPoint = parseInt($(this).attr('name').split('_')[2]);
            var idSubPoint = parseInt($(this).attr('name').split('_')[3]);
            if(idQuestion && idPoint && idSubPoint){
                if($('#hiddenquestion_'+ idQuestion + '_' + idPoint).find('.hidden-question:nth-child('+ idSubPoint + ')').find('.name').length>0){
                    $('#hiddenquestion_'+ idQuestion + '_' + idPoint).find('.hidden-question:nth-child('+ idSubPoint + ')').find('.name').html($(this).val());
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
        

        $('.rightside').on('click', '.dropdown-options .remove-dropdown', function(e){
            var parents = $(this).parents('.optionsdropdownlist');
            var namequestion = $(this).parents('.option-group').find('.dropdown-question').attr('name').split('_');
            var idQuestion = parseInt(namequestion[1]);
            var idPoint = parseInt(namequestion[2]);
            $('#questionanswers_' + idQuestion + ' .dropdown-block:nth-child('+ idPoint +')').remove();
            var Subpoints = $('#questionanswers_' + idQuestion + ' .dropdown-list').children();
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
        $('textarea').change();
        //change name of points of question
        $('.rightside').on('change , keypress, keydown, keyup', '.question_points', function(e){
            var id = $(this).attr('name').split('_');
            id[0] = '#questionpointsanswer';
            $(id.join('_')).html($(this).val());
        });

        $('.rightside').on('change , keypress, keydown, keyup', '.ratinstables input[type=text]', function(e){
            var idQuestion = $(this).attr('name').split('_')[1];
            var idPoint = parseInt($(this).attr('name').split('_')[2]);
            if(idQuestion && idPoint){
                if($('#questionanswer_'+ idQuestion +'_' + idPoint).next ('label').find('.text').length>0){
                    $('#questionanswer_'+ idQuestion +'_' + idPoint).next ('label').find('.text').html($(this).val());
                }
            }
        });

        $('.rightside').on('change', '.scale-radio input[type=radio]', function(e){
            var el = '';
            var id = $(this).attr('name').split('_')[1];
            var type = $(this).val();
            if(type == 1){
                el = 
                '<div class="answer answer-colorstar" id="questionanswers_'+ id +'">'
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
                +'</div>';
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
                '<div class="answer answer-star10" id="questionanswers_'+ id +'">'
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
                +'</div>';
            }
            else if(type == 4){
                el = 
                '<div class="answer answer-ratings10" id="questionanswers_'+ id +'">'
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
                +'</div>';
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
            }
        });
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

        $(".spinner").inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 15);
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
            min: 0,
            max: 15,
            spin: function( event, ui ) {
                var id = $(event.target).attr('name').split('_')[1];
                var number = ui.value;
                var questionPoints = $('#inputtables_' + id).find('.questionPoint');
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
                        +'    <label for="inputpoint_'+ id + '_' + currentId +'">'+ currentId +'</label>'
                        +'    <input class="question_points" name="inputpoint_'+ id + '_' + currentId +'" id="inputpoint_'+ id + '_' + currentId +'" type="text" placeholder="Вариант ответа">'
                        +'    <div class="branching-btn"></div>'
                        +'    <div class="branching-list"> </div>'
                        +'</div>';
                        $(newQuestion).appendTo($('#inputtables_' + id));
                    }
                }
                SetPointOfQuestion(id, number);
            }
        });

        //add subpoints
        $('.rightside').on('click', '.branching-btn', function(e){
            var subPoints = $(this).next('.branching-list').children();
            var prevNameInput = $(this).prev('.question_points').attr('id').split('_');
            var questionId =  prevNameInput[1];
            var questionPointsId =  parseInt(prevNameInput[2]);
            var questionSubPointsId =  parseInt(subPoints.length) + 1;
            if(questionSubPointsId<3)
            {
                var el = 
                '<div class="branching-group">'
                +'    <input type="text" name="subpoint_'+ questionId + '_' + questionPointsId +'_' + questionSubPointsId + '" id="subpoint_'+ questionId + '_' + questionPointsId +'_' + questionSubPointsId + '">'
                +'    <div class="deleteSubPoint"></div>'
                +'</div>';
                $(this).next('.branching-list').append(el);
                if(!$(this).hasClass('active')){
                    $(this).addClass('active');
                }

                var hiddenquestion = 
                '<div class="hidden-question">'
                +'    <div class="name">'
                +'        Вопрос'
                +'    </div>'
                +'    <div class="hidden-question-answer">'
                +'        <div class="form-group">'
                +'            <input type="text" name="hiddenquestionanswer_'+ questionId + '_' + questionPointsId +'_' + questionSubPointsId + '" id="hiddenquestionanswer_'+ questionId + '_' + questionPointsId +'_' + questionSubPointsId + '" placeholder="Ваш ответ">'
                +'        </div>'
                +'    </div>'
                +'</div>';

                if($('#hiddenquestion_' + questionId + '_' + questionPointsId).length>0){
                   $(hiddenquestion).appendTo($('#hiddenquestion_' + questionId + '_' + questionPointsId));
                }
                else {
                    var newHiddenGroup = '<div class="hidden-question-group" id="hiddenquestion_' + questionId + '_' + questionPointsId + '">'+ hiddenquestion +'</div>'
                    $(newHiddenGroup).appendTo($('#questionanswers_' + questionId).next('.hidden-question-list'));
                }
            }
            else {
                $('#modal-error').find('.text').html('Вы можете добавить не более 2 ветвление');
                $('.modal').fadeIn(300);
            }
        });

        //delete subpoints
        $('.rightside').on('click', '.deleteSubPoint', function(e){
            var parents = $(this).parents('.branching-list');
            $(this).parents('.branching-group').remove();
            var idQuestion = parseInt($(this).parents('.branching-group').find('input').attr('name').split('_')[1]);
            var idPoint = parseInt($(this).parents('.branching-group').find('input').attr('name').split('_')[2]);
            var idSubPoint = parseInt($(this).parents('.branching-group').find('input').attr('name').split('_')[3]);
            if(idQuestion && idPoint && idSubPoint){
                if($('#hiddenquestion_'+ idQuestion + '_' + idPoint).find('.hidden-question:nth-child('+ idSubPoint + ')').length>0){
                    $('#hiddenquestion_'+ idQuestion + '_' + idPoint).find('.hidden-question:nth-child('+ idSubPoint + ')').remove();
                }
                var SubpointsAnswer = $('#hiddenquestion_'+ idQuestion + '_' + idPoint).children();
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
            var questionPoints = $('#inputtables_' + id).find('.questionPoint');
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
                    +'    <label for="inputpoint_'+ id + '_' + currentId +'">'+ currentId +'</label>'
                    +'    <input class="question_points" name="inputpoint_'+ id + '_' + currentId +'" id="inputpoint_'+ id + '_' + currentId +'" type="text" placeholder="Вариант ответа">'
                    +'    <div class="branching-btn"></div>'
                    +'    <div class="branching-list"> </div>'
                    +'</div>';
                    $(newQuestion).appendTo($('#inputtables_' + id));
                }
            }
            SetPointOfQuestion(id, number);
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
                if($(ui.draggable).html()){
                    var item = $(ui.draggable).html();
                    var fieldId = 'question'+'_'+i;
                    var eventTop = event.pageY;
                    var offsetY = event.offsetY;
                    // console.log();
                    var children = $('.questions-box').children();
                    var appendInde = getAppendIndex(children, eventTop, offsetY);
                    var el = '';
                    var option = '';
                    // var id = parseInt($('.questions-box').attr('data-count')) + 1;
                    var id;
                    var type = $(ui.draggable).attr('data-type');
                    var pollid = $('#quiz-id').val();
                    console.log(type);
                    console.log(pollid);
                    AddQuestion(type, Math.random().toString(36).substr(2, 9), appendInde);
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
            }
        });
        

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
                +'                    value="video">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
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
                +'                    value="video">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
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
                +'                    value="video">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
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
                +'                    value="video">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
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
                +'                    <input class="question_points" name="inputpoint_'+ id +'_1" id="inputpoint_'+ id +'_1" type="text" placeholder="Вариант ответа">'
                +'                    <div class="branching-btn"></div>'
                +'                    <div class="branching-list">'
                +'                    </div>'
                +'                </div>'
                +'                <div class="questionPoint" id="questionPoint_'+ id +'_2">'
                +'                    <label for="inputpoint_'+ id +'_2">2</label>'
                +'                    <input class="question_points" name="inputpoint_'+ id +'_2" id="inputpoint_'+ id +'_2" type="text" placeholder="Вариант ответа">'
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
                +'                    value="video">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
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
                +'    <div class="answer" id="questionanswers_'+ id +'">'
                +'        <div class="dropdown-list">'
                +'            <div class="dropdown-block">'
                +'                <div class="dropdown-arrow"></div>'
                +'                <div class="question-name">'
                +'                    Вопрос'
                +'                </div>'
                +'                <div class="dropdown-content">'
                +'                </div>'
                +'            </div>'
                +'            <div class="dropdown-block">'
                +'                <div class="dropdown-arrow"></div>'
                +'                <div class="question-name">'
                +'                    Вопрос'
                +'                </div>'
                +'                <div class="dropdown-content">'
                +'               </div>'
                +'           </div>'
                +'           <div class="dropdown-block">'
                +'               <div class="dropdown-arrow"></div>'
                +'               <div class="question-name">'
                +'                   Вопрос'
                +'               </div>'
                +'               <div class="dropdown-content">'
                +'               </div>'
                +'           </div>'
                +'       </div>'
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
                +'                    value="video">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
                +'        <div class="dropdown-options">'
                +'            <div class="top-row">'
                +'                <div class="namelabel">Вопросы</div>'
                +'                <div class="add-dropdown"></div>'
                +'            </div>'
                +'            <div class="optionsdropdownlist">'
                +'                <div class="option-group">'
                +'                    <div class="inputstables">'
                +'                        <textarea class="dropdown-question" name="inputpoint_'+ id +'_1" id="inputpoint_'+ id +'_1" placeholder="Введите вопрос"></textarea>'
                +'                        <div class="dropdown-list">'
                +'                        </div>'
                +'                    </div>'
                +'                    <div class="adddropdownsubpoints"></div>'
                +'                    <div class="remove-dropdown"></div>'
                +'                    <div class="arrowshow"></div>'
                +'                </div>'
                +'                <div class="option-group">'
                +'                    <div class="inputstables">'
                +'                        <textarea class="dropdown-question" name="inputpoint_'+ id +'_2" id="inputpoint_'+ id +'_2"  placeholder="Введите вопрос"></textarea>'
                +'                        <div class="dropdown-list">'
                +'                        </div>'
                +'                    </div>'
                +'                    <div class="adddropdownsubpoints"></div>'
                +'                    <div class="remove-dropdown"></div>'
                +'                    <div class="arrowshow"></div>'
                +'                </div>'
                +'                <div class="option-group">'
                +'                    <div class="inputstables">'
                +'                        <textarea class="dropdown-question" name="inputpoint_'+ id +'_3" id="inputpoint_'+ id +'_3"  placeholder="Введите вопрос"></textarea>'
                +'                        <div class="dropdown-list">'
                +'                        </div>'
                +'                    </div>'
                +'                    <div class="adddropdownsubpoints"></div>'
                +'                    <div class="remove-dropdown"></div>'
                +'                    <div class="arrowshow"></div>'
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
                +'    <div class="answer" id="questionanswers_'+ id +'">'
                +'        <div class="dropdown-list">'
                +'            <div class="dropdown-block">'
                +'                <div class="dropdown-arrow"></div>'
                +'                <div class="question-name">'
                +'                    Вопрос'
                +'                </div>'
                +'                <div class="dropdown-content">'
                +'                </div>'
                +'            </div>'
                +'            <div class="dropdown-block">'
                +'                <div class="dropdown-arrow"></div>'
                +'                <div class="question-name">'
                +'                    Вопрос'
                +'                </div>'
                +'                <div class="dropdown-content">'
                +'                </div>'
                +'            </div>'
                +'            <div class="dropdown-block">'
                +'                <div class="dropdown-arrow"></div>'
                +'                <div class="question-name">'
                +'                    Вопрос'
                +'                </div>'
                +'                <div class="dropdown-content">'
                +'                </div>'
                +'            </div>'
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
                +'                    value="video">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
                +'        <div class="dropdown-options">'
                +'            <div class="multityperow">'
                +'                <div class="namelabel">'
                +'                    Множественный выбор'
                +'                </div>'
                +'                <label class="switch" for="dropdownmultiple_'+ id +'">'
                +'                    <input type="checkbox" class="dropdownmultiple" name="dropdownmultiple_'+ id +'" id="dropdownmultiple_'+ id +'" checked="">'
                +'                    <span class="slider round"></span>'
                +'                </label>'
                +'            </div>'
                +'            <div class="top-row">'
                +'                <div class="namelabel">Вопросы</div>'
                +'                <div class="add-dropdown"></div>'
                +'            </div>'
                +'            <div class="optionsdropdownlist">'
                +'                <div class="option-group">'
                +'                    <div class="inputstables">'
                +'                        <textarea class="dropdown-question" name="inputpoint_'+ id +'_1" id="inputpoint_'+ id +'_1" placeholder="Введите вопрос"></textarea>'
                +'                        <div class="dropdown-list">'
                +'                        </div>'
                +'                    </div>'
                +'                    <div class="adddropdownsubpoints"></div>'
                +'                    <div class="remove-dropdown"></div>'
                +'                    <div class="arrowshow"></div>'
                +'                </div>'
                +'                <div class="option-group">'
                +'                    <div class="inputstables">'
                +'                        <textarea class="dropdown-question" name="inputpoint_'+ id +'_2" id="inputpoint_'+ id +'_2"  placeholder="Введите вопрос"></textarea>'
                +'                        <div class="dropdown-list">'
                +'                        </div>'
                +'                    </div>'
                +'                    <div class="adddropdownsubpoints"></div>'
                +'                    <div class="remove-dropdown"></div>'
                +'                    <div class="arrowshow"></div>'
                +'                </div>'
                +'                <div class="option-group">'
                +'                    <div class="inputstables">'
                +'                        <textarea class="dropdown-question" name="inputpoint_'+ id +'_3" id="inputpoint_'+ id +'_3"  placeholder="Введите вопрос"></textarea>'
                +'                        <div class="dropdown-list">'
                +'                        </div>'
                +'                    </div>'
                +'                    <div class="adddropdownsubpoints"></div>'
                +'                    <div class="remove-dropdown"></div>'
                +'                    <div class="arrowshow"></div>'
                +'                </div>'
                +'            </div>'
                +'        </div>'
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
                +'                    value="video">'
                +'            </div>'
                +'            <input  class="uploadaudioinput" type="file" name="uploadaudio_'+ id +'" id="uploadaudio_'+ id +'"'
                +'            accept="audio/*">'
                +'            <div class="uploadtext">'
                +'                <input type="radio" name="typeuploadfile_'+ id +'" id="typeuploadfile_'+ id +'_4"'
                +'                    value="text">'
                +'            </div>'
                +'        </div>'
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
                +'          <div class="form-group spinner-wrapper">'
                +'              <label for="number_'+ id +'">Колонки</label>'
                +'              <input class="matrix_number spinner" name="number_'+ id +'" id="number_'+ id +'" type="text"'
                +'                  value="2">'
                +'          </div>'
                +'          <div class="matrix-btn-row">'
                +'              <div class="addmatrixrow add-btn">'
                +'                  <div class="icon-add">'
                +'                  </div>'
                +'                  Добавить строку'
                +'              </div>'
                +'              <div class="addcolmatrix add-btn">'
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
                +'    <input type="hidden" name="questiontype_'+ id +'" value="name">'
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
                +'                    <input class="code" type="text" name="answerphonecode_'+ id +'" id="answerphonecode_'+ id +'" value="+70">'
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
                +'    </div>'
                +'</div>';
            }
            if (type === 'btn') {
                el = 
                '<div class="question" data-optionid="'+ id +'">'
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
                +'                </div>'
                +'                <div class="optionbtngroup">'
                +'                    <label for="inputpoint_'+ id +'_3">H</label>'
                +'                    <input class="btnheight" type="text"  name="inputpoint_'+ id +'_3"  id="inputpoint_'+ id +'_3" value="36">'
                +'                </div>'
                +'            </div>'
                +'            <div class="row-options">'
                +'                <div class="optionbtngroup">'
                +'                    <label for="inputpoint_'+ id +'_4">'
                +'                        <div class="radius"></div>'
                +'                    </label>'
                +'                    <input class="btnradius" type="text"  name="inputpoint_'+ id +'_4"  id="inputpoint_'+ id +'_4" value="30">'
                +'                </div>'
                +'                <div class="optionbtngroup">'
                +'                    <label for="inputpoint_'+ id +'_5">'
                +'                        <div class="color"'
                +'                        style="background: #F26126"></div>'
                +'                    </label>'
                +'                   <input type="color" class="hiddeninput hiddeninputcolor" name="hiddeninputcolor_'+ id +'_5" value="#F26126">'
                +'                   <input class="btncolor" type="text"  name="inputpoint_'+ id +'_5"  id="inputpoint_'+ id +'_5" value="#F26126">'
                +'               </div>'
                +'           </div>'
                +'           <div class="form-group">'
                +'               <label for="question_'+ id +'">Текст кнопки</label>'
                +'               <input class="btn_name" name="question_'+ id +'" id="question_'+ id +'" value="Отправить">'
                +'           </div>'
                +'       </div>'
                +'   </div>'
                +'</div>';``
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
                min: 0,
                max: 15,
                spin: function( event, ui ) {
                    var id = $(event.target).attr('name').split('_')[1];
                    var number = ui.value;
                    var questionPoints = $('#inputtables_' + id).find('.questionPoint');
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
                            +'    <label for="inputpoint_'+ id + '_' + currentId +'">'+ currentId +'</label>'
                            +'    <input class="question_points" name="inputpoint_'+ id + '_' + currentId +'" id="inputpoint_'+ id + '_' + currentId +'" type="text" placeholder="Вариант ответа">'
                            +'    <div class="branching-btn"></div>'
                            +'    <div class="branching-list"> </div>'
                            +'</div>';
                            $(newQuestion).appendTo($('#inputtables_' + id));
                        }
                    }
                    SetPointOfQuestion(id, number);
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
            RefreshItems();
        }
        // delete question
        $('.questions-box').on('click', '.close-question', function(e){
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
        });
        
        //activating question
        $('.questions-box').on('click', '.question', function(e){
            if(!$(e.target).hasClass('close-question')){
                var id = $(this).attr('data-optionid');
                $('.questions-box .question').removeClass('active');
                $('.optionsblock .optionbox').removeClass('active');
                $(this).addClass('active');
                $('.optionsblock #option_' + id ).addClass('active');
            }
        });

        function getAppendIndex(arr, top, offsetY) {
            if( arr.length === 0 ) {
                return 'last';
            }
            else {
                for( var i = 0; i < arr.length; i++ ) {
                    var elTop = $(arr[i]).offset().top,
                        elBottom = $(arr[i]).offset().top + $(arr[i]).height(),
                        height = $(arr[i]).height();
                    if( top > elTop + height && top < elBottom +offsetY ) {
                        return i;
                    }
                    else if(top > elTop && top < elBottom) {
                        console.log(i-1)
                        console.log('i-1')
                        return ( i - 1 );
                    }
                }
                console.log('arr.length - 1')
                return  arr.length - 1;
            }
        }

        $('.questions-box').sortable({
            deactivate: function (event, ui) {
                RefreshItems();
                $('.optionsblock .default').addClass('active');
            }
        });

        function RefreshItems() {
            var childrenQuestions = $('.questions-box').children();
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
        
    });
});
