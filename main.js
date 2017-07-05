//jquery animation when scrolling ------------------------------
$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      //destination position accounting for size of navbar 
      scrollTop: $(this).offset().top 
    }, 1000);
  });
}
//preloading images -------------------------------------------------
$.fn.preload = function() {
    this.each(function(){
        (new Image()).src = this;
    });
}
var images =['images/Steven.jpg','images/soccer.jpg',
'images/Toronto.jpg','images/beginner.jpg','images/level1.png',
'https://wallpaperscraft.com/image/line_light_background_bright_43975_2560x1600.jpg',
'http://digitallearning.eletsonline.com/wp-content/uploads/2015/05/EngineeringSkills.jpg',
'http://images.stockunlimited.net/preview1300/collection-of-hobby-icons_1753303.jpg',
'https://i1.wp.com/eventosygraduaciones.com/wp-content/uploads/2017/01/cropped-graduadologo.png?fit=300%2C300',
'https://images7.alphacoders.com/333/333217.jpg','http://displ.net/wp-content/uploads/2016/04/responsive.png',
'https://crowdsourcedtesting.com/resources/wp-content/uploads/2016/01/DevOps-Gear.png',
'https://uberflip.cdntwrk.com/files/aHViPTU5NTQzJmNtZD1pdGVtZWRpdG9yaW1hZ2UmZmlsZW5hbWU9aXRlbWVkaXRvcmltYWdlXzU3N2VhZmE3MmNkZDkucG5nJnZlcnNpb249MDAwMCZzaWc9NWU1YTc5NmU2NjQ0ZmQ2YzE5MzkzY2Y3MTU3ZjdlNTA%253D',
'http://www.freeiconspng.com/uploads/3d-question-mark-icon-blue-color-picture-6.png',
'http://www.ryerson.ca/content/dam/admissions/Ryerson-university-quad-south-view.jpg',
'http://wallpaper-gallery.net/images/sadness-wallpapers-desktop/sadness-wallpapers-desktop-24.jpg',
'http://eskipaper.com/images/cloud-background-2.jpg'
];

window.onload = function(){
  $('#page0').scrollView();  
  $(images).preload();
  $('.page-container').css('height',window.innerHeight+"px");
  if(window.matchMedia("(max-width: 480px)").matches){
    $('#mainCont').css('height',(window.innerHeight-64-72)+"px");
    $('#timeline').css('height',(window.innerHeight-64)+"px");
  }
  $('#loader').css({'top':'-100vh','animation-play-state':'paused'});
}

//scroll position detection ---------------------------------------------------------------
var $animation_elements = $('.animation-element'); 
var $window = $(window);
//check if the specified element is in view 
function check_if_in_view() {
  // scale down window height to 91%, accounting for the height of tool bar   
  var window_height =Math.trunc($window.height());
  var window_top_position = Math.trunc($window.scrollTop()+$window.height());
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
  });
}
$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

//creating footer button dynamicially------------------------------------------------------
$elements = $('.page-footer');
var $button = $('<button>',{'class':'btn btn-secondary hvr-bob','id':'footerButton'});
$button[0].innerHTML= 'About Me <span class="glyphicon glyphicon-download"></span>';
//add action listener to the footer navigation button 
$button.click(function(event){
    var current_nav_item = $('.active')[0];
    var element = $(this)[0];
    //match nav-items with corresponding page
    if (current_nav_item.id.indexOf("nav0")!== -1){
      element.innerHTML = 'My Projects <span class="glyphicon glyphicon-download"></span>';
      $("#page1").scrollView();
      $('#nav0').removeClass('active');
      $("#nav1").addClass('active');
    }
    else if (current_nav_item.id.indexOf("nav1")!== -1){
      element.innerHTML = 'Contact Me <span class="glyphicon glyphicon-download"></span>';
      $("#page2").scrollView();
      $('#nav1').removeClass('active');
      $('#nav2').addClass('active');
    }
    else if (current_nav_item.id.indexOf("nav2") !== -1){
      $('#footerButton').hide();
      $("#page3").scrollView();
      $('#nav2').removeClass('active');
      $('#nav3').addClass('active');
    }
});
$elements.append($button);


