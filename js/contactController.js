// Initialize Firebase
var config = {
    apiKey: "AIzaSyDWnAihJaF3txJ3SRycwwJbwJH7r3hREQg",
    authDomain: "bfhabogados-d7aaf.firebaseapp.com",
    databaseURL: "https://bfhabogados-d7aaf.firebaseio.com",
    storageBucket: "",
};
firebase.initializeApp(config);

var contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', prepareFormInfo, false);

function prepareFormInfo(event) {
    event.preventDefault();
    var email = $('#contact-email');
    var message = $('#contact-message');
    var terms = $('#contact-terms');

    // TODO Validate fields
    if(!terms.checked){
        submitContact(email.val(), message.val());
    } else {
        showContactSuccess();
    }
}

function submitContact(email, message){
    firebase.database().ref('contacts').push({
        email: email,
        message: message
    }, showContactSuccess);
}

function showContactSuccess(){
    $('#form-container').addClass('hidden');
    $('#contact-success').removeClass('hidden');
}
