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
    firebase.database().ref('contacts').push({
        email: email,
        message: message
    }, showContactSuccess);
}

function showContactSuccess(){
    $('#form-container').addClass('hidden');
    $('#contact-success').removeClass('hidden');
}
