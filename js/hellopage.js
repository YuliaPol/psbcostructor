jQuery(function ($) {
    $(document).ready(function () {
        //Make element draggable
        $(".drag").draggable({
            appendTo: ".dragable",
            containment: ".dragable",
            grid: [ 20, 20 ],
            stop: function( event, ui ) {
                console.log(event);
                console.log(ui);
            }
        });
        //resize image
        $( ".dragimage" ).resizable({
            containment: ".dragable",
            grid: [ 20, 20 ],
            aspectRatio: true,
            handles: "n, e, s, w"
        });
        //resize text
        $( ".dragtext" ).resizable({
            autoHide: false,
            containment: ".dragable",
            grid: [ 20, 20 ],
            handles: "n, e, s, w"
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
                    console.log(event);
                    console.log(ui);
                }
            });
            //resize text
            $( ".dragtext" ).resizable({
                autoHide: false,
                containment: ".dragable",
                grid: [ 20, 20 ],
                handles: "n, e, s, w"
            });
        });
        
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
        $('.customselect').each(function(){
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