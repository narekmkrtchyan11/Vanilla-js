import  {
    required,
    handleSubmit,
} from "./utils.js";

import {
    minLength,
    maxLength,
    checkConfirmPassword,
    checkEmail
} from "./validationHelpers.js";

const form = document.querySelector(".form");
const errorElements = document.querySelectorAll("[data-id-error]")

const formValidationsConfig = {
    username: [required, (val) => maxLength(val, 15), (val) => minLength(val, 3)],
    email: [required, checkEmail],
    password: [required, (val) => maxLength(val, 25), (val) => minLength(val, 6)],
    confirmPassword: [required, (val) => checkConfirmPassword(val, form.password.value)],
}

form.addEventListener("submit", function(e) {
    handleSubmit(e, formValidationsConfig, errorElements);
});



