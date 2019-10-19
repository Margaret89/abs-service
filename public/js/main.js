$(document).ready(function () {
// Верхний слайдер
	if ($('.js-slider-top').length) {
		$('.js-slider-top').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: false,
		});
	}

// Слайдер партнеров
	if ($('.js-partner-slider').length) {
		$('.js-partner-slider').slick({
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 4,
			dots: false,
			arrows: true,
		});
	}

// Подсветка услуг при наведении
	if ($('.js-services-item').length) {

		$('.js-services-item').each(function(indx, element){
			if ($(this).hasClass('active')) {
				var idItem = $(this).attr('data-item');

				$('.js-services-img').removeClass('active');
				$('.js-services-img[data-item='+idItem+']').addClass('active');
				return false;
			}
		});

		// Меняем активный элемент при ховере
		$('.js-services-item').hover(
		function(){
			var idItem = $(this).attr('data-item');

			$('.js-services-img').removeClass('active');
			$('.js-services-item').removeClass('active');

			$('.js-services-img[data-item='+idItem+']').addClass('active');
			$(this).addClass('active');
		},
		function(){
		});
	}
	
// Стилизация скроллбара
	$(".js-scroll-content").each(function(indx){
		var widthContent = $(this).data('width');
		var heightContent = $(this).data('height');

		$(this).slimScroll({
			width: widthContent,
			height: heightContent,
			size: '3px',
			color: '#222222',
			alwaysVisible: false,
			railVisible: true,
			railColor: '#e5e5e5',
			railOpacity: 1,
			wheelStep: 5,
		});
	});

// Маска для телефона
	$.mask.definitions['~'] = "[+-]";
	$(".js-phone").mask("+7 (999) 999-9999");

// Переключение по шагам в калькуляторе
	if ($('.js-step-val').length) {
		var resultSteps = '';

		$('.js-step-val').click(function(){
			var $stepTab = $(this).parents('.js-steps-tab');
			var numStep = $stepTab.attr('data-step');

			// Переключение табов
			resultSteps = resultSteps + $stepTab.attr('data-title') + ': ' + $(this).attr('data-val') + '\n';
			numStep++;

			$('.js-steps-tab').removeClass('active');
			$('.js-steps-tab[data-step='+numStep+']').addClass('active');

			
			if ($('.js-steps-item[data-step='+numStep+']').length) {
				// Переключение полосы с шагами
				var posX = $('.js-steps-item[data-step='+numStep+']').position().left;
				var prevStep = numStep-1;

				$('.js-steps-num').text(numStep);
				$('.js-steps-item[data-step='+prevStep+']').addClass('active');
				$('.js-steps-current').css('left',posX+'px');
				$('.js-steps-line').css('width',posX+'px');
			}else{
				// Запись результата выбора в textarea
				$('.js-result-steps').html(resultSteps);
			}
		});
	}

// Обрезание текста по количеству символов
	if ($('.js-read-more').length) {
		var countSymb = $('.js-read-more').attr('data-count');

		$('.js-read-more').readmore({
			brief: countSymb,
			addition: 100,
			smoothly: 300,
		});
	}

// Вызов всплывающего окна с акцией
	if ($('.js-sale-popup').length) {
		$.fancybox.open({
			src  : '#sale-popup',
			type : 'inline',
			// opts : {
			// 	afterShow : function( instance, current ) {
			// 		console.info( 'done!' );
			// 	}
			// }
		});
	}

// Вывод сообщения об успешной отправке в попапе
	$('.js-valid-form form').each(function(){
		$(this).on('submit',function(e){
			$.fancybox.close();
			$.fancybox.open({
				src  : '#msg-success',
				type : 'inline',
				opts : {
					
				}
			});
			$(this)[0].reset();
			e.preventDefault();
		});
	});
});