
jQuery(function ($) {
    $(document).ready(function () {
        $('.panel-item').click(function(e){
            if(!$(this).hasClass('active')){
                // valid 
                var el = $('.content-list').find('.content-item.active').find('input[data-reqired]');
                var erroreArrayElemnts = [];
                for (let index = 0; index < el.length; index++) {
                    if(!$(el[index]).val()){
                        erroreArrayElemnts.push($(el[index]));
                        $(el[index]).parents('.input-col').addClass('has-error');
                        $(el[index]).focus(function (e) {
                            $(e.target).parents('.input-col').removeClass('has-error');
                        });
                    }
                }
                var emails = $('.content-list').find('.content-item.active').find('input[type=email]');
                for (let index = 0; index < emails.length; index++) {
                    if($(emails[index]).val()){
                        if(!validateEmail($(emails[index]).val()))
                        erroreArrayElemnts.push($(emails[index]));
                        $(emails[index]).parents('.input-col').addClass('has-error');
                        $(emails[index]).parents('.input-row').append('<div class="error-text">Неверный email</div>');
                        $(emails[index]).focus(function (e) {
                            $(e.target).parents('.input-col').removeClass('has-error');
                            $(el[index]).parents('.input-row').find('.error-text').remove();
                        });
                    }
                }
                if(erroreArrayElemnts.length == 0){
                    $(this).parents('.panels-list').find('.panel-item').removeClass('active');
                    $(this).addClass('active');
                    let content = '.'+ $(this).attr('data-content');
                    $('.content-list').find('.content-item.active').fadeOut(0);
                    $('.content-list').find('.content-item.active').removeClass('active');
                    $(content).fadeIn(300);
                    $(content).addClass('active');
                }
            };
        });
        function validateEmail($email) {
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailReg.test( $email );
        }
        $('.next-step').click(function(e){
            $('.panels-list').find('.panel-item.active').next().click();
        });
        //customselect
        customSelectActive();
        function customSelectActive(){
            $('.customselect').each(function(){
                if(!$(this).hasClass('select-hidden')){
                    if($(this).attr('multiple')){
                        $(this).parent().addClass('customselect-wrapper');
                        var $this = $(this),
                        numberOfOptions = $(this).children('option').length;
                        $this.addClass('select-hidden'); 
                        $this.wrap('<div class="select"></div>');
                        $this.after('<div class="select-styled"></div>');
                        var $styledSelect = $this.next('div.select-styled');
                        if($this.find('option:selected').length == 0){
                            $styledSelect.html('<div class="default">Выберите ответ</div>');
                        }
                    
                        var $list = $('<ul />', {
                            'class': 'select-options'
                        }).insertAfter($styledSelect);
                        for (var i = 0; i < numberOfOptions; i++) {
                            var lioption;
                            var id = Math.floor(Math.random() * 100000);
                            $this.children('option').eq(i).attr('data-id', id);
                            if($this.children('option').eq(i)[0].selected){
                                $styledSelect.append('<div class="selectvalue" data-value="' + $this.children('option').eq(i).text() + '" data-id="'+ id + '">' + $this.children('option').eq(i).text() + '</div>');
                                lioption = '<li rel="'+ $this.children('option').eq(i).val() + '" data-id="'+ id + '"><div class="checked active"></div><div class="text">'+ $this.children('option').eq(i).text() + '</div></li>';
                            }
                            else {
                                lioption = '<li rel="'+ $this.children('option').eq(i).val() + '" data-id="'+ id + '" ><div class="checked"></div><div class="text">'+ $this.children('option').eq(i).text() + '</div></li>';
                            }
                            $(lioption).appendTo($list);
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
                            if($(e.currentTarget).find('.checked').hasClass('active')) {
                                $(e.currentTarget).find('.checked').removeClass('active');
                                var id = $(e.currentTarget).attr('data-id');
                                $styledSelect.find('.selectvalue[data-id="' + id + '"]').remove();
                                if($styledSelect.find('.selectvalue').length == 0){
                                    $styledSelect.html('<div class="default">Выберите ответ</div>');
                                }
                                $this.find('option[value="' + $(e.currentTarget).attr('rel') + '"][data-id="' + id + '"]').prop("selected", false)
                            }
                            else {
                                $(e.currentTarget).find('.checked').addClass('active');
                                var id = $(e.currentTarget).attr('data-id');
                                if($styledSelect.find('.default').length > 0){
                                    $styledSelect.find('.default').remove();
                                }
                                if($(e.currentTarget).attr('rel') !== 'all'){
                                    $styledSelect.append('<div class="selectvalue" data-value="' + $(e.currentTarget).attr('rel') + '" data-id="'+ id + '">' + $(e.currentTarget).find('.text').html() + '</div>');
                                }
                                $this.find('option[value="' + $(e.currentTarget).attr('rel') + '"][data-id="' + id + '"]').prop("selected", true)
                            }
                            $this.change();
                        });

                        $(document).mousedown(function(e) {
                            if($(e.target).parents('.customselect-wrapper').length == 0) {
                                $styledSelect.removeClass('active');
                                $list.hide();
                            }
                        });

                        $(document).click(function(e) {
                            if(!$(e.target).hasClass('country')){
                                $styledSelect.removeClass('active');
                                $list.hide();
                            }
                        });
                    }
                    else {
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
                        else if($this.find('option.default').length>0){
                            $styledSelect.text($this.find('option.default').text());
                        }
                        else {
                            $styledSelect.text('Выберите ответ');
                        }
                    
                        var $list = $('<ul />', {
                            'class': 'select-options'
                        }).insertAfter($styledSelect);
                    
                        for (var i = 0; i < numberOfOptions; i++) {
                            if(!$this.children('option').eq(i).hasClass('default')){
                                var id = Math.floor(Math.random() * 100000);
                                $this.children('option').eq(i).attr('data-id', id);
                                lioption = '<li rel="'+ $this.children('option').eq(i).val() + '" data-id="'+ id + '">'+ $this.children('option').eq(i).text() + '</li>';
                                $(lioption).appendTo($list);
                            }
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
                        $(document).mousedown(function(e) {
                            if($(e.target).parents('.customselect-wrapper').length == 0) {
                                $styledSelect.removeClass('active');
                                $list.hide();
                            }
                        });
                        $(document).click(function() {
                            $styledSelect.removeClass('active');
                            $list.hide();
                        });
                    }
                }
            });   
        }
        $('.radio-group input[type=radio]').change(function(e){
            if($(this).parents('.radio-group').find('.show-hidden').length>0){
                let openHidden = $(this).parents('.radio-group').find('.show-hidden');
                for (let index = 0; index < openHidden.length; index++) {
                    if($(openHidden[index]).is(':checked')){
                        let hiddenBlock = $(openHidden[index]).attr('data-hiddenblock');
                        $(hiddenBlock).fadeIn(300);
                    }
                    else {
                        let hiddenBlock = $(openHidden[index]).attr('data-hiddenblock');
                        $(hiddenBlock).fadeOut(300);
                    }
                }
            }
        });
        $('.radio-group input[type=checkbox]').change(function(e){
            if($(this).parents('.radio-group').find('.show-hidden').length>0){
                let openHidden = $(this).parents('.radio-group').find('.show-hidden');
                for (let index = 0; index < openHidden.length; index++) {
                    if($(openHidden[index]).is(':checked')){
                        let hiddenBlock = $(openHidden[index]).attr('data-hiddenblock');
                        $(hiddenBlock).fadeIn(300);
                    }
                    else {
                        let hiddenBlock = $(openHidden[index]).attr('data-hiddenblock');
                        $(hiddenBlock).fadeOut(300);
                    }
                }
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
