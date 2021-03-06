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
        $.fn.removeClassPrefix = function(prefix) {
            this.each(function(i, el) {
                var classes = el.className.split(" ").filter(function(c) {
                    return c.lastIndexOf(prefix, 0) !== 0;
                });
                el.className = $.trim(classes.join(" "));
            });
            return this;
        };
        
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

        //plugin for colorpick
        jscolor.install('.rightside');

        function ClearAll(){
            var parentsoption = $('.rightside');
            console.log(parentsoption);
            parentsoption.find('.textasettings .position-text input[value=left]').prop('checked', true);
            parentsoption.find('.textasettings .select-options li[rel=Montserrat]').click();
            var text1 = parentsoption.find('.textasettings .textlevel1').parents('.form-group');
            text1.find('input').val('');
            text1.find('.colorpick input').val('#4D4D4D');
            text1.find('.colorpick .square').css('background', '#4D4D4D');
            text1.find('textarea').val('');
            text1.find('.fontsize .select-options li[rel=44]').click();
            texts2 = parentsoption.find('.textasettings .textlevelsecond');
            if(texts2.length>0){
                texts2.each(function (index, textitem) {

                    var text2 = $(textitem).parents('.form-group');
                    if(index == 0){
                        text2.find('input').val('');
                        text2.find('.colorpick input').val('#4D4D4D');
                        text2.find('.colorpick .square').css('background', '#4D4D4D');
                        text2.find('textarea').val('');
                        text2.find('.fontsize .select-options li[rel=26]').click();
                    }
                    else {
                        text2.remove();
                    }
                });
            }
            if($('.btn-options').find('.btn-remove').length>0){
                $('.btn-options').find('.btn-remove').click();
            }
            $('.hellopahecontainer').css('background-image', 'none');
            $('.hellopahecontainer .drag').remove();
        }
        //clear form 
        $('.page-content').on('click', '.clear-wellcome', function(e){
            var pollid = $('#quiz-id').val();
            if(pollid){
                $.ajax ({
                    type: 'POST',
                    url: "/admin/poll/delete-wellcome",
                    dataType: "json",
                    data: { 
                        id: pollid
                    },
                }).done(function (data) {
                    ClearAll();
                    console.log('Данные удалены');
                }).fail(function (data) {
                    // не удалось выполнить запрос к серверу
                    console.log(data);
                    console.log('Запрос не принят');
                });
            }
        });
        //clear form 
        $('.page-content').on('click', '.clear-thanks', function(e){
            var pollid = $('#quiz-id').val();
            if(pollid){
                $.ajax ({
                    type: 'POST',
                    url: "/admin/poll/delete-thanks",
                    dataType: "json",
                    data: { 
                        id: pollid
                    },
                }).done(function (data) {
                    ClearAll();
                    console.log('Данные удалены');
                }).fail(function (data) {
                    // не удалось выполнить запрос к серверу
                    console.log(data);
                    console.log('Запрос не принят');
                });
            }
        });

        //Make element draggable
        $(".drag").draggable({
            appendTo: ".dragable",
            containment: ".dragable",
            // grid: [ 20, 20 ],
            stop: function( event, ui ) {
                var top = ui.position.top;
                var left = ui.position.left;
                SetPositionOfElement(event.target, top, left);
            }
        });
        //resize image
        $( ".dragimage" ).resizable({
            containment: ".dragable",
            // grid: [ 20, 20 ],
            aspectRatio: true,
            handles: "n, e, s, w",
            stop: function( event, ui ) {
                var top = ui.position.top;
                var left = ui.position.left;
                SetPositionOfElement(event.target, top, left);
            }
        });
        //resize text
        $( ".dragtext" ).resizable({
            autoHide: false,
            containment: ".dragable",
            // grid: [ 20, 20 ],
            handles: "n, e, s, w",
            stop: function( event, ui ) {
                var top = ui.position.top;
                var left = ui.position.left;
                SetPositionOfElement(event.target, top, left);
            }
        });
        // image as background
        $('.page-content').on('change', '.pictureforpage', function(e){
            var fileName = e.target.files[0].name;
            if($('.dropzone-file').length>0) {
                $('.dropzone-file').remove();
            }
            if (e.target.files && e.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('.hellopahecontainer').css('background-image', 'url(' + e.target.result + ')');
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        });
        //change input for file
        // $('.page-content').on('change', '.pictureforpage', function(e){
        //     var fileName = e.target.files[0].name;
        //     var newinputfile = '<input type="file" name="pictures[]" class="realfileinput pictureforpage" />';
        //     $(newinputfile).insertBefore($(this));
        //     if($('.dropzone-file').length>0) {
        //         $('.dropzone-file').remove();
        //     }
        //     var image = 
        //     '<div class="drag dragimage newimage">'
        //     +'    <div class="remove-picture "></div>'
        //     +'    <input type="hidden" name="picture" value="562">'
        //     +'    <img src="./img/hellopage_pic_1.png" alt="">'
        //     +'</div>';
        //     $('.hellopahecontainer').append(image);
        //     if (e.target.files && e.target.files[0]) {
        //         var reader = new FileReader();
        //         reader.onload = function (e) {
        //             $('.newimage img').attr('src', e.target.result);
        //             $('.newimage').removeClass('newimage');
        //         }
        //         reader.readAsDataURL(e.target.files[0]);
        //     }
        //     //resize image
        //     $( ".dragimage" ).resizable({
        //         containment: ".dragable",
        //         grid: [ 20, 20 ],
        //         aspectRatio: true,
        //         handles: "n, e, s, w"
        //     });

        //     //Make element draggable
        //     $(".drag").draggable({
        //         appendTo: ".dragable",
        //         containment: ".dragable",
        //         grid: [ 20, 20 ],
        //         stop: function( event, ui ) {
        //             console.log(event);
        //             console.log(ui);
        //         }
        //     });

        // });
        
        //remove picture
        $('.page-content').on('click', '.remove-picture', function(e){
            $(this).parents('.dragimage').remove();
        });
        $('.page-content').on('click', '.addpicture', function(e){
            $(this).next('input[type=file]').click();
        });

        //change of font size
        $('.rightside').on('change', '.font1size', function(e){
            var fontsize = $(this).val() + "px";
            if($('.hellopahecontainer').find('.text1level').length>0){
                if(parseInt($('.hellopahecontainer').find('.text1level').width()) < 150){
                    $('.hellopahecontainer').find('.text1level').css('width','auto');
                }
                if(parseInt($('.hellopahecontainer').find('.text1level .text').height()) + 30 > parseInt($('.hellopahecontainer').find('.text1level').height()) && parseInt($('.hellopahecontainer').find('.text1level').width()) > 150){
                    $('.hellopahecontainer').find('.text1level').css('height','auto');
                }
                var top = $('.hellopahecontainer').find('.text1level')[0].offsetTop;
                var left = $('.hellopahecontainer').find('.text1level')[0].offsetLeft;
                SetPositionOfElement($('.hellopahecontainer').find('.text1level'), top, left);
            }
            $('.centerbox .text1level .text').css('font-size', fontsize);
        });

        //font change
        $('.rightside').on('change', '.fontselect', function(e){
            var className = "font" + $(this).val();
            $('.centerbox').removeClassPrefix("font");
            $('.centerbox').addClass(className);
        });

        //add header text
        $('.rightside').on('change, keypress, keydown, keyup', '.textlevel1', function(e){
            if($('.hellopahecontainer').find('.text1level').length>0){
                if(parseInt($('.hellopahecontainer').find('.text1level').width()) < 150){
                    $('.hellopahecontainer').find('.text1level').css('width','auto');
                }
                if(parseInt($('.hellopahecontainer').find('.text1level .text').height()) + 30 > parseInt($('.hellopahecontainer').find('.text1level').height()) && parseInt($('.hellopahecontainer').find('.text1level').width()) > 150){
                    $('.hellopahecontainer').find('.text1level').css('height','auto');
                }
                $('.hellopahecontainer').find('.text1level .text').html($(this).val());
                var top = $('.hellopahecontainer').find('.text1level')[0].offsetTop;
                var left = $('.hellopahecontainer').find('.text1level')[0].offsetLeft;
                SetPositionOfElement($('.hellopahecontainer').find('.text1level'), top, left);
            }
            else {
                var color = $('.textlevel1').parents('.blocktext').find('.colorpick1level input[type=text]').val();
                var fontsize = $('.font1size').val() + "px";
                var text1 = 
                '<div class="drag dragtext text1level" style="left: 20px; top: 20px;">'
                +'    <div class="text" style="color: ' + color + ';font-size: ' + fontsize + ';">'+ $(this).val() + '</div>'
                +'</div>';
                $(text1).appendTo($('.hellopahecontainer'));
            }
            auto_grow(this);
            //Make element draggable
            $(".drag").draggable({
                appendTo: ".dragable",
                containment: ".dragable",
                // grid: [ 20, 20 ],
                stop: function( event, ui ) {
                    var top = ui.position.top;
                    var left = ui.position.left;
                    SetPositionOfElement(event.target, top, left);
                }
            });
            //resize text
            $( ".dragtext" ).resizable({
                autoHide: false,
                containment: ".dragable",
                // grid: [ 20, 20 ],
                handles: "n, e, s, w",
                stop: function( event, ui ) {
                    var top = ui.position.top;
                    var left = ui.position.left;
                    SetPositionOfElement(event.target, top, left);
                }
            });
        });

        //change of font second level size
        $('.rightside').on('change', '.fontsecondsize', function(e){
            var fontsize = $(this).val() + "px";
            var id = $(this).attr('name').split('_')[1];
            $('#secondtext_' + id + ' .text').css('font-size', fontsize);
            if($('#secondtext_' + id).find('.text').length>0){
                if(parseInt($('#secondtext_' + id).width()) < 150){
                    $('#secondtext_' + id).css('width','auto');
                }
                if(parseInt($('#secondtext_' + id).find('.text').height()) + 15 > parseInt($('#secondtext_' + id).height()) && parseInt($('#secondtext_' + id).width()) > 150){
                    $('#secondtext_' + id).css('height','auto');
                }
                var top = $('#secondtext_' + id)[0].offsetTop;
                var left = $('#secondtext_' + id)[0].offsetLeft;
                SetPositionOfElement($('#secondtext_' + id), top, left);
            }

        });
        
        //change of color second level 
        $('.rightside').on('input', '.colorpicksecond input[type=text]', function(e){
            var value = $(this).val();
            var id = $(this).parents('.colorpick').find('input[type=text]').attr('name').split('_')[1];
            $(this).parents('.colorpick').find('.square').css( 'background', value);
            $('#secondtext_' + id + ' .text').css('color', value);
        });

        //add second in textarea text
        $('.rightside').on('change, keypress, keydown, keyup', '.textlevelsecond', function(e){
            var id = $(this).attr('name').split('_')[1];
            if($('#secondtext_' + id).find('.text').length>0){
                if(parseInt($('#secondtext_' + id).width()) < 150){
                    $('#secondtext_' + id).css('width','auto');
                }
                if(parseInt($('#secondtext_' + id).find('.text').height()) + 15 > parseInt($('#secondtext_' + id).height()) && parseInt($('#secondtext_' + id).width()) > 150){
                    $('#secondtext_' + id).css('height','auto');
                }
                $('#secondtext_' + id).find('.text').html($(this).val());
                var top = $('#secondtext_' + id)[0].offsetTop;
                var left = $('#secondtext_' + id)[0].offsetLeft;
                SetPositionOfElement($('#secondtext_' + id), top, left);
            }
            else {
                var color = $(this).parents('.blocktext').find('.colorpick input[type=text]').val();
                var fontsize = $(this).parents('.blocktext').find('.fontsecondsize').val() + "px";
                var text1 = 
                '<div class="drag dragtext textsecond" id="secondtext_' + id + '" style="left: 20px; top: 20px;">'
                +'    <div class="text" style="color: ' + color + ';font-size: ' + fontsize + ';">'+ $(this).val() + '</div>'
                +'</div>';
                $(text1).appendTo($('.hellopahecontainer'));
            }
            auto_grow(this);
            //Make element draggable
            $(".drag").draggable({
                appendTo: ".dragable",
                containment: ".dragable",
                // grid: [ 20, 20 ],
                stop: function( event, ui ) {
                    var top = ui.position.top;
                    var left = ui.position.left;
                    SetPositionOfElement(event.target, top, left);
                }
            });
            //resize text
            $( ".dragtext" ).resizable({
                autoHide: false,
                containment: ".dragable",
                // grid: [ 20, 20 ],
                handles: "n, e, s, w",
                stop: function( event, ui ) {
                    var top = ui.position.top;
                    var left = ui.position.left;
                    SetPositionOfElement(event.target, top, left);
                }
            });
        });

        //page position
        $('.rightside').on('change', '.textasettings .position-text input[type=radio]', function(e){
            var className = "align" + $(this).val();
            $('.centerbox').removeClass('alignleft');
            $('.centerbox').removeClass('aligncenter');
            $('.centerbox').removeClass('alignright');
            $('.centerbox').addClass(className);
        });

        //add secondtext
        $('.rightside').on('click', '.addsecondtext', function(e){
            if($(this).parents('.templatecol').length>0) {
                $(this).parents('.templatecol').remove();
            }
            var id = 2;
            if($('.rightside').find('.secondtextgroup').length>0){
                id = parseInt($('.rightside .secondtextgroup:last-child input[type=text]').attr('name').split('_')[1]) + 1;
            }
            var newsecondtext = 
            '<div class="form-group secondtextgroup">'
            +'    <input type="hidden" class="secondtexttop" name="texttop_'+ id + '" value="20">'
            +'    <input type="hidden" class="secondtextleft" name="textleft_'+ id + '" value="20">'
            +'    <input type="hidden" class="secondtextwidth" name="textwidth_'+ id + '">'
            +'    <input type="hidden" class="secondtextheight" name="textheight_'+ id + '">'
            +'    <input type="hidden" name="texttype_'+ id + '" value="2">'
            +'    <div class="top-col">'
            +'        <div class="addsecondtext"></div>'
            +'        <div class="removesecondtext"></div>'
            +'    </div>'
            +'    <div class="blocktext">'
            +'        <div class="colorpick colorpicksecond">'
            +'            <div class="square" style="background: #4D4D4D;"></div>'
            +'            <div class="inputs">'
            +'                <input type="text" name="color_'+ id + '" id="color_'+ id + '" value="#4D4D4D" data-jscolor="">'
            +'            </div>'
            +'            <div class="labelcolor">'
            +'           <label for="color_'+ id + '">Текст второго уровня</label>'
            +'          </div>'
            +'      </div>'
            +'      <div class="fontsize smallselect-wrapper">'
            +'           <select name="fontsize_'+ id + '" class="customselect fontsecondsize ">'
            +'               <option value="44">44</option>'
            +'              <option value="36">36</option>'
            +'              <option value="36">32</option>'
            +'              <option value="28" selected>28</option>'
            +'              <option value="28">26</option>'
            +'              <option value="24">24</option>'
            +'              <option value="18">18</option>'
            +'              <option value="16">16</option>'
            +'              <option value="14">14</option>'
            +'              <option value="12">12</option>'
            +'          </select>'
            +'      </div>'
            +'      <div class="textblock">'
            +'          <textarea name="textlevel_'+ id + '" class="textlevelsecond" placeholder="Введите текст"></textarea>'
            +'      </div>'
            +'  </div>'
            +'</div>';
            $(newsecondtext).appendTo($('.rightside .text-aside .textasettings'));
            //plugin for colorpick
            jscolor.install('.rightside');
            customSelectActive();
        });

        //removesecondtext
        $('.rightside').on('click', '.removesecondtext', function(e){
            var id = $(this).parents('.form-group').find('input[type=text]').attr('name').split('_')[1];
            $(this).parents('.form-group').remove();
            if($('#secondtext_' + id).length>0){
                $('#secondtext_' + id).remove();
            }
            RefreshSecondTextIndex();
        });

        //btnoptions
        $('.rightside').on('change', '.btn-options .position input[type=radio]', function(e){
            $('.dragbtn').find('.btn-cont .btn').css('text-align', $(this).val());
        });

        $('.rightside').on('change', '.btnwidth', function(e){
            var value = $(this).val() + 'px';
            $('.dragbtn').find('.btn-cont .btn').css('width', value);
        });

        $(".btnwidth").inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 1500);
        });

        $('.rightside').on('change', '.btnheight', function(e){
            var value = $(this).val() + 'px';
            $('.dragbtn').find('.btn-cont .btn').css('height', value);
        });

        $(".btnheight").inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500);
        });


        $('.rightside').on('change', '.btnradius', function(e){
            var value = $(this).val() + "px";
            $('.dragbtn').find('.btn-cont .btn').css( {  borderRadius:   value });
        });

        
        $(".btnradius").inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500);
        });

        //btn background color
        $('.rightside').on('input', '.btncolor', function(e){
            var value = $(this).val();
            $('.dragbtn').find('.btn-cont  .btn').css( 'background', value);
            $(this).parents('.optionbtngroup').find('.color').css( 'background', value);
        });

        $('.rightside').on('click', '.btncolor', function(e){
            $(this).prev('input').click();
        });

        $('.rightside').on('input', '.hiddeninputcolor', function(e){
            $(this).next('input').val($(this).val());
            var value = $(this).val();
            $('.dragbtn').find('.btn-cont .btn').css( 'background', value);
            
            $(this).parents('.btn-options-group').find('.optionbtntextcolor .color').css( 'background', value);
            $(this).parents('.optionbtngroup').find('.color').css( 'background', value);
        });
        //btn text color 
        $('.rightside').on('input', '.btntextcolor', function(e){
            var value = $(this).val();
            $('.dragbtn').find('.btn-cont  .btn').css( 'color', value);
            $(this).parents('.optionbtngroup').find('.color').css( 'color', value);
        });

        $('.rightside').on('click', '.btntextcolor', function(e){
            $(this).prev('input').click();
        });

        $('.rightside').on('input', '.hiddeninputtextcolor', function(e){
            $(this).next('input').val($(this).val());
            var value = $(this).val();
            $('.dragbtn').find('.btn-cont .btn').css( 'color', value);
            $(this).parents('.optionbtngroup').find('.color').css( 'color', value);
        });

        $('.rightside').on('change, keypress, keydown, keyup', '.btn_name', function(e){
            var value = $(this).val();
            $('.dragbtn').find('.btn-cont .btn').html(value);
        });

        //remove btn 
        $('.rightside').on('click', '.btn-remove', function(e){
            $(this).parents('.rightside').find('.btn-options-group').remove();
            $('.hellopahecontainer .dragbtn').remove();
            $(this).removeClass('btn-remove');
            $(this).addClass('btn-add');
        });

        //add btn 
        $('.rightside').on('click', '.btn-add', function(e){
            $(this).addClass('btn-remove');
            $(this).removeClass('btn-add');
            var btnoptions = 
            '<div class="btn-options-group">'
            +'    <input type="hidden" name="pbtntop" value="20">'
            +'    <input type="hidden" name="pbtnleft"  value="20">'
            +'    <input type="hidden" name="pbtnwidth">'
            +'    <input type="hidden" name="pbtnheight">'
            +'    <div class="position">'
            +'        <div class="left">'
            +'          <input type="radio" value="left" name="btnposition" id="btnposition_1">'
            +'          <label for="btnposition_1">'
            +'          </label>'
            +'      </div>'
            +'      <div class="center">'
            +'          <input type="radio" value="center" name="btnposition" id="btnposition_2" checked>'
            +'          <label for="btnposition_2">'
            +'          </label>'
            +'      </div>'
            +'      <div class="right">'
            +'          <input type="radio" value="right" name="btnposition" id="btnposition_3">'
            +'          <label for="btnposition_3">'
            +'          </label>'
            +'      </div>'
            +'  </div>'
            +'  <div class="row-options">'
            +'      <div class="optionbtngroup">'
            +'          <label for="btnwidth">W</label>'
            +'          <input class="btnwidth" type="text"  name="btnwidth"  id="btnwidth" value="150">'
            +'      </div>'
            +'      <div class="optionbtngroup">'
            +'          <label for="btnheight">H</label>'
            +'          <input class="btnheight" type="text"  name="btnheight"  id="btnheight" value="36">'
            +'      </div>'
            +'  </div>'
            +'  <div class="row-options">'
            +'      <div class="optionbtngroup">'
            +'          <label for="btnradius">'
            +'              <div class="radius"></div>'
            +'          </label>'
            +'          <input class="btnradius" type="text"  name="btnradius"  id="btnradius" value="30">'
            +'      </div>'
            +'      <div class="optionbtngroup">'
            +'          <label for="btncolor">'
            +'              <div class="color"'
            +'              style="background: #F26126"></div>'
            +'          </label>'
            +'          <input class="btncolor" type="text"  name="btncolor"  id="btncolor" value="#F26126" data-jscolor="">'
            +'      </div>'
            +'  </div>'
            +'    <div class="row-options">'
            +'        <div class="optionbtngroup optionbtntextcolor">'
            +'            <label for="btntextcolor">'
            +'                <div class="color" style="'
            +'                background-color: #F26126;'
            +'                color: #ffffff;">T</div>'
            +'            </label>'
            +'            <input class="btntextcolor" type="text" name="btntextcolor" id="btntextcolor"'
            +'                value="#ffffff" data-jscolor="">'
            +'        </div>'
            +'    </div>'
            +'  <div class="form-group">'
            +'      <label for="btnname">Текст кнопки</label>'
            +'      <input class="btn_name" name="btnname" id="btnname" value="Пройти опрос">'
            +'  </div>'
            +'</div>';
            var btnel =
            '<div class="drag dragbtn" style="top: 20px; left: 20px;">'
            +'    <div class="btn-cont" style="text-align: center;">'
            +'      <button class="btn" type="submit"'
            +'          style="'
            +'          background: #F26126;'
            +'          width: 150px;'
            +'          height: 36px;'
            +'          border-radius: 30px;">'
            +'          Пройти опрос'
            +'      </button>'
            +'  </div>'
            +'</div>';
            $(btnel).appendTo($('.hellopahecontainer'));
            $(btnoptions).appendTo($('.rightside .text-aside .btn-options'));
            jscolor.install('.rightside');
            //Make element draggable
            $(".drag").draggable({
                appendTo: ".dragable",
                containment: ".dragable",
                // grid: [ 20, 20 ],
                stop: function( event, ui ) {
                    var top = ui.position.top;
                    var left = ui.position.left;
                    SetPositionOfElement(event.target, top, left);
                }
            });
        });
        

        function RefreshSecondTextIndex() {
            $('.hellopahecontainer').find('.textsecond').addClass('changingid');
            var SecondTexts = $('.rightside').find('.secondtextgroup');
            if(SecondTexts.length>0){
                SecondTexts.each(function (index, text) {
                    var id = index + 2;
                    var inputs = $(text).find('input');
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
                    var labels = $(text).find('label');
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
                    var textareas = $(text).find('textarea');
                    textareas.each(function (index, textarea) {
                        if($(textarea).attr('name')){
                            prevId = $(textarea).attr('name').split("_");
                            var previdsafe = prevId[1];
                            prevId[1] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('name', newId);
                            if($('.changingid#secondtext_'+ previdsafe )){
                                var thistextblock = $('.changingid#secondtext_'+ previdsafe );
                                thistextblock.attr('id', 'secondtext_' + id);
                                thistextblock.removeClass('changingid');
                            }
                        }
                        if($(textarea).attr('id')){
                            prevId = $(textarea).attr('id').split("_");
                            prevId[1] = id;
                            newId = prevId.join('_');
                            $(textarea).attr('id', newId);
                        }
                    });
                });
            }
            else {
                var tepltecol = 
                '<div class="form-group templatecol">'
                +'    <div class="top-col flex-btwn">'
                +'        <p>Текст второго уровня</p>'
                +'        <div class="addsecondtext"></div>'
                +'    </div>'
                +'</div>';
                $(tepltecol).appendTo($('.rightside .text-aside .textasettings'));
            }
        }
        //if hellopahecontainer is empty ad posibility to drag picture 
        // $(".droppable").droppable({
        //     drop: function (e, ui) {
        //         if ($(ui.draggable)[0].id != "") {
        //             x = ui.helper.clone();
        //             ui.helper.remove();
        //         x.draggable({
        //             //helper: 'original',
        //             containment: '.droppable',
        //             tolerance: 'fit',
        //             stack: '.drag'
        //         });

        //         x.resizable({
        //           animate: true,
        //           //aspectRatio: 16 / 9,
        //           helper: "ui-resizable-helper",
        //           handles: "n, e, s, w, nw, ne, sw,se"
        //         });
        //         x.appendTo('.droppable');
        //         }
        //     }
        // });

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
            $('.centerbox .text1level .text').css('color', value);
        });

        var minRows = 5;
        var maxRows = 26;
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
        //customselect
        customSelectActive();
        function customSelectActive(){
            $('.customselect').each(function(){
                if(!$(this).hasClass('select-hidden')){
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
                }
            });   
        }
        function SetPositionOfElement(element, top, left){
            if($(element).hasClass('dragbtn')){
                var width = parseInt($('#btnwidth').val()) + 12;
                var height =  parseInt($('#btnheight').val()) + 12;
                $('.btn-options-group input[name=pbtntop]').val(top);
                $('.btn-options-group input[name=pbtnleft]').val(left);
                $('.btn-options-group input[name=pbtnwidth]').val(width);
                $('.btn-options-group input[name=pbtnheight]').val(height);
            }
            else if($(element).hasClass('text1level')){
                var width = $(element).width();
                var height = $(element).height();
                $('.textasettings input[name=texttop_1]').val(top);
                $('.textasettings input[name=textleft_1]').val(left);
                $('.textasettings input[name=textwidth_1]').val(width);
                $('.textasettings input[name=textheight_1]').val(height);
            }
            else if($(element).hasClass('textsecond')){
                var id = $(element).attr('id').split('_')[1];
                var width = $(element).width();
                var height = $(element).height();
                $('.textasettings input[name=texttop_' + id + ']').val(top);
                $('.textasettings input[name=textleft_' + id + ']').val(left);
                $('.textasettings input[name=textwidth_' + id + ']').val(width);
                $('.textasettings input[name=textheight_' + id + ']').val(height);
            }
        }
        function ResizeScreen(){
            //set position of element
            if($('.text-aside input[name=widthscreen]').val() && $('.text-aside input[name=heightscreen]').val()){
                var prevwidth = parseInt($('.text-aside input[name=widthscreen]').val());
                var prevheight = parseInt($('.text-aside input[name=heightscreen]').val());
                var elements = $('.hellopahecontainer').children();
                elements.each(function (index, element) {
                    var width;
                    var height;
                    var top;
                    var left;
                    if($(element).hasClass('dragbtn')){
                        top = parseInt($('.btn-options-group input[name=pbtntop]').val());
                        left = parseInt($('.btn-options-group input[name=pbtnleft]').val());
                        width = parseInt($('.btn-options-group input[name=pbtnwidth]').val());
                        height = parseInt($('.btn-options-group input[name=pbtnheight]').val());
                    }
                    else if($(element).hasClass('text1level')){
                        top = parseInt($('.textasettings input[name=texttop_1]').val());
                        left = parseInt($('.textasettings input[name=textleft_1]').val());
                        width = parseInt($('.textasettings input[name=textwidth_1]').val());
                        height = parseInt($('.textasettings input[name=textheight_1]').val());
                    }
                    else if($(element).hasClass('textsecond')){
                        var id = $(element).attr('id').split('_')[1];
                        top = parseInt($('.textasettings input[name=texttop_' + id + ']').val());
                        left = parseInt($('.textasettings input[name=textleft_' + id + ']').val());
                        width = parseInt($('.textasettings input[name=textwidth_' + id + ']').val());
                        height = parseInt($('.textasettings input[name=textheight_' + id + ']').val());
                    }
                    if($(element).hasClass('dragbtn')){
                        var perleft = left * (100/prevwidth);
                        var newleft = perleft * (parseInt($('.hellopahecontainer').width())/100);

                        var pertop = top * (100/prevheight);
                        var newtop = pertop * (parseInt($('.hellopahecontainer').height())/100);
                        if(width + newleft > parseInt($('.hellopahecontainer').width())){
                            var index = 0;
                            while(width + newleft > parseInt($('.hellopahecontainer').width()) && index < 20){
                                if(width > parseInt($('.hellopahecontainer').width()) - 100){
                                    newleft = newleft - 20;
                                    width = width - 10;
                                }
                                else {
                                    newleft = newleft - 20;
                                }
                                $(element).css('left', newleft  + 'px');
                                index ++;
                            }
                        }
                        else {
                            $(element).css('left', newleft  + 'px');
                        }
                        if(newtop + height < $('.hellopahecontainer').height()){
                            $(element).css('top', newtop  + 'px' );
                        }
                        else {
                            $(element).css('top', prevheight - height  + 'px' );
                            $(element).css('top', prevheight - height  + 'px' );
                        }
                    }
                    else {
                        var perleft = left * (100/prevwidth);
                        var newleft = perleft * (parseInt($('.hellopahecontainer').width())/100);

                        var pertop = top * (100/prevheight);
                        var newtop = pertop * (parseInt($('.hellopahecontainer').height())/100);

                        if(width + newleft > parseInt($('.hellopahecontainer').width())){
                            var index = 0;
                            while(width + newleft > parseInt($('.hellopahecontainer').width()) && index < 20){
                                if(width > parseInt($('.hellopahecontainer').width()) - 100){
                                    newleft = newleft - 20;
                                    width = width - 10;
                                }
                                else {
                                    newleft = newleft - 20;
                                }
                                $(element).css('left', newleft  + 'px');
                                $(element).css('width', width + 'px');
                                index ++;
                            }
                        }
                        else {
                            $(element).css('left', newleft  + 'px');
                            $(element).css('width', width + 10 + 'px');
                        }
                        $(element).css('height', height + 10  + 'px');
                        if(newtop + height < $('.hellopahecontainer').height()){
                            $(element).css('top', top  + 'px' );
                            $(element).css('top', newtop  + 'px' );
                        }
                        else {
                            $(element).css('top', prevheight - height  + 'px' );
                        }
                    }
                });
            }
            //set options on start
            //set size of screen
            $('.text-aside input[name=widthscreen]').val($('.hellopahecontainer').width());
            $('.text-aside input[name=heightscreen]').val($('.hellopahecontainer').height());
        }
        //page position
        if($('.rightside .textasettings .position-text input[type=radio]:checked').length>0){
            var className = "align" + $('.rightside .textasettings .position-text input[type=radio]:checked').val();
            $('.centerbox').addClass(className);
        }
        else {
            $('.rightside .textasettings .position-text input[type=radio][value=left]').attr('checked', 'checked');
        }

        //font size 1level
        if($('.rightside .font1size').val()){
            var fontsize = $('.rightside .font1size').val() + "px";
            $('.centerbox .text1level .text').css('font-size', fontsize);
        }
        //font family
        if($('.rightside .fontselect').val()){
            var className = "font" + $('.rightside .fontselect').val();
            $('.centerbox').addClass(className);
        }
        //set second text font size and color
        if($('.rightside .secondtextgroup').length>0){
            var SecondTexts = $('.rightside .secondtextgroup');
            SecondTexts.each(function (index, text) {
                var id = $(text).find('input[type=text]').attr('name').split('_')[1];
                var fontsize = $(text).find('.fontsecondsize').val() + "px";
                var color = $(text).find('.colorpicksecond input[type=text]').val();
                $('#secondtext_' + id + ' .text').css('font-size', fontsize);
                $('#secondtext_' + id + ' .text').css('color', color);
            });
        }
        //set btn options
        //btn position
        if($('.rightside .btn-options .position input[type=radio]:checked').length>0){
            $('.dragbtn').find('.btn-cont .btn').css('text-align', $('.rightside .btn-options .position input[type=radio]:checked').val());
        }
        //btnwidth
        if($('.rightside .btnwidth').length>0){
            var btnwidth =$('.rightside .btnwidth').val() + 'px';
            $('.dragbtn').find('.btn-cont .btn').css('width', btnwidth);
        }
        //btnheight
        if($('.rightside .btnheight').length>0){
            var btnheight =$('.rightside .btnheight').val() + 'px';
            $('.dragbtn').find('.btn-cont .btn').css('height', btnheight);
        }
        //btnradius
        if($('.rightside .btnradius').length>0){
            var btnradius =$('.rightside .btnradius').val() + 'px';
            $('.dragbtn').find('.btn-cont .btn').css( {  borderRadius:   btnradius });
        }
        //btn color
        if($('.rightside .hiddeninputcolor').length>0){
            var color = $('.rightside .hiddeninputcolor').val();
            $('.dragbtn').find('.btn-cont .btn').css( 'background', color);
        }
        //btn text color 
        if($('.rightside .hiddeninputtextcolor').length>0){
            var color = $('.rightside .hiddeninputtextcolor').val();
            $('.dragbtn').find('.btn-cont .btn').css( 'color', color);
        }
        //set header text
        if($('.rightside .textlevel1').val()){
            var color = $('.textlevel1').parents('.blocktext').find('.colorpick1level input[type=text]').val();
            var fontsize = $('.font1size').val() + "px";
            var text1 = 
            '<div class="drag dragtext text1level" style="left: 20px; top: 20px;">'
            +'    <div class="text" style="color: ' + color + ';font-size: ' + fontsize + ';">'+ $('.rightside .textlevel1').val() + '</div>'
            +'</div>';
            $(text1).appendTo($('.hellopahecontainer'));
        }
        //set second level text
        if($('.rightside .textlevelsecond').length>0){
            var SecondTexts = $('.rightside .textlevelsecond');
            SecondTexts.each(function (index, text) {
                if($(text).val()){
                    var id = $(text).attr('name').split('_')[1];
                    var color = $(text).parents('.blocktext').find('.colorpick input[type=text]').val();
                    var fontsize = $(text).parents('.blocktext').find('.fontsecondsize').val() + "px";
                    var text1 = 
                    '<div class="drag dragtext textsecond" id="secondtext_' + id + '" style="left: 20px; top: 20px;">'
                    +'    <div class="text" style="color: ' + color + ';font-size: ' + fontsize + ';">'+ $(text).val() + '</div>'
                    +'</div>';
                    $(text1).appendTo($('.hellopahecontainer'));
                }
            });
        }
        //set btn
        if($('#btnname').val() && $('#btnwidth').val() && $('#btnheight').val() && $('#btncolor').val()){
            var btntext = $('#btnname').val();
            var btncolor = $('#btncolor').val();
            var btnwidth = $('#btnwidth').val() + 'px';
            var btnheight = $('#btnheight').val() + 'px';
            var btnradius = $('#btnradius').val() + 'px';
            var btntextcolor =$('#btntextcolor').val();
            var position = "center";
            if($('input[name=btnposition]:checked').val()){
                position = $('input[name=btnposition]:checked').val();
            }
            var btnel =
            '<div class="drag dragbtn" style="top: 20px; left: 20px;">'
            +'    <div class="btn-cont" style="text-align: '+ position + ';">'
            +'      <button class="btn" type="submit"'
            +'          style="'
            +'          background: '+ btncolor + ';'
            +'          width: ' + btnwidth + ';'
            +'          height: '+ btnheight + ';'
            +'          border-radius: '+ btnradius + ';'
            +'          color: '+ btntextcolor + '">'
            +'          ' + btntext
            +'      </button>'
            +'  </div>'
            +'</div>';
            $(btnel).appendTo($('.hellopahecontainer'));
        }
        //Make element draggable
        $(".drag").draggable({
            appendTo: ".dragable",
            containment: ".dragable",
            // grid: [ 20, 20 ],
            stop: function( event, ui ) {
                var top = ui.position.top;
                var left = ui.position.left;
                SetPositionOfElement(event.target, top, left);
            }
        });
        // resize text
        $( ".dragtext" ).resizable({
            autoHide: false,
            containment: ".dragable",
            // grid: [ 20, 20 ],
            handles: "n, e, s, w",
            stop: function( event, ui ) {
                var top = ui.position.top;
                var left = ui.position.left;
                SetPositionOfElement(event.target, top, left);
            }
        });
        ResizeScreen();
        $(window).resize(function() {
            if(Math.abs(parseInt($('.text-aside input[name=widthscreen]').val()) - parseInt($('.hellopahecontainer').width())) > 20) {
                ResizeScreen();
            }
        });
    });
});
$(document).click(function(e) {
    // matches all children of droppable, change selector as needed
    if( $(e.target).is(".droppable .drag") ) {
        $(e.target).find(".ui-resizable-handle").show();
		$(".tools").show();
    }
    else {
        $(".droppable").find(".ui-resizable-handle").hide();
		$(".tools").hide();
    }
});