// Compte à rebours
function countdown() {
    const weddingDate = new Date('September 27, 2025 16:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById('countdown').innerHTML = "Le grand jour est arrivé !";
    }
}

const timer = setInterval(countdown, 1000);

// Gestion du formulaire RSVP avec Google Forms
$('#rsvpForm').submit(function(e) {
    e.preventDefault();
    const form = $(this);
    const successMsg = $('#formSuccess');
    const errorMsg = $('#formError');

    $.ajax({
        url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdSBSr0PJCmA_QnQCRFxZbtHW5pcZsMNxsZ4WneVFOkVR1ljA/formResponse',
        data: form.serialize(),
        type: 'POST',
        dataType: 'jsonp',
        statusCode: {
            0: function() {
                successMsg.show();
                form[0].reset();
                setTimeout(() => successMsg.hide(), 5000);
            },
            200: function() {
                successMsg.show();
                form[0].reset();
                setTimeout(() => successMsg.hide(), 5000);
            },
            403: function() {
                errorMsg.show();
                setTimeout(() => errorMsg.hide(), 5000);
            }
        }
    });
});

