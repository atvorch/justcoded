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
        var gallery = document.getElementById('gallery');
        var counter = 0;

        var col = document.createElement('div');
        col.setAttribute('class','work__col col-12 col-lg-4');

        for(var i =0; i < images.length; i ++) {
            var image = images[i];
            
            var eye_icon = document.createElement('img');
            eye_icon.classList.add('work__icon-img');
            eye_icon.setAttribute('src', 'src/assets/icons/work-eye.png');
            eye_icon.setAttribute('alt', 'view');

            var heart_icon = document.createElement('img');
            heart_icon.classList.add('work__icon-img');
            heart_icon.setAttribute('src', 'src/assets/icons/work-heart.png');
            heart_icon.setAttribute('alt', 'like');

            var heart_btn = document.createElement('div');
            heart_btn.classList.add('work__heart');
            heart_btn.appendChild(heart_icon);

            var eye_btn = document.createElement('div');
            eye_btn.classList.add('work__eye');
            eye_btn.appendChild(eye_icon);

            var buttons = document.createElement('div');
            buttons.classList.add('work__buttons');
            buttons.appendChild(eye_btn);
            buttons.appendChild(heart_btn);

            var title = document.createElement('span');
            title.classList.add('work__title');
            title.innerHTML = image.title;

            var subtitle = document.createElement('span');
            subtitle.classList.add('work__subtitle');
            subtitle.innerHTML = image.subtitle;

            var caption = document.createElement('figcaption');
            caption.classList.add('work__caption');
            caption.appendChild(title);
            caption.appendChild(subtitle);

            var overlay = document.createElement('div');
            overlay.classList.add('work__overlay');
            overlay.appendChild(buttons);
            overlay.appendChild(caption);

            var main__img = document.createElement('img');
            main__img.classList.add('work__img');
            main__img.setAttribute('src', image.src);
            main__img.setAttribute('srcset', image.srcset);
            main__img.setAttribute('alt', image.alt);

            var picture = document.createElement('picture');
            picture.classList.add('work__picture');
            picture.appendChild(main__img);

            var figure = document.createElement('figure');
            figure.classList.add('work');
            figure.appendChild(picture);
            figure.appendChild(overlay);
            col.appendChild(figure);

            ++counter;

            if(counter == 2 || (i == images.length-1)) {
                gallery.appendChild(col);
                col = document.createElement('div');
                col.setAttribute('class','work__col col-12 col-lg-4');
                counter = 0;
            } 
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