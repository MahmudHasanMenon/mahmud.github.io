/*************************************************************
Template Name: TPail - Responsive Multipurpose Portfolio / Resume / CV / vCard
Template URI: https://themeforest.net/user/themepail/portfolio
Description: TPail - Responsive Multipurpose Portfolio / Resume / CV / vCard
Copyright 2019 ThemePail All rights reserved.
Author URI: https://themepail.com
Author: ThemePail
Version: 1.0
**************************************************************/
(function($) {
    "use strict";
    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };
    TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
        var that = this;
        var delta = 300 - Math.random() * 100;
        if (this.isDeleting) { delta /= 2; }
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        setTimeout(function() {
            that.tick();
        }, delta);
    };
    window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-rotate');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #fff }";
        document.body.appendChild(css);
    };
    $('.skills-chart').waypoint(function() {
        $('.progress-bar').each(function(){
            $(this).find('.progress').animate({
                width:$(this).attr('data-percent')
            },3000);
        });
    },{
        offset: '100%'
    });
    $.stellar({
        horizontalScrolling: false,
        responsive: true
    });
    new WOW().init();
    var header = $('.banner-inner');
    var range = 300;
    $(window).on('scroll', function (e) {
        var scrollTop = $(this).scrollTop(),
            height = header.outerHeight(),
            offset = height / 2,
            calc = 1 - (scrollTop - offset + range) / range;
        header.css({ 'opacity': calc });
        if (calc > '1') {
            header.css({ 'opacity': 1 });
        } else if ( calc < '0' ) {
            header.css({ 'opacity': 0.2 });
        };
        if ($(window).scrollTop() > 0.1) {
            $('header').addClass('stick');
        } else {
            $('header').removeClass('stick');
        }
        e.preventDefault();
    });
    var offset = 300;
    var duration = 450;
    $(window).on('scroll', function(e) {
        if ($(this).scrollTop() > offset) {
            $('.scroll-to-top').fadeIn(450);
        } else {
            $('.scroll-to-top').fadeOut(450);
        }
        e.preventDefault();
    });
    $('.scroll-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 700);
        return false;
    })
    jQuery(document).ready(function($) {
        var links = $('.navbar ul li a');
        $.each(links, function (key, va) {
            if (va.href == document.URL) {
                $(this).addClass('active');
            }
        });
        var container = document.querySelector('[data-ref="container"]');
        var mixer = mixitup(container, {
            animation: {
                duration: 600
            },
            selectors: {
                control: '[data-filter]'
            }
        });
        $('.counter').counterUp({
            delay: 9,
            time: 800
        });
        window.p = new Particles(document.getElementById("particles"));
        $('.banner-section').css('height',$(window).height());
        $('.navbar-nav>li>a:not(.nav-item.dropdown a)').on('click', function(e){
            $('.navbar-collapse').collapse('hide');
            e.preventDefault();
        });
    });
    $('.gallery').each(function() {
        $(this).magnificPopup({
          delegate: 'a.m-popup',
          type: 'image',
          gallery: {
              enabled:true
          }
        });
    });
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items:1,
        loop:true,
        margin:0,
        nav:true,
        autoplay:true,
        smartSpeed: 450,
        autoplayTimeout:4000,
        autoplayHoverPause:true
    });
    $('.owl-carousel').find('.owl-prev').html('<i class="lnr lnr-chevron-left"></i>');
    $('.owl-carousel').find('.owl-next').html('<i class="lnr lnr-chevron-right"></i>');
    $(function () {
        window.verifyRecaptchaCallback = function (response) {
          $('input[data-recaptcha]').val(response).trigger('change');
        }
        window.expiredRecaptchaCallback = function () {
          $('input[data-recaptcha]').val("").trigger('change');
        }
        $('#contact-form').validator();
        $('#contact-form').on('submit', function (e) {
            if (!e.isDefaultPrevented()) {
                var url = "contact.php";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: $(this).serialize(),
                    success: function (data) {
                        var messageAlert = 'alert-' + data.type;
                        var messageText = data.message;
                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="lnr lnr-cross"></i></button>' + messageText + '</div>';
                        if (messageAlert && messageText) {
                            $('#contact-form').find('.messages').html(alertBox);
                            $('#contact-form')[0].reset();
                            grecaptcha.reset();
                        }
                    }
                });
              return false;
            } 
        })
    });
    $('input[type="tel"]').keyup(function(){
        $(this).val($(this).val().replace(/[^\d]/,''));
    });
    $(function() {
        $('a[href*="#"]:not([href="#"])').on('click', function(e) {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top -80
                        }, 1500);
                    return false;
                }
            }
        });
    });
    $(window).on('load', function(e) {
        "use strict";
        $('#pre-loader').fadeOut();
        e.preventDefault();
    });
}(jQuery));