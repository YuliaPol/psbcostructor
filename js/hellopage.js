jQuery(function ($) {
    $(document).ready(function () {
        //Make element draggable
        $(".drag").draggable({
            appendTo: ".dragable",
            containment: ".dragable",
            grid: [ 10, 10 ],
            stop: function( event, ui ) {
                console.log(event);
                console.log(ui);
            }
        });
        //resize image
        $( ".dragimage" ).resizable({
            containment: ".dragable",
            grid: [ 10, 10 ],
            aspectRatio: true,
            handles: "n, e, s, w"
        });
        //resize text
        $( ".dragtext" ).resizable({
            autoHide: false,
            containment: ".dragable",
            grid: [ 10, 10 ],
            handles: "n, e, s, w"
        });
        //change input for file
        $('.page-content').on('change', '.pictureforpage', function(e){
            var fileName = e.target.files[0].name;
            var newinputfile = '<input type="file" name="pictures[]" class="realfileinput pictureforpage" />';
            $(newinputfile).insertBefore($(this));
            if($('.dropzone-file').length>0) {
                $('.dropzone-file').remove();
            }
            var image = 
            '<div class="drag dragimage newimage">'
            +'    <div class="remove-picture "></div>'
            +'    <input type="hidden" name="picture" value="562">'
            +'    <img src="./img/hellopage_pic_1.png" alt="">'
            +'</div>';
            $('.hellopahecontainer').append(image);
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
                handles: "n, e, s, w"
            });
            //Make element draggable
            $(".drag").draggable({
                appendTo: ".dragable",
                containment: ".dragable",
                grid: [ 10, 10 ],
                stop: function( event, ui ) {
                    console.log(event);
                    console.log(ui);
                }
            });

        });
        
        //remove picture
        $('.page-content').on('click', '.remove-picture', function(e){
            $(this).parents('.dragimage').remove();
        });
        $('.page-content').on('click', '.addpicture', function(e){
            $(this).next('input[type=file]').click();
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
            // $('.centerbox .question .name').css('color', value);
            // $('.centerbox .question .question-name').css('color', value);
        });

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