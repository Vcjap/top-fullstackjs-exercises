const checkConstraint = (constraints, itemToCheck) => {
    const constraint = new RegExp(constraints[itemToCheck.id]["rule"]);
    return constraint.test(itemToCheck.value)
}

const showErrorMessage = (errorMessage, item) => {
    errorContainer = document.createElement("div");
    errorContainer.classlist.Add("errorMessage");
    errorContainer.textContent = errorMessage;
    item.after(errorContainer);
}

const constraints = {
    email: {
        rule: ".+@.+\\.[a-z]+$",
        errorMessage: "Please enter a valid email",
    },
    country: {
        rule: "Italy|France|Germany",
        errorMessage: "The only valid Countries are Italy, France, and Germany",
    },
    postalCode: {
        rule: "[0-9]{5}",
        errorMessage: "The postal code must have 5 digits"
    },
    password: {
        rule: "[A-Za-z0-9]{3,}",
        errorMessage: "The Password must have at least 3 digits and no special characters"
    },
    passwordConfirm: {
        rule: "[A-Za-z0-9]{3,}",
        errorMessage: "The Password must have at least 3 digits and no special characters"
    },
}

const checkValidation = (constraints, item) => {
    if (!checkConstraint(constraints, item)) {
        showErrorMessage(constraints[item.id]["errorMessage"]);
    }
}

const country = document.getElementById("country");
country.addEventListener("blur", () => checkValidation(constraints, country))