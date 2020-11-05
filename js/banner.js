
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

        //Make element draggable
        $(".drag").draggable({
            appendTo: ".dragable",
            containment: ".dragable",
            grid: [ 10, 10 ],
            stop: function( event, ui ) {
                var top = ui.position.top;
                var left = ui.position.left;
                SetPositionOfElement(event.target, top, left);
            }
        });
        //resize image
        $( ".dragimage" ).resizable({
            containment: ".dragable",
            grid: [ 10, 10 ],
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
            grid: [ 10, 10 ],
            handles: "n, e, s, w",
            stop: function( event, ui ) {
                var top = ui.position.top;
                var left = ui.position.left;
                SetPositionOfElement(event.target, top, left);
            }
        });

        //plugin for colorpick
        jscolor.install('.rightside');

        //set backgroun image
        $('.rightside').on('change', '.setbackground input[type=radio]', function(e){
            if($(this).is(':checked')){
                if($('.bannercontainer').attr('data-background')){
                    var prevId = $('.bannercontainer').attr('data-background');
                    var prevsrc = $('.bannercontainer').css('background-image');
                    prevsrc = prevsrc.replace('url(','').replace(')','').replace(/\"/gi, "");

                    var image = 
                    '<div class="drag dragimage" id="image_'+ prevId + '" style="width: 300px;" data-id="'+ prevId + '">'
                    +'    <div class="remove-picture "></div>'
                    +'    <input type="hidden" name="picture" value="'+ prevId + '">'
                    +'    <img src="'+ prevsrc + '" alt="">'
                    +'</div>';
                    $('.bannercontainer').append(image);
                    //resize image
                    $( ".dragimage" ).resizable({
                        containment: ".dragable",
                        grid: [ 10, 10 ],
                        aspectRatio: true,
                        handles: "n, e, s, w",
                        stop: function( event, ui ) {
                            var top = ui.position.top;
                            var left = ui.position.left;
                            SetPositionOfElement(event.target, top, left);
                        }
                    });
                    //Make element draggable
                    $(".drag").draggable({
                        appendTo: ".dragable",
                        containment: ".dragable",
                        grid: [ 10, 10 ],
                        stop: function( event, ui ) {
                            var top = ui.position.top;
                            var left = ui.position.left;
                            SetPositionOfElement(event.target, top, left);
                        }
                    });
                }
                var id = $(this).val();
                var src = $('#image_' + id).find('img').attr('src');
                $('.bannercontainer').css('background', 'none');
                $('.bannercontainer').css('background-image', 'url(' + src + ')');
                $('.bannercontainer').css('background-position', 'center');
                $('.bannercontainer').css('background-repeat', 'no-repeat');
                $('.bannercontainer').css('background-size', 'cover');
                $('.bannercontainer').attr('data-background', id);
                $('#image_' + id).remove();
            }
        });


        //set background color
        $('.rightside').on('change', '.settextbackground input[type=checkbox]', function(e){
            if($(this).is(':checked')){
                var color = $('.rightside .textbackgroundrow .textbannercolor').val();
                $('.bannercontainer .dragtext').addClass('backgroundtext');
                $('.bannercontainer .dragtext').css('background', color);
            }
            else {
                $('.bannercontainer .dragtext').removeClass('backgroundtext');
                $('.bannercontainer .dragtext').css('background', 'transparent');
            }
        });
        //set background color
        $('.rightside').on('change', '.setbackgroundcolor input[type=radio]', function(e){
            if($(this).is(':checked')){
                if($('.bannercontainer').attr('data-background')){
                    var prevId = $('.bannercontainer').attr('data-background');
                    var prevsrc = $('.bannercontainer').css('background-image');
                    prevsrc = prevsrc.replace('url(','').replace(')','').replace(/\"/gi, "");
                    var image = 
                    '<div class="drag dragimage" id="image_'+ prevId + '" style="width: 300px;" data-id="'+ prevId + '">'
                    +'    <div class="remove-picture "></div>'
                    +'    <input type="hidden" name="picture" value="'+ prevId + '">'
                    +'    <img src="'+ prevsrc + '" alt="">'
                    +'</div>';
                    $('.bannercontainer').append(image);
                    //resize image
                    $( ".dragimage" ).resizable({
                        containment: ".dragable",
                        grid: [ 10, 10 ],
                        aspectRatio: true,
                        handles: "n, e, s, w",
                        stop: function( event, ui ) {
                            var top = ui.position.top;
                            var left = ui.position.left;
                            SetPositionOfElement(event.target, top, left);
                        }
                    });
                    //Make element draggable
                    $(".drag").draggable({
                        appendTo: ".dragable",
                        containment: ".dragable",
                        grid: [ 10, 10 ],
                        stop: function( event, ui ) {
                            var top = ui.position.top;
                            var left = ui.position.left;
                            SetPositionOfElement(event.target, top, left);
                        }
                    });
                    $('.bannercontainer').css('background-image', 'none');
                    $('.bannercontainer').removeAttr('data-background');
                }
                if($('.dropzone-file').length>0) {
                    $('.dropzone-file').remove();
                }
                var color = $(this).parents('.colorrow').find('.bannercolor').val();
                $('.bannercontainer').css('background', color);
            }
        });

        //change color background

        $('.page-content').on('input', '.colorrow .bannercolor', function(e){
            var color = $(this).val();
            $(this).parents('.optiongroup').find('.color').css('background', color);
            if($(this).parents('.colorrow').find('input[name=setbackground]').is(':checked')){
                $('.bannercontainer').css('background', color);
            }
        });

        //change color background text
        $('.page-content').on('input', '.textbackgroundrow .textbannercolor', function(e){
            var color = $(this).val();
            $(this).parents('.optiongroup').find('.color').css('background', color);
            if($(this).parents('.textbackgroundrow').find('input[name=settextbackground]').is(':checked')){
                $('.bannercontainer .dragtext').css('background', color);
            }
        });
        $('.page-content').on('click', '.removeimage', function(e){
            var id = $(this).parents('.imagerow').find('.setbackground input[type=radio]').val();
            if($('#image_' + id).length>0) {
                $('#image_' + id).find('.remove-picture').click();
            }
            else {
                $('.bannercontainer').removeAttr('data-background');
                $('.bannercontainer').css('background', 'transparent');
                $(this).parents('.imagerow').remove();
            }
        });
        // change input for file
        $('.page-content').on('change', '.pictureforpage', function(e){
            var fileName = e.target.files[0].name;
            var newinputfile = '<input type="file" name="pictures[]" class="realfileinput pictureforpage" />';
            $(newinputfile).insertBefore($(this));
            if($('.dropzone-file').length>0) {
                $('.dropzone-file').remove();
            }
            var id = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
            var image = 
            '<div class="drag dragimage newimage" id="image_'+ id + '" style="width: 300px; top: 50px;" data-id="'+ id + '">'
            +'    <div class="remove-picture "></div>'
            +'    <img src="./img/hellopage_pic_1.png" alt="">'
            +'</div>';

            var imageSetings = 
            '<div class="imagerow">'
            +'    <div class="filename">'+ fileName + '</div>'
            +'    <input type="hidden" name="imagetop_' + id + '">'
            +'    <input type="hidden" name="imageleft_' + id + '">'
            +'    <input type="hidden" name="imagewidth_' + id + '">'
            +'    <input type="hidden" name="imageheight_' + id + '">'
            +'  <div class="removeimage">'
            +'      <div class="icon-remove"></div>'
            +'      <div class="tooltip">Удалить изображение</div>'
            +'  </div>'
            +'  <div class="setbackground">'
            +'      <input type="radio" name="setbackground" id="setbackground_' + id + '" value="' + id + '">'
            +'      <label for="setbackground_' + id + '"></label>'
            +'      <div class="tooltip">Сделать фоновым рисунком</div>'
            +'  </div>'
            +'</div>';
            $('.filerow .imagelist').append(imageSetings);
            $('.bannercontainer').append(image);
            if (e.target.files && e.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('.newimage img').attr('src', e.target.result);
                    $('.newimage').removeClass('newimage');
                }
                reader.readAsDataURL(e.target.files[0]);
            }
            //resize image
            $( ".dragimage" ).resizable({
                containment: ".dragable",
                grid: [ 10, 10 ],
                aspectRatio: true,
                handles: "n, e, s, w",
                stop: function( event, ui ) {
                    var top = ui.position.top;
                    var left = ui.position.left;
                    SetPositionOfElement(event.target, top, left);
                }
            });
            //Make element draggable
            $(".drag").draggable({
                appendTo: ".dragable",
                containment: ".dragable",
                grid: [ 10, 10 ],
                stop: function( event, ui ) {
                    var top = ui.position.top;
                    var left = ui.position.left;
                    SetPositionOfElement(event.target, top, left);
                }
            });
        });
        
        //remove picture
        $('.page-content').on('click', '.remove-picture', function(e){
            var id = $(this).parents('.dragimage').attr('id').split('_')[1];
            $('#setbackground_' + id).parents('.imagerow').remove();
            $(this).parents('.dragimage').remove();
        });
        $('.page-content').on('click', '.addpicture', function(e){
            $(this).next('input[type=file]').click();
        });

        //change of font size
        $('.rightside').on('change', '.font1size', function(e){
            var fontsize = $(this).val() + "px";
            if($('.bannercontainer').find('.text1level').length>0){
                if(parseInt($('.bannercontainer').find('.text1level').width()) < 150){
                    $('.bannercontainer').find('.text1level').css('width','auto');
                }
                if(parseInt($('.bannercontainer').find('.text1level .text').height()) + 30 > parseInt($('.bannercontainer').find('.text1level').height()) && parseInt($('.bannercontainer').find('.text1level').width()) > 150){
                    $('.bannercontainer').find('.text1level').css('height','auto');
                }
                var top = $('.bannercontainer').find('.text1level')[0].offsetTop;
                var left = $('.bannercontainer').find('.text1level')[0].offsetLeft;
                SetPositionOfElement($('.bannercontainer').find('.text1level'), top, left);
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
            if($('.bannercontainer').find('.text1level').length>0){
                if(parseInt($('.bannercontainer').find('.text1level').width()) < 150){
                    $('.bannercontainer').find('.text1level').css('width','auto');
                }
                if(parseInt($('.bannercontainer').find('.text1level .text').height()) + 30 > parseInt($('.bannercontainer').find('.text1level').height()) && parseInt($('.bannercontainer').find('.text1level').width()) > 150){
                    $('.bannercontainer').find('.text1level').css('height','auto');
                }
                $('.bannercontainer').find('.text1level .text').html($(this).val());
                var top = $('.bannercontainer').find('.text1level')[0].offsetTop;
                var left = $('.bannercontainer').find('.text1level')[0].offsetLeft;
                SetPositionOfElement($('.bannercontainer').find('.text1level'), top, left);
            }
            else {
                var color = $('.textlevel1').parents('.blocktext').find('.colorpick1level input[type=text]').val();
                var fontsize = $('.font1size').val() + "px";
                var text1 = 
                '<div class="drag dragtext text1level" style="left: 20px; top: 50px;">'
                +'    <div class="text" style="color: ' + color + ';font-size: ' + fontsize + ';">'+ $(this).val() + '</div>'
                +'</div>';
                $(text1).appendTo($('.bannercontainer'));
                if($('.rightside .textbackgroundrow input[name=settextbackground]:checked').length>0){
                    var textBg = $('.rightside .textbackgroundrow .textbannercolor').val();
                    $('.bannercontainer .dragtext').addClass('backgroundtext');
                    $('.bannercontainer .dragtext').css('background', textBg);
                }
            }
            auto_grow(this);
            //Make element draggable
            $(".drag").draggable({
                appendTo: ".dragable",
                containment: ".dragable",
                grid: [ 10, 10 ],
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
                grid: [ 10, 10 ],
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
                var fontsize = $(this).parents('.blocktext').find('.font1size').val() + "px";
                var text1 = 
                '<div class="drag dragtext textsecond" id="secondtext_' + id + '" style="left: 20px; top: 50px;">'
                +'    <div class="text" style="color: ' + color + ';font-size: ' + fontsize + ';">'+ $(this).val() + '</div>'
                +'</div>';
                $(text1).appendTo($('.bannercontainer'));
                if($('.rightside .textbackgroundrow input[name=settextbackground]:checked').length>0){
                    var textBg = $('.rightside .textbackgroundrow .textbannercolor').val();
                    $('.bannercontainer .dragtext').addClass('backgroundtext');
                    $('.bannercontainer .dragtext').css('background', textBg);
                }
            }
            auto_grow(this);
            //Make element draggable
            $(".drag").draggable({
                appendTo: ".dragable",
                containment: ".dragable",
                grid: [ 10, 10 ],
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
                grid: [ 10, 10 ],
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
            +'                <input type="text" name="color_'+ id + '" id="color_'+ id + '" value="#4D4D4D"  data-jscolor="">'
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
            customSelectActive();
            //plugin for colorpick
            jscolor.install('.rightside');
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

        function RefreshSecondTextIndex() {
            $('.bannercontainer').find('.textsecond').addClass('changingid');
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
            if($(element).hasClass('text1level')){
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
            else if($(element).hasClass('dragimage')){
                var id = $(element).attr('id').split('_')[1];
                var width = $(element).width();
                var height = $(element).height();
                $('.imagelist input[name=imagetop_' + id + ']').val(top);
                $('.imagelist input[name=imageleft_' + id + ']').val(left);
                $('.imagelist input[name=imagewidth_' + id + ']').val(width);
                $('.imagelist input[name=imageheight_' + id + ']').val(height);
            }
        }
        function ResizeScreen(){
            //set position of element
            if($('.text-aside input[name=widthscreen]').val() && $('.text-aside input[name=heightscreen]').val()){
                var prevwidth = parseInt($('.text-aside input[name=widthscreen]').val());
                var prevheight = parseInt($('.text-aside input[name=heightscreen]').val());
                var elements = $('.bannercontainer').children();
                elements.each(function (index, element) {
                    var width;
                    var height;
                    var top;
                    var left;

                    if($(element).hasClass('text1level')){
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
                    else if($(element).hasClass('dragimage')){
                        var id = $(element).attr('id').split('_')[1];
                        top = parseInt($('.imagelist input[name=imagetop_' + id + ']').val());
                        left = parseInt($('.imagelist input[name=imageleft_' + id + ']').val());
                        width = parseInt($('.imagelist input[name=imagewidth_' + id + ']').val());
                        height = parseInt($('.imagelist input[name=imageheight_' + id + ']').val());
                    }
                    if( width && top) {
                        var smwidth = prevwidth;
                        var prevleft = (100 * left)/smwidth;
                        var smwidthnew = parseInt($('.bannercontainer').width());

                        var newleft = Math.round((prevleft*smwidthnew)/100);
                        var pertop = top * (100/prevheight);
                        var newtop = pertop * (parseInt($('.bannercontainer').height())/100);

                        if(width + newleft > parseInt($('.bannercontainer').width())){
                            var index = 0;
                            while(width + newleft > parseInt($('.bannercontainer').width()) && index < 20){
                                if(width > parseInt($('.bannercontainer').width()) - 100){
                                    newleft = newleft - 20;
                                }
                                else {
                                    newleft = newleft - 20;
                                }
                                index ++;
                            }
                        }
                        $(element).css('left', newleft  + 'px');

                        var prevwidthEl = (100*width)/smwidth;
                        var elwidth = Math.round((prevwidthEl*smwidthnew)/100);
                        if((width<250 || $(element).hasClass('text1level')) && prevwidth>smwidthnew){
                            if($(element).hasClass('text1level') && width<350){
                                $(element).css('width', 'auto');
                            }
                            else {
                                $(element).css('width', elwidth + 'px');
                            }
                        }
                        else {
                            $(element).css('width', elwidth + 'px');
                            if($(element).hasClass('dragimage')){
                                var relative = Math.round((width/height)*100)/100;
                                var newHeight = Math.round(elwidth/relative);
                                $(element).css('height', newHeight  + 'px');
                            }
                        }
                        if(newtop + height < $('.bannercontainer').height()){
                            $(element).css('top', newtop  + 'px' );
                        }
                        else {
                            $(element).css('top', prevheight - height  + 'px' );
                        }
                        SetPositionOfElement(element, newtop, newleft);
                    }
                });
            }

            //set options on start
            //set size of screen
            $('.text-aside input[name=widthscreen]').val($('.bannercontainer').width());
            $('.text-aside input[name=heightscreen]').val($('.bannercontainer').height());
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

        //set header text
        if($('.rightside .textlevel1').val()){
            var color = $('.textlevel1').parents('.blocktext').find('.colorpick1level input[type=text]').val();
            var fontsize = $('.font1size').val() + "px";
            var text1 = 
            '<div class="drag dragtext text1level" style="left: 20px; top: 50px;">'
            +'    <div class="text" style="color: ' + color + ';font-size: ' + fontsize + ';">'+ $('.rightside .textlevel1').val() + '</div>'
            +'</div>';
            $(text1).appendTo($('.bannercontainer'));
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
                    '<div class="drag dragtext textsecond" id="secondtext_' + id + '" style="left: 20px; top: 50px;">'
                    +'    <div class="text" style="color: ' + color + ';font-size: ' + fontsize + ';">'+ $(text).val() + '</div>'
                    +'</div>';
                    $(text1).appendTo($('.bannercontainer'));
                }
            });
        }

        //set image and background
        if($('.rightside .setbackgroundcolor input[type=radio]:checked').length > 0){
            var color = $('.rightside .colorrow .bannercolor').val();
            $('.bannercontainer').css('background', color);
        }
        //set background text
        if($('.rightside .settextbackground input[type=checkbox]:checked').length > 0){
            var color = $('.rightside .textbackgroundrow .textbannercolor').val();
            $('.bannercontainer .dragtext').addClass('backgroundtext');
            $('.bannercontainer .dragtext').css('background', color);
        }
        //set image and background
        if($('.rightside .imagelist .imagerow').length>0){
            var Images = $('.rightside .imagelist .imagerow');
            Images.each(function (index, image) {
                if($(image).find('.setbackground input[type=radio]:checked').length>0){
                    var id = $(image).find('.setbackground input[type=radio]:checked').val();
                    var src = $(image).find('input[name=imagesrc_' + id + ']').val();
                    $('.bannercontainer').css('background', 'none');
                    $('.bannercontainer').css('background-image', 'url(' + src + ')');
                    $('.bannercontainer').css('background-position', 'center');
                    $('.bannercontainer').css('background-repeat', 'no-repeat');
                    $('.bannercontainer').css('background-size', 'cover');
                    $('.bannercontainer').attr('data-background', id);
                }
                else {
                    var id = $(image).find('.setbackground input[type=radio]').val();
                    var src = $(image).find('input[name=imagesrc_' + id + ']').val();
                    var image = 
                    '<div class="drag dragimage" id="image_'+ id + '" style="width: 300px;" data-id="'+ id + '">'
                    +'    <div class="remove-picture "></div>'
                    +'    <input type="hidden" name="picture" value="'+ id + '">'
                    +'    <img src="'+ src + '" alt="">'
                    +'</div>';
                    $('.bannercontainer').append(image);
                }
            });
        }
        //Make element draggable
        $(".drag").draggable({
            appendTo: ".dragable",
            containment: ".dragable",
            grid: [ 10, 10 ],
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
            grid: [ 10, 10 ],
            handles: "n, e, s, w",
            stop: function( event, ui ) {
                var top = ui.position.top;
                var left = ui.position.left;
                SetPositionOfElement(event.target, top, left);
            }
        });
        ResizeScreen();
        $(window).resize(function() {
            if(Math.abs(parseInt($('.text-aside input[name=widthscreen]').val()) - parseInt($('.bannercontainer').width())) > 20) {
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