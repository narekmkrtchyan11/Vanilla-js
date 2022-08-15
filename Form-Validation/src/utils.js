function createFormFields(e) {
    const formFields = {};
    for (const el of e.target.elements) {
        if (el.name) {
            formFields[el.name] = el.value;
        }
    }
    return formFields;
}

function validateForm(formFields, formValidationsConfig) {
    const results = {};
    for(let formField in formFields) {
        const validations = formValidationsConfig[formField];
        for(let validation of validations) {
            if(typeof validation === 'function') {
                const erroreMssage = validation(formFields[formField], formFields);
                if (erroreMssage !== null) {
                    results[formField] = erroreMssage;
                    break;
                }
            }
        }
    }
    return results;
}

function errorInput(input, errorElement) {
    input.classList.add("error");
    errorElement.style.visibility = "visible";
}

function successInput(input) {
    input.classList.add("success");
}


function required(val, formFields) {
    return val ? null : 'This field is Required';
}

function resetErrors(errorElements, inputsArr) {
    errorElements.forEach((el) => {
        el.innerText = "";
    });

    for(const input of inputsArr) {
        if(input.name) {
            input.classList = "";
        }
    }
}

function handleErrorValues(resault, inputsArr, errorElementsObj) {
    for(const input of inputsArr) {
        if(resault[input.name]){
            const el = errorElementsObj[input.name];
            el.innerText = resault[input.name];
            errorInput(inputsArr[input.name], el)
        }  else {
            successInput(input)
        }
    }
}

function handleSubmit(e, formValidationsConfig, errorElements) {
    e.preventDefault();
    let inputsArr = e.target.elements;
    const formFields = createFormFields(e);
    const resault = validateForm(formFields, formValidationsConfig);
    const errorElementsObj = {};

    errorElements.forEach((el) => {
        errorElementsObj[el.dataset.idError] = el;
    })

    resetErrors(errorElements, inputsArr);
    handleErrorValues(resault, inputsArr, errorElementsObj);
}

export {
    required,
    handleSubmit,
};