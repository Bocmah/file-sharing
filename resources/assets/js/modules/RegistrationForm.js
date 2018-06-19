import $ from "jquery";

class RegistrationForm {
    constructor() {
        this.registrationForm = $(".register-form");
        this.events();
    }

    events() {
        this.registrationForm.submit(this.handleFormSubmission.bind(this));
    }

    handleFormSubmission(event) {
        let self = this;
        event.preventDefault();

        let formData = this.grabFormData();

        $.ajax({
            type: "POST",
            url: "/register",
            data: formData,
            dataType: "json",
            beforeSend: self.clearErrors,
            encode: true,
            success: function(response) {
                window.location.href = "/";
            }
        })
            .fail(function(data) {
                self.handleValidationErrors(data.responseJSON.errors);
            });
    }

    grabFormData() {
        return {
            "username": $(".register-form input[name=username]").val(),
            "email": $(".register-form input[name=email]").val(),
            "password": $(".register-form input[name=password]").val(),
            "password_confirmation": $(".register-form input[name=password_confirmation]").val(),
            "_token": $(".register-form input[name=_token]").val()
        }
    }

    handleValidationErrors(errors) {
        let errorNames = Object.keys(errors);

        errorNames.forEach( (errorName) => {
            $(`.register-form input[name=${errorName}]`).addClass("is-invalid");
            $(`.register-form .${errorName}-error`).fadeIn(1000, function () {
                $(`.register-form .${errorName}-error`).text(`${errors[errorName]}`);
            })
        });
    }

    clearErrors() {
        $(".register-form .invalid-feedback").fadeOut();
        $(".register-form input").removeClass("is-invalid");
    }
}

export default RegistrationForm;



