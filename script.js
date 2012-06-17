/* Modernizr 2.5.3 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-touch-teststyles-prefixes
 */
;window.Modernizr=function(a,b,c){function v(a){i.cssText=a}function w(a,b){return v(l.join(a+";")+(b||""))}function x(a,b){return typeof a===b}function y(a,b){return!!~(""+a).indexOf(b)}function z(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:x(f,"function")?f.bind(d||b):f}return!1}var d="2.5.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m={},n={},o={},p=[],q=p.slice,r,s=function(a,c,d,e){var h,i,j,k=b.createElement("div"),l=b.body,m=l?l:b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),k.appendChild(j);return h=["&#173;","<style>",a,"</style>"].join(""),k.id=g,(l?k:m).innerHTML+=h,m.appendChild(k),l||(m.style.background="",f.appendChild(m)),i=c(k,a),l?k.parentNode.removeChild(k):m.parentNode.removeChild(m),!!i},t={}.hasOwnProperty,u;!x(t,"undefined")&&!x(t.call,"undefined")?u=function(a,b){return t.call(a,b)}:u=function(a,b){return b in a&&x(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=q.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(q.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(q.call(arguments)))};return e});var A=function(c,d){var f=c.join(""),g=d.length;s(f,function(c,d){var f=b.styleSheets[b.styleSheets.length-1],h=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"",i=c.childNodes,j={};while(g--)j[i[g].id]=i[g];e.touch="ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch||(j.touch&&j.touch.offsetTop)===9},g,d)}([,["@media (",l.join("touch-enabled),("),g,")","{#touch{top:9px;position:absolute}}"].join("")],[,"touch"]);m.touch=function(){return e.touch};for(var B in m)u(m,B)&&(r=B.toLowerCase(),e[r]=m[B](),p.push((e[r]?"":"no-")+r));return v(""),h=j=null,e._version=d,e._prefixes=l,e.testStyles=s,e}(this,this.document);

var toolbar = $('#toolbar');
var body = $('body');
var wrapper = $('#wrapper');
var toolbarLinks = toolbar.find('a');

function loaded() {
	//body = new iScroll('wrapper');
	$('.open').on('tap', function(e){
	  toggleToolbar('animate');
	})
	swipeWrapper();
	swipeSevenPage();
	loading();
	var wrapperele = document.getElementById('wrapper');
	wrapperele.addEventListener( 
	    'webkitTransitionEnd', 
	     function( event ) { 
	         $('body').removeClass('transition'); 
	     }, false );
	 
}

function toggleToolbar(classes) {
  var body = $('body');
  if(body.hasClass('opentoolbar')) {
    body.addClass('closetoolbar ' + classes);
  }
  else {
    body.removeClass();
    body.addClass(classes);
  }
  body.toggleClass('opentoolbar');
}

Zepto.fn.toggleSevenPage = function(classes) {
  var body = $('body');
  var o = $(this[0]) // It's your element
  body.addClass(classes);
  o.toggleClass('out');
}

var offset;
var fingerCount;
var offsetDiff;
var startX;
var currentX;
var minMove = 0;
var minFingerSwipe = 50;
var pageWidth;
var swipeLength;
var minLength = 72; // the shortest distance the user may swipe
var movingSeven = false;

function touchCancel() {
  offset = 0;
  fingerCount = 0;
  offsetDiff = 0;
  startX = 0;
  currentX = 0;
  movingSeven = false;
  $('#wrapper').css('-webkit-transform', '');
  $('#wrapper li.seven').css('-webkit-transform', '');
}

function swipeSevenPage() {
   $('#wrapper li.seven').on("touchstart", function(e) {
     movingSeven = true;
     pageWidth = window.innerWidth;
      fingerCount = e.touches.length;
      if ( fingerCount == 1 ) {
        offset = $(this).offset(); 
        startX = event.touches[0].pageX;
        offsetDiff = startX - offset.left;  
      }
      else {
      		touchCancel(event);
      }
   });
   
  $('#wrapper li.seven').on("touchmove", function(e) { 
    var current = offset.left;  
    //fingerCount = e.changedTouches.length; 
    if ( fingerCount == 1 ) {
      e.preventDefault();//Disable scrolling  
      currentX = e.changedTouches[0].pageX;
      var move = currentX - offsetDiff;
      if (move < minMove) {
        move = minMove;
      }
      $(this).css('-webkit-transform', 'translate3d(' + move + 'px,0,0)');
    }

  
  $('#wrapper li.seven').on("touchend", function(e) { 
    movingSeven = false;
    swipeLength = Math.round(Math.sqrt(Math.pow(currentX - startX,2)));
    if(swipeLength > minLength) {
     $(this).toggleSevenPage("transition");
    }
    touchCancel();
  });
  
});
}

