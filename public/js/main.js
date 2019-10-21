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
			responsive: [
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 479,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},

				{
					breakpoint: 360,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				},
			]
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

// Табуляция
	if ($('.js-tabs-page').length) {
		if (!$('.js-tabs-page-item').hasClass('active')) {
			$('.js-tabs-page-list').each(function(){
				$(this).find('.js-tabs-page-item:first').addClass("active");
			});

			$('.js-tabs-page-content').each(function(){
				$(this).find('.js-tabs-page-content-item:first').addClass("active");
				$(this).find('.js-tabs-page-content-item:first').fadeIn();
			});
		}else{
			$('.js-tabs-page-content').find('#' + $('.js-tabs-page-item.active').attr('data-item')).addClass("active");
			$('.js-tabs-page-content').find('#' + $('.js-tabs-page-item.active').attr('data-item')).fadeIn();
		}

		$('.js-tabs-page-item').click(function(e) {
			e.preventDefault();
			var $parent = $(this).parents('.js-tabs-page');

			$parent.find('.js-tabs-page-content-item').hide();
			$parent.find('.js-tabs-page-content-item').removeClass('active');
			$parent.find('.js-tabs-page-item').removeClass('active');

			$(this).addClass("active");
			$parent.find('#' + $(this).attr('data-item')).addClass("active");
			$parent.find('#' + $(this).attr('data-item')).fadeIn();
		});
	}

if ($('.js-elem-car').length) {
// Подсветка элементов машины при наведении
	var selectElemCar = 0;
	var sumElemCar = 0;
	var sumAllElemCar = 0;

	$('.js-elem-car').hover(
	function(){
		var idItem = $(this).attr('id');

		$('.js-elem-drawing').find('#'+idItem).addClass('hover');
		$('.js-tabs-page-content-item').find('#'+idItem).addClass('hover');
	},
	function(){
		$('.js-elem-car').removeClass('hover');
	});

	$('.js-elem-car').click(function(){
		var idItem = $(this).attr('id');
		var $allElemSum = $('.js-all-elem-sum');
		var sumCurElem =  parseInt($('#'+idItem+'.js-chosen-res-item').find('.js-sum-elem').text());

		$('.js-elem-drawing').find('#'+idItem).toggleClass('active');
		$('.js-tabs-page-content-item').find('#'+idItem).toggleClass('active');

		// Добавляем строку с ценами выбранного элемента, пересчитываем количество и общую цену
		$('#'+idItem+'.js-chosen-res-item').toggleClass('active');

		var sumService = parseInt($(this).siblings('.js-switch-label').find('.js-sum-service').text());


		if ($('#'+idItem+'.js-chosen-res-item').hasClass('active')) {
			selectElemCar++;
			$allElemSum.text(parseInt($allElemSum.text()) + sumCurElem);
		}else{
			selectElemCar--;
			$allElemSum.text(parseInt($allElemSum.text()) - sumCurElem);
		}

		$('.js-count-elem-car').text(selectElemCar);

		if (selectElemCar == 0) {
			$('.js-chosen-result').removeClass('active');
		}else{
			$('.js-chosen-result').addClass('active');
		}
	});

	// Показываем цену выбранных элементов машины
	// Проверяем выбранные элементы при загрузке страницы
	$('.js-tabs-page-content-item.active').find('.js-elem-car.active').each(function(indx, element){
		var idItem = $(this).attr('id');

		selectElemCar++;

		$('#'+idItem+'.js-chosen-res-item').addClass('active');
	});

	if (selectElemCar > 0) {
		$('.js-chosen-result').addClass('active');
		$('.js-count-elem-car').text(selectElemCar);
	}

	$('.js-service-list').each(function(indx, element){
		$(this).find("input:checkbox:checked").each(function(indx, element){
			sumElemCar = sumElemCar + parseInt($(this).siblings('.js-switch-label').find('.js-sum-service').text());
		});

		$(this).parents('.js-chosen-res-item').find('.js-sum-elem').text(sumElemCar);

		sumAllElemCar = sumAllElemCar + sumElemCar;
		sumElemCar = 0;
	});

	$('.js-all-elem-sum').text(sumAllElemCar);
	
	// Вычисляем сумму при выборе параметров
	$(".js-service-list input[type='checkbox']").change(function() {
		var $elemSum = $(this).parents('.js-chosen-res-item').find('.js-sum-elem');
		var $allElemSum = $('.js-all-elem-sum');
		var sumService = parseInt($(this).siblings('.js-switch-label').find('.js-sum-service').text());

		if ($(this).prop("checked")) {
			$elemSum.text(parseInt($elemSum.text()) + sumService);
			$allElemSum.text(parseInt($allElemSum.text()) + sumService);
		}else{
			$elemSum.text(parseInt($elemSum.text()) - sumService);
			$allElemSum.text(parseInt($allElemSum.text()) - sumService);
		}
	});
}

