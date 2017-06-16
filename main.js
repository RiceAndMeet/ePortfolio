//jquery animation when scrolling 
$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      //destination position accounting for size of navbar 
      scrollTop: $(this).offset().top//-$window.height() 
    }, 1000);
  });
}

window.onload = function(){
  $('#hello').scrollView();  
  $('#loader').css('top','-100vh');
  $('#loader').css ('animation-play-state','paused');
}

var mapNavbarToPage = function (nav_bar_id){
  if (nav_bar_id == "intro") return "hello";
  else if (nav_bar_id == "bio") return "aboutMe";
  else if (nav_bar_id == "portfolio") return "projects";
  else if (nav_bar_id == "contactMe") return "contact";
}

//scroll position detection 
var $animation_elements = $('.animation-element'); 
var $window = $(window);
//check if the specified element is in view 
function check_if_in_view() {
  // scale down window height to 91%, accounting for the height of tool bar   
  var window_height =Math.trunc($window.height() *0.91);
  var window_top_position = Math.trunc($window.scrollTop()+$window.height()*0.09);
  var window_bottom_position = (window_top_position + window_height);
  var current_scroll_direction = $(this).scrollTop();
  //change animation-element's astatus base on its position 
  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
     if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
        //animation 
        $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
    console.log(element_top_position);
  });
  console.log('window'+window_bottom_position);
}
$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

//creating footer button dynamicially
$elements = $('.page-footer');
var $button = $('<button>',{'class':'btn btn-secondary hvr-bob','id':'footerButton'});
$button[0].innerHTML= 'About Me <span class="glyphicon glyphicon-download"></span>';
//add action listener to the footer navigation button 
$button.click(function(event){
    var current_nav_item = $('.active')[0];
    var element = $(this)[0];
    //match nav-items with corresponding page
    if (current_nav_item.id.indexOf("intro")!== -1){
      element.innerHTML = 'My Projects <span class="glyphicon glyphicon-download"></span>';
      $("#aboutMe").scrollView();
      $('#intro').removeClass('active');
      $("#bio").addClass('active');
    }
    else if (current_nav_item.id.indexOf("bio")!== -1){
      element.innerHTML = 'Contact Me <span class="glyphicon glyphicon-download"></span>';
      $("#projects").scrollView();
      $('#bio').removeClass('active');
      $('#portfolio').addClass('active');
    }
    else if (current_nav_item.id.indexOf("portfolio") !== -1){
      $('#footerButton').hide();
      $("#contact").scrollView();
      $('#portfolio').removeClass('active');
      $('#contactMe').addClass('active');
    }
});
$elements.append($button);

// for mobile versison, expanding navbar 
$('#navbarLinks').on('click',function(event){
  $('#navbarLinks').toggleClass('responsive');
});
var $nav_elements = $('#navbarLinks')[0].children;
//add actionlistener to nav-items, when click it will scroll to
//corresponding destination on the DOM 
$.each($nav_elements,function(){
   var element = $(this).attr('id');
   var button_element = $button[0];
   if (element == "intro"){
      $('#intro').click(function(event){
          $('#hello').scrollView();
          $(".active")[0].className="nav-item hvr-float-shadow";
          $('#intro')[0].className+= ' active';
          button_element.innerHTML= 
            'About Me <span class="glyphicon glyphicon-download"></span>';
          $('#footerButton').show();
      });
   }
   else if (element == "bio"){
      $('#bio').click(function(event){
          $('#aboutMe').scrollView();
          $(".active")[0].className="nav-item hvr-float-shadow";
          $('#bio')[0].className+= ' active';
          button_element.innerHTML= 
            'My Projects <span class="glyphicon glyphicon-download"></span>';
          $('#footerButton').show();
      });
   }
   else if (element == "portfolio"){
      $('#portfolio').click(function(event){
          $('#projects').scrollView();
          $(".active")[0].className="nav-item hvr-float-shadow";
          $('#portfolio')[0].className+= ' active';
          button_element.innerHTML= 
            'Contact Me <span class="glyphicon glyphicon-download"></span>';
          $('#footerButton').show();
      });
   }
   else if (element == "contactMe"){
      $('#contactMe').click(function(event){
          $('#contact').scrollView();
          $(".active")[0].className="nav-item hvr-float-shadow";
          $('#contactMe')[0].className+= ' active';
          $('#footerButton').hide();
      });
   }
});