//add actionlistener to nav-items, when click it will scroll to
//corresponding destination on the DOM ----------------------------------------------------------------------
var $nav_elements = $('#navbarLinks')[0].children;
$.each($nav_elements,function(){
   var element = $(this).attr('id');
   var button_element = $button[0];
   var $selector = element.replace('nav','page'); 
   $(this).click(function(){
      $("#"+$selector).scrollView();
      selectPage(element);
      $(".active").removeClass('active');
      $(this).addClass('active');
      if(element == "nav0"){
           button_element.innerHTML= 
          'About Me <span class="glyphicon glyphicon-download"></span>';
          $('#footerButton').show();
       }
       else if(element == "nav1"){
         button_element.innerHTML= 
        'My Projects <span class="glyphicon glyphicon-download"></span>';
          $('#footerButton').show();
       }
       else if(element == "nav2"){
          button_element.innerHTML= 
          'Contact Me <span class="glyphicon glyphicon-download"></span>';
            $('#footerButton').show();
       }
       else if(element == "nav3"){
          $('#footerButton').hide();
       }
   });
});
//sliding content-pages 
function selectPage (selector){
  $selector = "#" + selector;
  $contentSelector = $selector.replace("nav", "page");
  
  if ($($contentSelector).hasClass("right-page")){
    $(".center-page").removeClass("center-page").addClass("left-page");
    $($contentSelector).removeClass("right-page");
    $($contentSelector).addClass("center-page");
  }
  else if ($($contentSelector).hasClass("left-page")) {
    $(".center-page").removeClass("center-page").addClass("right-page");
    $($contentSelector).addClass("center-page");
    $($contentSelector).removeClass("left-page");
  }  
}

// when hovering keywords on the intro key, display background image corresponding to that keyword----------------------
$.fn.appear_on_hover = function(image){
  $(this).hover(
   function(event){
      $('#page0').css({"background-image":"url("+image+")","background-size":"100% 100%"});
      $('#page0 h1,#page0 h2,.underline_keywords').css("color","transparent");//make other text disappear
      $('.underline_keywords').css('display','none');
      $(this).css({"cursor":"pointer","color":"white",'display':'inline-block'});
      $('#intro_text .counter').css("display",'none'); //make the animated counter disappear
      $('#intro_text .content').css("display","none");
    }, function(event){// revert the changes 
      $('#page0').css({"background-image":'',"background-size":'cover'});
      $('#intro_text h1,#intro_text h2,.underline_keywords').css("color","rgb(77, 77, 77)");
      $('.underline_keywords').css({"color":"rgb(67, 125, 219)","display":"inline-block"});
      $('#intro_text .counter').css("display",'inline-block');
      $('#intro_text .content').css("display","block");
    });
}
$('#steven').appear_on_hover('images/Steven.jpg');
$('#soccer').appear_on_hover("images/soccer.jpg");
$('#toronto').appear_on_hover("images/Toronto.jpg");

//-----------------------------------------------------------------------
$(".circle").click(function() {
  var page = $(this).attr("id");
  selectCircle(page);
});
// sliding page for about me 
function selectCircle(selector) {
  //match corresponding page associated with the circle 
  $selector = "#" + selector;
  $contentSelector = $selector.replace("circle", "content");
  
  $(".active_timeline").removeClass("active_timeline");
  $($selector+' .ch-item').addClass("active_timeline");
  $($selector+' .mobile_nav_circle').addClass("active_timeline");
  
  //page slider for left and right 
  if ($($contentSelector).hasClass("right")) {
    $(".page_slide.center").removeClass("center").addClass("left")
    $($contentSelector).addClass("center");
    $($contentSelector).removeClass("right");
  } else if ($($contentSelector).hasClass("left")) {
    $(".page_slide.center").removeClass("center").addClass("right");
    $($contentSelector).addClass("center");
    $($contentSelector).removeClass("left");
  }; 
};

//animation for changing text in the HELLO Page------------------------------
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

//animation for flip card -----------------------------------------------------------------
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

//---------------------------

$.each($('.tl-item'),function(){
  $(this).dblclick(function(){
    $('#nav2').trigger('click');
  });
});