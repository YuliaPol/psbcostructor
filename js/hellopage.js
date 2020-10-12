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
            grid: [ 20, 20 ],
            stop: function( event, ui ) {
                var top = ui.position.top;
                var left = ui.position.left;
                SetPositionOfElement(event.target, top, left);
            }
        });
        //resize image
        $( ".dragimage" ).resizable({
            containment: ".dragable",
            grid: [ 20, 20 ],
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
            grid: [ 20, 20 ],
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
                $('.hellopahecontainer').find('.text1level .text').html($(this).val());
            }
            else {
                var color = $('.colorpick1level input[type=color]').val();
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
                grid: [ 20, 20 ],
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
                grid: [ 20, 20 ],
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
        });
        
        //change of color second level 
        $('.rightside').on('change', '.colorpicksecond input[type=color]', function(e){
            $(this).next('input').val($(this).val());
            var value = $(this).val();
            var id = $(this).parents('.colorpick').find('input[type=text]').attr('name').split('_')[1];
            $(this).parents('.colorpick').find('.square').css( 'background', value);
            $('#secondtext_' + id + ' .text').css('color', value);
        });

        //add second in textarea text
        $('.rightside').on('change, keypress, keydown, keyup', '.textlevelsecond', function(e){
            var id = $(this).attr('name').split('_')[1];
            if($('#secondtext_' + id).find('.text').length>0){
                $('#secondtext_' + id).find('.text').html($(this).val());
            }
            else {
                var color = $(this).parents('.blocktext').find('.colorpick input[type=color]').val();
                var fontsize = $(this).parents('.blocktext').find('.font1size').val() + "px";
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
                grid: [ 20, 20 ],
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
                grid: [ 20, 20 ],
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
            var id = 1;
            if($('.rightside').find('.secondtextgroup').length>0){
                id = parseInt($('.rightside .secondtextgroup:last-child input[type=text]').attr('name').split('_')[1]) + 1;
            }
            var newsecondtext = 
            '<div class="form-group secondtextgroup">'
            +'    <input type="hidden" class="secondtexttop" name="secondtexttop_'+ id + '" value="20">'
            +'    <input type="hidden" class="secondtextleft" name="secondtextleft_'+ id + '" value="20">'
            +'    <input type="hidden" class="secondtextwidth" name="secondtextwidth_'+ id + '">'
            +'    <input type="hidden" class="secondtextheight" name="secondtextheight_'+ id + '">'
            +'    <div class="top-col">'
            +'        <div class="addsecondtext"></div>'
            +'        <div class="removesecondtext"></div>'
            +'    </div>'
            +'    <div class="blocktext">'
            +'        <div class="colorpick colorpicksecond">'
            +'            <div class="square" style="background: #4D4D4D;"></div>'
            +'            <div class="inputs">'
            +'                <input type="color" value="#4D4D4D">'
            +'                <input type="text" name="colorsecond_'+ id + '" id="colorsecond_'+ id + '" value="#4D4D4D">'
            +'            </div>'
            +'            <div class="labelcolor">'
            +'           <label for="colorsecond_'+ id + '">Текст второго уровня</label>'
            +'          </div>'
            +'      </div>'
            +'      <div class="fontsize smallselect-wrapper">'
            +'           <select name="fontsizesecond_'+ id + '" class="customselect fontsecondsize ">'
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
            +'          <textarea name="textlevesecond_'+ id + '" class="textlevelsecond" placeholder="Введите текст"></textarea>'
            +'      </div>'
            +'  </div>'
            +'</div>';
            $(newsecondtext).appendTo($('.rightside .text-aside .textasettings'));
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

        $('.rightside').on('change', '.btncolor', function(e){
            var value = $(this).val();
            $('.dragbtn').find('.btn-cont  .btn').css( 'background', value);
            $(this).parents('.optionbtngroup').find('.color').css( 'background', value);
        });

        $('.rightside').on('click', '.btncolor', function(e){
            $(this).prev('input').click();
        });

        $('.rightside').on('change', '.hiddeninputcolor', function(e){
            $(this).next('input').val($(this).val());
            var value = $(this).val();
            $('.dragbtn').find('.btn-cont .btn').css( 'background', value);
            $(this).parents('.optionbtngroup').find('.color').css( 'background', value);
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
            +'          <input type="color" class="hiddeninput hiddeninputcolor" value="#F26126">'
            +'          <input class="btncolor" type="text"  name="btncolor"  id="btncolor" value="#F26126">'
            +'      </div>'
            +'  </div>'
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
            //Make element draggable
            $(".drag").draggable({
                appendTo: ".dragable",
                containment: ".dragable",
                grid: [ 20, 20 ],
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
                    var id = index + 1;
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
            $(this).parents('.colorpick').find('input[type=color]').click();
        });

        $('.rightside').on('change', '.colorpick1level input[type=color]', function(e){
            $(this).next('input').val($(this).val());
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
                var width = $(element).width()
                var height = $(element).height()
                $('.btn-options-group input[name=pbtntop]').val(top);
                $('.btn-options-group input[name=pbtnleft]').val(left);
                $('.btn-options-group input[name=pbtnwidth]').val(width);
                $('.btn-options-group input[name=pbtnheight]').val(height);
            }
            else if($(element).hasClass('text1level')){
                var width = $(element).width()
                var height = $(element).height()
                $('.textasettings input[name=text1leveltop]').val(top);
                $('.textasettings input[name=text1levelleft]').val(left);
                $('.textasettings input[name=text1levelwidth]').val(width);
                $('.textasettings input[name=text1levelheight]').val(height);
            }
            else if($(element).hasClass('textsecond')){
                var id = $(element).attr('id').split('_')[1];
                var width = $(element).width()
                var height = $(element).height()
                $('.textasettings input[name=secondtexttop_' + id + ']').val(top);
                $('.textasettings input[name=secondtextleft_' + id + ']').val(left);
                $('.textasettings input[name=secondtextwidth_' + id + ']').val(width);
                $('.textasettings input[name=secondtextheight_' + id + ']').val(height);
            }
        }

        //set options on start

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
                var color = $(text).find('.colorpicksecond input[type=color]').val();
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
        //set size of screen
        $('.text-aside input[name=widthscreen]').val($('.hellopahecontainer').width());
        $('.text-aside input[name=heightscreen]').val($('.hellopahecontainer').height());
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