var CONTACT_HOST = '//bfhbackend.herokuapp.com';
var contactForm = document.querySelector('#contact-form');

contactForm.addEventListener('submit', prepareFormInfo, false);

function prepareFormInfo(event) {
    event.preventDefault();
    var email = $('#contact-email').val();
    var message = $('#contact-message').val();
    var terms = $('#contact-terms');

    toggleFormAvailability();
    $('#submit-button').val('Enviando mensaje');
    $('#contact-fail').addClass('hidden');

    if(!terms.is(':checked')){
        ga('send', 'event', 'contactForm', 'submit');
        submitContact(email, message);
    } else {
        ga('send', 'event', 'contactForm', 'submit-bot');
        showContactSuccess();
    }
}

function toggleFormAvailability(){
    var invertDisableStatus = function(elementIndex, disabledValue) { return !disabledValue; };
    $("#contact-form :input").prop("disabled", invertDisableStatus);
}

function submitContact(email, message){
    $.ajax({
        url: CONTACT_HOST + '/contact',
        type: 'POST',
        data: {
            email: email,
            message: message
        },
        success: showContactSuccess,
        error: formSubmitError
    });
}

function showContactSuccess(response){
    if(response === 200){
        $('#form-container').addClass('hidden');
        $('#contact-success').removeClass('hidden');
        $('#contact-fail').addClass('hidden');
    } else {
        $('#contact-fail').removeClass('hidden');
    }
}

function formSubmitError(){
    toggleFormAvailability();
    $('#submit-button').val('Enviar mensaje');
    $('#contact-fail').removeClass('hidden');
}
