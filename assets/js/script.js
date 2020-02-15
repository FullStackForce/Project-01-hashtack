var burger = document.querySelector('.burger');
var nav = document.querySelector('#' + burger.dataset.target);
var header = document.querySelector('.headroom');

//Bulma responsive nav
burger.addEventListener('click', function(){
  burger.classList.toggle('is-active');
  nav.classList.toggle('is-active');
});

//Headroom (using Animate.css styles)
var headroom = new Headroom(header, {
  tolerance: {
    down : 10,
    up : 20
  },
  offset : 205
});
headroom.init();

const button = document.getElementById('button');
	button.addEventListener('click', () => {
		button.classList.add('is-loading');
  });
  


// switch to dark mode

var themeSwitcher = document.querySelector("#theme-switcher");
var container = document.querySelector("body");
var mode = "light";

themeSwitcher.addEventListener("click", function() {
  if (mode === "dark") {
    mode = "light";
    container.setAttribute("class", "light");
  }
  else {
    mode = "dark";
    container.setAttribute("class", "dark");
  }
});


// Go to top

jQuery(document).ready(function() {
  var smooth = 500;
  jQuery(window).scroll(function() {
    if (jQuery(this).scrollTop() > 200) {
      jQuery('.scroll-top').fadeIn(smooth);
    } else {
      jQuery('.scroll-top').fadeOut(smooth);
    }
  });
  jQuery('.scroll-top').click(function(event) {
    event.preventDefault();
    jQuery('html').animate({scrollTop: 0}, smooth);
    return false;
  })
});