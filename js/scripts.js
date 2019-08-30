//Button Down
$(function () {
    $('a[href*=#]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });
});
$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
//Button Down
//Contact Form
{
    const form = document.querySelector('#contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    //Wyłączamy domyślną walidację
    form.setAttribute('novalidate', true);

    const displayFieldError = function (elem) {
        const fieldRow = elem.closest('.form-row');
        const fieldError = fieldRow.querySelector('.field-error');
        if (fieldError === null) {
            const errorText = elem.dataset.error;
            const divError = document.createElement('div');
            divError.classList.add('field-error');
            divError.innerText = errorText;
            fieldRow.appendChild(divError);
        }
    };

    const hideFieldError = function (elem) {
        const fieldRow = elem.closest('.form-row');
        const fieldError = fieldRow.querySelector('.field-error');
        if (fieldError !== null) {
            fieldError.remove();
        }
    };

    [...inputs].forEach(elem => {
        elem.addEventListener('input', function () {
            if (!this.checkValidity()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
                hideFieldError(this);
            }
        });

        if (elem.type === "checkbox") {
            elem.addEventListener('click', function () {
                const formRow = this.closest('.form-row');
                if (this.checked) {
                    this.classList.remove('error');
                    hideFieldError(this);
                } else {
                    this.classList.add('error');
                }
            });
        }
    });

    const checkFieldsErrors = function (elements) {
        //Zmienna true. Pętla po wszystkich polach
        //Jeżeli któreś z pól jest błędne, przełączamy zmienną na false
        let fieldsAreValid = true;

        [...elements].forEach(elem => {
            if (elem.checkValidity()) {
                hideFieldError(elem);
                elem.classList.remove('error');
            } else {
                displayFieldError(elem);
                elem.classList.add('error');
                fieldsAreValid = false;
            }
        });

        return fieldsAreValid;
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        //Wszystkie pola poprawne
        if (checkFieldsErrors(inputs)) {
            const elements = form.querySelectorAll('input:not(:disabled), textarea:not(:disabled), select:not(:disabled)');

            const dataToSend = new FormData();
            [...elements].forEach(el => dataToSend.append(el.name, el.value));

            const url = form.getAttribute('action');
            const method = form.getAttribute('method');

            const submit = form.querySelector('[type="submit"]');
            submit.disabled = true;
            submit.classList.add('element-is-busy');

            fetch(url, {
                    method: method.toUpperCase(),
                    body: dataToSend
                })
                .then(ret => ret.json())
                .then(ret => {
                    submit.disabled = false;
                    submit.classList.remove('element-is-busy');

                    if (ret.errors) {
                        ret.errors.map(function (el) {
                            return '[name="' + el + '"]'
                        });
                        const selector = ret.errors.join(',');
                        checkFieldsErrors(form.querySelectorAll(sekector));

                    } else {
                        if (ret.status === 'ok') {
                            //komunikat powodzenia
                            const div = document.createElement('div');
                            div.classList.add('form-send-success');

                            div.innerHTML = 'Message was sent successfully!<span>Thank you for contact.</span><span>I will try to answer as soon as possible.</span>';
                            form.parentElement.insertBefore(div, form);
                            form.remove();
                        }

                        if (ret.status === 'error') {
                            //komunikat błędu, niepowodzenia
                            const div = document.createElement('div');
                            div.classList.add('send-error');
                            div.innerText = 'The message has not been sent!<span>Please try again.</span>';
                        }
                    }
                }).catch(_ => {
                    submit.disabled = false;
                    submit.classList.remove('element-is-busy');
                });
        }
    });
}
//Contact Form
//Download
jQuery(document).ready(function () {
    var downloadButton = jQuery('.et-download-button');

    downloadButton.each(function (index) {
        jQuery(this).attr('download', 'pdf-file');
    });
});
//Download
//Button Back
var btn = $('#button');

$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
});
//Button Back
//Cookies
function WHCheckCookies() {
    if (!localStorage.cookies_accepted) {
        var cookies_message = document.getElementById("cookies-message");
        cookies_message.style.display = "block"
    }
}

function WHCloseCookiesWindow() {
    localStorage.cookies_accepted = true;
    document.getElementById("cookies-message-container").removeChild(document.getElementById("cookies-message"));
}

window.onload = WHCheckCookies;
//Cookies
