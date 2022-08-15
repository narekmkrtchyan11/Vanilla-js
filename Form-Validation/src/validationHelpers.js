export {
    minLength,
    maxLength,
    checkConfirmPassword,
    checkEmail,
    checkPhoneNumber,
}

function minLength(value, least) {
    if(value.length < least) {
        return `Must be at least ${least} character`;
     } else {
         return null;
     }
}

function maxLength(value, less) {
    if (value.length > less) {
        return `Must be less than ${less} characters`;
    } else {
        return null;
    }
}


function checkEmail(item) {
    if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(item)) {
        return null;
    } else {
        return `Email is not valid`;
    }
}

function checkConfirmPassword(confirmPassword, password) {
    if(confirmPassword === password) {
        return null
    } else {
        return`Passwords do not match `;
    }
}

function checkPhoneNumber (val) {
    console.log(val)
    if(val[0] !== "+") {
        return `First character must be +`
    } else {
        return null
    }
}