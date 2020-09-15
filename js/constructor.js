jQuery(function ($) {
    $(document).ready(function () {
        $( ".listbox li" ).draggable({
            helper: "clone",
            cursor: "move",
        });

        $( ".listbox li" ).toggleClass('dragged');

        //change name of question
        $('.rightside').on('change, keypress, keydown, keyup', '.question_name', function(e){
            var id = $(this).attr('name').split('_')[1];
            $('#questionName_' + id).html($(this).val());
        });
        
        //change name of points of question
        $('.rightside').on('change , keypress, keydown, keyup', '.question_points', function(e){
            var id = $(this).attr('name').split('_');
            id[0] = '#questionpointsanswer';
            $(id.join('_')).html($(this).val());
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
                var id = $(event.target).attr('name').split('_')[1];
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
                        +'    <label for="inputPoint_'+ id + '_' + currentId +'">'+ currentId +'</label>'
                        +'    <input class="question_points" name="inputPoint_'+ id + '_' + currentId +'" id="inputPoint_'+ id + '_' + currentId +'" type="text" placeholder="Вариант ответа">'
                        +'</div>';
                        $(newQuestion).appendTo($('#inputtables_' + id));
                    }
                }
                SetPointOfQuestion(id, number);
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
                    +'    <label for="inputPoint_'+ id + '_' + currentId +'">'+ currentId +'</label>'
                    +'    <input class="question_points" name="inputPoint_'+ id + '_' + currentId +'" id="inputPoint_'+ id + '_' + currentId +'" type="text"  placeholder="Вариант ответа">'
                    +'</div>';
                    $(newQuestion).appendTo($('#inputtables_' + id));
                }
            }
            SetPointOfQuestion(id, number);
        });

        //change points of free question
        $('.rightside').on('change', '.freeanswer_number', function(e){
            var id = $(this).attr('name').split('_')[1];
            var number = $(this).val();
            SetPointOfFreeQuestion(id, number);
        });
        
        //set points of question
        function SetPointOfQuestion(id, number) {
            var questionPoints = $('#questionAnswers_' + id).find('.form-group');
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
                    +'    <input type="radio" name="questionAnswer_'+ id + '" id="questionAnswer_'+ id + '_' + currentId +'">'
                    +'    <label id="questionpointsanswer_'+ id + '_' + currentId +'" for="questionAnswer_'+ id + '_' + currentId +'">Вариант ответа</label>'
                    +'</div>';
                    $(newQuestion).appendTo($('#questionAnswers_' + id));
                }
            }
        }

        //set points of question
        function SetPointOfFreeQuestion(id, number) {
            var questionPoints = $('#questionAnswers_' + id).find('.form-group');
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
                    +'    <input type="text" name="questionAnswer_'+ id + '_' + currentId +'" id="questionAnswer_'+ id + '_' + currentId +'" placeholder="Ваш ответ">'
                    +'</div>';
                    $(newQuestion).appendTo($('#questionAnswers_' + id));
                }
            }
        }

        var i = $('.questions-box').attr('data-count') + 1;
        $(".questions-box").droppable({
            drop: function(event, ui) {
                var item = $(ui.draggable).html();
                var fieldId = 'question'+'_'+i;
                var eventTop = event.pageY;
                var children = $('.questions-box').children();
                var appendInde = getAppendIndex(children, eventTop);
                var el = '';
                var option = '';
                var id = $('.questions-box').attr('data-count') + 1;

                var type = $(ui.draggable).attr('data-type');
                if (type === "single"){
                    el =
                    '<div class="question active"  data-optionId="'+ id +'">'
                    +'    <div class="close-question"></div>'
                    +'    <div class="name" id="questionName_'+ id +'">'
                    +'        Вопрос '
                    +'    </div>'
                    +'    <div class="answer flex-50" id="questionAnswers_'+ id +'">'
                    +'        <div class="form-group" id="questionformAnswer_'+ id +'_1">'
                    +'            <input type="radio" name="questionAnswer_'+ id +'" id="questionAnswer_'+ id +'_1">'
                    +'            <label id="questionpointsanswer_'+ id +'_1" for="questionAnswer_'+ id +'_1">Вариант ответа</label>'
                    +'        </div>'
                    +'        <div class="form-group" id="questionformAnswer_'+ id + '_2">'
                    +'            <input type="radio" name="questionAnswer_'+ id +'" id="questionAnswer_'+ id +'_2">'
                    +'            <label  id="questionpointsanswer_'+ id +'_2" for="questionAnswer_'+ id +'_2">Вариант ответа</label>'
                    +'       </div>'
                    +'    </div>'
                    +'</div>'
                    ;
                    option = 
                    '<div class="optionbox active option_single" id="option_'+ id +'">'
                    +'    <div class="header-aside">'
                    +'        Настройки'
                    +'    </div>'
                    +'    <div class="text-aside">'
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
                    +'                   <label for="inputPoint_'+ id +'_1">1</label>'
                    +'                   <input class="question_points" name="inputPoint_'+ id +'_1" id="inputPoint_'+ id +'_1" type="text" placeholder="Вариант ответа">'
                    +'               </div>'
                    +'               <div class="questionPoint" id=" questionPoint_'+ id +'_2">'
                    +'                   <label for="inputPoint_'+ id +'_2">2</label>'
                    +'                   <input class="question_points" name="inputPoint_'+ id +'_2" id="inputPoint_'+ id +'_2" type="text" placeholder="Вариант ответа">'
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
                    +'    <div class="answer freeanswer" id="questionAnswers_'+ id +'">'
                    +'        <div class="form-group" id="questionformAnswer_'+ id +'_1">'
                    +'            <input type="text" name="questionAnswer_'+ id +'" id="questionAnswer_'+ id +'_1" placeholder="Ваш ответ">'
                    +'        </div>'
                    +'    </div>'
                    +'</div> ';
                    option =
                    '<div class="optionbox active option_single" id="option_'+ id +'">'
                    +'    <div class="header-aside">'
                    +'        Настройки'
                    +'    </div>'
                    +'    <div class="text-aside">'
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
                    +'    <div class="answer freeanswer" id="questionAnswers_'+ id +'">'
                    +'        <div class="form-group" id="questionformAnswer_'+ id +'_1">'
                    +'            <input type="text" name="questionAnswer_'+ id +'_1" id="questionAnswer_'+ id +'_1" placeholder="Ваш ответ">'
                    +'        </div>'
                    +'        <div class="form-group" id="questionformAnswer_'+ id +'_2">'
                    +'            <input type="text" name="questionAnswer_'+ id +'_2" id="questionAnswer_'+ id +'_2" placeholder="Ваш ответ">'
                    +'        </div>'
                    +'        <div class="form-group" id="questionformAnswer_'+ id +'_3">'
                    +'            <input type="text" name="questionAnswer_'+ id +'_3" id="questionAnswer_'+ id +'_3" placeholder="Ваш ответ">'
                    +'        </div>'
                    +'    </div>'
                    +'</div>';
                    option =
                    '<div class="optionbox active" id="option_'+ id +'">'
                    +'    <div class="header-aside">'
                    +'        Настройки'
                    +'    </div>'
                    +'    <div class="text-aside">'
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
                    el ='branching'
                    ;
                }
                else if (type === "scale"){
                    el ='scale'
                    ;
                }
                else if (type === "dropdown"){
                    el ='dropdown'
                    ;
                }
                else if (type === "dropdownmt"){
                    el ='dropdownmt'
                    ;
                }
                if (type === 'matrix') {
                    el ='matrix'
                    ;
                }
                if (type === 'ranging') {
                    el ='ranging'
                    ;
                }
                if (type === 'name') {
                    el ='name'
                    ;
                }
                if (type === 'date') {
                    el ='date'
                    ;
                }
                if (type === 'email') {
                    el ='email'
                    ;
                }
                if (type === 'phone') {
                    el ='phone'
                    ;
                }
                if (type === 'file') {
                    el ='file'
                    ;
                }
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
                var children = $('.questions-box').children();
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
                                +'    <label for="inputPoint_'+ id + '_' + currentId +'">'+ currentId +'</label>'
                                +'    <input class="question_points" name="inputPoint_'+ id + '_' + currentId +'" id="inputPoint_'+ id + '_' + currentId +'" type="text" placeholder="Вариант ответа">'
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
                        var id = $(event.target).attr('name').split('_')[1];
                        var number = ui.value;
                        SetPointOfFreeQuestion(id, number);
                    }
                });

                RefreshItems();
                $('.questions-box').attr('data-count', i);
            }
        });
        $('.questions-box').on('click', '.question', function(e){
            $('.questions-box .question').removeClass('active');
            $('.optionsblock .optionbox').removeClass('active');
            $(this).addClass('active');
            id = $(this).attr('data-optionid');
            $('.optionsblock #option_' + id ).addClass('active');
        });

        $('.questions-box').on('click', '.close-question', function(e){
            var optionId = '#option_' + $(this).parents('.question').attr('data-optionid');
            var id = $('.questions-box').attr('data-count') - 1;
            $(optionId).remove();
            $(this).parents('.question').remove();
            $('.questions-box').attr('data-count', id);
            RefreshItems();
        });
        function RefreshItems() {
            var childrenQuestions = $('.questions-box').children();
            var childrenOptions = $('.optionsblock .eloptions').children();
            var prevId;
            var newId;
            childrenQuestions.each(function (index, question) {
                var id = index + 1;
                if($('#option_'+$(question).attr('data-optionid')).length>0){
                    var optionBox = $('#option_'+$(question).attr('data-optionid'));
                    if(optionBox.find('.inputtables').length>0){
                        prevId = optionBox.find('.inputtables').attr('id').split("_");
                        prevId[1] = id;
                        newId = prevId.join('_');
                        optionBox.find('.inputtables').attr('id', newId);
                    }
                    if(optionBox.find('.questionPoint').length>0){
                        prevId = optionBox.find('.questionPoint').attr('id').split("_");
                        prevId[1] = id;
                        newId = prevId.join('_');
                        optionBox.find('.questionPoint').attr('id', newId);
                    }
                    var inputs = optionBox.find('input');
                    inputs.each(function (index, input) {
                        if($(input).attr('name')){
                            prevId = $(input).attr('name').split("_");
                            prevId[1] = id;
                            newId = prevId.join('_');
                            $(input).attr('name', newId);
                        }
                        if($(input).attr('id')){
                            prevId = $(input).attr('id').split("_");
                            prevId[1] = id;
                            newId = prevId.join('_');
                            $(input).attr('id', newId);
                        }
                    });
                    var textareas = optionBox.find('textarea');
                    textareas.each(function (index, textarea) {
                        if($(textarea).attr('name')){
                            prevId = $(textarea).attr('name').split("_");
                            prevId[1] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('name', newId);
                        }
                        if($(textarea).attr('id')){
                            prevId = $(textarea).attr('id').split("_");
                            prevId[1] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('id', newId);
                        }
                    });
                    var labels = optionBox.find('label');
                    labels.each(function (index, label) {
                        if($(label).attr('for')){
                            prevId = $(label).attr('for').split("_");
                            prevId[1] = id;
                            newId = prevId.join('_');
                            $(label).attr('for', newId);
                        }
                        if($(label).attr('id')){
                            prevId = $(label).attr('id').split("_");
                            prevId[1] = id;
                            newId = prevId.join('_');
                            $(label).attr('id', newId);
                        }
                    });

                }
                $(question).attr('data-optionid', id);
                if($(question).find('.name').length>0){
                    prevId = $(question).find('.name').attr('id').split("_");
                    prevId[1] = id;
                    newId = prevId.join('_');
                    $(question).find('.name').attr('id', newId);
                }
                var inputs = $(question).find('input');
                inputs.each(function (index, input) {
                    if($(input).attr('name')){
                        prevId = $(input).attr('name').split("_");
                        prevId[1] = id;
                        newId = prevId.join('_');
                        $(input).attr('name', newId);
                    }
                    if($(input).attr('id')){
                        prevId = $(input).attr('id').split("_");
                        prevId[1] = id;
                        newId = prevId.join('_');
                        $(input).attr('id', newId);
                    }
                });
                var labels = $(question).find('label');
                labels.each(function (index, label) {
                    if($(label).attr('for')){
                        prevId = $(label).attr('for').split("_");
                        prevId[1] = id;
                        newId = prevId.join('_');
                        $(label).attr('for', newId);
                    }
                    if($(label).attr('id')){
                        prevId = $(label).attr('id').split("_");
                        prevId[1] = id;
                        newId = prevId.join('_');
                        $(label).attr('id', newId);
                    }
                });
                if($(question).find('.answer').length>0){
                    prevId = $(question).find('.answer').attr('id').split("_");
                    prevId[1] = id;
                    newId = prevId.join('_');
                    $(question).find('.answer').attr('id', newId);
                    var childrenAnswer = $(question).find('.answer').children();
                    if(childrenAnswer.length>0){
                        childrenAnswer.each(function (indexanswer, answer) {
                            if($(answer).attr('id')){
                                prevId = $(answer).attr('id').split("_");
                                prevId[1] = id;
                                newId = prevId.join('_');
                                $(answer).attr('id', newId);
                            }
                        });
                    }
                }
            });
            
            childrenOptions.each(function (index, question) {
                var id;
                if($(question).attr('id')){
                    prevId = $(question).attr('id').split("_");
                    childrenid = $(question).find('.question_name').attr('id').split("_");
                    prevId[1] = childrenid[1];
                    newId = prevId.join('_');
                    $(question).attr('id', newId);
                }

            });

            $(".spinner").inputFilter(function(value) {
                return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 15);
            });
        }
        function getAppendIndex(arr, top) {
            if( arr.length === 0 ) {
                return 'last';
            }
            else {
                for( var i = 0; i < arr.length; i++ ) {
                    var elTop = $(arr[i]).offset().top,
                        elBottom = $(arr[i]).offset().top + $(arr[i]).height(),
                        height = $(arr[i]).height();
                    if( top > elTop + height && top < elBottom ) {
                        return i;
                    }
                    else if(top > elTop && top < elBottom) {
                        return ( i - 1 );
                    }
                }
                return  arr.length - 1;
            }
        }

        $('.questions-box').sortable({
            deactivate: function (event, ui) {
                RefreshItems();
            }
        });
    });
});
