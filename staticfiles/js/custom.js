(function ($) {

    "use strict";

    // Header Type = Fixed
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var box = $('.header-text').height();
        var header = $('header').height();

        if (scroll >= box - header) {
            $("header").addClass("background-header");
        } else {
            $("header").removeClass("background-header");
        }
    });


    $('.loop').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        autoplay: true,
        nav: true,
        margin: 0,
        responsive: {
            1200: {
                items: 5
            },
            992: {
                items: 3
            },
            760: {
                items: 2
            }
        }
    });

    $(".modal_trigger").leanModal({
        top: 100,
        overlay: 0.6,
        closeButton: ".modal_close"
    });

    $(".modal2_trigger").leanModal({
        top: 100,
        overlay: 0.6,
        closeButton: ".modal_close"
    });

    $(".modal3_trigger").leanModal({
        top: 100,
        overlay: 0.6,
        closeButton: ".modal_close"
    });

    $(".modal3_trigger").leanModal({
        top: 100,
        overlay: 0.6,
        closeButton: ".modal_close"
    });

    $(".gsba").hide();
    $(function () {
        // Calling Login Form
        $("#login_form").click(function () {
            $(".social_login").hide();
            $(".user_login").show();
            $(".header_title").text('Login');
            $(".gsba").show();
            return false;
        });

        // Calling Register Form
        $("#register_form").click(function () {
            $(".social_login").hide();
            $(".user_register").show();
            $(".gsba").show();
            $(".header_title").text('Register');
            return false;
        });

        // Going back to Social Forms
        $(".back_btn").click(function () {
            $(".user_login").hide();
            $(".user_register").hide();
            $(".social_login").show();
            $(".gsba").hide();
            $(".header_title").text('Register or Login');
            return false;
        });
    });

    // Acc
    $(document).on("click", ".naccs .menu div", function () {
        var numberIndex = $(this).index();

        if (!$(this).is("active")) {
            $(".naccs .menu div").removeClass("active");
            $(".naccs ul li").removeClass("active");

            $(this).addClass("active");
            $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

            var listItemHeight = $(".naccs ul")
                .find("li:eq(" + numberIndex + ")")
                .innerHeight();
            $(".naccs ul").height(listItemHeight + "px");
        }
    });


    // Menu Dropdown Toggle
    if ($('.menu-trigger').length) {
        $(".menu-trigger").on('click', function () {
            $(this).toggleClass('active');
            $('.header-area .nav').slideToggle(200);
        });
    }


    // Menu elevator animation
    $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                var width = $(window).width();
                if (width < 991) {
                    $('.menu-trigger').removeClass('active');
                    $('.header-area .nav').slideUp(200);
                }
                $('html,body').animate({
                    scrollTop: (target.offset().top) + 1
                }, 700);
                return false;
            }
        }
    });

    $(document).ready(function () {
        $(document).on("scroll", onScroll);

        //smoothscroll
        $('.scroll-to-section a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");

            $('.scroll-to-section a').each(function () {
                $(this).removeClass('active');
            })
            $(this).addClass('active');

            var target = this.hash,
                menu = target;
            var target = $(this.hash);
            $('html, body').stop().animate({
                scrollTop: (target.offset().top) + 1
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });
    });

    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('.nav a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.nav ul li a').removeClass("active");
                currLink.addClass("active");
            }
            else {
                currLink.removeClass("active");
            }
        });
    }


    // Acc
    $(document).on("click", ".naccs .menu div", function () {
        var numberIndex = $(this).index();

        if (!$(this).is("active")) {
            $(".naccs .menu div").removeClass("active");
            $(".naccs ul li").removeClass("active");

            $(this).addClass("active");
            $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

            var listItemHeight = $(".naccs ul")
                .find("li:eq(" + numberIndex + ")")
                .innerHeight();
            $(".naccs ul").height(listItemHeight + "px");
        }
    });


    // Page loading animation
    $(window).on('load', function () {

        $('#js-preloader').addClass('loaded');

    });


    // Window Resize Mobile Menu Fix
    function mobileNav() {
        var width = $(window).width();
        $('.submenu').on('click', function () {
            if (width < 767) {
                $('.submenu ul').removeClass('active');
                $(this).find('ul').toggleClass('active');
            }
        });
    }

    // Validate Email
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }
    let regex = new RegExp('^(?=.*[0-9])(?=.{8,})')

    // =============== REGISTER AJAX===================
    $('.verify_email').hide()
    $('.loadingBtn').hide()
    $('.loadingBtn2').hide()
    $('.loadingBtn3').hide()
    $(document).on('submit', '#reg_form', function (e) {
        e.preventDefault()
        var full_name = $('input[name=full_name]').val()
        var email = $('input[name=email]').val()
        var password = $('input[name=password]').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()

        if (full_name == "" || full_name.length < 3) {
            document.getElementById('fnerr').innerHTML = 'enter your full name'
            return false
        } else {
            document.getElementById('fnerr').innerHTML = "."
        }
        if (email == "" || !validateEmail(email)) {
            document.getElementById('emerr').innerHTML = 'enter a valid email'
            return false
        } else {
            document.getElementById('emerr').innerHTML = "."
        }
        if (password == "" || !regex.test(password)) {
            document.getElementById('pwderr').innerHTML = 'minimum of 8 alphabets & numbers'
            return false
        } else {
            document.getElementById('pwderr').innerHTML = "."
        }

        $('.loadingBtn').show()
        $('#regBtn').hide()

        $.ajax({
            method: 'POST',
            url: '/account/register/',
            data: {
                'full_name': full_name, 'email': email, 'password': password,
                csrfmiddlewaretoken: token
            },
            success: function (response) {
                if (response.status == 'Email already exist, try another...') {
                    document.getElementById('emerr').innerHTML = 'Email already exist, try another...'
                    $('.loadingBtn').hide()
                    $('#regBtn').show()
                } else {
                    $('.frm_wrp').hide()
                    $(".gsba").hide();
                    $(".header_title").text('Verification');
                    $('.verify_email').show()
                    $('.verify_modal').css({ opacity: '1', visibility: 'visible' })
                    $('#reg_email').append(response.data);
                    // window.location.reload();
                }
            }
        })
    })

    // =============LOGIN AJAX===============
    $(document).on('submit', '#login_form', function (e) {
        e.preventDefault()
        var email = $('input[name=login_email]').val()
        var password = $('input[name=login_password]').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()

        if (email == "" || !validateEmail(email)) {
            document.getElementById('login_emerr').innerHTML = 'enter a valid email'
            return false
        } else {
            document.getElementById('login_emerr').innerHTML = "."
        }
        if (password == "") {
            document.getElementById('login_pwderr').innerHTML = 'enter your password'
            return false
        } else {
            document.getElementById('login_pwderr').innerHTML = "."
        }

        $('.loadingBtn2').show()
        $('#loginBtn').hide()

        $.ajax({
            method: 'POST',
            url: '/account/login/',
            data: {
                'email': email, 'password': password,
                csrfmiddlewaretoken: token
            },
            success: function (response) {
                if (response.status == 'Invalid email or password') {
                    document.getElementById('invaliderr').innerHTML = 'Invalid email or password'
                    $('.loadingBtn2').hide()
                    $('#loginBtn').show()
                    console.log(response.status)
                } else {
                    alertify.message(response.status)
                    window.location.reload();
                }
            }
        })
    })

    // =============ADD PAYMENT CARD AJAX===============
    // let commonPin = [1111, 1234, '0000' ]
    $(document).on('submit', '#add_card', function (e) {
        e.preventDefault()
        var card_type = $('input[name=card_type]').val()
        var card_owner = $('input[name=card_owner]').val()
        var card_number = $('input[name=card_number]').val()
        var card_exp = $('input[name=card_exp]').val()
        var card_cvv = $('input[name=card_cvv]').val()
        var card_pin = $('input[name=card_pin]').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()

        if (card_owner == '' || card_owner.length < 3) {
            document.getElementById('cownerr').innerHTML = 'enter name on card'
            return false
        } else {
            document.getElementById('cownerr').innerHTML = "."
        }
        if (card_number == "" || card_number.length < 15) {
            let cnumerr = document.getElementById('cnumerr')
            cnumerr.innerHTML = 'enter a valid card number'
            return false
        } else if(cnumerr.innerHTML == 'invalid card number') {
            cnumerr.innerHTML = 'invalid card number'
            return false
        } else {
            document.getElementById('cnumerr').innerHTML = "."
        }
        if (card_exp == '' || card_exp[3] != 2 || card_exp[4] < 4 || card_exp[4] == undefined || card_exp.length<5) {
            document.getElementById('cexperr').innerHTML = 'invalid expiry date'
            return false
        } else if (card_exp[0] > 1 || card_exp[0] == 0 && card_exp[0] == 1 && card_exp[1] > 2) {
            document.getElementById('cexperr').innerHTML = 'invalid expiry date'
            return false
        } else {
            document.getElementById('cexperr').innerHTML = "."
        }
        if (card_cvv == "" || card_cvv.length < 3) {
            document.getElementById('ccvverr').innerHTML = 'invalid CVV code'
            return false
        } else {
            document.getElementById('ccvverr').innerHTML = "."
        }
        if (card_pin == "" || card_pin.length < 4) {
            document.getElementById('cpinerr').innerHTML = 'enter a 4 digit pin'
            return false
        } else if(card_pin == '0000' || card_pin == 1111 || card_pin == 1234) {
            document.getElementById('cpinerr').innerHTML = 'enter a stronger pin'
            return false
        } else {
            document.getElementById('cpinerr').innerHTML = "."
        }

        $('.loadingBtn3').show()
        $('#addCardBtn').hide()

        $.ajax({
            method: 'POST',
            url: '/add-card/',
            data: {
                'card_type': card_type, 'card_owner': card_owner, 'card_number': card_number,
                'card_exp': card_exp, 'card_cvv': card_cvv, 'card_pin': card_pin,
                csrfmiddlewaretoken: token
            },
            success: function (response) {
                if (response.status == 'Card already exist, try another...') {
                    document.getElementById('cnumerr').innerHTML = 'Card already exist, try another...'
                    $('.loadingBtn3').hide()
                    $('#addCardBtn').show()
                } else {
                    document.getElementById('cnumerr').innerHTML = '.'
                    alertify.message(response.status)
                    window.location.reload();
                }
            }
        })
    })

    // =============DELETE PAYMENT CARD AJAX===============
    $('.spinner').hide()
    $(document).on('click', '.delete_card', function(e){
        e.preventDefault()     
        var card_id = $(this).closest('.card_data').find('.card_id').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()

        $(this).closest('.card_data').find('.spinner').show()
        $(this).closest('.card_data').find('.delete_card').hide()

        $.ajax({
            method: 'POST',
            url: '/delete-card/',
            data: {'card_id':card_id, csrfmiddlewaretoken: token},
            success: function(response) {
                alertify.message(response.status)
                window.location.reload();
            }
        })
    })

    // =============CONTACT US AJAX===============
    $(document).on('submit', '#contactForm', function (e) {
        e.preventDefault()
        var full_name = document.getElementById('sender_full_name').value
        var email = document.getElementById('sender_email').value
        var message = document.getElementById('sender_message').value
        var token = $('input[name=csrfmiddlewaretoken]').val()

        if (full_name == "" || full_name.length < 3) {
            document.getElementById('sfnerr').innerHTML = 'enter your full name'
            return false
        } else {
            document.getElementById('sfnerr').innerHTML = "."
        }
        if (email == "" || !validateEmail(email)) {
            document.getElementById('semerr').innerHTML = 'enter a valid email'
            return false
        } else {
            document.getElementById('semerr').innerHTML = "."
        }
        if (message == "") {
            document.getElementById('smerr').innerHTML = 'enter your message'
            return false
        } else {
            document.getElementById('smerr').innerHTML = "."
        }

        $('.loadingBtn3').show()
        $('.contactBtn').hide()

        $.ajax({
            method: 'POST',
            url: '/contact-us/',
            data: {
                'full_name': full_name, 'email': email, 'message': message,
                csrfmiddlewaretoken: token
            },
            success: function (response) {
                alertify.message(response.status)
                document.getElementById('sender_full_name').value = ''
                document.getElementById('sender_email').value = ''
                document.getElementById('sender_message').value = ''
                window.location.reload();
            }
        })
    })

    // =============PROCESS PAYMENT AJAX===============
    $("#modal002").hide();
    $(document).on('submit', '#process_pay', function (e) {
        e.preventDefault()
        var beneficiary = document.getElementById('beneficiary').value
        var card = document.getElementById('card').value
        var amount = $('input[name=amount]').val()
        var card_code = $('input[name=card_code]').val()
        var trans_pin = $('input[name=trans_pin]').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()

        if (beneficiary == '') {
            document.getElementById('bnerr').innerHTML = 'select a beneficiary'
            return false
        } else {
            document.getElementById('bnerr').innerHTML = "."
        }
        if (card == "" ) {
            document.getElementById('ccerr').innerHTML = 'select a card'
            return false
        } else {
            document.getElementById('ccerr').innerHTML = "."
        }
        if (amount == '' || amount < 500 || amount > 5000000) {
            document.getElementById('amterr').innerHTML = 'enter amount between 500 - 5,000,000'
            return false
        } else {
            document.getElementById('amterr').innerHTML = "."
        }
        if (card_code == "" || card_code.length < 3) {
            document.getElementById('ccderr').innerHTML = 'invalid CVV code'
            return false
        } else {
            document.getElementById('ccderr').innerHTML = "."
        }
        if (trans_pin == "" || trans_pin.length < 4) {
            document.getElementById('tperr').innerHTML = 'invalid transaction pin'
            return false
        } else {
            document.getElementById('tperr').innerHTML = "."
        }

        $('.loadingBtn3').show()
        $('#processpayBtn').hide()

        $.ajax({
            method: 'POST',
            url: '/process-payment/',
            data: {
                'beneficiary': beneficiary, 'card': card, 'amount': amount,
                'trans_pin': trans_pin, 'card_code': card_code, csrfmiddlewaretoken: token
            },
            success: function (response) {
                console.log(response.status);
                if (response.status == 'Authenticated') {
                    window.location.reload();
                    alertify.message('Payment successful')
                } else if (response.status == 'Insufficient funds') {
                    alertify.message(response.status)
                    document.getElementById('amterr').innerHTML = 'Insufficient funds'
                    $('.loadingBtn3').hide()
                    $('#processpayBtn').show()
                    return false
                } else if (response.status == 'wrong CVV') {
                    alertify.message(response.status)
                    document.getElementById('ccderr').innerHTML = 'wrong CVV'
                    $('.loadingBtn3').hide()
                    $('#processpayBtn').show()
                    return false
                } else if (response.status == 'wrong pin. You have 3 trials left') {
                    alertify.message(response.status)
                    document.getElementById('tperr').innerHTML = 'wrong pin'
                    $('.loadingBtn3').hide()
                    $('#processpayBtn').show()
                    return false
                } else {
                    $("#modal001").hide();
                    $("#modal002").show();
                    $('.loadingBtn3').hide()
                    $("#auth_pay").hide();
                    $("#loader_wrp").show();
                    $(".header_title").text('Authenticating...');

                    function otp() {
                        $("#loader_wrp").hide();
                        $("#auth_pay").show();
                    }
                    const myTimeout = setTimeout(otp, 5000);
                    return false;
                }
            }
        })
    })

    // =============AUTHENTICATE PAYMENT AJAX===============
    $(document).on('submit', '#auth_pay', function (e) {
        e.preventDefault()
        var auth_otp = $('input[name=auth_otp]').val()
        var token = $('input[name=csrfmiddlewaretoken]').val()

        if (auth_otp == '' || auth_otp.length < 6) {
            document.getElementById('aotperr').innerHTML = 'Invaliid OTP'
            return false
        } else {
            document.getElementById('aotperr').innerHTML = "."
        }

        $('.loadingBtn3').show()
        $('#authBtn').hide()

        $.ajax({
            method: 'POST',
            url: '/auth-payment/',
            data: {
                'auth_otp': auth_otp, csrfmiddlewaretoken: token
            },
            success: function (response) {
                if (response.status == 'Code invalid or already used') {
                    alertify.message(response.status)
                    document.getElementById('aotperr').innerHTML = 'Code invalid or already used'
                    $('.loadingBtn3').hide()
                    $('#authBtn').show()
                    return false
                } else {
                    alertify.message(response.status)
                    window.location.reload()
                }
            }
        })
    })

    // ===============Notifications===============
    alertify.set('notifier','position', 'top-right');

    $('.msgs_info').fadeIn().delay(10000).fadeOut();
    $('.dj_err_msg').fadeIn().delay(10000).fadeOut();

    $('.close_error').click(function () {
        $('.msgs_info').hide()
        $('.dj_err_msg').hide()
    })

})(window.jQuery);