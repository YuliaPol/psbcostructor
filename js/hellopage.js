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

        $('.pictureforpage').change(function(e){
            console.log(this);
            var fileName = e.target.files[0].name;
            console.log($('.dropzone-file'));
            if($('.dropzone-file').lenght>0) {
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
                    $('.newimage').attr('src', e.target.result);
                    $('.newimage').removeClass('newimage');
                }
                reader.readAsDataURL(e.target.files[0]);
            }
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