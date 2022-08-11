var slider = tns({
    container: ".carousel__inner",
    items: 1,
    slideBy: 'page',
    autoplay: false,
    // center: true,
    constrols: false,
    prevButton: ".slider-prev-btn",
    nextButton: ".slider-next-btn",
    nav: false,
    // navPosition: "bottom"
});

new WOW().init();

(function($) {
    $(function() {

        $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
            $(this)
                .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
                .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
        });

        function toggleSlide(selector) {
            $(selector).each(function(i) {
                $(this).on('click', function(e) {
                    e.preventDefault();
                    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                    $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
                });
            });
        }

        toggleSlide('.catalog-item__link');
        toggleSlide('.catalog-item__back-link');


        // modals
        $('[data-modal=consultation-modal]').on('click', function() {
            $('.overlay, #consultation-modal').fadeIn('fast');
        });
        $('.modal__close').on('click', function() {
            $('.overlay, #consultation-modal, #order, #thanks').fadeOut('fast');
        });

        $('.button_mini').on('click', function() {
            $('.overlay, #order').fadeIn('fast');
        });


        $('.button_mini').each(function(i) {
            $(this).on('click', function() {
                const descr = $('.catalog-item__subtitle').eq(i).text();
                $('#order .modal__description').text(descr);
            })
        });

        function validateForms(selector) {
            $(selector).validate({
                //errorClass: "invalid" // default = "error"
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    phone: "required",
                    email: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    name: {
                        required: "Пожалуйста, введите своё имя",
                        minlength: jQuery.validator.format("Введите {0} символа")
                    },
                    phone: "Пожалуйста, введите свой номер телефона",
                    email: "Неправильно введён адрес почты",
                }
            });
        }

        validateForms('#consultation form');
        validateForms('#consultation-modal form');
        validateForms('#order form');

        $('input[name=phone]').mask("+7(999) 999-9999");

        $('form').submit(function(e) {
            e.preventDefault();

            if (!$(this).valid()) {
                return false;
            }

            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function() {
                // clear form
                $(this).find("input").val("");

                $('#consultation-modal, #order').fadeOut();
                $('.overlay, #thanks').fadeIn();

                $('form').trigger('reset');
            });

            return false;
        })

        // smooth scroll up
        $(window).scroll(function() {
            if ($(this).scrollTop() > 1600) {
                $('.pageup').fadeIn();
            } else {
                $('.pageup').fadeOut();
            }
        });

    });
})(jQuery);