// Разворачиваем все пункты фильтра
	if ($('.js-filter-more').length) {
		var statusFilter = false;
		var curTextFilter = $('.js-filter-more').text();

		$('.js-filter-more').click(function(e){
			e.preventDefault();

			if (statusFilter == false) {
				$('.js-filter-list').addClass('show-all');
				$(this).text('Свернуть');
				statusFilter = true;
			} else {
				$('.js-filter-list').removeClass('show-all');
				$(this).text(curTextFilter);
				statusFilter = false;
			}
		});
	}

// Кнопка загрузки файла
	$('.js-input-file').change(function(){
		var f_name = [];
		var $nameFile = $(this).siblings(".js-name-file");

		for (var i = 0; i < $(this).get(0).files.length; ++i) {

			f_name.push(" " + $(this).get(0).files[i].name);

		}

		$nameFile.html(f_name);
		$nameFile.attr("title", f_name);
	});

// Добавление еще одного поля загрузки файла
	$('.js-file-load-more').click(function(){
		var idElem = Math.floor(Math.random() * (1000 - 10) + 10);

		$('.js-file-load-more').before('<div class="file-upload"><label class="file-upload__content"><input type="file" name="file'+idElem+'" id="file'+idElem+'" class="js-input-file"><span class="btn btn--border">Выберите файл</span><span class="file-upload__name js-name-file">Файл не выбран</span></label></div>')

		$('#file'+idElem).change(function(){
			var f_name = [];
			var $nameFile = $(this).siblings(".js-name-file");

			for (var i = 0; i < $(this).get(0).files.length; ++i) {

				f_name.push(" " + $(this).get(0).files[i].name);

			}

			$nameFile.html(f_name);
			$nameFile.attr("title", f_name);
		});
	});

// Слайдер наши работы
	if ($('.js-works-slider').length) {
		var $counterSlider = $('.js-works-slider-counter');
		var $topSlider = $('.js-works-slider');

		$topSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			var curSlide = (currentSlide ? currentSlide : 0) + 1;
			var slideCount = slick.slideCount;

			if (slideCount < 10) {
				slideCount = '0' + slideCount;
			}

			if (curSlide < 10) {
				curSlide = '0' + curSlide;
			}


			$counterSlider.html(curSlide + '<span>/' + slideCount) + '</span>';
		});

		$topSlider.slick({
			dots: false,
			arrows: true,
			infinite: true,
			slidesToShow: 1,
			appendArrows: $('.js-works-slider-arrow'),
			responsive: [
				{
					breakpoint: 768,
					settings: {
						arrows: false,
						dots: true,
					}
				},
			]
		});
	}

// Yandex карта
	if ($('#map').length) {
		// Иницилизация карты
		ymaps.ready(init);

		function init(){
			var myMap;

			myMap = new ymaps.Map("map", {
				center: [55.597, 37.51],
				zoom: 16,
				controls: []
			});

			var myPlacemark = new ymaps.Placemark([55.597011, 37.511862] , {},
				{ iconLayout: 'default#image',
				iconImageHref: 'img/mark-map.png',
				iconImageSize: [52, 70],
				iconImageOffset: [-29, -60] });

				myMap.geoObjects.add(myPlacemark);
		}
	}