function swipeWrapper() {
   $('#wrapper').on("touchstart", function(e) {
     pageWidth = window.innerWidth;
      fingerCount = e.touches.length;
      if ( (fingerCount == 1) && (!movingSeven) ) {
        offset = $(this).offset(); 
        startX = event.touches[0].pageX;
        offsetDiff = startX - offset.left;  
      }
      else if (fingerCount !== 1) {
      		touchCancel(event);
      }
   });
   
  $('#wrapper').on("touchmove", function(e) { 
    var current = offset.left;  
    //fingerCount = e.changedTouches.length; 
    if ( (fingerCount == 1) && (!movingSeven) ) {
      e.preventDefault();//Disable scrolling  
      currentX = e.changedTouches[0].pageX;
      var move = currentX - offsetDiff;
      if (move < minMove) {
        move = minMove;
      }
      $(this).css('-webkit-transform', 'translate3d(' + move + 'px,0,0)');
    }

  
  $('#wrapper').on("touchend", function(e) { 
    if ( (fingerCount == 1) && (!movingSeven) ) {
      swipeLength = Math.round(Math.sqrt(Math.pow(currentX - startX,2)));
      if(swipeLength > minLength) {
        toggleToolbar("transition"); 
      }
      touchCancel();
    }
  });
});
}

function loading() {
  $('#toolbar').find('a').click(function() {
    if(Modernizr.touch) {
    return false;
    }
    else {
      $(this).loadNextPage();
    }
  })
  $('#toolbar').find('a').on('tap', function(e){
    $(this).loadNextPage();
    return false;
  })
}

Zepto.fn.loadNextPage = function() {
  var o = $(this[0]) // It's your element
  var href = o.attr('href');
  var url = href + '/ #wrapper';
  //removeOldPages();
  var nextpage = $('#wrapper > ol > li.current + li');
 if (nextpage.length == 0) {//Create a new page if we need one
    addNewPage(href, function() {
    nextpage = $('#wrapper > ol > li.current + li');  
  });
 } 
 else {
   nextpage.attr('data-url', href);
 }
 $('body').addClass('ui-loading');
  nextpage.load(url, function() {
     $('body').removeClass('ui-loading');
     $('#wrapper > ol > li').removeClass('current');
     nextpage.addClass('current');
     var toolbarOpen = $('body').hasClass('opentoolbar');
     if(toolbarOpen) {
       toggleToolbar('animate');
     }
     newPageSetup();
  })
};

function addNewPage(url,callback) {
  $("#wrapper > ol").append('<li class="seven" data-url="' + url + '"></li>');
  callback();
}


function newPageSetup() {
  $('#wrapper li.seven').on( 
      'webkitTransitionEnd', 
       function( event ) { 
           $('body').removeClass('transition'); 
   }, false );
  swipeSevenPage();
  $('.open').on('click', function(e){
    if(Modernizr.touch) {
      return false;
    }
    else {
      toggleToolbar('animate');
    }
  })  
  $('.open').on('tap', function(e){
    toggleToolbar('animate');
  })
  $('.admin-list').find('a').click(function() {
    if(window.Modernizr.touch) {
    return false;
    }
    else {
      $(this).loadNextPage();
    }
  })
  $('.admin-list').find('a').on('tap', function(e){
    $(this).loadNextPage();
    return false;
  })
}

function removeOldPages() {
console.log('remove');
 var oldPages = $('#wrapper li');
 $.each(oldPages, function(index, item) {
   var isBartik = item.hasClass('bartik');
   if(!isBartik){
     item.remove();
   }
 })
}

window.addEventListener('load', loaded, false);