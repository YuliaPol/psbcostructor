
jQuery(function ($) {
    $(document).ready(function () {
        $('.show-user-dropdown').click( function(){
            if($('.dropdown-user').is(':visible')){
                $('.dropdown-user').fadeOut(300)
            }
            else {
                $('.dropdown-user').fadeIn(300)
            }
        });

        $(document).click(function(event) { 
            var $target = $(event.target);
            if(!$target.closest('.show-user-dropdown').length && 
            $('.dropdown-user').is(':visible')){
                $('.dropdown-user').fadeOut(300)
            }       
        });

        $('.page-content').on('click', '.edit-menu .showhide', function(e){
            if(!$(this).parents('.edit-menu').hasClass('active')){
                $(this).parents('.edit-menu').addClass('active');
                $(this).parents('.edit-menu').find('.dropdownmenu').fadeIn(300);
                $(this).parents('tr').on('mouseleave', function () {
                    $(this).find('.edit-menu').removeClass('active');
                    $(this).find('.dropdownmenu').fadeOut(300);
                });    
            }
            else {
                $(this).parents('.edit-menu').removeClass('active');
                $(this).parents('.edit-menu').find('.dropdownmenu').fadeOut(300);
            }
        });

        if($('#modal-error').length==0){
            var modal = 
            '<div id="modal-error" class="modal">'
            +'    <div class="modal-content">'
            +'        <span class="close">&times;</span>'
            +'        <div class="text">'
            +'            <p>Введите, пожалуйста, ответ.</p>'
            +'        </div>'
            +'    </div>'
            +'</div>';
            $('body').append(modal);
        }
        
        //modal
        $('.modal .close').click(function (e) {
            $('.modal').fadeOut(300);
        });

        $('.modal').click(function (e) {
            if (!$(e.target).closest('.modal-content').length && !$(e.target).is('.modal-content')) {
                $('.modal').fadeOut(300);
            }
        });

        //filter
        $('.filter-box .filter-name').click(function(e){
            if(!$(this).hasClass('active')){
                $('.filter-box .filter-name').removeClass('active');
                $('.dropdownfilter').fadeOut(300);
                $(this).addClass('active');
                $(this).next('.dropdownfilter').fadeIn(300);
            }
            else {
                $(this).removeClass('active');
                $(this).next('.dropdownfilter').fadeOut(300);
            }
        });

        $(document).mousedown(function (e){
            var div = $('.filter-box .filter-name'); 
            var div2 = $('.filter-box .dropdownfilter'); 
            var div3 = $('.filter-box .filter-group'); 
            var div4 = $('.filter-box label'); 
            if (!div.is(e.target) && !div2.is(e.target) && !div3.is(e.target) && !div4.is(e.target)) {
                $('.filter-box .filter-name').removeClass('active');
                $('.dropdownfilter').fadeOut(300);
            }
        });
        $('.centerbox').on('change', '.filter-group input[type=radio]', function(e){
            if($(this).is(':checked')){
                $('.filter-box .filter-name').removeClass('active');
                $('.dropdownfilter').fadeOut(300);
            }
        });

        //validation
        var formValid = document.getElementsByClassName('form-valid')[0];
        $('.valid-form-send').click(function () {
            $(this).parents('form').submit(function (e) {
                e.preventDefault();
                var el = document.querySelectorAll('.form-valid [data-reqired]');
                var erroreArrayElemnts = [];
                for (var i = 0; i < el.length; i++) {
                    if (el[i].value === '' || el[i].value === ' ' || el[i].value === '-') {
                        erroreArrayElemnts.push(el[i]);
                        $(el[i]).parents('.form-group').addClass('has-error');
                        $(el[i]).focus(function (e) {
                            $(e.target).parents('.form-group').removeClass('has-error');
                        });
                    }
                }
                if (erroreArrayElemnts.length == 0) {
                    formValid.submit();
                }
                if (erroreArrayElemnts.length > 0) {
                    $('#modal-error').find('.text').html('Введите, пожалуйста, ответ.');
                    $('.modal').fadeIn(300);
                    console.log('Valid error');
                    $("html, body").animate({ scrollTop: $(erroreArrayElemnts[0]).offset().top }, 600);
                    return false;
                }
            });
        });
    });
});
