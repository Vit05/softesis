
if ($(window).width() < 425) {
  var touchHover = function() {
    $('[data-hover]').click(function(e){
      e.preventDefault();
      var $this = $(this);
      var onHover = $this.attr('data-hover');
      var linkHref = $this.attr('href');
      if (linkHref && $this.hasClass(onHover)) {
        location.href = linkHref;
        console.log($this.offset().top, $(".use-case-container").offset().top)

        var th = $(this);
        var th_el = th.attr("href");
        var modal_body = $(th_el).find(".modal-body");
        var modal_header = $(th_el).find(".modal-header");
        var modal_body_height = $(window).height() - modal_header.height() - 80;
        $(th_el).addClass("show-mob-desc");
        modal_body.css("height",modal_body_height);

        $(document).on("click", ".close-modal", function(event) {
//          event.stopPropagation();
          $(th_el).removeClass("show-mob-desc");
        });

        return false;
      }
      $this.toggleClass(onHover);

    });
  };
  touchHover()
}
else {








  $(".use-case-description").on("click", function(e) {
    e.preventDefault();
    var th = $(this);
    var th_el = th.attr("href");
    $('html, body').animate({
      scrollTop: $("#use_case").offset().top
    }, 400);
    bgFadeIn(th_el);

    $(document).on("click", ".close-modal", function(event) {
//      event.stopPropagation();
      bgFadeOut(th_el)

    })
    $(document).click(function(event) {
      if (!$(event.target).is(".use-case-description, .case-full-description *, .case-full-description")) {
        bgFadeOut(th_el)
      }
    });
  })
}



$(document).ready(function (){
  $(".to_contact_form").click(function (e){
    e.preventDefault();
    if ($(window).width() < 425) {
      $(".header").removeClass("opener");
    }
    $('html, body').animate({
      scrollTop: $("#contact_us").offset().top
    }, 700);
  });

  $(".to-top").click(function (e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $("#back_to_top").offset().top
    }, 700);
  });
});

function bgFadeOut(elem) {
  var cssProperties = anime({
    targets: elem,
    duration: 400,
    borderRadius: ['0', '50%'],
    easing: 'easeInOutQuad',
    opacity:0,
    scale: {
      value: [1, 0],
      duration: 200,
      easing: 'easeInOutQuart'
    },
//    delay: 100,
  });
}



function bgFadeIn(el) {
  var cssProperties = anime({
    targets: el,
    duration: 400,
    borderRadius: ['50%', '0'],
    opacity: [0, 1],
    easing: 'easeInOutElastic',
    scale: {
      value: [0, 1],
      duration: 200,
      easing: 'easeInOutElastic'
    },
    delay: 100,
  });
}
var swiper = new Swiper('.swiper-container', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
});

$(".nav-mob").on("click", function() {
  $(".header").addClass("opener");
  $(".close-nav").on("click", function(){
    $(".header").removeClass("opener");
  })
})
$("#contact_us_form").validate({
  rules: {
    username: {
      required: true,
    },
    email: {
      required: true,
      email: true
    },
    phone: {
      required: true,
    },
    country: {
      required: true,
    }
  },
  messages: {
    firstname: "Please enter your firstname",
    country: "Please enter your country",
    phone: {
      required: "Please enter a phone number",
      // minlength: "Your password must be at least 5 characters long"
    },
    email: "Please enter a valid email address"
  },
});





setTimeout(function () {
  return document.getElementById('liquid_effect').classList.add('render');
}, 60);


var spriteImages = document.querySelectorAll('.slide-item__image');
var spriteImagesSrc = [];

for (var i = 0; i < spriteImages.length; i++) {
  var img = spriteImages[i];
  spriteImagesSrc.push(img.getAttribute('src'));
}
var initCanvasSlideshow = new CanvasSlideshow({
  sprites: spriteImagesSrc,
  displacementImage: 'img/landing/dmaps/2048x2048/clouds.jpg',
  autoPlay: true,
  autoPlaySpeed: [10, 3],
  fullScreen: true


})