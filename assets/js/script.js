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

// const button = document.getElementById('button');
// 	button.addEventListener('click', () => {
// 		button.classList.add('is-loading');
//   });
  
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

// Dark Mode

var darkEnabled = false; 
$(document).ready(function() {
        $("#theme-switcher, #theme-switcher").on("click", switchDarkMode);
        $("#reset").on("click", reset);
        }
      );
      
      function switchDarkMode(){
        darkEnabled = !darkEnabled;
        if(darkEnabled){
          $("body").addClass("dark");
        } else {
          $("body").removeClass("dark");
        }
      }
      
      function reset(){
        $("body").removeClass("dark");
      }