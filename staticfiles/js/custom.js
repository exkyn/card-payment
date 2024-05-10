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

  // =============== REGISTER ===================
  $('.verify_email').hide()
  $('.loadingBtn').hide()
  $('.loadingBtn2').hide()
  $(document).on('submit', '#reg_form', function(e){
      e.preventDefault()
      var full_name = $('input[name=full_name]').val()
      var email = $('input[name=email]').val()
      var password = $('input[name=password]').val()
      var token = $('input[name=csrfmiddlewaretoken]').val()

      if (full_name == "" || full_name.length < 3){
        document.getElementById('fnerr').innerHTML = 'enter your full name'
        return false
      } else {
        document.getElementById('fnerr').innerHTML = "."
      }
      if (email == "" || !validateEmail(email)){
        document.getElementById('emerr').innerHTML = 'enter a valid email'
        return false
      } else {
        document.getElementById('emerr').innerHTML = "."
      }
      if (password == "" || !regex.test(password)){
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
              'full_name':full_name, 'email':email, 'password':password,
              csrfmiddlewaretoken: token
          },
          success: function(response) {
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
              }
          }
      })
  })


  // =============LOGIN AJAX===============
  $(document).on('submit', '#login_form', function(e){
    e.preventDefault()
    var email = $('input[name=login_email]').val()
    var password = $('input[name=login_password]').val()
    var token = $('input[name=csrfmiddlewaretoken]').val()

    if (email == "" || !validateEmail(email)){
      document.getElementById('login_emerr').innerHTML = 'enter a valid email'
      return false
    } else {
      document.getElementById('login_emerr').innerHTML = "."
    }
    if (password == ""){
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
                'email':email, 'password':password,
                csrfmiddlewaretoken: token
        },
        success: function(response) {
            if (response.status == 'Invalid email or password') {
                document.getElementById('invaliderr').innerHTML = 'Invalid email or password'
                $('.loadingBtn2').hide()
                $('#loginBtn').show()
                console.log(response.status)
            } else {
                location.reload()
            }
        }
    })
})




  const checkLuhn = num => !(num
    .replace(/\D/g, '')
    .split('')
    .reverse() 
    .map((e, i) => e * (i % 2 + 1)) 
    .join('') 
    .split('') 
    .reduce((e, t) => t - 0 + e, 0) 
    % 10);

  console.log(checkLuhn('5279 0958 7865 9890'))


let expDate = "0694";
function gfg_Run2() {
    console.log(
        expDate.substr(0, 2)+"/"+expDate.substr(2, 2),
    );
}
gfg_Run2();



})(window.jQuery);