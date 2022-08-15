import {
    required,
    handleSubmit,
} from "./utils.js";

import {
    minLength,
    maxLength,
    checkEmail,
    checkPhoneNumber,
} from "./validationHelpers.js";

const form = document.querySelector(".form");
const errorElements = document.querySelectorAll("[data-id-error]")

const formValidationsConfig = {
    firstName: [required, (val) => maxLength(val, 15), (val) => minLength(val, 3)],
    lastName: [required, (val) => maxLength(val, 15), (val) => minLength(val, 3)],
    email: [required,checkEmail],
    password: [required, (val) => maxLength(val, 25), (val) => minLength(val, 6)],
    phoneNumber: [required, (val) => checkPhoneNumber(val)]
}

form.addEventListener("submit", function(e) {
    handleSubmit(e, formValidationsConfig, errorElements);
});

const a = [1,34, 56, 90, 67, 100];

let max = a[0]

for(let i = 1; i <= a.length; i++){
    if(a[i] > max) {
        max = a[i]
    }
}

console.log(max)




