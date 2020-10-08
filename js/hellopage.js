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
            var fileName = e.target.files[0].name;
            if (e.target.files && e.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('.preview-picture').css('background-image', 'url('+e.target.result+')');
                    $('.preview-picture').addClass('active');
                    $('.preview-picture').css('background-position', 'center');
                    $('.preview-picture').css('background-repeat', 'no-repeat');
                    $('.preview-picture').css('background-size', 'contain');
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