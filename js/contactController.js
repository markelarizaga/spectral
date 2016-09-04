// Initialize Firebase
var config = {
    apiKey: "AIzaSyDWnAihJaF3txJ3SRycwwJbwJH7r3hREQg",
    authDomain: "bfhabogados-d7aaf.firebaseapp.com",
    databaseURL: "https://bfhabogados-d7aaf.firebaseio.com",
    storageBucket: "",
};
firebase.initializeApp(config);

var CONTACT_HOST = 'http://localhost:3000';
var contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', prepareFormInfo, false);

function prepareFormInfo(event) {
    event.preventDefault();
    var email = $('#contact-email').val();
    var message = $('#contact-message').val();
    var terms = $('#contact-terms');

    if(!terms.checked){
        submitContact(email, message);
    } else {
        showContactSuccess();
    }
}

function submitContact(email, message){
    $.ajax({
        url: CONTACT_HOST + '/contact',
        type: "POST",
        data: {
            email: email,
            message: message
        },
        success: showContactSuccess
    });
}

function showContactSuccess(){
    $('#form-container').addClass('hidden');
    $('#contact-success').removeClass('hidden');
}