// when hovering keywords on the intro key, display background image corresponding to that keyword
$('#steven').hover(
  function(event){
    $('#hello').css("background-image","url(images/Steven.jpg)");
    $('#hello').css("background-size","100% 100%");
    $(this).css("cursor","pointer");
    $('#hello h1,#hello h2,.underline_keywords').css("color","transparent");//make other text disappear
    $(this).css("color","white");
    $('#intro_text .counter').css("display",'none'); //make the animated counter disappear
  }, function(event){// revert the changes 
    $('#hello').css("background-image",'');
    $('#hello').css("background-size",'cover');
    $('#intro_text h1,#intro_text h2,.underline_keywords').css("color","rgb(77, 77, 77)");
    $('.underline_keywords').css("color","rgb(67, 125, 219)");
    $('#intro_text .counter').css("display",'inline-block');
  }
);
$('#soccer').hover(
  function(event){
    $('#hello').css("background-image","url(images/soccer.jpg)");
    $(this).css("cursor","pointer");
    $('#hello h1,#hello h2,.underline_keywords').css("color","transparent");
    $(this).css("color","black");
    $('#intro_text .counter').css("display",'none'); //make the animated counter disappear
  }, function(event){// revert the changes 
    $('#hello').css("background-image",'');
    $('#intro_text h1,#intro_text h2,.underline_keywords').css("color","rgb(77, 77, 77)");
    $('.underline_keywords').css("color","rgb(67, 125, 219)");
    $('#intro_text .counter').css("display",'inline-block');
  }
);
$('#toronto').hover(
  function(event){
    $('#hello').css("background-image","url(http://imgprix.com/web/wallpapers/toronto-skyline-ontario-canada/1920x1080.jpg)");
    $(this).css("cursor","pointer");
    $('#intro_text h1,#intro_text h2,.underline_keywords').css("color","transparent");
    $(this).css("color","white");
    $('#intro_text .counter').css("display",'none'); //make the animated counter disappear
  },function(event){
    $('#hello').css("background-image",'');
    $('#intro_text h1,#intro_text h2,.underline_keywords').css("color","rgb(77, 77, 77)");
    $('.underline_keywords').css("color","rgb(67, 125, 219)");
    $('#intro_text .counter').css("display",'inline-block');
  }
)


$(".circle").click(function() {
  var spanNum = $(this).attr("id");
  selectCircle(spanNum);
});

function selectCircle(selector) {
  //match corresponding page associated with the circle 
  $selector = "#" + selector;
  $spanSelector = $selector.replace("circle", "content");
  var current = $selector.replace("circle", "");
  
  $(".active_timeline").removeClass("active_timeline");
  $($selector).addClass("active_timeline");
  
  //page slider for left and right 
  if ($($spanSelector).hasClass("right")) {
    $(".center").removeClass("center").addClass("left")
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("right")
  } else if ($($spanSelector).hasClass("left")) {
    $(".center").removeClass("center").addClass("right");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("left");
  }; 
};

//animation for changing text in the HELLO Page
var container = ['Java EE', "C/C++", "Web"];
var index=0;
var int = setInterval(calcValues, 1000);
function calcValues() {
  $('.counter .to')
    .addClass('hide')
    .removeClass('to')
    .addClass('from')
    .removeClass('hide')
    .addClass('n')
    .find('span:not(.shadow)').each(function (i, el) {
  $(el).text(container[index%3]);});
    $('.counter .from:not(.n)')
        .addClass('hide')
        .addClass('to')
        .removeClass('from')
        .removeClass('hide')
    .find('span:not(.shadow)').each(function (i, el) {
        $(el).text();
    });
    $('.counter .n').removeClass('n');
    ++index;
}
calcValues();

//animation for flip card 
$(document).ready(function(){
    // set up hover panels
    // although this can be done without JavaScript, we've attached these events
    // because it causes the hover to be triggered when the element is tapped on a touch device
    $('.hover').hover(function(){
      $(this).addClass('flip');
    },function(){
      $(this).removeClass('flip');
    });
  });

