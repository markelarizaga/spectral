// Initialize Firebase
var config = {
    apiKey: "AIzaSyDWnAihJaF3txJ3SRycwwJbwJH7r3hREQg",
    authDomain: "bfhabogados-d7aaf.firebaseapp.com",
    databaseURL: "https://bfhabogados-d7aaf.firebaseio.com",
    storageBucket: "",
};
firebase.initializeApp(config);

var contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.querySelector('#contact-email');
    var message = document.querySelector('#contact-message');
    var terms = document.querySelector('#contact-terms');

    // TODO Validate fields
    if(!terms.checked){
        submitContact(email.value, message.value);
    } else {
        showContactSuccess();
    }
}, false);

function submitContact(email, message){
    firebase.database().ref('contacts').push({
        email: email,
        message: message
    }, showContactSuccess);
}

function showContactSuccess(){
    alert('Contact sent');
}
