jQuery(function ($) {
    $(document).ready(function () {
        $( ".listbox li" ).draggable({
            helper: "clone",
            cursor: "move",
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
        //change name of question
        $('.rightside').on('change, keypress, keydown, keyup', '.question_name', function(e){
            var id = parseInt($(this).attr('name').split('_')[1]);
            $('#questionName_' + id).html($(this).val());
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
        
        $('.rightside').on('click', '.dropdown-options .adddropdownsubpoints', function(e){
            var namequestion = $(this).parents('.option-group').find('.dropdown-question').attr('name').split('_');
            var idQuestion;
            var idPoint;
            var idSubpoint;
            if(!$(this).parents('.option-group').find('.arrowshow').hasClass('active')){
                $(this).parents('.option-group').find('.arrowshow').click();
            }
            if(namequestion[1]){
                idQuestion = parseInt(namequestion[1]);
            }
            else {
                idQuestion = parseInt($(this).parents('.optionbox').find('input:first-child').attr('name').split('_')[1]);
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
            var newEl = 
                '<div class="input-group">'
                +'    <input type="radio" name="questionanswers_'+ idQuestion + '_' + idPoint + '" id="questionanswers_'+ idQuestion + '_' + idPoint + '_' + idSubpoint +'">'
                +'    <label for="questionanswers_'+ idQuestion + '_' + idPoint + '_'+ idSubpoint +'"></label>'
                +'</div>';
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
        
        //autoheight textarea
        function auto_grow(element) {
            element.style.height = "5px";
            element.style.height = (element.scrollHeight)+"px";
        }
        //change name of points of question
        $('.rightside').on('change , keypress, keydown, keyup', '.question_points', function(e){
            var id = $(this).attr('name').split('_');
            id[0] = '#questionpointsanswer';
            $(id.join('_')).html($(this).val());
        });

        $('.rightside').on('change , keypress, keydown, keyup', '.ratinstables input[type=text]', function(e){
            var idQuestion = parseInt($(this).attr('name').split('_')[1]);
            var idPoint = parseInt($(this).attr('name').split('_')[2]);
            if(idQuestion && idPoint){
                if($('#questionanswer_'+ idQuestion +'_' + idPoint).next ('label').find('.text').length>0){
                    $('#questionanswer_'+ idQuestion +'_' + idPoint).next ('label').find('.text').html($(this).val());
                }
            }
        });
        $('.rightside').on('change', '.scale-radio input[type=radio]', function(e){
            var el = '';
            var id = parseInt($(this).attr('name').split('_')[1]);
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
                console.log($('#scaleRating5_'+ id +'_1'));
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
                var id = parseInt($(event.target).attr('name').split('_')[1]);
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
                var id = parseInt($(event.target).attr('name').split('_')[1]);
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
            var questionId =  parseInt(prevNameInput[1]);
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
            }
        });

        //delete subpoints
        $('.rightside').on('click', '.deleteSubPoint', function(e){
            var parents = $(this).parents('.branching-list');
            $(this).parents('.branching-group').remove();
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
            var id = parseInt($(this).attr('name').split('_')[1]);
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
            var id = parseInt($(this).attr('name').split('_')[1]);
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
                var item = $(ui.draggable).html();
                var fieldId = 'question'+'_'+i;
                var eventTop = event.pageY;
                var children = $('.questions-box').children();
                var appendInde = getAppendIndex(children, eventTop);
                var el = '';
                var option = '';
                var id = parseInt($('.questions-box').attr('data-count')) + 1;

                var type = $(ui.draggable).attr('data-type');
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
                    '<div class="question active" data-optionid="'+ id +'">'
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
                    +'</div>';
                    option =
                    '<div class="optionbox active" id="option_'+ id +'">'
                    +'<input type="hidden" name="questiontype_'+ id +'" value="branching" >'
                    +'<input type="hidden"  class="orderinput" name="questionorder_'+ id +'" value="'+ id +'" >'
                    +'    <div class="header-aside">'
                    +'        Настройки'
                    +'    </div>'
                    +'    <div class="text-aside">'
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
                    +'        Как Вы оцените работу нашего банка?'
                    +'    </div>'
                    +'    <div class="answer answer-colorstar" id="questionanswers_'+ id +'">'
                    +'        <div class="rating">'
                    +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_10" value="10">'
                    +'            <label for="questionanswer_'+ id +'_10"></label>'
                    +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_9" value="9">'
                    +'            <label for="questionanswer_'+ id +'_9"></label>'
                    +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_8" value="8">'
                    +'            <label for="questionanswer_'+ id +'_8"></label>'
                    +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_7" value="7">'
                    +'            <label for="questionanswer_'+ id +'_7"></label>'
                    +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_6" value="6">'
                    +'            <label for="questionanswer_'+ id +'_6"></label>'
                    +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_5" value="5">'
                    +'            <label for="questionanswer_'+ id +'_5"></label>'
                    +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_4" value="4">'
                    +'            <label for="questionanswer_'+ id +'_4"></label>'
                    +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_3" value="3">'
                    +'            <label for="questionanswer_'+ id +'_3"></label>'
                    +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_2" value="2">'
                    +'            <label for="questionanswer_'+ id +'_2"></label>'
                    +'            <input type="radio" name="questionanswer_'+ id +'" id="questionanswer_'+ id +'_1" value="1">'
                    +'            <label for="questionanswer_'+ id +'_1"></label>'
                    +'        </div>'
                    +'    </div>'
                    +'</div> ';
                    option = 
                    '<div class="optionbox active" id="option_'+ id +'">'
                    +'<input type="hidden" name="questiontype_'+ id +'" value="scale" >'
                    +'<input type="hidden"  class="orderinput" name="questionorder_'+ id +'" value="'+ id +'" >'
                    +'    <div class="header-aside">'
                    +'        Настройки'
                    +'    </div>'
                    +'    <div class="text-aside">'
                    +'        <div class="form-group">'
                    +'            <label for="question_'+ id +'">Вопрос</label>'
                    +'            <textarea class="question_name" name="question_'+ id +'" id="question_'+ id +'" placeholder="Введите вопрос"></textarea>'
                    +'        </div>'
                    +'        <div class="scale-option">'
                    +'            <div class="form-group">'
                    +'                <p>Шкала оценок</p>'
                    +'                <div class="scale-radio">'
                    +'                    <input type="radio" name="scale_'+ id +'" id="scale_'+ id +'_1" value="1" checked>'
                    +'                    <label for="scale_'+ id +'_1" class="scalelabel">'
                    +'                        <div class="colorstars"></div>'
                    +'                    </label>'
                    +'                    <input type="radio" name="scale_'+ id +'" id="scale_'+ id +'_2" value="2">'
                    +'                    <label for="scale_'+ id +'_2" class="scalelabel ">'
                    +'                        <div class="stars5"></div>'
                    +'                   </label>'
                    +'                    <input type="radio" name="scale_'+ id +'" id="scale_'+ id +'_3" value="3">'
                    +'                    <label for="scale_'+ id +'_3" class="scalelabel">'
                    +'                        <div class="stars10"></div>'
                    +'                    </label>'
                    +'                    <input type="radio" name="scale_'+ id +'" id="scale_'+ id +'_4" value="4">'
                    +'                    <label for="scale_'+ id +'_4" class="scalelabel">'
                    +'                        <div class="ratings10"></div>'
                    +'                    </label>'
                    +'                    <input type="radio" name="scale_'+ id +'" id="scale_'+ id +'_5" value="5">'
                    +'                    <label for="scale_'+ id +'_5" class="scalelabel">'
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
                    +'                                    <input type="text" name="scaleRating5_'+ id +'_1" id="scaleRating5_'+ id +'_2" placeholder="Введите текст">'
                    +'                               </div>'
                    +'                                <div class="cirlce-group">'
                    +'                                    <div class="circle">2</div>'
                    +'                                    <input type="text" name="scaleRating5_'+ id +'_2" id="scaleRating5_'+ id +'_2" placeholder="Введите текст">'
                    +'                                </div>'
                    +'                                <div class="cirlce-group">'
                    +'                                    <div class="circle">3</div>'
                    +'                                    <input type="text" name="scaleRating5_'+ id +'_3" id="scaleRating5_'+ id +'_3" placeholder="Введите текст">'
                    +'                                </div>'
                    +'                                <div class="cirlce-group">'
                    +'                                    <div class="circle">4</div>'
                    +'                                    <input type="text" name="scaleRating5_'+ id +'_4" id="scaleRating5_'+ id +'_4" placeholder="Введите текст">'
                    +'                                </div>'
                    +'                                <div class="cirlce-group">'
                    +'                                    <div class="circle">5</div>'
                    +'                                    <input type="text" name="scaleRating5_'+ id +'_5" id="scaleRating5_'+ id +'_5" placeholder="Введите текст">'
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
                        var id = parseInt($(event.target).attr('name').split('_')[1]);
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
                        var id = parseInt($(event.target).attr('name').split('_')[1]);
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

                RefreshItems();
                $('.questions-box').attr('data-count', i);
            }
        });
        
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
            RefreshItems();
        });
        
        //activating question
        $('.questions-box').on('click', '.question', function(e){
            if(!$(e.target).hasClass('close-question')){
                var id = parseInt($(this).attr('data-optionid'));
                $('.questions-box .question').removeClass('active');
                $('.optionsblock .optionbox').removeClass('active');
                $(this).addClass('active');
                $('.optionsblock #option_' + id ).addClass('active');
            }
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
                    $('#option_' + $(question).attr('data-optionid')).attr('id', '#optiontemplate_' + $(question).attr('data-optionid'));
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
                var childrenid;
                var prevId;
                var newId;
                console.log($(question).attr('id'));
                if($(question).attr('id')){
                    prevId = $(question).attr('id').split("_");
                    if($(question).find('.question_name').length>0) {
                        childrenid = $(question).find('.question_name').attr('id').split("_");
                    }
                    else {
                        childrenid = $(question).find('input').attr('name').split("_");
                    }
                    prevId[1] = childrenid[1];
                    prevId[0] = 'option';
                    newId = prevId.join('_');
                    $(question).attr('id', newId);
                }
                if($(question).find('.orderinput').length>0){
                    if($(question).find('.question_name').length>0) {
                        childrenid = $(question).find('.question_name').attr('id').split("_");
                    }
                    else {
                        childrenid = $(question).find('input').attr('name').split("_");
                    }
                    $(question).find('.orderinput').val(childrenid[1]);
                }
            });

            var nodeList = childrenOptions;
            var itemsArray = [];
            var parent = nodeList[0].parentNode;
            for (var i = 0; i < nodeList.length; i++) {    
                itemsArray.push(parent.removeChild(nodeList[i]));
            }
            itemsArray.sort(function(nodeA, nodeB) {
                var idA = parseInt($(nodeA).attr('id').split("_")[1]);
                var idB = parseInt($(nodeB).attr('id').split("_")[1]);
                var numberA = parseInt(idA);
                var numberB = parseInt(idB);
                if (numberA < numberB) return -1;
                if (numberA > numberB) return 1;
                return 0;
            })
                .forEach(function(node) {
                parent.appendChild(node)
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
