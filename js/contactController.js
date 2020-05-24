let contactForm = null;
document.onload = function() {
    contactForm = $('#contact-form');
    contactForm.submit(prepareFormInfo);
};
const legalTermsAcceptanceCheckox = document.querySelector('#accept-legal-note');
const contactFormFields = document.querySelector("#contact-form-fields");

legalTermsAcceptanceCheckox.addEventListener('change', toggleFormEnablement);

function prepareFormInfo(event) {
    event.preventDefault();
    const email = $('#contact-email').val();
    const message = $('#contact-message').val();

    toggleFormAvailability();
    $('#submit-button').val('Enviando mensaje');

    typeof ga !== "undefined" && ga('send', 'event', 'contactForm', 'submit');
    submitContact(email, message);
}

function toggleFormAvailability(){
    const invertDisableStatus = function(elementIndex, disabledValue) { return !disabledValue; };
    $("#contact-form :input").prop("disabled", invertDisableStatus);
}

function submitContact(email, message){
    const formData = { email, message };
    const serializedData = encodeURIComponent(JSON.stringify(formData));
    $.post(contactForm.attr('action'), serializedData);
}

function toggleFormEnablement(){
  contactFormFields.disabled = !this.checked;
}