// Добавление пункта "Еще" в меню
	var windowWidth = $(window).width();
	var moreMenu = false;

	addItemMenu();

	$('.js-main-menu').addClass('is-visible');

	$(window).resize(function(){
		windowWidth = $(window).width();
		addItemMenu();
	});

	function addItemMenu() {
		

		if ((windowWidth >767) && (windowWidth <1860)) {
			var moreItemMenu = 100;
			var menuWidth = $('.js-main-menu').width() - moreItemMenu;
			var sumItemMenu = 0;
			var arrWidthMenu = [];

			$('.js-main-menu-item').each(function(index){
				var itemWidth = $(this).outerWidth();
				arrWidthMenu.push($(this).outerWidth());
			});

			for (var i = 0; i < arrWidthMenu.length; i++) {
				var $curItem = $('.js-main-menu-item[data-item='+ i +']');
				sumItemMenu = sumItemMenu + arrWidthMenu[i];

				// Добавляем пункт Еще и его подпункты
				if(sumItemMenu > menuWidth){
					$curItem.addClass('no-active');

					if (moreMenu == false) {
						$('.js-main-menu').append('<li class="main-menu__item js-menu-more"><span class="main-menu__link">Еще</span><ul class="main-menu__more js-menu-more-sub"></ul></li>');
						moreMenu = true;
					}

					if (!$('.main-menu__more-item[data-item='+i+']').length) {
						$('.main-menu__more-item').attr('data-item')
						var $clone = $curItem.clone().appendTo(".js-menu-more-sub");
						$clone.removeClass('main-menu__item js-main-menu-item no-active');
						$clone.addClass('main-menu__more-item js-menu-more-item');
					}
				}else{
					$curItem.removeClass('no-active');
					$('.main-menu__more-item[data-item='+i+']').remove();
				}
			}

			// Удаляем пункт Еще, если все пункты вмещаются
			if ($('.js-menu-more-item').length == 0) {
				$('.js-menu-more').remove();
				moreMenu = false;
			}
		}else{
			if ($('.js-menu-more').length) {
				$('.js-main-menu-item').removeClass('no-active');
				$('.js-menu-more').remove();
				moreMenu = false;
			}
		}
	}

// Создание мобильного меню
	var arrMobileMenu = [];
	$('.js-add-mm').each(function(){
		var indexItem = $(this).attr('data-order');
		arrMobileMenu[indexItem] = $(this);
	});

	for (var i = 0; i < arrMobileMenu.length; i++) {
		$(arrMobileMenu[i]).clone().appendTo('.js-mobile-menu-content');
	}

// Открыть/Закрыть мобильное меню
	$('.js-open-menu').click(function(){
		$('.js-shadow').addClass('is-visible');
		$('.js-mobile-menu').addClass('open');
		$('.js-body').addClass('no-scroll');
	});

	$('.js-close-menu').click(function(){
		 closeCatMenu();
	});

	$('.js-shadow').click(function(){
		closeCatMenu();
	});

	function closeCatMenu() {
		$('.js-shadow').removeClass('is-visible');
		$('.js-mobile-menu').removeClass('open');
		$('.js-body').removeClass('no-scroll');
	}

// Перемещение мобильного меню
	var indentMenu = 0;
	var levelMenu = 0;
	var titleMobileMenu = $('.js-menu-back').text();

	$('.js-main-menu-arr').on("click", function(event){
		event.preventDefault();
		var $curItem = $(this).parent('.js-main-menu-link');
		var curItemText = $(this).siblings('.js-main-menu-text').text();
		var $subMenu = $curItem.siblings('.js-main-menu-sub');
		indentMenu = indentMenu - 100;
		levelMenu++;

		$subMenu.addClass('active');
		$('.js-menu-back').addClass('active');
		$('.js-menu-back').text(curItemText);

		$('.js-mobile-menu-content').css('transform','translateX('+indentMenu+'%)');
	});

	$('.js-menu-back').on("click", function(event){
		if ($(this).hasClass('active')) {
			indentMenu = indentMenu + 100;
			levelMenu--;

			if (levelMenu == 0) {
				$('.js-menu-back').text(titleMobileMenu);
				$('.js-menu-back').removeClass('active');
			}

			$('.js-main-menu-sub').removeClass('active');

			$('.js-mobile-menu-content').css('transform','translateX('+indentMenu+'%)');
		}
	});
});