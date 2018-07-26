'use strict'


var toggle = document.getElementById('menu-toggle');
var menu = document.getElementById('menu');
var nav = document.getElementById('nav');
var anchors = document.getElementsByClassName('menu__link');

//fill nav bg to white at the first page load if pages was scrolled before
if(window.pageYOffset > 200) {
    nav.classList.add('nav--fill');
}
//close/open menu
toggle.onclick = function() {
    menu.classList.toggle("menu--open");
    toggle.classList.toggle("menu-toggle--active");
}

for(var i = 0; i < anchors.length; i++) {
    var anchor = anchors[i];
    anchor.onclick = function(e) {

        //smooth scrolling to page section
        e.preventDefault();
        var hash = this.hash;
        var target = document.getElementById(hash.replace(/#/,''));
        if(target) {
            $('html, body').stop().animate({
                'scrollTop': target.offsetTop - 70
            }, 900, 'swing');
        }
       
        // Remove selected class from all menu links 
        var links = document.getElementsByClassName('menu__link');
        for(var i = 0; i < links.length; i++) {
            links[i].classList.remove("menu__link--selected");
        }
        this.classList.add("menu__link--selected");
        toggle.classList.toggle("menu-toggle--active");
        menu.classList.remove("menu--open");
    }
}

//fill nav to white if page was scrolled over 200px, for best UX
window.addEventListener('scroll', function(e) {
    var offset = window.pageYOffset;
    var nav = document.getElementById('nav');
    var menuIsOpened = document.getElementById('menu').classList.contains('menu--open');

    if(offset > 200 && !nav.classList.contains('nav--fill'))  {
        nav.classList.add('nav--fill');
    } else if(offset < 200){
        nav.classList.remove('nav--fill');
    }
});


function loadAll() {
    loadJson('data.json', function(response) {
        var images = JSON.parse(response);
        for(var i =0; i < images; i ++) {
        }
    });
}

function loadJson(file, callback){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    $('#loadAll').prop('disabled', true);
    $('#loadAll').addClass('button--loading');
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            setTimeout(function() {
                $('#loadAll').prop('disabled', false);
                $('#loadAll').removeClass('button--loading');
                callback(xobj.responseText);
            }, 1000);
        }
    };
    xobj.send(null);  
}