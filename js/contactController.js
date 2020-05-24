const contactForm = $('#contact-form');
const legalTermsAcceptanceCheckox = document.querySelector('#accept-legal-note');
const contactFormFields = document.querySelector("#contact-form-fields");

contactForm.submit(prepareFormInfo);
legalTermsAcceptanceCheckox.addEventListener('change', toggleFormEnablement);

function prepareFormInfo(event) {
    event.preventDefault();
    const email = $('#contact-email').val();
    const message = $('#contact-message').val();
    const terms = $('#contact-terms');

    toggleFormAvailability();
    $('#submit-button').val('Enviando mensaje');
    $('#contact-fail').addClass('hidden');

    if(!terms.is(':checked')){
        typeof ga !== "undefined" && ga('send', 'event', 'contactForm', 'submit');
        submitContact(email, message);
    } else {
        typeof ga !== "undefined" && ga('send', 'event', 'contactForm', 'submit-bot');
        showContactSuccess();
    }
}

function toggleFormAvailability(){
    const invertDisableStatus = function(elementIndex, disabledValue) { return !disabledValue; };
    $("#contact-form :input").prop("disabled", invertDisableStatus);
}

function submitContact(email, message){
    const formData = { email, message };
    const serializedData = encodeURIComponent(JSON.stringify(formData));
    $.post(contactForm.attr('action'), serializedData).then(showContactSuccess);
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

function toggleFormEnablement(){
  contactFormFields.disabled = !this.checked;
}
