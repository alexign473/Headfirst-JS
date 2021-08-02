function validateRegEx(regex, input, helpText, helpMessage) {
    if (!regex.test(input)) {
        if (helpText != null)
            helpText.innerHTML = helpMessage;
        return false;
    }
    else {
        if (helpText != null)
            helpText.innerHTML = "";
        return true;

    }
}

function validateNonEmpty(inputField, helpText) {
    return validateRegEx(/.+/, inputField.value, helpText, "Please enter a value");
}

function validateLength(minLength, maxLength, inputField, helpText) {
    return validateRegEx(new RegExp("^.{" + minLength + "," + maxLength + "}$"), inputField.value, helpText, "Please enter a value " + minLength + " to " + maxLength + " characters in length.");
}

function validateZipCode(inputField, helpText) {
    if (!validateNonEmpty(inputField, helpText))
        return false;

    return validateRegEx(/^\d{5}$/, inputField.value, helpText, "Please enter a 5-digit ZIP code. ");
}


function validateDate(inputField, helpText) {
    // First see if the input value contains data
    if (!validateNonEmpty(inputField, helpText))
        return false;

    // Then see if the input value is a date
    return validateRegEx(/^\d{2}\/\d{2}\/(\d{2}|\d{4})$/,
        inputField.value, helpText,
        "Please enter a date (for example, 01/14/1975).");
}

function validatePhone(inputField, helpText) {
    // First see if the input value contains data
    if (!validateNonEmpty(inputField, helpText))
        return false;

    // Then see if the input value is a phone number
    return validateRegEx(/^\d{3}-\d{3}-\d{4}$/,
        inputField.value, helpText,
        "Please enter a phone number (for example, 123-456-7890).");
}

function validateEmail(inputField, helpText) {
    // First see if the input value contains data
    if (!validateNonEmpty(inputField, helpText))
        return false;

    // Then see if the input value is an email address
    return validateRegEx(/^[\w\.-_\+]+@[\w-]+(\.\w{2,3})+$/,
        inputField.value, helpText,
        "Please enter an email address (for example, johndoe@acme.com).");
}

function placeOrder(form) {
    if (validateLength(1, 32, form["message"], form["message_help"]) &&
        validateZipCode(form["zipcode"], form["zipcode_help"]) &&
        validateDate(form["date"], form["date_help"]) &&
        validateNonEmpty(form["name"], form["name_help"]) &&
        validatePhone(form["phone"], form["phone_help"]) &&
        validateEmail(form["email"], form["email_help"])) {
        // Submit the order to the server
        form.submit();
    } else {
        alert("I'm sorry but there is something wrong with the order information.");
    }
}