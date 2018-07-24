'use strict'

var toggle = document.getElementById('menu-toggle');
var menu = document.getElementById('menu');
var nav = document.getElementById('nav');

toggle.onclick = function() {
    menu.classList.toggle("menu--open");
    toggle.classList.toggle("menu-toggle--active");
}

var anchors = document.getElementsByClassName('menu__link');

for(var i = 0; i < anchors.length; i++) {
    var anchor = anchors[i];
    anchor.onclick = function() {
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
function validateEmail() {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = document.getElementById("email");
    
    email.classList.remove("subscribe__email--invalid");
    email.classList.remove("subscribe__email--valid");

    if(!email.value || !(email.value.length > 0) || !pattern.test(email.value)) {
        email.classList.add("subscribe__email--invalid");
        return false;
    } 
    email.classList.add("subscribe__email--valid");
    return true;
}