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