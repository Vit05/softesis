
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
        $(th_el).addClass("show-mob-desc");
        $(th_el).css("top",$this.offset().top - $(".use-case-container").offset().top);

        $(document).on("click", ".close-modal", function(event) {
          event.stopPropagation();
          $(th_el).removeClass("show-mob-desc");
        })
        $(document).click(function(event) {
          if (!$(event.target).is(".use-case-description")) {
            bgFadeOut(th_el)
          }
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
    bgFadeIn(th_el)

    $(document).on("click", ".close-modal", function(event) {
      event.stopPropagation();
      bgFadeOut(th_el)

    })
    $(document).click(function(event) {
      if (!$(event.target).is(".use-case-description")) {
        bgFadeOut(th_el)
      }
    });
  })
}



$(document).ready(function (){
  $(".to_contact_form").click(function (e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $("#contact_us_form").offset().top
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
    scale: {
      value: [1, 0],
      duration: 200,
      easing: 'easeInOutQuart'
    },
    delay: 100,
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






//{
//  setTimeout(() => document.getElementById('liquid_effect').classList.add('render'), 60);
//}
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